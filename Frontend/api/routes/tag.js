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

const tags = [
    {
        "id": "012dc328-86bc-400c-9435-5418edbfe439",
        "nombre": "Facil de pasar"
    },
    {
        "id": "022fd61f-5680-43c5-847c-447f2670b74c",
        "nombre": "Inspiracional"
    },
    {
        "id": "02919909-0821-45b5-8bbe-7b1731cffc6d",
        "nombre": "Brinda Apoyo"
    },
    {
        "id": "1eacf5a6-dd6d-4662-84db-3563224d4a79",
        "nombre": "Preparate para leer"
    },
    {
        "id": "236f7314-cb0b-428f-8311-b6aa940394b0",
        "nombre": "Llega tarde"
    },
    {
        "id": "2e4cbfc9-153e-4c5f-816b-7b4755d48f30",
        "nombre": "Califica Duro"
    },
    {
        "id": "3e500fe4-2549-443e-95dc-1629afe2f5fc",
        "nombre": "Aspectos de calificación claros"
    },
    {
        "id": "49ef1210-ef48-46d5-951d-3309d8c14ee7",
        "nombre": "Plática mucho"
    },
    {
        "id": "6376dda1-361c-43d5-ab24-0e572fd175ba",
        "nombre": "Los trabajos son muy complicados"
    },
    {
        
        "id": "6f96dbcf-f120-4115-8cc5-f39e06c7b8d5",
        "nombre": "Es muy dificil pasar con el"
    }
]

router.put("/:id", function (req, res, next) { 
    const { body } = req;
    const { nombre, value } = body;
    const {id} = req.params
    const index = tags.findIndex(element => element.id === id)
    tags.splice(index, 1,{ id: id , nombre:nombre })
    res.status(200).json({ mensaje: "Actualizado" });
})

router.get("/", function (req, res, next) {
    res.status(200).json({ tags: tags,
    "total": 24});
})

router.post("/", function (req, res, next) { 
    const { body } = req;
    const { nombre } = body;
    const newTag = {
        id: Math.random().toString(16).slice(2),
        nombre
    }
    res.status(201).json({ mensaje: "Creado" });
})
router.delete("/:id", function (req, res, next) { 
    const { id } = req.params;
    const deletedTagIndex = tags.findIndex(tag => tag.id === id);
    tags.splice(deletedTagIndex, 1);
    res.status(200).json({ mensaje: "Tag eliminado" });
})
module.exports = router;
