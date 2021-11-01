const router = require('express').Router();
const { User, Post, Comment } = require('../models');
const sequelize = require('../config/connection');

router.get('/', async (req, res) => {
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
        // serialize
        const posts = postData.map((post) => post.get({ plain: true }));
        console.log(posts);
        // Pass serialized data and session flag into template
        res.render('homepage', {
            posts,
            logged_in: req.session.logged_in
        });
    } catch (err) {
        console.log(err);
        res.status(500).json(err);
    }
});


router.get("/post/:id", async (req, res) => {
    try {
        const postData = await Post.findOne({
            where: {
                id: req.params.id,
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
            ],
        });
        const curPost = postData.get({ plain: true });
        console.log(curPost);
        if (!curPost) {
            res.status(404).json({ message: "No Posts Available" });
            return;
        }
        const owned = curPost.user_id == req.session.user_id;
        res.render("singlePost", {
            curPost,
            loggedIn: req.session.loggedIn,
            currentUser: owned,
        });
    } catch(err){
        console.log(err);
        res.status(500).json(err);
    }

});
module.exports = router;