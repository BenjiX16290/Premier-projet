import Contact from "../model/Contact.js";

const getAll = async (req, res) => {
    try {
        const [response] = await Contact.findAll();
        res.json(response);
    } catch (error) {
        res.status(500).json({ msg: "Erreur interne du serveur" });
    }
};

const getById = async (req, res) => {
    try {
        const [response] = await Contact.findById();
        res.json(response);
    } catch (error) {
        res.status(500).json({ msg: "Erreur interne du serveur" });
    }
};

const create = async (req, res) => {
    try {
        const { name, message, email, publish_date } = req.body;
        const [response] = await Contact.create({ name, message, email, publish_date });

        res.status(201).json({ msg: "Contact créé avec succès", data: response });
    } catch (error) {
        res.status(500).json({ msg: "Erreur interne du serveur" });
    }
};

const remove = async (req, res) => {
    try {
        const [response] = await Contact.remove(req.params.id);
        if (!response.affectedRows) {
            res.status(404).json({ msg: "Erreur lors de la suppression" });
            return;
        }
        res.json({ msg: "Message supprimé", id: req.params.id });
    } catch (error) {
        res.status(500).json({ msg: "Erreur interne du serveur" });
    }
};

export { getAll, getById, create, remove };
