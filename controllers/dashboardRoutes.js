const router = require("express").Router();
const { User, Post, Comment } = require("../models");
const sequelize = require("../config/connection");


router.get("/", async(req, res)=>{
    try {
        const postData = await Post.findAll({
            where: {
                user_id: req.session.user_id,
            },
            attributes: ["id", "title", "content", "user_id", "created_at"],
            include: [
                {
                model: User,
                as: "user",
                attributes: ["username"],
                },
                {
                model: Comment,
                as: "comments",
                attributes: ["id", "comment_text", "user_id", "created_at"],
                include: [
                    {
                    model: User,
                    as: "user",
                    attributes: ["username"],
                    },
                ],
                },
            ]
        });
        if(!postData){
            res.status(404).json({ message: "No Posts Available" });
            return;
        }
        const posts = postData.map((post) => post.get({ plain: true }));
        console.log(posts);
        res.render("dashboard", { posts, loggedIn: req.session.loggedIn });
    } catch(err){
        console.log(err);
        res.status(500).json(err);
    }
});



module.exports = router;