import Router from "express";
import { create, getAll, remove } from "../controllers/article.js";
import { getById, update, getByIdCategorie } from "../controllers/article.js";
import Admin from "../middlwares/Admin.js";

const router = Router ();

router.get("/list", getAll);
router.get("/list/:id", getByIdCategorie);
router.get("/:id",getById);


router.post("/create", Admin, create);
router.patch("/update/:id", Admin, update);
router.delete("/delete/:id", Admin, remove);

export default router;