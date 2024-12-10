
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
        const id = req.params.id;
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

        const userProvidedFilename = fields.imgName ? fields.imgName[0] : originalFilename;
        const newFilename = `${userProvidedFilename}${ext}`;

        const articleData = {
            title: fields.title[0],
            img: newFilename,
            alt: fields.alt[0],
            category_id: parseInt(fields.category_id, 10),
            content: fields.content[0],
            user_id: req.session.user.id,
        };

        const oldPath = uploadedFile.filepath;
        const newPath = path.join(process.cwd(), 'public', 'img', newFilename);

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
};

const update = async (req, res) => {
    const form = formidable({ multiples: false });

    form.parse(req, async (err, fields, files) => {
        if (err) {
            return res.status(400).json({ msg: "Erreur lors de l'analyse du formulaire" });
        }

        const articleId = parseInt(req.params.id, 10);

        try {
            const [existingArticle] = await Article.findId(articleId);
            if (!existingArticle) {
                return res.status(404).json({ msg: "Article non trouvé" });
            }

            const uploadedFile = files.img ? files.img[0] : null;
            const ext = uploadedFile ? path.extname(uploadedFile.originalFilename).toLowerCase() : '';
            const allowedExtensions = [".jpg", ".jpeg", ".png", ".webp"];
            if (uploadedFile && !allowedExtensions.includes(ext)) {
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
                img: (uploadedFile && uploadedFile.originalFilename)
                    ? uploadedFile.originalFilename
                    : existingArticle.img,
                id: articleId,
            };

            if (articleData.img === undefined) {
                articleData.img = existingArticle.img || null;
            }

            try {
                await Article.update(articleData);
            } catch (error) {
                return res.status(500).json({ msg: "Erreur serveur lors de la mise à jour de l'article" });
            }

            if (uploadedFile) {
                const oldPath = uploadedFile.filepath;
                const newPath = path.join(process.cwd(), 'public', 'img', uploadedFile.originalFilename);

                if (existingArticle.img && existingArticle.img !== uploadedFile.originalFilename) {
                    const oldImagePath = path.join(process.cwd(), 'public', 'img', existingArticle.img);
                    const absolutePath = path.resolve(oldImagePath);

                    if (fs.existsSync(absolutePath)) {
                        try {
                            fs.unlinkSync(absolutePath);
                        } catch (unlinkError) {
                            return res.status(500).json({ msg: "Erreur lors de la suppression de l'image" });
                        }
                    }
                }

                try {
                    fs.copyFileSync(oldPath, newPath);
                } catch (copyError) {
                    return res.status(500).json({ msg: "Erreur lors de la sauvegarde de l'image" });
                }
            }

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
                return res.status(404).json({ msg: "Article non trouvé" });
            }

            return res.json({ msg: "Article mis à jour avec succès" });
        } catch (dbError) {
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
