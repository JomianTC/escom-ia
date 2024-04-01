const PRIVATE_ROUTES_MODEL= {
  PRIVATE: {
    path: 'private',
    component: "Dashboard",
    navPath: 'private',
    name: 'Private'
  },
  DASHBOARD: {
    path: 'dashboard',
    component: "Dashboard",
    navPath: 'dashboard',
    name: 'dashboard'
  },
  HOME: {
    path: 'home',
    component: "Home",
    navPath: 'home',
    name: 'Home'
  },
  PROFESORES: {
    path: 'profesores/*',
    component: "ProfesoresPage",
    navPath: 'profesores',
    name: 'Profesores'
  },
  TRAMITES: {
    path: 'tramites',
    component: "TramitesPage",
    navPath: 'tramites',
    name: 'Tramites'
  },
  IA: {
    path: 'ia',
    component: "ChatbotPage",
    navPath: 'ia',
    name: 'Chatbot'
  }
}
  
const PRIVATE_ROUTES = Object.keys(PRIVATE_ROUTES_MODEL).map(key => PRIVATE_ROUTES_MODEL[key])
console.log(PRIVATE_ROUTES);

const NAV_ROUTES = PRIVATE_ROUTES.filter(route => route.navPath !== 'home')
console.log(NAV_ROUTES);
