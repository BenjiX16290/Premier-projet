
import path from "path";
import formidable from "formidable";
import fs from "fs";

import Article from "../model/Article.js";

const getAll = async (req, res) => {
    try {
        const [response] = await Article.findAll();
        res.json(response);
    } catch (error) {
        res.status(500).json({ msg: "Erreur interne du serveur" });
    }
};

const getByIdCategorie = async (req, res) => {
    try {
      const id  = req.params.id;
      const [response] = await Article.findIdCategorie(id);
  
      if (!response) {
        return res.status(404).json({ message: "Aucun article trouvé pour cette catégorie." });
      }
      res.json(response);
    } catch (error) {
      res.status(500).json({ message: "Erreur lors de la récupération des articles." });
    }
};
  

const getById = async (req, res) => {
    try {
        const articleId = req.params.id;
        const [response] = await Article.findId(articleId);
        res.json(response);
    } catch (error) {
        res.status(500).json({ msg: "Erreur interne du serveur" });
    }
};

const create = async (req, res) => {
const form = formidable({ multiples: false });

form.parse(req, async (err, fields, files) => {
    if (err) {
        return res.status(400).json({ msg: "Erreur lors de l'analyse du formulaire" });
    }

    if (!files.img || files.img.length === 0) {
        return res.status(400).json({ msg: "Le fichier image est requis." });
    }

    const uploadedFile = files.img[0]; 
    const originalFilename = uploadedFile.originalFilename;
    const ext = path.extname(originalFilename).toLowerCase();

    const validExtensions = ['.jpg', '.jpeg', '.png', '.gif', '.webp'];
    if (!validExtensions.includes(ext)) {
        return res.status(400).json({ msg: "Le fichier doit être une image (webP, jpg, jpeg, png, gif)." });
    }

    // Utiliser le nom de fichier fourni par l'utilisateur
    const userProvidedFilename = fields.imgName ? fields.imgName[0] : originalFilename;
    const newFilename = `${userProvidedFilename}${ext}`; // Si l'utilisateur a fourni un nom, on l'utilise

    const articleData = {
        title: fields.title[0],
        img: newFilename, // Utiliser le nom de fichier fourni
        alt: fields.alt[0],
        category_id: parseInt(fields.category_id, 10),
        content: fields.content[0],
        user_id: req.session.user.id,
    };

    const oldPath = uploadedFile.filepath;
    const newPath = path.join(process.cwd(), 'public', 'img', newFilename); // Répertoire des images

    fs.copyFile(oldPath, newPath, async (err) => {
        if (err) {
            return res.status(500).json({ msg: "Erreur lors de la sauvegarde de l'image" });
        }

        try {
            const [response] = await Article.create(articleData);
            res.json({ msg: "Article ajouté", id: response.insertId });
        } catch (dbError) {
            res.status(500).json({ msg: "Erreur lors de l'ajout de l'article" });
        }
    });
});
}
const update = async (req, res) => {
    const form = formidable({ multiples: false });

    form.parse(req, async (err, fields, files) => {
        if (err) {
            console.error("Erreur lors de l'analyse du formulaire :", err);
            return res.status(400).json({ msg: "Erreur lors de l'analyse du formulaire" });
        }

        const articleId = parseInt(req.params.id, 10);

        try {
            // Récupérer l'article existant pour obtenir les données actuelles
            const [existingArticle] = await Article.findId(articleId);
            if (!existingArticle) {
                console.error("Article non trouvé avec l'ID :", articleId);
                return res.status(404).json({ msg: "Article non trouvé" });
            }
            console.log("Article existant récupéré :", existingArticle);

            // Récupération des fichiers téléchargés
            const uploadedFile = files.img ? files.img[0] : null;
            console.log("Fichier téléchargé :", uploadedFile);

            // Vérification de l'extension si un fichier est présent
            const ext = uploadedFile ? path.extname(uploadedFile.originalFilename).toLowerCase() : '';
            const allowedExtensions = [".jpg", ".jpeg", ".png", ".webp"];
            if (uploadedFile && !allowedExtensions.includes(ext)) {
                console.error("Type de fichier non autorisé :", ext);
                return res.status(400).json({ msg: "Type de fichier non autorisé." });
            }

         
const articleData = {
    title: fields.title ? fields.title[0] : existingArticle.title,
    alt: fields.alt ? fields.alt[0] : existingArticle.alt,
    category_id: fields.category_id 
        ? parseInt(fields.category_id[0], 10) 
        : existingArticle.category_id,
    content: fields.content ? fields.content[0] : existingArticle.content,
    user_id: fields.user_id 
        ? parseInt(fields.user_id[0], 10) 
        : existingArticle.user_id,
    // Si un fichier a été téléchargé, utilisez son nom ; sinon, conservez l'image existante
    img: (uploadedFile && uploadedFile.originalFilename) 
        ? uploadedFile.originalFilename 
        : existingArticle.img, // Utilisation de l'image existante si aucun fichier n'est téléchargé
    id: articleId,
};

// Si `img` est encore `undefined`, le remplacer par l'image existante ou null si nécessaire
if (articleData.img === undefined) {
    articleData.img = existingArticle.img || null;
}

// Log pour déboguer
console.log('Article data for update:', articleData);
console.log('Données finales à insérer ou à mettre à jour :', articleData);

// Mise à jour de l'article dans la base de données
try {
    await Article.update(articleData);
    console.log("Article mis à jour avec succès");
} catch (error) {
    console.error("Erreur lors de la mise à jour de l'article :", error);
}



            // Si une nouvelle image est téléchargée, gérer le fichier
            if (uploadedFile) {
                const oldPath = uploadedFile.filepath;
                const newPath = path.join(process.cwd(), 'public', 'img', uploadedFile.originalFilename);

                // Supprimer l'ancienne image si nécessaire
                if (existingArticle.img && existingArticle.img !== uploadedFile.originalFilename) {
                    const oldImagePath = path.join(process.cwd(), 'public', 'img', existingArticle.img);
                    const absolutePath = path.resolve(oldImagePath);

                    if (fs.existsSync(absolutePath)) {
                        try {
                            fs.unlinkSync(absolutePath);
                            console.log("Ancienne image supprimée :", absolutePath);
                        } catch (unlinkError) {
                            console.error("Erreur lors de la suppression de l'ancienne image :", unlinkError);
                            return res.status(500).json({ msg: "Erreur lors de la suppression de l'image" });
                        }
                    }
                }

                // Copier la nouvelle image
                try {
                    fs.copyFileSync(oldPath, newPath);
                    console.log("Nouvelle image enregistrée :", newPath);
                } catch (copyError) {
                    console.error("Erreur lors de la sauvegarde de l'image :", copyError);
                    return res.status(500).json({ msg: "Erreur lors de la sauvegarde de l'image" });
                }
            }

            // Mise à jour de l'article dans la base de données
            const [response] = await Article.update(
                articleData.id,
                articleData.title,
                articleData.alt,
                articleData.img,
                articleData.category_id,
                articleData.content,
                articleData.user_id
            );

            if (!response.affectedRows) {
                console.error("Article non trouvé lors de la mise à jour :", articleData.id);
                return res.status(404).json({ msg: "Article non trouvé" });
            }

            console.log("Article mis à jour avec succès");
            return res.json({ msg: "Article mis à jour avec succès" });
        } catch (dbError) {
            console.error("Erreur lors de la mise à jour de l'article :", dbError);
            return res.status(500).json({ msg: "Erreur serveur lors de la mise à jour de l'article" });
        }
    });
};



const remove = async (req, res) => {
    try {
        const [response] = await Article.remove(req.params.id);
        if (!response.affectedRows) {
            res.status(404).json({ msg: "Article non trouvé" });
            return;
        }
        res.json({ msg: "Article supprimé" });
    } catch (err) {
        res.status(500).json({ msg: "Erreur interne du serveur" });
    }
};

export { getAll, getByIdCategorie, getById, create, update, remove };


/*import path from "path";
import formidable from "formidable";
import fs from "fs";

import Article from "../model/Article.js";

const getAll = async (req, res) => {
    try {
        const [response] = await Article.findAll();
        res.json(response);
    } catch (error) {
        res.status(500).json({ msg: "Erreur interne du serveur" });
    }
};

const getByIdCategorie = async (req, res) => {
    try {
      const id  = req.params.id;
      const [response] = await Article.findIdCategorie(id);
  
      if (!response) {
        return res.status(404).json({ message: "Aucun article trouvé pour cette catégorie." });
      }
      res.json(response);
    } catch (error) {
      res.status(500).json({ message: "Erreur lors de la récupération des articles." });
    }
};
  

const getById = async (req, res) => {
    try {
        const articleId = req.params.id;
        const [response] = await Article.findId(articleId);
        res.json(response);
    } catch (error) {
        res.status(500).json({ msg: "Erreur interne du serveur" });
    }
};

const create = async (req, res) => {
const form = formidable({ multiples: false });

form.parse(req, async (err, fields, files) => {
    if (err) {
        return res.status(400).json({ msg: "Erreur lors de l'analyse du formulaire" });
    }

    if (!files.img || files.img.length === 0) {
        return res.status(400).json({ msg: "Le fichier image est requis." });
    }

    const uploadedFile = files.img[0]; // Accéder au premier fichier
    const originalFilename = uploadedFile.originalFilename;
    const ext = path.extname(originalFilename).toLowerCase();

    // Vérification de l'extension du fichier
    const validExtensions = ['.jpg', '.jpeg', '.png', '.gif', '.webp'];
    if (!validExtensions.includes(ext)) {
        return res.status(400).json({ msg: "Le fichier doit être une image (webP, jpg, jpeg, png, gif)." });
    }

    // Utiliser le nom de fichier fourni par l'utilisateur
    const userProvidedFilename = fields.imgName ? fields.imgName[0] : originalFilename;
    const newFilename = `${userProvidedFilename}${ext}`; // Si l'utilisateur a fourni un nom, on l'utilise

    const articleData = {
        title: fields.title[0],
        img: newFilename, // Utiliser le nom de fichier fourni
        alt: fields.alt[0],
        category_id: parseInt(fields.category_id, 10),
        content: fields.content[0],
        user_id: req.session.user.id,
    };

    const oldPath = uploadedFile.filepath;
    const newPath = path.join(process.cwd(), 'public', 'img', newFilename); // Répertoire des images

    fs.copyFile(oldPath, newPath, async (err) => {
        if (err) {
            return res.status(500).json({ msg: "Erreur lors de la sauvegarde de l'image" });
        }

        try {
            const [response] = await Article.create(articleData);
            res.json({ msg: "Article ajouté", id: response.insertId });
        } catch (dbError) {
            res.status(500).json({ msg: "Erreur lors de l'ajout de l'article" });
        }
    });
});
}

const update = async (req, res) => {
    const form = formidable({ multiples: false });

    form.parse(req, async (err, fields, files) => {
        if (err) {
            return res.status(400).json({ msg: "Erreur lors de l'analyse du formulaire" });
        }

        const articleId = parseInt(req.params.id, 10);
        const [existingArticle] = await Article.findId(articleId);

        if (!existingArticle) {
            return res.status(404).json({ msg: "Article non trouvé" });
        }

        const uploadedFile = files.img ? files.img[0] : null;
        console.log("Fichier téléchargé : ", uploadedFile);

        const ext = uploadedFile ? path.extname(uploadedFile.originalFilename).toLowerCase() : '';
        const allowedExtensions = [".jpg", ".jpeg", ".png", ".webp"];
        if (uploadedFile && !allowedExtensions.includes(ext)) {
            return res.status(400).json({ msg: "Type de fichier non autorisé." });
        }

        // Préparation des données de l'article
        const articleData = {
            title: fields.title[0] || null,
            alt: fields.alt[0] || null,
            img: uploadedFile ? uploadedFile.originalFilename : existingArticle.img || null, // Utilisation de l'image existante si aucune nouvelle n'est fournie
            category_id: parseInt(fields.category_id[0], 10) || null,
            content: fields.content[0] || null,
            user_id: parseInt(fields.user_id[0], 10) || null,
            id: articleId,
        };

        console.log("Données de l'article : ", articleData);

        // Vérification des valeurs undefined et les remplacer par null
        Object.keys(articleData).forEach(key => {
            if (articleData[key] === undefined) {
                articleData[key] = null;
            }
        });

        // Gestion de l'image téléchargée
        if (uploadedFile) {
            const oldPath = uploadedFile.filepath;
            const newPath = path.join(process.cwd(), 'public', 'img', uploadedFile.originalFilename);
            console.log("Ancien chemin : ", oldPath);
            console.log("Nouveau chemin : ", newPath);

            // Suppression de l'ancienne image si elle existe et si elle n'est pas la même que la nouvelle
            if (existingArticle.img && existingArticle.img !== uploadedFile.originalFilename) {
                const oldImagePath = path.join(process.cwd(), 'public', 'img', existingArticle.img);
                const absolutePath = path.resolve(oldImagePath);

                if (fs.existsSync(absolutePath)) {
                    try {
                        fs.unlinkSync(absolutePath);
                        console.log("Ancienne image supprimée.");
                    } catch (err) {
                        return res.status(500).json({ msg: "Erreur lors de la suppression de l'image" });
                    }
                }
            }

            // Copier la nouvelle image
            try {
                fs.copyFileSync(oldPath, newPath);
                console.log("Nouvelle image copiée.");
            } catch (err) {
                return res.status(500).json({ msg: "Erreur lors de la copie de l'image" });
            }
        }

        // Mise à jour de l'article dans la base de données
        try {
            const [response] = await Article.update(
                articleData.id,
                articleData.title,
                articleData.alt,
                articleData.img, // Utilisation de l'image mise à jour ou de l'existante
                articleData.category_id,
                articleData.content,
                articleData.user_id
            );

            if (!response.affectedRows) {
                return res.status(404).json({ msg: "Article non trouvé" });
            }
            return res.json({ msg: "Article mis à jour" });
        } catch (error) {
            return res.status(500).json({ msg: error.message });
        }
    });
};



const remove = async (req, res) => {
    try {
        const [response] = await Article.remove(req.params.id);
        if (!response.affectedRows) {
            res.status(404).json({ msg: "Article non trouvé" });
            return;
        }
        res.json({ msg: "Article supprimé" });
    } catch (err) {
        res.status(500).json({ msg: "Erreur interne du serveur" });
    }
};

export { getAll, getByIdCategorie, getById, create, update, remove };*/



