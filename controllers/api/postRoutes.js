const router = require("express").Router();
const { User, Post, Comment } = require("../../models");

router.get("/", async (req, res) => {
    try {
        const postData = await Post.findAll({
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
                },
            ],
        });
        res.json(postData);
    }
    catch (err) {
        res.status(500).json(err);
    }
});

router.post("/", async (req, res) => {
    // This will make a new post
    // Expects Title, body, user_id
    try {
        const postData = await Post.create({
            title: req.body.title,
            content: req.body.content,
            user_id: req.session.user_id,
        })
        res.status(200).json(dbPostData);
    }
    catch (err) {
        console.log(err);
        res.status(500).json(err); //REST api needs status
    }
});

module.exports = router;