
const express = require('express');
const router = express.Router();
const randomFacts = ["Origen del nombre: El título original de Resident Evil en Japón es Biohazard. Sin embargo, en los Estados Unidos se cambió a Resident Evil debido a problemas de derechos de autor con una banda musical que ya tenía ese nombre."
,
    "Inspiración cinematográfica: El juego original de Resident Evil (1996) se inspiró en películas de terror como Noche de los muertos vivientes de George A. Romero y The Evil Dead de Sam Raimi."
    , "Prototipo de personajes: Los personajes principales, Chris Redfield y Jill Valentine, fueron creados originalmente como prototipos basados en actores de películas de acción. Chris estaba modelado según el actor Leonardo DiCaprio, mientras que Jill se inspiró en la actriz Jill Schoelen."
    , "Zombies más lentos: En los primeros juegos de Resident Evil, los zombies se mueven lentamente debido a limitaciones técnicas. Sin embargo, este estilo se convirtió en una característica distintiva de la serie."
    , "Influencia del cine japonés: La estética y el estilo de los primeros juegos de Resident Evil se inspiraron en el cine japonés de terror, especialmente en las películas de J-horror como Ringu y Ju - on."
    , "Resident Evil 4 reinventó la serie: Resident Evil 4 introdujo un nuevo estilo de juego de acción y aventura, abandonando el enfoque de supervivencia de los juegos anteriores. Este cambio revitalizó la franquicia y la llevó a un nuevo nivel de éxito."
    , "Influencia de Resident Evil en otros medios: La serie de juegos Resident Evil ha inspirado numerosas películas, cómics, novelas y adaptaciones a otros medios. La franquicia ha generado más de 25 juegos y ha vendido más de 110 millones de copias en todo el mundo."
    , "Cameos en otros juegos: Los personajes de Resident Evil han hecho cameos en otros juegos populares, como Super Smash Bros.Ultimate, donde Chris Redfield y Leon Kennedy aparecen como espíritus."
    , "El archivo de voz de Barry Burton: En Resident Evil Director's Cut, si cambias el idioma del juego a inglés y escuchas el archivo de voz de Barry Burton, podrás escuchar una de las líneas de diálogo más infames y mal interpretadas en la historia de los videojuegos You were almost a Jill sandwich (Casi eres un bocadillo de Jill"
    ,
"Popularización del género de survival horror: Resident Evil fue fundamental para popularizar el género de survival horror en los videojuegos y estableció muchas de las convenciones que se encuentran en los juegos de terror contemporáneos."
,
]
const waitTime = (wait) => new Promise((resolve) => setTimeout(resolve, wait));
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
    await waitTime(10000);
        return res.status(200).json({valid : true});
});
    
router.post('/askSomething', async function (req, res, next) { 
    const { body } = req;
    const { tags } = body;
    // await waitTime(10000);
        console.log("Hola a todos");
        return res.status(200).json({mensaje:randomFacts[Math.floor(Math.random() * randomFacts.length)]});
});

module.exports = router;