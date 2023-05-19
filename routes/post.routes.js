const express = require("express");
const router = express.Router();
const fs = require("fs");

//Lay ve 1 post
router.get("/:id", (req, res) => {
  const { id } = req.params;
  try {
    let posts = JSON.parse(fs.readFileSync("./user-post-api/posts.json"));
    const findPost = posts.find((e) => e.id === +id);
    res.json(findPost);
  } catch (error) {
    res.json({
      error,
    });
  }
});
//Lay ve tat ca post
router.get("/", (req, res) => {
  try {
    let posts = JSON.parse(fs.readFileSync("./user-post-api/posts.json"));
    res.json(posts);
  } catch (error) {
    res.json({
      error,
    });
  }
});
//Them moi 1 post
router.post("/", (req, res) => {
  let { title, body } = req.body;
  if (!title || !body) {
    res.json({
      messages: "Title hoac Body hoac name khong hop le",
    });
  } else {
    let newPost = {
      id: Math.floor(Math.random() * 10000000000000),
      userId: Math.floor(Math.random() * 100000000000000),
      title,
      body,
    };
    try {
      let posts = JSON.parse(fs.readFileSync("./user-post-api/posts.json"));
      posts.push(newPost);
      fs.writeFileSync("./user-post-api/posts.json", JSON.stringify(posts));
      res.json({
        messages: "Create Post Successfully!",
      });
    } catch (error) {
      res.json({
        error,
      });
    }
  }
});
//Chinh sua du lieu 1 post
router.put("/:id", (req, res) => {
  let { id } = req.params;
  let { title, body } = req.body;

  // Tim kiem post trong ma posts
  let posts = JSON.parse(fs.readFileSync("./user-post-api/posts.json"));
  let findPost = posts.findIndex((e) => e.id === +id);

  if (!title || !body) {
    res.json({
      messages: " ko duoc de trong",
    });
  } else {
    posts[findPost] = {
      ...posts[findPost],
      title,
      body,
    };

    fs.writeFileSync("./user-post-api/posts.json", JSON.stringify(posts));

    res.json({
      messages: "Update post thanh cong",
    });
  }
});
//Delete 1 post
router.delete("/:id", (req, res) => {
  const { id } = req.params;
  try {
    let posts = JSON.parse(fs.readFileSync("./user-post-api/posts.json"));
    const findPost = posts.findIndex((e) => e.id === +id);
    if (findPost === -1) {
      res.json({
        message: "Todo not found",
      });
    } else {
      posts.splice(findPost, 1);
      fs.writeFileSync("./user-post-api/posts.json", JSON.stringify(posts));
      res.json({
        message: "Delete successfully",
      });
    }
  } catch (error) {
    res.json({
      error,
    });
  }
});
module.exports = router;
