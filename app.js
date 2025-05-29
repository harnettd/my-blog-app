import express from "express";
import { Client } from "pg";
import { clientConfig } from "./secrets/client-config.js";

const app = express();
const port = 3000;

app.use(express.static("public"));
app.use(express.urlencoded({ extended: true }));

const client = new Client(clientConfig);
await client.connect();

const BlogPost = class {
    constructor(title, bodyCopy) {
        this.title = title;
        this.bodyCopy = bodyCopy;
        this.createdDate = new Date();
    }
}

app.get("/", async (req, res) => {
    const text = `SELECT * FROM posts;`;
    const results = await client.query(text);
    const blog = results.rows;
    res.render("index.ejs", { blog });
});

app.post("/create", async (req, res) => {
    const { title, bodyCopy } = req.body;
    const blogPost = new BlogPost(title, bodyCopy);
    const text = `
        INSERT INTO posts (title, body_copy, created_date, last_edited_date) 
            VALUES ($1, $2, $3, $3);
    `;
    const values = [blogPost.title, blogPost.bodyCopy, blogPost.createdDate];
    await client.query(text, values);
    res.redirect("/");
});

app.post("/edit", (req, res) => {
    const body = req.body;
    const data = {
        id: body.id,
        title: body.title,
        text: body.text
    };
    res.render("edit.ejs", data);
});

app.post("/update", (req, res) => {
    const body = req.body;
    blog.update(body.id, body.title, body.text);
    res.render("index.ejs", { blog: blog });
});

app.post("/delete", async (req, res) => {
    const body = req.body;
    const id = body.id;
    const text = "DELETE FROM posts WHERE id = $1;";
    const values = [id];
    await client.query(text, values);
    res.redirect("/");
})

app.listen(port, () => {
    console.log(`Server started on port ${port}`);
});
