
const express = require('express');
const router = express.Router();

function checkHeaderToken (req, res, next) {
const { authorization } = req.headers
if (authorization.includes('Bearer') && authorization.includes('tony')) {
    next();
} else {
    return res.status(403).json({ message: 'No tienes acceso' });
}
}
router.post('/coment', async function (req, res, next) { 
const { body } = req;
    const { tags } = body;
    console.log(tags);
    return res.status(200).json({ mensaje: 'El profeso me parece bastante aburrido y sus clases no tienen mucho sentido realmente', tags: tags });
});

router.post('/coment/validate', async function (req, res, next) { 
    const { body } = req;
        const { tags } = body;
        console.log(tags);
        return res.status(200).json({valid : true});
    });

module.exports = router;