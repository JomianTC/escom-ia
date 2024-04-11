const express = require("express");
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
    res.status(200).json({ tags: [
        {
            "id": "012dc328-86bc-400c-9435-5418edbfe439",
            "nombre": "barco"
        },
        {
            "id": "022fd61f-5680-43c5-847c-447f2670b74c",
            "nombre": "inspiracional"
        },
        {
            "id": "02919909-0821-45b5-8bbe-7b1731cffc6d",
            "nombre": "brinda apoyo"
        },
        {
            "id": "1eacf5a6-dd6d-4662-84db-3563224d4a79",
            "nombre": "muchos proyectos grupales"
        },
        {
            "id": "236f7314-cb0b-428f-8311-b6aa940394b0",
            "nombre": "muy cómico"
        },
        {
            "id": "2e4cbfc9-153e-4c5f-816b-7b4755d48f30",
            "nombre": "califica duro"
        },
        {
            "id": "3e500fe4-2549-443e-95dc-1629afe2f5fc",
            "nombre": "aspectos de calificación claros"
        },
        {
            "id": "49ef1210-ef48-46d5-951d-3309d8c14ee7",
            "nombre": "respetado por los estudiantes"
        },
        {
            "id": "6376dda1-361c-43d5-ab24-0e572fd175ba",
            "nombre": "prepárate para leer"
        },
        {
            "id": "6f96dbcf-f120-4115-8cc5-f39e06c7b8d5",
            "nombre": "deja trabajos largos"
        }
    ],
    "total": 24});
})

router.post("/", function (req, res, next) { 
    const { body } = req;
    const { nombre } = body;
    const newTag = {
        id: Math.random().toString(16).slice(2),
        nombre
    }
    console.log("Se ha creado un nuevo tag", newTag);
    res.status(201).json({ message: "Creado" });
})
module.exports = router;
