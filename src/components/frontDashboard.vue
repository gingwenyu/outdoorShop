<template>
<div>
  <loading :active.sync="isLoading"></loading>
  <!-- headers -->
  <nav class="navbar navbar-expand-md navbar-dark bg-dark">
    <router-link class="navbar-brand" to="/front/home">
      <i class="fas fa-campground fa-2x text-light"></i>Outdoor Shop
    </router-link>
    <div class="collapse navbar-collapse" id="navbarNav">
      <ul class="navbar-nav">
        <li class="nav-item active">
          <router-link class="nav-link text-light px-3" to="/front/home">Home</router-link>           
        </li>
        <li class="nav-item">          
          <router-link class="nav-link text-light px-3" to="/front/shopping_proall">Product</router-link>
        </li>
        <!--
        <li class="nav-item">
          <router-link class="nav-link text-light px-3" to="/">Administrator</router-link>
        </li>-->
      </ul>
    </div>

    <!-- 購物車內的數量 (Button 內包含 icon, 數量 badge) -->
    <div class="dropdown ml-auto">
      <button class="btn btn-sm btn-cart" data-toggle="dropdown" data-flip="false">
        <i class="fa fa-shopping-cart text-white fa-2x" aria-hidden="true"></i>
        <span class="badge badge-pill badge-danger">{{count}}</span>
        <span class="sr-only">unread messages</span>
      </button>
      <div class="dropdown-menu dropdown-menu-right p-3 rounded-0" style="min-width: 300px" data-offset="400">
        <h6>已選擇商品</h6>
        <table class="table table-sm">
          <tbody>
            <tr v-for="item in cart.carts" :key="item.id">   
              <td class="align-middle">{{item.product.title}}</td>              
              <td class="align-middle">{{item.qty}}{{item.product.unit}}</td>
              <td class="align-middle text-right">{{item.qty*item.product.price|currency}}</td>
              <td class="align-middle">
                <button type="button" class="btn btn-outline-danger border-0"
                  @click="removeCartItem(item.id)">
                  <i class="far fa-trash-alt fa-1x"></i>
                </button>      
              </td>
            </tr>
          </tbody>
        </table>
        <router-link to="/front/shopping_checkout">
          <a href="#" class="btn btn-dark btn-block rounded-0">
            <i class="fa fa-cart-plus" aria-hidden="true"></i> 結帳去
          </a>
        </router-link>
      </div>
    </div>
  </nav>

  <Alert></Alert>
  
  <!--main content-->
  <div class="">
    <router-view></router-view> 
  </div>

  <!--footer-->
  <footer class="bg-dark text-white py-3">
    <div class="container">
      <ul class="list-inline text-center">
        <div class="input-group mb-3 w-50 mx-auto col-md-10 col-12">  
          <label for="email" class="h5">Contact us</label>
          <input type="email" class="form-control ml-2" placeholder="Enter your email"> 
          <button class="btn btn-secondary rounded-0">Go</button>   
        </div>
        <li class="list-inline-item" @click="ig">
          <a class="text-white" href="#"><i class="fab fa-instagram"></i>&ensp;Instagram</a>
        </li>
        <li class="list-inline-item" @click="fb">  
          <a class="text-white" href="#"><i class="fab fa-facebook"></i>&ensp;Facebook</a>  
        </li>
        <li class="list-inline-item" @click="line">
          <a class="text-white" href="#">
          <i class="fab fa-line"></i>&ensp;Line</a>   
        </li>
      </ul>
      <p class="text-center">© Copright 2019 Outdoor Shop
        <i class="fas fa-campground text-light"></i>   
      </p>
      
    </div>
  </footer>

</div>
</template>

<script>
import $ from 'jquery';
import Alert from './AlertMessage';

export default{
  components:{    
    Alert,   
  },
  data(){
    return{
      cart:{
        carts:{},   
      },
      count:{},   
      isLoading:false,
    }; 
  },
  methods:{
    getCart(){   
      const url =`${process.env.APIPATH}/api/${process.env.CUSTOMPATH}/cart`;  
      //取得購物車列表/api/:api_path/cart
      const vm=this;
      vm.isLoading=true;
      this.$http.get(url).then((response) => {
        console.log(response);
        vm.cart = response.data.data; 
        vm.count=response.data.data.carts.length; 
        vm.isLoading=false;  
      });
    },
    removeCartItem(id){
      const url =`${process.env.APIPATH}/api/${process.env.CUSTOMPATH}/cart/${id}`;  
      const vm=this;
      vm.isLoading=true;
      this.$http.delete(url).then((response) => {
        vm.getCart();
        console.log(response);
        vm.isLoading=false;
        
        if(response.data.success){
          this.$bus.$emit('messsage:push',response.data.message,'success');    
        }else{
          this.$bus.$emit('messsage:push',response.data.message,'danger');
        }
        
      });
    },
    ig(){
      window.open('https://www.instagram.com/');   
    },
    fb(){
      window.open('https://www.facebook.com/');   
    },
    line(){
      window.open('https://line.me/zh-hant/download');   
    },

  },
  
  created(){

    //內層
    const vm = this;
    //取得購物車資料
    vm.getCart();  
    //傳遞
    this.$bus.$on('getCartval', function() {
      vm.getCart();
    });

    //這行可以使用
    //const vm = this; 
    //this.$bus.$on('getCartval', vm.getCart());  

    //外層
    //this.$bus.$emit('getCartval');  
  },

};
</script>