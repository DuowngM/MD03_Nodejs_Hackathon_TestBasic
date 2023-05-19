const express = require("express");
const router = express.Router();
const fs = require("fs");

//Lay ve 1 user
router.get("/:id", (req, res) => {
  const { id } = req.params;
  try {
    let users = JSON.parse(fs.readFileSync("./user-post-api/users.json"));
    const findUser = users.find((e) => e.id === +id);
    res.json(findUser);
  } catch (error) {
    res.json({
      error,
    });
  }
});
//Lay ve tat ca user
router.get("/", (req, res) => {
  try {
    let users = JSON.parse(fs.readFileSync("./user-post-api/users.json"));
    res.json(users);
  } catch (error) {
    res.json({
      error,
    });
  }
});
//Them moi 1 user
router.post("/", (req, res) => {
  let { username, email, name } = req.body;
  if (!username || !email || !name) {
    res.json({
      messages: "Email hoac username hoac name khong hop le",
    });
  } else {
    let newUser = {
      id: Math.floor(Math.random() * 10000000000000),
      name: name,
      username: username,
      email: email,
      address: {
        street: null,
        suite: null,
        city: null,
        zipcode: null,
        geo: {
          lat: null,
          lng: null,
        },
      },
      phone: null,
      website: null,
      company: {
        name: null,
        catchPhrase: null,
        bs: null,
      },
    };
    try {
      let users = JSON.parse(fs.readFileSync("./user-post-api/users.json"));
      users.push(newUser);
      fs.writeFileSync("./user-post-api/users.json", JSON.stringify(users));
      res.json({
        messages: "Create User Successfully!",
      });
    } catch (error) {
      res.json({
        error,
      });
    }
  }
});
//Put email
router.put("/:id", (req, res) => {
  let { id } = req.params;
  let { email } = req.body;

  // Tim kiem user trong ma users
  let users = JSON.parse(fs.readFileSync("./user-post-api/users.json"));
  let findUserIndex = users.findIndex((e) => e.id === +id);

  if (!email) {
    res.json({
      messages: "Email ko duoc de trong",
    });
  } else {
    // Update user object
    users[findUserIndex] = {
      ...users[findUserIndex],
      email,
    };

    // Write the updated users array back to the JSON file
    fs.writeFileSync("./user-post-api/users.json", JSON.stringify(users));

    res.json({
      messages: "Update user thanh cong",
    });
  }
});
//Delete 1 user
router.delete("/:id", (req, res) => {
  const { id } = req.params;
  try {
    let users = JSON.parse(fs.readFileSync("./user-post-api/users.json"));
    const findUser = users.findIndex((e) => e.id === +id);
    if (findUser === -1) {
      res.json({
        message: "Todo not found",
      });
    } else {
      users.splice(findUser, 1);
      fs.writeFileSync("./user-post-api/users.json", JSON.stringify(users));
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
//Bonus
router.get("/:userId/posts", (req, res) => {
  let { userId } = req.params;
  try {
    let posts = JSON.parse(fs.readFileSync("./user-post-api/posts.json"));
    let findPost = posts.find((post) => post.userId === +userId);
    if (findPost) {
      res.json(findPost);
    } else {
      res.json({
        message: "Ko tim thay Post",
      });
    }
  } catch (error) {
    res.json({
      error,
    });
  }
});
module.exports = router;
