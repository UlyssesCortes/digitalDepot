CREATE DATABASE digitaldepot;

  CREATE TABLE products (
        id SERIAL PRIMARY KEY,
        title varchar(255) NOT NULL,
        description text NOT NULL,
        price decimal(10,2) NOT NULL,
        quantity integer NOT NULL,
        category varchar(255) NOT NULL,
        image TEXT NOT NULL,
        favorite BOOLEAN NOT NULL DEFAULT false
      );

      CREATE TABLE users (
        id SERIAL PRIMARY KEY,
        "firstName" VARCHAR(255) NOT NULL,
        "lastName" VARCHAR(255) NOT NULL,
        email VARCHAR(255) UNIQUE NOT NULL,
        password VARCHAR(255) NOT NULL,
        "isAdmin" BOOLEAN DEFAULT true
      );

      CREATE TABLE orders (
        id SERIAL PRIMARY KEY,
        "userId" INTEGER REFERENCES users(id),
        "orderDate" DATE DEFAULT CURRENT_DATE,
        "isCheckedOut" BOOLEAN DEFAULT false
      );

      CREATE TABLE reviews (
        id SERIAL PRIMARY KEY,
        "productId" INTEGER REFERENCES products(id),
        "userId" INTEGER REFERENCES users(id),
        title text NOT NULL,
        description text NOT NULL,
        rating INTEGER NOT NULL
      );

      CREATE TABLE favorite (
        id SERIAL PRIMARY KEY,
        "productId" INTEGER REFERENCES products(id),
        "userId" INTEGER REFERENCES users(id)
      );

      CREATE TABLE order_items (
        id SERIAL PRIMARY KEY,
        "orderId" INTEGER REFERENCES orders(id),
        "productId" INTEGER REFERENCES products(id),
        quantity INTEGER NOT NULL
      );