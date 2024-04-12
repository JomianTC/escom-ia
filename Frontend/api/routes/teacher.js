const express = require('express');
const router = express.Router();
const Profesores = require('../data/Profesores.json');
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
            profesores: Profesores.slice(startIndex, endIndex),
            total: Profesores.length
        }
    });
});
router.get('/:id', checkHeaderToken, function (req, res, next) {
    const { id } = req.params;
    const game = Profesores.find(profesor => profesor.id === id);
    if (!game) {
        return res.status(404).json({ message: 'No se encontro el personaje' });
    }
    res.status(200).json({ ...game });
})

router.post('/', async function (req, res, next) {
    // Simulación tiempo de respuesta
    // await new Promise((r) => setTimeout(r, 6000))
    const { body } = req;
    console.log(body);
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
    const profesor = Profesores.find(profesor => profesor.id === id);
    console.log(profesor);
    if (!profesor) {
        return res.status(404).json({ message: 'No se encontro el profesor' });
    }
    res.status(200).json({ message: 'Profesor eliminado' });
});


module.exports = router;