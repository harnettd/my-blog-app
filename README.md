# My Blog App

## Overview

This is a simple blog app developed as part of a full-stack web development
bootcamp on [Udemy](https://www.udemy.com/). The backend was built with
Node.js, Express, EJS templates, and PostgreSQL The frontend was built with HTML and
Sass. The app implements all of the CRUD operations: a user can create, read, update, and delete blog posts.

### Screenshot

![A screenshot of the app](public/images/screenshot.png)

## Install

Clone the repo and then install the required packages with 

```bash
$ npm install
```

## Initialize

Before the first run of the app, create the database and table with
```bash
$ psql -U <user> -f sql/create-db.sql
$ psql -U <user> -d my_blog_app -f sql/create-table.sql
```

## Run

In the top-level directory of the project, run the app with

```bash
$ node app.js
```

Then, point the browser to `http://localhost:3000/`. From there, new blog posts can be created. Once created, blog posts can be edited or deleted.
