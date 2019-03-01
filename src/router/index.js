//官方的元件
import Vue from 'vue';
import VueRouter from 'vue-router';

//自訂的分頁元件
//import HelloWorld from '@/components/HelloWorld';
import Dashboard from '@/components/Dashboard';
import Login from '@/components/pages/Login';
import Products from '@/components/pages/Products';
import Orders from '@/components/pages/Orders';
import Coupons from '@/components/pages/Coupons';
import customerOrder from '@/components/pages/CustomerOrders';
import CustomerCheckout from '@/components/pages/CustomerCheckout';

Vue.use(VueRouter);

export default new VueRouter({
  routes:[
    {
      path:'*',
      redirect:'login',  
      //假設路徑不是已設定的,則重新導向至login,避免用戶進入不存在的網頁
    },
   // {
   //   path:'/',
   //   name:'HelloWorld',
   //   component: HelloWorld,
   // },
    {
      path: '/login',
      name: 'Login',
      component: Login,
    },
    {
      path: '/admin',
      name: 'Dashboard',
      component: Dashboard,     
      children:[
        {
          path: 'products',   
          name: 'Product',   
          component: Products,
          meta: { requiresAuth: true },
        },
        {
          path: 'orders',
          name: 'Orders',
          component: Orders,
          meta: { requiresAuth: true },
        },
        {
          path: 'coupons',
          name: 'Coupons',
          component: Coupons,
          meta: { requiresAuth: true },
        },
      ],
    },
    {
      path: '/',
      name: 'Dashboard',
      component: Dashboard,
      children: [
        {
          path: 'customer_order',
          name: 'CustomerOrder',
          component: customerOrder,          
        },
        {
          path: 'customer_checkout/:orderId',
          name: 'CustomerCheckout',
          component: CustomerCheckout,
        },

      ],
    },
  ],  
});