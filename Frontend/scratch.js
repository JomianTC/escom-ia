const PRIVATE_ROUTES_MODEL= {
    PRIVATE: {
      path: 'private',
      component:" Private"
    },
    DASHBOARD: {
      path: 'dashboard',
      component:" Dashboard"
    },
    HOME: {
      path: 'home',
      component:" Dashboard"
    },
    PROFESORES: {
      path: 'profesores/*',
      component:" ProfesoresPage"
    },
    TRAMITES: {
      path: 'tramites',
      component:" Dashboard"
    },
    IA: {
      path: 'ia',
      component:" Dashboard"
    }
}
  
const PRIVATE_ROUTES = Object.keys(PRIVATE_ROUTES_MODEL).map(key => PRIVATE_ROUTES_MODEL[key])
console.log(PRIVATE_ROUTES);
