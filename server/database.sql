CREATE DATABASE digitalDepot;

-- CREATE TABLE todo(
--     todo_id SERIAL PRIMARY KEY,
--     description VARCHAR(255)
-- );
 CREATE TABLE products (
        id SERIAL PRIMARY KEY,
        title varchar(255) NOT NULL,
        description text NOT NULL,
        price decimal(10,2) NOT NULL,
        quantity integer NOT NULL,
        category varchar(255) NOT NULL,
        image TEXT NOT NULL
      );