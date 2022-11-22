
const routes = [
  {
    path: '/',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      //{ path: '', component: () => import('pages/Users.vue') }

      { path: '/inventario', component: () => import('pages/inventario.vue') },


      { path: '/cliente',  component: () => import('pages/cliente.vue') },
      { path: '/descuento',  component: () => import('pages/descuento.vue') },
      { path: '/termino', component: () => import('pages/termino.vue') },
      { path: '/vendedor', component: () => import('pages/vendedor.vue') },
      { path: '/zona', component: () => import('pages/zona.vue') },
      
      { path: '/producto', component: () => import('pages/producto.vue') },
      { path: '/linea',  component: () => import('pages/linea.vue') },
      { path: '/unidad', component: () => import('pages/unidad.vue') },

      { path: '/bancoempresa', component: () => import('pages/bancoempresa.vue') },

      { path: '/axiosx', component: () => import('pages/axiosx.vue') },
      { path: '/prueba', component: () => import('pages/prueba.vue') },
      { path: '/student', component: () => import('pages/student.vue') },
      { path: '/qtable', component: () => import('pages/qtable.vue') },
      { path: '/formproductos', component: () => import('pages/formproductos.vue') },
      { path: '/tareas', component: () => import('pages/tareas.vue') },
      { path: '/empresa', component: () => import('pages/empresa.vue') },



    ]
  },
  {
    path: '/Login',
    component: () => import('pages/Login.vue'),
  },

  // Always leave this as last one,
  // but you can also remove it
  {
    path: '/:catchAll(.*)*',
    component: () => import('pages/Error404.vue')
  }
]

export default routes
