import Router from "express";
import { getAll, remove, addComment, getAllByArticleId } from "../controllers/comment.js";
import Admin from "../middlwares/Admin.js";
import WithAuth from "../middlwares/WithAuth.js";

const router = Router();

router.get("/list", getAll );
router.post("/create/:article_id", WithAuth, addComment);
router.get("/all-from-article/:id", getAllByArticleId); 
router.delete("/delete/:id",Admin, remove);

export default router;