import Vue from 'vue';
import Router from 'vue-router';
import Home from './views/Home.vue';
import User from './views/User.vue';
import Chat from './views/Chat.vue';
import Messages from './views/Messages.vue';

Vue.use(Router);

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home,
    },
    {
      path: '/user/:id',
      name: 'User',
      component: User,
    },
    {
      path: '/chat/:id',
      name: 'chat',
      component: Chat,
    },
    {
      path: '/messages/:id',
      name: 'messages',
      component: Messages,
    },
    {
      path: '/about',
      name: 'about',
      // route level code-splitting
      // this generates a separate chunk (about.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import(/* webpackChunkName: "about" */ './views/About.vue'),
    },
  ],
});
