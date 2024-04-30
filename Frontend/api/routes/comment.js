const avatarOptions = {
    topType : ["LongHairBigHair",
    "LongHairBob",
    "LongHairBun",
    "LongHairCurly",
    "LongHairCurvy",
    "LongHairDreads",
    "LongHairFrida",
    "LongHairFro",
    "LongHairFroBand",
    "LongHairNotTooLong",
    "LongHairShavedSides",
    "LongHairMiaWallace",
    "LongHairStraight",
    "LongHairStraight2",
    "LongHairStraightStrand",
    "ShortHairDreads01",
    "ShortHairDreads02",
    ],
    accesoriesType: ["Blank", "Prescription01", "Prescription02", "Round"],
    clotheType: ["BlazerShirt", "BlazerSweater", "CollarSweater", "GraphicShirt"],
    eyeType: ["Default"],
    eyebrowType: ["Default"],
    mouthType: ["Default"],
    skinColor: ["Pale", "Light", "Brown"],
    
}

const getRandomAvatar = () => { 
    let avatar = {
        topType: avatarOptions.topType[Math.floor(Math.random() * avatarOptions.topType.length)],
        accesoriesType: avatarOptions.accesoriesType[Math.floor(Math.random() * avatarOptions.accesoriesType.length)],
        clotheType: avatarOptions.clotheType[Math.floor(Math.random() * avatarOptions.clotheType.length)],
        eyeType: avatarOptions.eyeType[Math.floor(Math.random() * avatarOptions.eyeType.length)],
        eyebrowType: avatarOptions.eyebrowType[Math.floor(Math.random() * avatarOptions.eyebrowType.length)],
        mouthType: avatarOptions.mouthType[Math.floor(Math.random() * avatarOptions.mouthType.length)],
        skinColor: avatarOptions.skinColor[Math.floor(Math.random() * avatarOptions.skinColor.length)]
    }
    return `https://avataaars.io/?avatarStyle=Circle&topType=${avatar.topType}&accessoriesType=${avatar.accesoriesType}&hairColor=${"BrownDark"}&facialHairType=Blank&clotheType=${avatar.clotheType}&eyeType=Default&eyebrowType=Default&mouthType=Default&skinColor=${avatar.skinColor}`
}

const commentsRepsonse = [
        {
            "comentario": {
                "puntuacion": 3,
                "comentario": "Comentario para el profesor SuperSu",
                "fecha": "2024-03-14"
            },
            "usuario": {
                "nombres": "Jose Antonio",
                "apellidos": "Mora Ayala",
                "foto_perfil": ""
            },
            "tags": [
                "Sin tags"
            ]
        },
        {
            "comentario": {
                "puntuacion": 3,
                "comentario": "Comentario para el profesor SuperSu",
                "fecha": "2024-03-14"
            },
            "usuario": {
                "nombres": "qweqwe",
                "apellidos": "asdasd",
                "foto_perfil": ""
            },
            "tags": [
                "Sin tags"
            ]
        },
        {
            "comentario": {
                "puntuacion": 3,
                "comentario": "Comentario para el profesor SuperSu",
                "fecha": "2024-03-14"
            },
            "usuario": {
                "nombres": "Jose Antonio",
                "apellidos": "Mora Ayala",
                "foto_perfil": ""
            },
            "tags": [
                "Sin tags"
            ]
        },
        {
            "comentario": {
                "puntuacion": 5,
                "comentario": "Hola mundo desde este comentario",
                "fecha": "2024-03-08"
            },
            "usuario": {
                "nombres": "Josehf Miguel Angel",
                "apellidos": "Torres Carrillo",
                "foto_perfil": ""
            },
            "tags": [
                "Sin tags"
            ]
        },
        {
            "comentario": {
                "puntuacion": 3,
                "comentario": "Comentario para el profesor SuperSu",
                "fecha": "2024-03-08"
            },
            "usuario": {
                "nombres": "Jose Antonio",
                "apellidos": "Mora Ayala",
                "foto_perfil": ""
            },
            "tags": [
                "Sin tags"
            ]
        },
        {
            "comentario": {
                "puntuacion": 3,
                "comentario": "Comentario para el profesor SuperSu",
                "fecha": "2024-03-08"
            },
            "usuario": {
                "nombres": "Jose Antonio",
                "apellidos": "Mora Ayala",
                "foto_perfil": ""
            },
            "tags": [
                "muy cómico",
                "mucha tarea",
                "pocos exámenes",
                "tomaría su clase otra vez "
            ]
        },
        {
            "comentario": {
                "puntuacion": 3,
                "comentario": "Comentario para el profesor SuperSu",
                "fecha": "2024-03-08"
            },
            "usuario": {
                "nombres": "Jose Antonio",
                "apellidos": "Mora Ayala",
                "foto_perfil": ""
            },
            "tags": [
                "muy cómico",
                "mucha tarea",
                "tomaría su clase otra vez ",
                "pocos exámenes"
            ]
        },
        {
            "comentario": {
                "puntuacion": 3,
                "comentario": "Comentario para el profesor SuperSu",
                "fecha": "2024-03-08"
            },
            "usuario": {
                "nombres": "Jose Antonio",
                "apellidos": "Mora Ayala",
                "foto_perfil": ""
            },
            "tags": [
                "mucha tarea",
                "muy cómico",
                "tomaría su clase otra vez ",
                "pocos exámenes"
            ]
        },
        {
            "comentario": {
                "puntuacion": 3,
                "comentario": "Comentario para el profesor SuperSu",
                "fecha": "2024-03-14"
            },
            "usuario": {
                "nombres": "qweqwe",
                "apellidos": "asdasd",
                "foto_perfil": ""
            },
            "tags": [
                "Sin tags"
            ]
        },
        {
            "comentario": {
                "puntuacion": 3,
                "comentario": "Comentario para el profesor SuperSu",
                "fecha": "2024-03-08"
            },
            "usuario": {
                "nombres": "Jose Antonio",
                "apellidos": "Mora Ayala",
                "foto_perfil": ""
            },
            "tags": [
                "mucha tarea",
                "tomaría su clase otra vez ",
                "muy cómico",
                "pocos exámenes"
            ]
        }
]

const COMMENTS = [
    {
        "id" : "0376f5be-d608-4da8-98cd-831dg255592a",
        "comentario" : {
            "puntuacion": 5,
            "comentario": "El profesor me parece que enseña super bien, sus clases son muy amenas y siempre está dispuesto a ayudar",
            "fecha": "2020-10-10"
        },
        "usuario":{
            "nombres": "Tony",
            "apellidos": "Mora",
            "foto_perfil": ""
        },
        "tags" : [ "Excelente", "Recomendable", "Enseña muy bien", "Paciente", "Ameno", "Explicativo" ]
    },
    {
        "id" : "0376f5be-d608-4da8-98cd-831dg255592a",
        "comentario" : {
            "puntuacion": 5,
            "comentario": "El profesor demuestra un profundo conocimiento del tema y lo transmite de manera efectiva. Sus clases son dinámicas y participativas, lo que fomenta un ambiente de aprendizaje estimulante. Además, siempre está dispuesto a ofrecer ayuda adicional fuera del horario de clases.",
            "fecha": "2020-10-10"
        },
        "usuario":{
            "nombres": "Miguel",
            "apellidos": "Torres",
            "foto_perfil": ""
        },
        "tags" : [ "Excelente", "Recomendable", "Enseña muy bien", "Conocimiento","Enseñanza" ]
    },
    {
        "id" : "0376f5be-d608-4da8-98cd-831dg255592a",
        "comentario" : {
            "puntuacion": 2,
            "comentario": "Me encanta la pasión y dedicación que el profesor muestra en cada clase. Se nota que realmente disfruta enseñar y se esfuerza por motivar a sus estudiantes. Sus explicaciones son claras y bien estructuradas, lo que facilita la comprensión de conceptos complejos",
            "fecha": "2020-10-10"
        },
        "usuario":{
            "nombres": "Rodrigo",
            "apellidos": "Cacuinde",
            "foto_perfil": ""
        },
        "tags" : [ "Excelente", "Recomendable", "Enseña muy bien" ]
    },
    {
        "id" : "0376f5be-d608-4da8-98cd-831de255532a",
        "comentario" : {
            "puntuacion": 5,
            "comentario": "Valoramos mucho la capacidad del profesor para crear un ambiente inclusivo y respetuoso en el aula. Siempre se preocupa por escuchar las opiniones y perspectivas de todos los estudiantes, lo que hace que nos sintamos valorados y escuchados. Además, promueve la colaboración y el trabajo en equipo, lo que enriquece nuestra experiencia de aprendizaje. ",
            "fecha": "2020-10-10"
        },
        "usuario":{
            "nombres": "Ana",
            "apellidos": "Juarez",
            "foto_perfil": ""
        },
        "tags" : ["Ambiente inclusivo","respeto","escucha activa","Colaboración"]
    },
    {
        "id" : "0376f5be-d608-4da8-98cd-831de255532a",
        "comentario" : {
            "puntuacion": 5,
            "comentario": "Valoramos mucho la capacidad del profesor para crear un ambiente inclusivo y respetuoso en el aula. Siempre se preocupa por escuchar las opiniones y perspectivas de todos los estudiantes, lo que hace que nos sintamos valorados y escuchados. Además, promueve la colaboración y el trabajo en equipo, lo que enriquece nuestra experiencia de aprendizaje.",
            "fecha": "2020-10-10"
        },
        "usuario":{
            "nombres": "Maria",
            "apellidos": "Perez",
            "foto_perfil": ""
        },
        "tags": ["ambiente inclusivo", "respeto", "escucha activa", "colaboración", "trabajo en equipo"]
    },
    {
        "id" : "0376f5be-d608-4da8-98cd-831de255532a",
        "comentario" : {
            "puntuacion": 4,
            "comentario": "El profesor utiliza una variedad de recursos didácticos y tecnologías innovadoras para enriquecer nuestras clases. Esto nos permite aprender de manera más interactiva y participativa, y nos prepara para enfrentar los desafíos del mundo real. Además, siempre está abierto a recibir retroalimentación y sugerencias para mejorar su metodología de enseñanza.",
            "fecha": "2020-10-10"
        },
        "usuario":{
            "nombres": "America",
            "apellidos": "Hernandez",
            "foto_perfil": ""
        },
        "tags": ["recursos didácticos", "tecnologías innovadoras", "aprendizaje interactivo", "retroalimentación", "mejora continua"]
    },
    {
        "id" : "0376f5be-d608-4da8-98cd-831de255532a",
        "comentario" : {
            "puntuacion": 5,
            "comentario": "Aprecio enormemente el compromiso del profesor con nuestro éxito académico y profesional. Se nota que se preocupa por nuestro progreso individual y está siempre dispuesto a ofrecer orientación y apoyo personalizado. Además, nos inspira a ser mejores estudiantes y personas, y nos motiva a alcanzar nuestros objetivos.",
            "fecha": "2020-10-10"
        },
        "usuario":{
            "nombres": "Andrea",
            "apellidos": "López",
            "foto_perfil": ""
        },
        "tags": ["compromiso", "éxito académico", "apoyo personalizado", "orientación", "motivación"]
    },
    {
        "id" : "0376f5be-d608-4da8-98cd-831dg255592a",
        "comentario" : {
            "puntuacion": 4,
            "comentario": "Muy buen Enseña muy bien, muy recomendable",
            "fecha": "2020-10-10"
        },
        "usuario":{
            "nombres": "Viridiana",
            "apellidos": "Herrera",
            "foto_perfil": ""
        },
        "tags" : [ "Excelente", "Recomendable", "Enseña muy bien" ]
    },
    {
        "id" : "0376f5be-d608-4da8-98cd-831dg255592a",
        "comentario" : {
            "puntuacion": 2,
            "comentario": "Desafortunadamente, las clases del profesor suelen ser poco estructuradas y caóticas. A menudo se desvía del plan de estudios y se centra en temas irrelevantes, lo que dificulta nuestra comprensión del material.",
            "fecha": "2020-10-10"
        },
        "usuario":{
            "nombres": "Iran",
            "apellidos": "Mendoza",
            "foto_perfil": ""
        },
        "tags": ["falta de estructura", "caótico", "desviación del plan de estudios", "poco claro", "desorientado"]
    },
    {
        "id" : "0376f5be-d608-4da8-98cd-831dg255592a",
        "comentario" : {
            "puntuacion": 2,
            "comentario": "No estoy satisfecho con la falta de disponibilidad del profesor fuera del horario de clases. A menudo es difícil comunicarse con él y obtener respuestas a nuestras preguntas, lo que nos deja sin apoyo adicional cuando más lo necesitamos.",
            "fecha": "2020-10-10"
        },
        "usuario":{
            "nombres": "Imanol",
            "apellidos": "Rojas",
            "foto_perfil": ""
        },
        "tags": ["falta de disponibilidad", "dificultad de comunicación", "falta de compromiso", "indiferencia", "falta de apoyo"]
    },
    {
        "id" : "0376f5be-d608-4da8-98cd-831dg255592a",
        "comentario" : {
            "puntuacion": 2,
            "comentario": "Las evaluaciones del profesor suelen ser injustas y poco claras. A menudo no explica los criterios de evaluación de manera adecuada, lo que nos deja desconcertados sobre lo que se espera de nosotros.",
            "fecha": "2020-10-10"
        },
        "usuario":{
            "nombres": "Sebastian",
            "apellidos": "Aguirre",
            "foto_perfil": ""
        },
        "tags": ["evaluaciones injustas", "criterios poco claros", "desconcierto", "prejuicios", "afectación del rendimiento"]
    },
    {
        "id" : "0376f5be-d608-4da8-98cd-831dg255592a",
        "comentario" : {
            "puntuacion": 2,
            "comentario": "Me preocupa la falta de actualización del profesor en cuanto a las últimas tendencias y avances en su campo. A menudo utiliza métodos y materiales obsoletos en sus clases, lo que no nos prepara adecuadamente para el mundo laboral actual.",
            "fecha": "2020-10-10"
        },
        "usuario":{
            "nombres": "Jesus",
            "apellidos": "Rodriguez",
            "foto_perfil": ""
        },
        "tags": ["falta de actualización", "obsoleto", "resistencia al cambio", "falta de adaptabilidad", "falta de profesionalismo"]
    },
    {
        "id" : "0376f5be-d608-4da8-98cd-831dg255592a",
        "comentario" : {
            "puntuacion": 1,
            "comentario": "El profesor muestra una actitud negativa y desmotivadora en clase, lo que afecta nuestro interés y participación. A menudo se muestra impaciente y poco receptivo a nuestras preguntas y comentarios, lo que crea un ambiente tenso y poco acogedor.",
            "fecha": "2020-10-10"
        },
        "usuario":{
            "nombres": "Angelica",
            "apellidos": "Perez",
            "foto_perfil": ""
        },
        "tags": ["actitud negativa", "desmotivación", "impaciencia", "poco receptivo", "ambiente tenso"]
    },

]

const express = require('express');
const router = express.Router();
// const COMMENTS = require('../data/Comments.json');
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
    const { page = 1, limit = 10 } = req.query;
    const commentsByTeacher = COMMENTS.filter(comment => comment.id == id)
    // const commentsByTeacher = commentsRepsonse.filter(comment => comment.id == id)
    // console.log(commentsByTeacher);
    const paginatedComments = commentsByTeacher.slice((page - 1) * limit, page * limit).map(comment => { 
        return {
            ...comment,
            usuario: {
                ...comment.usuario,
                foto_perfil: getRandomAvatar()
            }
        }
    
    });

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
    const { id, tags,comentario,id_profesor, id_usuario,puntuacion} = body;
    const newComment = {
        id : id_profesor,
        comentario: {
            puntuacion: puntuacion,
            comentario: comentario,
            fecha: new Date().toISOString()
        },
        usuario: {
            nombres: "Tony",
            apellidos: "Mora",
            foto_perfil: ""
        },
        tags : tags
    }
    COMMENTS.unshift(newComment);
    res.status(201).json({ message: 'Comentario creado', comment: newComment });
});

module.exports = router;