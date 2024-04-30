// const PRIVATE_ROUTES_MODEL= {
//   PRIVATE: {
//     path: 'private',
//     component: "Dashboard",
//     navPath: 'private',
//     name: 'Private'
//   },
//   DASHBOARD: {
//     path: 'dashboard',
//     component: "Dashboard",
//     navPath: 'dashboard',
//     name: 'dashboard'
//   },
//   HOME: {
//     path: 'home',
//     component: "Home",
//     navPath: 'home',
//     name: 'Home'
//   },
//   PROFESORES: {
//     path: 'profesores/*',
//     component: "ProfesoresPage",
//     navPath: 'profesores',
//     name: 'Profesores'
//   },
//   TRAMITES: {
//     path: 'tramites',
//     component: "TramitesPage",
//     navPath: 'tramites',
//     name: 'Tramites'
//   },
//   IA: {
//     path: 'ia',
//     component: "ChatbotPage",
//     navPath: 'ia',
//     name: 'Chatbot'
//   }
// }
  
// const PRIVATE_ROUTES = Object.keys(PRIVATE_ROUTES_MODEL).map(key => PRIVATE_ROUTES_MODEL[key])
// console.log(PRIVATE_ROUTES);

// const NAV_ROUTES = PRIVATE_ROUTES.filter(route => route.navPath !== 'home')
// console.log(NAV_ROUTES);

// const IA_ROUTE = PRIVATE_ROUTES.find(route => route.navPath === 'ia')
// console.log(IA_ROUTE);
// console.log({IA_ROUTE});

const response = {
  "id": "",
  "nombre": "aewaeawea",
  "descripcion": "<p>weaweawe</p>",
  "fechaInicio": "",
  "fechaTermino": "",
  "esInformativo": false,
  "requerimentos": [
      "12a2bebe-c66a-4f4f-91ea-d6c087002103"
  ],
  "links": [
      {
          "link": "google.com",
          "title": "Formulario de Google"
      },
      {
          "link": "google.com",
          "title": "Formulario de otra cosa"
      }
  ],
  "estado": true
}

function formatLinks (objectLinks) { 
  if (!(objectLinks instanceof Object) || objectLinks === undefined ) return []
return Object.entries(objectLinks).flat().map((value, index) => { 
  return index % 2 !== 0 ? `${value.link},${value.title}` : null
}).filter(value => value !== null)
}
//  ['link,titulo']


const values = formatLinks(response.links)

const links = values.map(value => { 
  const [link, title] = value.split(',')
  return { link, title }
})

console.log(links);

console.log(formatLinks(response.links));