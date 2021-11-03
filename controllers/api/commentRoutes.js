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
    });
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
    });
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
router.post("/", async (req, res) => {
  try {
    const commentData = await Comment.create({
      ...req.body,
      include: { model: Post }, //remove???
        include: { model: User, where: {id: req.session.userid}},
    });
    console.log(commentData);
        res.status(200).json(commentData);
    
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

router.delete("/:id", async (req, res) => {
  try {
    const commentData = await Comment.destroy({
      where: {
        id: req.params.id,
      },
    });

    if (!commentData) {
      res.status(404).json({ message: "No comment found with this id!" });
      return;
    }
    res.status(200).json(commentData);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
