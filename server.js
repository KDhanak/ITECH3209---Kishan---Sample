const express = require("express");
const app = express();
const { pool } = require("./dbConfig");

const PORT = process.env.PORT || 4000;

app.use(express.urlencoded({ extended: true }));
app.set("view engine", "ejs");

app.get("/", (req, res) => {
    res.render("index.ejs");
});

app.get("/users/register", (req, res) => {
    res.render("register.ejs");
});

app.get("/users/login", (req, res) => {
    res.render("login.ejs");
});

app.get("/users/dashboard", (req, res) => {
    res.render("dashboard.ejs", { user: "Kishan" });
});

app.post('/users/register', (req, res) => {
    let { name, email, password, password2 } = req.body;

    let errors = [];

    console.log({
        name,
        email,
        password,
        password2
    });


    if (!name || !email || !password || !password2) {
        errors.push({ message: "Please enter all the details." })
    }

    if (password.length < 6) {
        errors.push({ message: "Password should be at least 6 characters." });
    }

    if (password != password2) {
        errors.push({ message: "Passwords do not match." });
    }

    if (errors.length > 0) {
        res.render('register', { errors });
    }
});

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});