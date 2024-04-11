const express = require('express');
const router = express.Router();

/* GET users listing. */
// Este se vuelve el home del contexto principal de cual venimos, el cual se trata de / users
// Este archivo se encuentra en app.js
// app.use("/users", usersRouter);
// router.post("/", function (req, res, next) {
//   console.log("GDFOJGFD");
//   const { id } = req.query;
//   if (id.length > 8) {
//     return res.status(200).json({
//       name: "tony",
//       id: 10,
//       rol: "ADMIN",
//     });
//   }
//   return res.status(403).json({ title: "Forbidden" });
// })

router.get("/", function (req, res, next) {
    res.status(200).json({ title: "Bienvenido" });
})
// Aqui ya estaríamos creando una ruta para el usuario que quiere registrarse por ejemplo
router.post("/register", function (req, res, next) {
    console.log(req.body);
    const data = {
        token: "lfkgjldfjglkdfjglkdfjglkjdflkgjlkdfj",
        nombres: "Tony",
        boleta: "2020630319",
        foto_perfil: "No hay",
        apellidos: "Mora",
        contrasena: "@200120Tm",
        email_academico: "antonioayalam2001@gmail.com",
        email_recuperacion: "antonioayalam2001@gmail.com",
        programa_academico: "ISC-2009",
    }
    return res
        .status(200)
        .json({
            message: "Exito",
            user: data
        });
})
router.post("/login", function (req, res, next) {
    console.log(req.body);
    const data = {
        nombres: "Tony",
        boleta: "2020630319",
        foto_perfil: "",
        apellidos: "Mora",
        contrasena: "@200120Tm",
        email_academico: "antonioayalam2001@gmail.com",
        email_recuperacion: "antonioayalam2001@gmail.com",
        programa_academico: "ISC-2009",
    }
    return res.status(200).json({
        message: "Logeado",
        user: data,
        token: "tony",
    });
})
router.post("/login/admin", function (req, res, next) {

    const data = {
        identificador: "Tunas",
        nombre: "Tunas",
        email: "Tunas",
        area: "Tunas",
    }
    return res.status(200).json({
        message: "Admin",
        user: data,
        token: "tony",
    });
})

router.post("/register/admin", function (req, res, next) {

    const data = {
        identificador: "Tunas",
        nombre: "Tunas",
        email: "Tunas",
        area: "Tunas",
    }
    return res.status(200).json({
        message: "Admin registrado",
        user: data,
    });
})

router.get("/token", function (req, res, next) {
    return res.status(200).json({ title: "Token" });
})

router.get('/renew', function (req, res, next) {
    console.log("Estoy renovando el token");
    res.status(200).json({ token: 'tony' });
})

module.exports = router;
