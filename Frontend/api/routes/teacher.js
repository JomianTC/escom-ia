const express = require('express');
const router = express.Router();
const Profesores = require('../data/Profesores.json');

const profesoresResponse = [{
        id: "0376f5be-d608-4da8-98cd-831de255592a",
        nombre: "Edgardo Adrian Franco",
        area: "Sistemas computacionales",
        grado_academico: "Doctor",
        email: "eafranco154@gmail.com",
        contacto: "55123456121",
        foto_perfil: "",
        calificacion: "0.00"
    },
    {
        "id": "0ef22883-ea84-416b-9cda-28a0385c0ade",
        "nombre": "Edgardo Adrian Franco",
        "area": "Sistemas computacionales",
        "grado_academico": "Doctor",
        "email": "eafranco299@gmail.com",
        "contacto": "55123456721",
        "foto_perfil": "",
        "calificacion": "0.00"
    },
    {
        "id": "2208978d-053f-4954-aaff-ec8a844b7386",
        "nombre": "Edgardo Adrian Franco",
        "area": "Sistemas computacionales",
        "grado_academico": "Doctor",
        "email": "eafranco14@gmail.com",
        "contacto": "55123456714",
        "foto_perfil": "",
        "calificacion": "0.00"
    },
    {
        "id": "2b87286c-03f8-482f-a5ed-433d6977a16b",
        "nombre": "Super Su Fake",
        "area": "Sistemas computacionales",
        "grado_academico": "Doctor",
        "email": "nosupersu@gmail.com",
        "contacto": "6666666666",
        "foto_perfil": "",
        "calificacion": "3.48"
    },
    {
        "id": "319c263e-2f03-412e-a554-08c01788fe7b",
        "nombre": "Edgardo Adrian Franco",
        "area": "Sistemas computacionales",
        "grado_academico": "Doctor",
        "email": "eafranco10@gmail.com",
        "contacto": "55123456710",
        "foto_perfil": "",
        "calificacion": "0.00"
    },
    {
        "id": "3f950fef-8844-4f7f-b00e-4dd7d57db30f",
        "nombre": "Edgardo Adrian Franco",
        "area": "Sistemas computacionales",
        "grado_academico": "Doctor",
        "email": "eafranco11@gmail.com",
        "contacto": "55123456711",
        "foto_perfil": "",
        "calificacion": "0.00"
    },
    {
        "id": "42572ad8-5cc7-4646-a9fc-7feb8ea27074",
        "nombre": "Edgardo Adrian Franco",
        "area": "Sistemas computacionales",
        "grado_academico": "Doctor",
        "email": "eafranco6@gmail.com",
        "contacto": "55123456786",
        "foto_perfil": "",
        "calificacion": "0.00"
    },
    {
        "id": "46c45fbb-eca5-4be1-8353-58a134b934b4",
        "nombre": "Edgardo Adrian Franco",
        "area": "Sistemas computacionales",
        "grado_academico": "Doctor",
        "email": "eafranco12@gmail.com",
        "contacto": "55123456712",
        "foto_perfil": "",
        "calificacion": "0.00"
    },
    {
        "id": "470cc89f-82df-42cc-bf68-a4f3f794667d",
        "nombre": "Edgardo Adrian Franco",
        "area": "Sistemas computacionales",
        "grado_academico": "Doctor",
        "email": "eafranco3@gmail.com",
        "contacto": "55123456783",
        "foto_perfil": "",
        "calificacion": "0.00"
    },
    {
        "id": "5defcbc1-ee5b-4b47-b838-d1c4b3787c09",
        "nombre": "Edgardo Adrian Franco",
        "area": "Sistemas computacionales",
        "grado_academico": "Doctor",
        "email": "eafranco2@gmail.com",
        "contacto": "55123456782",
        "foto_perfil": "",
        "calificacion": "0.00"
    }
    ]


function checkHeaderToken (req, res, next) {
    const { authorization } = req.headers
    if (authorization.includes('Bearer') && ( authorization.includes("eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6IjEwMTAxMDEwMTBAYWx1bW5vLmlwbi5teCIsImlhdCI6MTcxMjc4NjE3OCwiZXhwIjoyMDcyNzgyNTc4fQ.KWQ91qRPjF2PxWXJQ6OJDf0HM2po64T1cF0lhueRYaI")
    )) {
        console.log("Autorizazado");
        next();
    } else {
        console.log("No autorizado");
        return res.status(403).json({ message: 'No tienes acceso' });
    }
}

router.get('/renew', function (req, res, next) {
    console.log("Estoy renovando el token");
    res.status(200).json({ token: 'tony' });
})

router.get('/', function (req, res, next) {
    const { limit=10, page=1 } = req.query

    const startIndex = (page - 1) * limit;
    const endIndex = page * limit;
    
    res.status(200).json({
        data:{
            // profesores: profesoresResponse.slice(startIndex, endIndex),
            profesores: Profesores.slice(startIndex, endIndex),
            // total: profesoresResponse.length
            total: Profesores.length
        }
    });
});
router.get('/:id', checkHeaderToken, function (req, res, next) {
    const { id } = req.params;
    const game = Profesores.find(profesor => profesor.id === id);
    // const game = profesoresResponse.find(profesor => profesor.id === id);
    if (!game) {
        return res.status(404).json({ message: 'No se encontro el personaje' });
    }
    res.status(200).json({ ...game });
})

router.post('/', async function (req, res, next) {
    // Simulación tiempo de respuesta
    // await new Promise((r) => setTimeout(r, 6000))
    const { body } = req;
    const { nombre, area, grado_academico, email, contacto, foto_perfil } = body;
    const newProfesor = {
        id: Math.random().toString(16).slice(2),
        nombre,
        area,
        grado_academico,
        email,
        contacto,
        foto_perfil
    }
    // Profesores.push(newProfesor);
    console.log("Se ha creado un nuevo profesor", newProfesor);
    res.status(201).json({ message: "Creado",profesor: newProfesor });
});
router.delete('/:id', function (req, res, next) { 
    const { id } = req.params;
    console.log("Profesor eliminado", id);

    res.status(200).json({ mensaje: 'Profesor eliminado' });
});


module.exports = router;