const router = require("express").Router();
const { User, Post, Comment } = require("../../models");

router.get("/", async (req, res) => {
    try {
        const commentData = await Comment.findAll({
            attributes: ["id", "comment_text", "user_id", "post_id"],
            include: [
                {
                    model: User,
                    as: "user",
                    attributes: ["username"],
                },
            ],
        })
        res.json(commentData);
    } catch (err) {
        console.log(err);
        res.status(500).json(err);
    }
});

router.get("/:id", async (req, res) => {
    try {
        const commentData = await Comment.findOne({
            where: {
                id: req.params.id,
            },
            attributes: ["id", "comment_text", "user_id", "post_id"],
            include: [
                {
                    model: User,
                    as: "user",
                    attributes: ["username"],
                },
            ],
        })
        if (!commentData) {
            res.status(404).json({ message: "No Comment found with this id" });
            return;
        }
        res.json(commentData);
    } catch (err) {
        console.log(err);
        res.status(500).json(err);
    }
});

//expects comment_text, user_id, post_id
router.post("/", (req, res) => {
    try{
        const commentData = Comment.create({
            comment_text: req.body.comment_text,
            user_id: req.session.user_id,
            post_id: req.body.post_id,
          })
          res.json(commentData);
    } catch(err){
        console.log(err);
        res.status(500).json(err);
    }
  });
module.exports = router;