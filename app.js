import express from "express";

const app = express();
const port = 3000;

app.use(express.static("public"));
app.use(express.urlencoded({ extended: true }));

function BlogPost (id, title, text) {
    this.id = id;
    this.title = title;
    this.text = text;
    this.date = new Date();
}

const blog = {
    posts: [],
    nextId: 0,

    create: function (title, text) {
        this.posts.unshift(new BlogPost(this.nextId, title, text));
        this.nextId++;
    },

    _get_idx: function (id) {
        let idx = 0;
        while (this.posts[idx].id != id) {
            idx++;
        }
        return idx;
    },

    update: function (id, title, text) {
        const idx = this._get_idx(id);
        this.posts[idx] = new BlogPost(id, title, text);
    },

    delete: function (id) {
        const idx = this._get_idx(id);
        this.posts.splice(idx, 1);
    }
};

app.get("/", (req, res) => {
    res.render("index.ejs", { blog: blog });
});

app.post("/create", (req, res) => {
    const body = req.body;
    blog.create(body.title, body.text);
    res.render("index.ejs", { blog: blog });
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

app.post("/delete", (req, res) => {
    const body = req.body;
    blog.delete(body.id);
    res.render("index.ejs", { blog: blog });
})

app.listen(port, () => {
    console.log(`Server started on port ${port}`);
});
