
import Category from "../model/Category.js";

const getAll = async (req, res) => {
    try {
        const [response] = await Category.findAll();   
        res.json(response); 
    } catch (err) {
        res.status(500).json({ msg: "Erreur interne du serveur" });
    }
};

const getById = async (req, res) => {
    try {
        const [response] = await Category.findById(req.params.id);
        if (!response.length) {
            res.status(404).json({ msg: "Catégorie non trouvée" });
            return;
        }
        res.json(response[0]);
    } catch (err) {
        res.status(500).json({ msg: "Erreur interne du serveur" });
    }
};

// fonction permettant d'ajouter une nouvelle catégorie uniquement si elle n'existe pas déjà (vérification au préalable)
const create = async (req, res) => {
    let find = (req.body.name).trim();
    try {
        const [responseA] = await Category.findByName(find); 
        if(responseA[0].result === 0) {
            const [response] = await Category.create(find);
            res.json({ msg: "Catégorie créée", id: response.insertId });
        }
        else {
            res.status(500).json({ msg: "La catégorie existe déjà" });
            return;
        }
    } catch (err) {
        res.status(500).json({ msg: "Erreur interne du serveur" });
    }
};

// fonction permettant de modifier le nom de la catégorie uniquement si le nouveau nom choisi n'existe pas déjà dans la BDD.
const update = async (req, res) => {
    let find = (req.body.name).trim();
    try {
        const [responseA] = await Category.findByName(find);
        if(responseA[0].result === 0) {
            const [response] = await Category.update(find, req.params.id);
            if (!response.affectedRows) {
                res.status(404).json({ msg: "Catégorie non trouvée" });
                return;
            }
        }
        else {
            res.status(404).json({ msg: "La catégorie existe déjà" });
            return;
        }
        res.json({ msg: "Catégorie mise à jour", id: req.body.id });
    } catch (err) {
        res.status(500).json({ msg: "Erreur interne du serveur" });
    }
};

const remove = async (req, res) => {
    try {
        const [response] = await Category.remove(req.params.id);
        if (!response.affectedRows) {
            res.status(404).json({ msg: "Catégorie non trouvée" });
            return;
        }
        res.json({ msg: "Catégorie supprimée", id: req.params.id });
    } catch (err) {
        res.status(500).json({ msg: "Erreur interne du serveur" });
    }
};

export { getAll, getById, create, update, remove };

