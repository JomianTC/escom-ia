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

    return res
      .status(201)
      .json({
        "mensaje": "Usuario registrado con exito!",
        "usuario": {
            "nombres": "Jose Antonio",
            "apellidos": "Mora Ayala",
            "boleta": "2020630123",
            "email_academico": "jmoraa12@alumno.ipn.mx",
            "email_recuperacion": "tonyayala12@gmail.com",
            "programa_academico": "ISC-2009",
            "id": "a0df838d-559f-4fb1-8296-c3f0d7c2d81f",
            "foto_perfil": ""
        }
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
    if (req.body.boleta !== "2020630319" || req.body.contrasena !== "@200120Tm") {
      return res.status(401).json({ message: "Credenciales incorrectas" });
    }
    return res.status(200).json({
      "mensaje": "Inicio de sesión exitoso!",
      "usuario": {
          "id": "c0d56f1d-835e-45ab-bdfc-fc1b2a89c62c",
          "nombres": "qweqwe",
          "apellidos": "asdasd",
          "boleta": "1010101010",
          "email_academico": "1010101010@alumno.ipn.mx",
          "email_recuperacion": "1010101010@gmail.com",
          "programa_academico": "ISC09",
          "foto_perfil": ""
      },
      "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6IjEwMTAxMDEwMTBAYWx1bW5vLmlwbi5teCIsImlhdCI6MTcxMjc4NjE3OCwiZXhwIjoyMDcyNzgyNTc4fQ.KWQ91qRPjF2PxWXJQ6OJDf0HM2po64T1cF0lhueRYaI"
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
      "mensaje": "Inicio de sesión exitoso!",
      "admin": {
          "id": "61b0f918-d868-44a9-bfcb-65dedbb422d4",
          "nombre": "Super SU Admin",
          "email": "supersuadmin@ipn.mx",
          "area": "Servicios SU",
          "foto_perfil": ""
      },
      "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6InN1cGVyU3VBZG1pbkBpcG4ubXgiLCJpYXQiOjE3MTI3ODYxOTAsImV4cCI6MjA3Mjc4MjU5MH0.GALLeTMsFQQcLDozEC4l0P-kmB30xzx43uuzxwZbNxM"
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

  router.get('/check-auth', function (req, res, next) {
  console.log("Estoy renovando el token");
  res.status(200).json({ token: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6IjEwMTAxMDEwMTBAYWx1bW5vLmlwbi5teCIsImlhdCI6MTcxMjc4NjE3OCwiZXhwIjoyMDcyNzgyNTc4fQ.KWQ91qRPjF2PxWXJQ6OJDf0HM2po64T1cF0lhueRYaI' });
})

module.exports = router;
