const response = {
    "requirementos": [
        {
            "id": "0ee21885-715a-4527-92bc-92d31d4c093d",
            "nombre": "nombre completo 6",
            "descripcion": "Escribe tu nombre completo"
        },
        {
            "id": "12a2bebe-c66a-4f4f-91ea-d6c087002103",
            "nombre": "nombre completo 17",
            "descripcion": "Escribe tu nombre completo"
        },
        {
            "id": "171f86e0-dbfa-43bc-8f8c-8104e2bf1c27",
            "nombre": "nombre completo 10",
            "descripcion": "Escribe tu nombre completo"
        },
        {
            "id": "2080f905-5097-4d1b-b276-1df101ac9e34",
            "nombre": "nombre completo 13",
            "descripcion": "Escribe tu nombre completo"
        },
        {
            "id": "295bffde-7374-4332-b460-1d314df18d99",
            "nombre": "nombre completo 3",
            "descripcion": "Escribe tu nombre completo"
        },
        {
            "id": "2a053a6f-bf71-4b34-a75d-b471480d52b8",
            "nombre": "nombre completo 16",
            "descripcion": "Escribe tu nombre completo"
        },
        {
            "id": "320d9d42-46c9-4fae-ac14-4d265d5c6102",
            "nombre": "nombre completo 101",
            "descripcion": "Escribe tu nombre completo"
        },
        {
            "id": "339e7d04-d86d-4e64-90eb-6c03163b643c",
            "nombre": "nombre completo 2",
            "descripcion": "Escribe tu nombre completo"
        },
        {
            "id": "33a36fc7-5957-4071-96d6-7d2a0d3c8a2f",
            "nombre": "nombre completo 15",
            "descripcion": "Escribe tu nombre completo"
        },
        {
            "id": "57659d91-adc4-491f-b75e-c4493ec96ec5",
            "nombre": "Nombre(s)",
            "descripcion": "Escribe tus nombres"
        }
    ],
    "total": 21
}
const crypto = require('crypto');
const waitTime = (wait) => new Promise((resolve) => setTimeout(resolve, wait));
const express = require('express');
const router = express.Router();


router.get('/', async function (req, res, next) { 
    console.log(response.requirementos.length);
    return res.status(200).json({...response});
});

router.post('/', async function (req, res, next) { 
    const { body } = req;
    await waitTime(5000);
    const { nombre, descripcion } = body;
    const newRequirement = {
        id: crypto.randomBytes(16).toString("hex"),
        nombre,
        descripcion
    }
    response.requirementos.push(newRequirement);
    console.log("Se ha creado un nuevo requerimiento", newRequirement);
    return res.status(201).json({ message: 'Requerimiento creado', requirement: newRequirement });
})

module.exports = router;