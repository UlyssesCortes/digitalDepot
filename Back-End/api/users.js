const express = require("express");
const apiRouter = express.Router();
const bcrypt = require("bcrypt");
const { requireUser } = require("./utils");
const JWT_SECRET = process.env.JWT_SECRET;
const jwt = require("jsonwebtoken");

const {
    getUserByEmail,
    createUser,
    getAllUsers,
    getUserById
} = require('../db');

apiRouter.post("/register", async (req, res, next) => {
    const { firstName, lastName, email, password, isAdmin } = req.body;
    try {
        const _user = await getUserByEmail(email);
        if (_user) {
            next({
                message: "UserTakenError"
            });
        }

        if (password.length < 8) {
            next({
                message: "PasswordTooShortError"
            });
        }

        const user = await createUser({
            firstName,
            lastName,
            email,
            password,
            isAdmin,
        });


        const token = jwt.sign(
            {
                id: user.id,
                email,
            },
            JWT_SECRET,
            {
                expiresIn: "1w",
            }
        );

        res.send({
            user,
            message: "thank you for signing up",
            token,
        });
    } catch (error) {
        next({
            message: "There was an error while registering please try again!",
        });
    }
});

// POST /api/users/login
apiRouter.post("/login", async (req, res, next) => {
    const { email, password } = req.body;

    if (!email || !password) {
        next({
            message: "Please supply both a username and password",
        });
    }
    try {
        const user = await getUserByEmail(email);
        const isValid = await bcrypt.compare(password, user.password);
        if (isValid) {
            const token = jwt.sign(
                {
                    id: user.id,
                    email,
                },
                JWT_SECRET,
                {
                    expiresIn: "1w",
                }
            );

            res.send({
                user,
                message: "you're logged in!",
                token,
            });
        } else {
            next({
                name: "IncorrectCredentialsError",
                message: "Username or password is incorrect",
            });
        }
    } catch (error) {
        next(error);
    }
});

apiRouter.get("/", async (req, res, next) => {
    try {
        const users = await getAllUsers();
        res.send(users);
    } catch (error) {
        next(error);
    }
});

// GET /api/users/me
apiRouter.get("/me", requireUser, async (req, res, next) => {
    const user = await getUserById(req.user.id);
    try {
        res.send({
            user: req.user,
        });
    } catch (error) {
        next(error);
    }
});

module.exports = apiRouter;
