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
        const posts = postData.map((post) => post.get({ plain: true }));
        console.log(posts);
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

router.get("/login", (req, res) => {
    console.log("Is logged in?", req.session.loggedIn);
    res.render("login", { loggedIn: req.session.loggedIn });
});

router.get("/dashboard")

//TODO, post, edit/:id
module.exports = router;