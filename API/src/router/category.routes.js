import Router from "express";
import Admin from "../middlwares/Admin.js";
import { getAll, getById, create, update, remove,} from "../controllers/category.js";


const router = Router ();

router.get("/list", getAll);
router.get("/:id" , getById);

router.post("/create", Admin, create);
router.patch("/update/:id", Admin, update);
router.delete("/delete/:id", Admin, remove);

export default router;