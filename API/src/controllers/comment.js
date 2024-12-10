import Comment from "../model/Comment.js";

const getAll = async (req, res) => {
    try {
        const [response] = await Comment.findAll();
        res.json(response); 
    } catch (error) {
        res.status(500).json({ msg: error.message });
    }
}

const getAllByArticleId = async (req, res) => {
    try {
        const { id } = req.params;
        const [comment] = await Comment.findAllByArticleId(id);
        res.status(200).json(comment);
    } catch (error) {
        res.status(500).json({ msg: "Problème d'affichage du commentaire" });
    }
};

const addComment = async (req, res) => {
    try {
        if (!req.session.user) {
            return res.status(401).json({ msg: "Utilisateur non authentifié." });
        }

        const { content } = req.body;
        const article_id = parseInt(req.params.article_id);

        if (!content || isNaN(article_id)) {
            return res.status(400).json({ msg: "Impossible de poster un commentaire vide." });
        }

        const data = {
            content,
            user_id: req.session.user.id,
            article_id,
        };

        const [result] = await Comment.create(data);
        const insertId = result.insertId;

        if (result.affectedRows === 0) {
            throw new Error("Impossible d'ajouter le commentaire");
        }

        const [newComment] = await Comment.findById(insertId);

        res.status(201).json({ msg: "Votre commentaire a bien été ajouté", comment: newComment[0] });
    } catch (err) {
        res.status(500).json({ msg: err.message });
    }
};

const remove = async (req, res) => {
    try {
        const [response] = await Comment.remove(req.params.id);
        if (!response.affectedRows) {
            res.status(404).json({ msg: "Commentaire non supprimé" });
            return;
        }
        res.json({ msg: "Commentaire supprimé" });
    } catch (err) {
        res.status(500).json({ msg: err.message });
    }
}

export { getAll, getAllByArticleId, addComment, remove };
