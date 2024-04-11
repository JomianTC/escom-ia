const express = require('express');
const router = express.Router();
const COMMENTS = require('../data/Comments.json');
function checkHeaderToken (req, res, next) {
    const { authorization } = req.headers
    if (authorization.includes('Bearer') && authorization.includes('tony')) {
        next();
    } else {
        return res.status(403).json({ message: 'No tienes acceso' });
    }
}

router.get('/teacher/:id', function (req, res, next) {
    const { id } = req.params;
    const { page, limit = 10 } = req.query;
    const commentsByTeacher = COMMENTS.filter(comment => comment.id == id)
    // console.log(commentsByTeacher);
    const paginatedComments = commentsByTeacher.slice((page - 1) * limit, page * limit);

    res.status(200).json(
        {
            comentarios: paginatedComments,
            total: commentsByTeacher.length
        }
    );
});

router.delete('/:id', checkHeaderToken, function (req, res, next) { 
    const { id } = req.params;
    const index = COMMENTS.findIndex(comment => comment.id === id);
    if (index === -1) {
        return res.status(404).json({ message: 'No se encontro el comentario' });
    }
    COMMENTS.splice(index, 1);
    res.status(200).json({ message: 'Comentario eliminado' });
});

router.post('/', async function (req, res, next) { 
    const { body } = req;
    const { id, tags,comentario,id_profesor, id_usuario} = body;
    const newComment = {
        id,
        tags,
        comentario,
        id_profesor,
        id_usuario
    }
    COMMENTS.push(newComment);
    console.log("Se ha creado un nuevo comentario", newComment);
    res.status(201).json({ message: 'Comentario creado', comment: newComment });
});

module.exports = router;