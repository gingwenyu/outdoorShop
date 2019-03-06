//官方的元件
import Vue from 'vue';
import VueRouter from 'vue-router';

//自訂的分頁元件

import frontDashboard from '@/components/frontDashboard';
import Home from '@/components/pages/Home';
import ShoppingProAll from '@/components/pages/ShoppingProAll';
import ShoppingProduct from '@/components/pages/ShoppingProduct';
import ShoppingCheckout from '@/components/pages/ShoppingCheckout';  
import ShoppingDone from '@/components/pages/ShoppingDone';
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
      //redirect:'login', 
      redirect: 'home',
      //假設路徑不是已設定的,則重新導向至login,避免用戶進入不存在的網頁
    },
    {
      path: '/front',
      name: 'frontDashboard',
      component: frontDashboard,  
      children: [
        {
          path: 'home',
          name: 'Home',
          component: Home,
        },
        {
          path: 'shopping_proall',  
          name: 'ShoppingProAll',
          component: ShoppingProAll,  
        },
        {//path: 'shopping_product/:id',
          path: 'shopping_product/:id',
          name: 'ShoppingProduct',
          component: ShoppingProduct,
        },
        {
          path: 'shopping_checkout',
          name: 'ShoppingCheckout',
          component: ShoppingCheckout,
        },
        { //path: 'shopping_done/:orderId',
          path: 'shopping_done/:orderId',
          name: 'ShoppingDone',
          component: ShoppingDone,
        },
      ]  
    },    
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