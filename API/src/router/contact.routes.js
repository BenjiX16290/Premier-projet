import { Router } from "express";
import { getAll, getById, create, remove } from "../controllers/contact.js";
import Admin from "../middlwares/Admin.js";
import WithAuth from "../middlwares/WithAuth.js";


const router = Router ();

router.get("/list", Admin, getAll);
router.get("/:id", Admin, getById);

router.post("/create", WithAuth, create);
router.delete("/delete/:id", Admin, remove);

export default router;