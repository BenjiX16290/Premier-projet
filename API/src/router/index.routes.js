import { Router} from "express";

import user_routes from "./user.routes.js";
import category_routes from "./category.routes.js";
import comment_routes from "./comment.routes.js";
import article_routes from "./article.routes.js";
import contact_routes from "./contact.routes.js"


const router = Router ();

router.use("/article", article_routes);
router.use("/category", category_routes);
router.use("/comment", comment_routes)
router.use("/user", user_routes);
router.use("/contact", contact_routes);
router.get("*", (req,res)=> {
    res.status(404).json ({msg: "Error 404"});
})

export default router;