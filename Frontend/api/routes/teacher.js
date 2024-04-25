const express = require('express');
const router = express.Router();
const Profesores = require('../data/Profesores.json');

const profesoresResponse = [{
        id: "0376f5be-d608-4da8-98cd-831dg255592a",
        nombre: "Edgardo Adrian Franco",
        area: "Sistemas Computacionales",
        grado_academico: "Doctor",
        email: "eafranco154@gmail.com",
        contacto: "55123456121",
        foto_perfil: "",
        calificacion: "0.00"
},
    {
        id: "0376f5be-d608-4da8-98cd-831de255532a",
        nombre: "Marta Rosa Cordero López",
        area: "",
        grado_academico: "Maestra",
        email: "profesoraCordero@gmail.com",
        contacto: "55123456121",
        foto_perfil: "",
        calificacion: "0.00"
    },
    {
        id: "0376f5be-d608-4da8-98cd-831de255592d",
        nombre: "Jose Asunción Enriquez Zárate",
        area: "Subdirección de Servicios Educativos",
        grado_academico: "Maestro en Ciencias",
        email: "asuncionez@gmail.com",
        contacto: "57296000 Ext. 52012",
        foto_perfil: "",
        calificacion: "0.00"
    },
    {
        id: "0376f5be-d608-4da8-98cd-831ae255592d",
        nombre: "Virginia Medina Mejía",
        area: "Humanidades",
        grado_academico: "Maestra",
        email: "vmedinamejia@yahoo.com.mx",
        contacto: "55123456121",
        foto_perfil: "",
        calificacion: "0.00"
    },
    {
        id: "0376f5be-d608-4da8-28cd-831ae255592d",
        nombre: "Cortés Galicia Jorge",
        area: "Sistemas",
        grado_academico: "Maestro",
        email: "cgalicia@gmail.com",
        contacto: "55123456121",
        foto_perfil: "",
        calificacion: "0.00"
    },
    {
        id: "1376f5be-d608-4da8-28cd-831ae255592d",
        nombre: "Cortez Duarte Nidia Asunción",
        area: "Redes | Criptografía",
        grado_academico: "Maestra",
        email: "nidiaduarte_@hotmail.com",
        contacto: "55123456121",
        foto_perfil: "",
        calificacion: "0.00"
    },
    {
        id: "1376febe-d608-4da8-28cd-831ae255592d",
        nombre: "Cifuentes Álvarez Alejandro Sigfrido",
        area: "Aplicaciones Moviles | Desarrollo Web",
        grado_academico: "Maestro",
        email: "avionica1@yahoo.com.mx",
        contacto: "55123456121",
        foto_perfil: "",
        calificacion: "0.00"
    },

    ]

    const avatarOptions = {
        masculino: {
            accesoriesType: ["Blank", "Prescription01", "Prescription02", "Round"],
            clotheType: ["BlazerShirt", "BlazerSweater", "CollarSweater", "GraphicShirt"],
            eyeType: ["Default"],
            eyebrowType: ["Default"],
            mouthType: ["Default"],
            skinColor: ["Pale", "Light", "Brown"],
            topType : [
                "ShortHairDreads01",
                "ShortHairShortFlat",
                "ShortHairShortRound"
            ],
        },
        femenino: {
            topType : ["LongHairBigHair",
            "LongHairBob",
            "LongHairBun",
            "LongHairCurly",
            "LongHairCurvy",
            "LongHairNotTooLong",
            "LongHairShavedSides",
            "LongHairMiaWallace",
            "LongHairStraight",
            "LongHairStraight2",
            "LongHairStraightStrand",
            ],
            accesoriesType: ["Blank", "Prescription01", "Prescription02", "Round"],
            clotheType: ["BlazerShirt", "BlazerSweater", "CollarSweater", "GraphicShirt"],
            eyeType: ["Default"],
            eyebrowType: ["Default"],
            mouthType: ["Default"],
            skinColor: ["Pale", "Light", "Brown"],
        }
        }
        
    
    const getRandomAvatar = (sexo = ' masculino') => { 
        let avatar = {
            topType: avatarOptions[sexo].topType[Math.floor(Math.random() * avatarOptions[sexo].topType.length)],
            accesoriesType: avatarOptions[sexo].accesoriesType[Math.floor(Math.random() * avatarOptions[sexo].accesoriesType.length)],
            clotheType: avatarOptions[sexo].clotheType[Math.floor(Math.random() * avatarOptions[sexo].clotheType.length)],
            eyeType: avatarOptions[sexo].eyeType[Math.floor(Math.random() * avatarOptions[sexo].eyeType.length)],
            eyebrowType: avatarOptions[sexo].eyebrowType[Math.floor(Math.random() * avatarOptions[sexo].eyebrowType.length)],
            mouthType: avatarOptions[sexo].mouthType[Math.floor(Math.random() * avatarOptions[sexo].mouthType.length)],
            skinColor: avatarOptions[sexo].skinColor[Math.floor(Math.random() * avatarOptions[sexo].skinColor.length)]
        }
        return `https://avataaars.io/?avatarStyle=Circle&topType=${avatar.topType}&accessoriesType=${avatar.accesoriesType}&hairColor=${"BrownDark"}&facialHairType=Blank&clotheType=${avatar.clotheType}&eyeType=Default&eyebrowType=Default&mouthType=Default&skinColor=${avatar.skinColor}`
    }

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
    const { limit=100, page=1 } = req.query

    const startIndex = (page - 1) * limit;
    const endIndex = page * limit;

    const profesores = profesoresResponse.slice(startIndex, endIndex).map(profesor => { 
        return {
            ...profesor,
            foto_perfil: getRandomAvatar("masculino")
        }
    });
    
    res.status(200).json({
        data:{
            profesores: profesores,
            // profesores: profesores,
            total: profesoresResponse.length
            // total: Profesores.length
        }
    });
});
router.get('/:id',  function (req, res, next) {
    const { id } = req.params;
    // const profesor = Profesores.find(profesor => profesor.id === id);
    const profesor = profesoresResponse.find(profesor => profesor.id === id);
    profesor.foto_perfil = getRandomAvatar("masculino");

    // const profesor = profesoresResponse.find(profesor => profesor.id === id);
    if (!profesor) {
        return res.status(404).json({ message: 'No se encontro el personaje' });
    }
    res.status(200).json({ ...profesor });
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

    const profesorExists = profesoresResponse.find(profesor => profesor.nombre === nombre)
    console.log(profesorExists);
    if (profesorExists) { 
        return res.status(404).json({message: "Oops ya existe"})
    }

    console.log("ID CREADO",newProfesor.id);
    profesoresResponse.push(newProfesor);
    console.log(profesoresResponse.length);
    res.status(201).json({ message: "Creado",profesor: newProfesor });
});
router.delete('/:id', function (req, res, next) { 
    const { id } = req.params;
    console.log("Profesor eliminado", id);

    res.status(200).json({ mensaje: 'Profesor eliminado' });
});
router.put('/profile-picture/:id', function (req,res) {
    const { id } = req.params
    const { url } = req.body
    console.log("ID ACTUALIZADO",id);
    const index = profesoresResponse.findIndex(profesor => profesor.id === id)
    profesoresResponse[index].foto_perfil = url
    console.log(profesoresResponse[index]);
    return res.status(200).json({
        mensaje: "Correcto",
        profesor: profesoresResponse[index].foto_perfil
    })

})


module.exports = router;