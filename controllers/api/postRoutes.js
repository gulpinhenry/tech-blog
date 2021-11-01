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
router.get("/:id", async (req, res) => {
    try{
        const postData = Post.findOne({
            where: {
                id: req.params.id,
            },
        })
        if(!postData){
            res.status(404).json({ message: "No Post found with this id" });
            return;
        }
        res.json(postData);
    }
    catch(err){
        console.log(err);
        res.status(500).json(err);
    }
});
router.post("/", async (req, res) => {
    try {
        const postData = await Post.create({
            title: req.body.title,
            content: req.body.content,
            user_id: req.session.user_id,
        })
        res.status(200).json(postData);
    }
    catch (err) {
        console.log(err);
        res.status(500).json(err);
    }
});

//take in post id
router.put("/:id", async (req, res) => {

    try {
        const postData = await Post.update(
            {
                title: req.body.title,
                content: req.body.content,
            },
            {
                where: {
                    id: req.params.id,
                },
            }
        )
        if (!postData) {
            res.status(404).json({ message: "No Post found with this id" });
            return;
        }
        res.json(postData);
    } catch (err) {
        console.log(err);
        res.json(err);
    }
});

//TODO
router.delete("/:id", async (req, res) => {
    try{
        const postData = Post.destroy({
            where: {
                id: req.params.id,
            },
        })
        if(!postData){
            res.status(404).json({ message: "No Post found with this id" });
            return;
        }
        res.json(postData);
    }
    catch(err){
        console.log(err);
        res.status(500).json(err);
    }
});
module.exports = router;