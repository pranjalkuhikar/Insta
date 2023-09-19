const express = require("express");
const app = express();
const port = 8080;
const path = require("path");
const { send } = require("process");
const { v4: uuidv4 } = require("uuid");
const methodOverride = require("method-override");
const { url } = require("inspector");

// Method Override for delete and patch/put request
app.use(methodOverride("_method"));

// Post Encoded Data
app.use(express.urlencoded({ extended: true }));

// Views File Access
app.set("views engine", "ejs");
app.set("views", path.join(__dirname, "views"));

// Public File Access
app.use(express.static(path.join(__dirname, "public")));

// ARRAY OF DATA
let posts = [
  {
    id: uuidv4(),
    username: "Pranjal",
    image:
      "https://img.freepik.com/free-photo/painting-mountain-lake-with-mountain-background_188544-9126.jpg?w=2000&t=st=1694629407~exp=1694630007~hmac=18b4584754636670a997c0290ecf5881defdcc32fa7dcbb2da355fae3b4c3ca6",
    content: "I Love Coding",
  },
  {
    id: uuidv4(),
    username: "Baby",
    image:
      "https://img.freepik.com/free-photo/autumn-leaf-falling-revealing-intricate-leaf-vein-generated-by-ai_188544-9869.jpg?w=2000&t=st=1694629449~exp=1694630049~hmac=5bfbe3362a15de4a639e0058a8478d0a0c752ef57daa5988b331db85687b334d",
    content: "I Hate Coding",
  },
  {
    id: uuidv4(),
    username: "Sahil",
    image:
      "https://img.freepik.com/free-vector/palm-trees-gradient-background_1048-10552.jpg?w=1060&t=st=1694629571~exp=1694630171~hmac=c772a75cb31ab83da92dfc93a3d8b22e23378f61bdcad5ee1ef346b2a4a70bc5",
    content: "I Love and also Hate Coding",
  },
];

// Index Page / Home Page
app.get("/posts", (req, res) => {
  res.render("index.ejs", { posts });
});

// Add New Post
app.get("/posts/new", (req, res) => {
  res.render("new.ejs");
});

// Create Post is Showing
app.post("/posts", (req, res) => {
  let { username, image, content } = req.body;
  let id = uuidv4();
  posts.push({ id, username, image, content });
  res.redirect("/posts");
});

// Showing Single Page with id
app.get("/posts/:id", (req, res) => {
  let { id } = req.params;
  let post = posts.find((p) => id === p.id);
  res.render("show.ejs", { post });
});

// Patch / Update
app.patch("/posts/:id", (req, res) => {
  let { id } = req.params;
  let newContent = req.body.content;
  let post = posts.find((p) => id === p.id);
  post.content = newContent;
  res.redirect("/posts");
});

// Edit / Update
app.get("/posts/:id/edit", (req, res) => {
  let { id } = req.params;
  let post = posts.find((p) => id === p.id);
  res.render("edit.ejs", { post });
});

// Delete
app.delete("/posts/:id", (req, res) => {
  let { id } = req.params;
  posts = posts.filter((p) => id !== p.id);
  res.redirect("/posts");
});

// Port Working Status
app.listen(port, () => {
  console.log(`App is start at ${port}`);
});
