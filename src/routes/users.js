const { Router } = require("express");
const express = require("express");
const router = express.Router();

const User = require("../models/Users");

router.get("/users/signin", (req, res) => {
  res.render("users/signin");
});

router.get("/users/signup", (req, res) => {
  res.render("users/signup");
});

router.get("/users/add", (req, res) => {
  res.render("users/new-user");
});

router.post("/users/new-user", async (req, res) => {
  const {
    id,
    name,
    lastName,
    identification_number,
    gender,
    birthdate,
    phone_1,
    phone_2,
    address,
    city,
    department,
    email,
    user_type,
  } = req.body;
  const errors = [];
  if (!name) {
    errors.push({ text: "Escribe un nombre" });
  }
  if (!lastName) {
    errors.push({ text: "Escribe un apellido" });
  }
  if (errors.length > 0) {
    res.render("users/new-user", {
      errors,
      id,
      name,
      lastName,
      identification_number,
      gender,
      birthdate,
      phone_1,
      phone_2,
      address,
      city,
      department,
      email,
      user_type,
    });
  } else {
    const newUser = new User({
      id,
      name,
      lastName,
      identification_number,
      gender,
      birthdate,
      phone_1,
      phone_2,
      address,
      city,
      department,
      email,
      user_type,
    });
    console.log(newUser);
    await newUser.save();
    req.flash("success_msg", "Usuario Guardado con Exito");
    res.redirect("/users");
  }
});

router.get("/users", async (req, res) => {
  const users = await User.find({}).lean().sort({ created_at: "desc" });
  console.log(users);
  res.render("users/all-users", { users });
});

router.get("/users/edit/:id", async (req, res) => {
  const user = await User.findById(req.params.id).lean();
  console.log(user);
  res.render("users/edit-user", { user });
});

router.put("/users/edit-user/:id", async (req, res) => {
  const { name, lastName, identification_number } = req.body;
  await User.findByIdAndUpdate(req.params.id, {
    name,
    lastName,
    identification_number,
  });
  req.flash("success_msg", "Usuario Actualizado con Exito");
  res.redirect("/users");
});

router.delete("/users/delete/:id", async (req, res) => {
  await User.findByIdAndDelete(req.params.id);
  req.flash("success_msg", "Usuario Eliminado con Exito");
  res.redirect("/users");
});

module.exports = router;
