DROP TABLE IF EXISTS posts;
CREATE TABLE posts (
    id SERIAL PRIMARY KEY,
    title text,
    body_copy text,
    created_date timestamp NOT NULL,
    last_edited_date timestamp NOT NULL
);