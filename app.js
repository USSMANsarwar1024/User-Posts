const express = require("express");
const app = express();

const userModel = require("./models/user");
const postModel = require("./models/post");
const cookieParser = require("cookie-parser");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const post = require("./models/post");

require("dotenv").config();

app.set("view engine", "ejs");
app.use(express.static("public"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

app.get("/", (req, res) => {
  res.render("index");
});

app.post("/register", async (req, res) => {
  try {
    const { name, username, password, email, age } = req.body;
    const existingUser = await userModel.findOne({ email });

    if (existingUser) return res.status(400).send("User already exists");

    const hash = await bcrypt.hash(password, 10);
    const newUser = await userModel.create({
      name,
      username,
      password: hash,
      email,
      age,
    });

    const token = jwt.sign(
      { email, userId: newUser._id },
      process.env.JWT_SECRET || process.env.JWT_SECRET
    );
    res.cookie("token", token, { httpOnly: true });
    res.status(201).send("Registered");
  } catch (err) {
    console.error(err);
    res.status(500).send("Server Error");
  }
});

app.get("/login", (req, res) => {
  res.render("login");
});

app.post("/login", async (req, res) => {
  let { email, password } = req.body;
  let user = await userModel.findOne({ email });

  if (!user) {
    res.send("Something went wrong!");
  }

  bcrypt.compare(password, user.password, (err, result) => {
    if (err) return res.send("Error comparing passwords");
    if (!result) return res.send("Invalid credentials");

    let token = jwt.sign(
      { email: email, userId: user._id },
      process.env.JWT_SECRET
    );
    // console.log(token);
    res.cookie("token", token);
    res.redirect("/profile");
  });
});

app.get("/profile", isLoggedIn, async (req, res) => {
  let user = await userModel
    .findOne({ email: req.user.email })
    .populate("post");

  // user.populate("posts"); -> it did not work!
  res.render("profile", { user });
});

app.post("/post", isLoggedIn, async (req, res) => {
  let user = await userModel.findOne({ email: req.user.email });

  let { content } = req.body;

  let post = await postModel.create({
    user: user._id,
    content,
  });

  user.post.push(post._id);
  await user.save();
  res.redirect("/profile");
});

function isLoggedIn(req, res, next) {
  const token = req.cookies.token;
  if (!token) return res.redirect("/login");

  try {
    const data = jwt.verify(token, process.env.JWT_SECRET);
    req.user = data;
    next();
  } catch (err) {
    console.log(err);
    res.clearCookie("token");
    res.redirect("/login");
  }
}

app.get("/logout", (req, res) => {
  res.cookie("token", "");
  res.redirect("/login");
});

app.get("/like/:id", isLoggedIn, async (req, res) => {
  let post = await postModel.findOne({ _id: req.params.id }).populate("user");

  if (post.likes.indexOf(req.user.userId) === -1) {
    post.likes.push(req.user.userId);
  } else {
    post.likes.splice(post.likes.indexOf(req.user.userId), 1);
  }

  await post.save();
  res.redirect("/profile");
});

app.get("/update/:id", isLoggedIn, async (req, res) => {
  let post = await postModel.findOne({ _id: req.params.id }).populate("user");

  res.render("update", { post });
});

app.post("/update/:id", isLoggedIn, async (req, res) => {
  let post = await postModel.findOneAndUpdate(
    { _id: req.params.id },
    { content: req.body.content }
  );

  res.redirect("/profile");
});

app.get("/forget", (req, res) => {
  res.send("Please contact us at: +92-3081036864 <b> WhatsApp Only!");
});

app.listen(3000);
