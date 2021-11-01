const router = require("express").Router();
const { User, Post, Comment } = require("../../models");

router.get('/', async (req, res) => {
    try {
        var userData = await User.findAll({
            attributes: ["id", "username", "password"],
            include: [
                {
                    model: Post,
                    as: "posts",
                    attributes: ["id", "title", "content"],
                },
                {
                    model: Comment,
                    as: "comments",
                    attributes: ["id", "comment_text", "post_id"],
                },
            ],
        });
        console.log(userData);
        res.json(userData);

    } catch (err) {
        console.log(err);
        res.status(500).json(err);
    }
});

router.get('/:id', async (req, res) => {
    try {
        var userData = await User.findOne({
            where: {
                id: req.params.id
            },
            attributes: ["id", "username", "password"],
            include: [
                {
                    model: Post,
                    as: "posts",
                    attributes: ["id", "title", "content"],
                },
                {
                    model: Comment,
                    as: "comments",
                    attributes: ["id", "comment_text", "post_id"],
                },
            ],
        });
        console.log(userData);
        res.json(userData);

    } catch (err) {
        console.log(err);
        res.status(500).json(err);
    }
});

router.post('/', async (req, res) => {
    try {
        
        var checkData = await User.findAll();
        // check to see if username alr exsits
        const users = checkData.map((user) => user.get({ plain: true }));
        users.forEach(element => {
            if(element.username == req.body.username){
                res.status(500).json("username already exists");
                return;
            }
        });
        var userData = await User.create({
            username: req.body.username,
            password: req.body.password,
        })
        if (!userData.username || !userData.password) {
            console.log("no input")
            res.status(404)
        }
        
        req.session.save(() => {
            req.session.user_id = userData.id;
            req.session.username = userData.username;
            req.session.loggedIn = true;
            res.json(userData);
        });
    } catch (err) {
        console.log(err);
        res.status(500).json(err);
    }
});

router.post("/login", async (req, res) => {
    try{
        console.log("lol")
        const userData = await User.findOne({
            where: {
                username: req.body.username,
            },
        })
        
        if (!userData) {
            console.log("user not found");
            res.status(400).json({ message: "User not found" });
            return;
        }
        
        const validPassword = userData.checkPassword(req.body.password);
        if (!validPassword) {
            console.log("invalid passowrd");
            res.status(400).json({ message: "Incorrect Password!" });
            return;
        }
        req.session.save(() => {
            req.session.user_id = userData.id;
            req.session.username = userData.username;
            req.session.loggedIn = true;
            res.json({ 
                user: userData, 
                message: "Logged in successfully" 
            });
        });
    } catch(err){
        res.status(500).json(err);
    }
});

router.post("/logout", (req, res) => {
    if (req.session.loggedIn) {
      req.session.destroy(() => {
        console.log("succesfully logged out");
        res.json({
            message: "logged out"
        });
        res.status(204).end();
        
      });
    } else {
      res.status(404).end(); 
    }
  });

module.exports = router;

