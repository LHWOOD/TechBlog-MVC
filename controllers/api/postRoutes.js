const router = require("express").Router();
const { User, Post, Comment } = require("../../models");
const withAuth = require("../../utils/auth");

//get all posts
router.get("/", (req, res) => {
  Post.findAll({
    attributes: ["id", "content", "title", "created_at"],
    order: [["created_at", "DESC"]],
    include: [
      {
        model: User,
        attributes: ["username"],
      },
      {
        model: Comment,
        attributes: ["id", "comment_text", "post_id", "user_id", "created_at"],
        include: {
          model: User,
          attributes: ["username"],
        },
      },
    ],
  })
    .then((postData) => res.json(postData))
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });
});

//get one post
router.get("/:id", (req, res) => {
  Post.findOne({
    where: {
      id: req.params.id,
    },
    attributes: ["id", "content", "title", "created_at"],
    include: [
      {
        model: User,
        attributes: ["username"],
      },
      {
        model: Comment,
        attributes: ["id", "comment_text", "post_id", "user_id", "created_at"],
        include: {
          model: User,
          attributes: ["username"],
        },
      },
    ],
  })
    .then((postData) => {
      if (!postData) {
        res.status(404).json({
          message: "No post found",
        });
        return;
      }
      res.json(postData);
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });
});

//create a post //nogo
router.post("/", withAuth, (req, res) => {
  Post.create({
    title: req.body.title,
    content: req.body.post_content,
    user_id: req.session.user_id,
  })
    .then((postData) => res.json(postData))
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });
});

//update post //nogo
router.put("/:id", withAuth, (req, res) => {
  Post.update(
    {
      title: req.body.title,
      content: req.body.post_content,
    },
    {
      where: {
        id: req.params.id,
      },
    }
  )
    .then((postData) => {
      if (!postData) {
        res.status(404).json({
          message: "No post found",
        });
        return;
      }
      res.json(postData);
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });
});

//delete post //nogo
router.delete("/:id", withAuth, (res, req) => {
  Post.destroy({
    where: {
      id: req.params.id,
    },
  })
    .then((postData) => {
      if (!postData) {
        res.status(404).json({
          message: "No post found",
        });
        return;
      }
      res.json(postData);
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });
});

module.exports = router;
