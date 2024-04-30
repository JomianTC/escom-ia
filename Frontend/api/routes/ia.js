
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

const responses = [
    {pregunta : "¿Quién puede realizar el Servicio Social?",
    respuesta: "Los alumnos inscritos que tengan el 70% de los créditos aprobados. Los egresados que cuenten con el 100% de créditos aprobados. O en su defecto mediante un DICTAMEN, siempre y cuando cumplas con los siguientes requisitos: Cuentes con el 60% de créditos o más Con el primer y segundo nivel concluido Ser regular"},
    
    {pregunta : "¿Cuándo puedo iniciar mi Servicio Social?",
    respuesta: "El perido de servicio social es cada 1 y 16 de cada mes, o en su caso de ser día inhábil (fin de semana o día festivo), la fecha posterior más próxima."},
    
    {pregunta : "¿Dónde puedo consultar las fechas de inicio de Servicio Social?",
    respuesta: "Hemos creado un calendario y este lo puedes encontrar dentro o fuera de la oficina de Servicio Social o la página de Facebook, en el podrás determinar tu fecha de inicio y termino en caso de que quieras realizar tu servicio dentro o fuera del I.P.N. además de la fecha límite de entrega de documentación."},
    
    {pregunta : "¿En dónde puedo realizar mi Servicio Social?",
    respuesta: "Seas BECARIO o NO el servicio social podrás realizarlo en cualquier Dependencia de Gobierno(Federal, Estatal o Municipal), Asociación Civil, Escuelas o Centros de Investigación del I.P.N u otras instituciones educativas que cuenten con convenio."},
    
    {pregunta : "¿Cómo se si una dependencia tiene convenio con el IPN?",
    respuesta: "Esta información sólo puedes consultarla en el lugar dónde quieres realizar el servicio social o buscar en un navegador: SISS IPN y entra a VACANTES y ahí encontraras todas las dependencias que tienen convenio con el IPN."},
    
    {pregunta : "¿Si no cuento con el 70% de créditos y quiero iniciar el Servicio Social que hago?",
    respuesta: "Debes cumplir con 3 requisitos: Ser regular (no adeudar materias) Tener el 60% o más de créditos Tener completo el 1er y 2do nivel del prográma académico"},
    
    {pregunta : "¿Qué papeles debo de entregar para que me hagan mi dictamen?",
    respuesta: "Escrito dirigio a la comisión de Servicio Social, en donde expongas el motivo por el cual deseas iniciar el servicio, debe llevar los datos completos del alumno y su firma, entregar copia y original Copia de la constancia de créditos* Boleta de calificaciones* * La boleta y constancia se tramitan en Gestión Escolar"},
    
    {pregunta : "¿Cómo se llena el reporte mensual?",
    respuesta: "Revisa el siguiente video"},
    
    {pregunta : "¿Quién debe firmar mis reportes mensuales?",
    respuesta: "Recuerda que tu responsable directo es quien debe firmar tus reportes mensuales."},
    
    {pregunta : "¿Qué es un responsable directo?",
    respuesta: "Es la persona con la que trabajas directamente, la que te indica que hacer y revisa tu trabajo."},
    
    {pregunta : "¿Hay un número máximo o mínimo de horas que se deben reportar?",
    respuesta: "No existe un námero mínimo de horas totales por mes, pero si un máximo, no debes exceder las 88 horas por mes. SOLO PUEDES REPORTAR 4 HORAS DIARIAS."},
    
    {pregunta:"Si quiero dar de BAJA el Servicio Social ¿Qué hago?",
    respuesta:"Entra a tu sesión del SISS y solicita tu baja en el sistema, después deberás realizar un escrito libre dirigido a la Comisión de Servicio Social, donde expongas los motivos por los cuales te dáras de baja , incluiras tus datos personales y boleta y deberás firmarla. Entrega dicho escrito en la oficina de Servicio Social en original y copia."},
    
{    pregunta:"Si ya terminé mi Servicio Social ¿Qué debo hacer?",
    respuesta:"Debes dirigirte a la oficina para consultar los requisitos y descargar los formatos de termino de servicio."},
    
    {pregunta : "¿Después de iniciado el trámite de liberación, cuánto tiempo dura el proceso para la expedición de mi carta?",
        respuesta: "Después de entregar documentación y cubrir los requisitos solicitados en la oficina de S.S. la expedición de tu constancia de liberación tardará de 3 a 6 meses, en cuanto se expida enviaremos un correo a tu e-mail registrado en la carta compromiso para que acudas por ella o también se publicara la lista en el Facebook de Servicio Social."
    },
    {
        pregunta: "Dame los tramites relacionados con Servicio social",
        respuesta: "Te brindo los links de algunos de los tramites relacionados a lo que buscas http://localhost:5173/private/tramites/detalles/904068fb6a5c092ce90cb56c87ac4373 , http://localhost:5173/private/tramites/detalles/56b4178011b448e6b1fc6802000c0fd1"
    }
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
    return res.status(200).json({ mensaje: 'El profeso me parece bastante aburrido y sus clases no tienen mucho sentido realmente', tags: tags });
});

router.post('/coment/validate', async function (req, res, next) { 
    const { body } = req;
        const { tags } = body;
    await waitTime(10000);
        return res.status(200).json({valid : true});
});
    
router.post('/askSomething', async function (req, res, next) { 
    const { body } = req;
    const { message } = body;
    // await waitTime(10000);
    const response = responses.find(response => response.pregunta.toLowerCase() === message.toLowerCase());
    
    if (!response) { 
        return res.status(200).json({ mensaje: 'Oops aún no cuento con esa información, ayudame a saber más' });
    }

    return res.status(200).json({mensaje: response.respuesta});
});

module.exports = router;