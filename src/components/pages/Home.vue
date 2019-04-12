<template>
<div>
  <!--loading-->
  <loading :active.sync="isLoading"></loading>
  <!--jumbotron-->  
  <div class="jumbotron jumbotron-fluid jumbotron-bg d-flex align-items-end jumbotron-homeimg bg-cover mb-0">
    <div class="container ">
      <div class="p-3 bg-lighter text-right text-light">
        <h1 class="font-weight-bold">Enjoy the outdoor activities!</h1>
        <p class="lead"><span v-html="longdash"></span>Just do it.</p>          
        <router-link to="/front/shopping_proall">
          <button class="btn btn-outline-success btn-sm rounded-0">more detail</button>
        </router-link> 
      </div>
    </div>
  </div>

  <div class="parallax">  
    <!--swiper-->
    <div class="container">            
      <!--marquee slow duration -->
      <marquee-text :duration="40" class="bg-warning">
        &emsp;2019.05.12~18三鐵周大放送30%OFF，機會難得，手刀搶購去~[優惠券代碼ironman]，限額10名~
        &emsp;2019.06戶外推廣月20%OFF，數量有限，立即搶購去~[優惠券代碼outdoor]，限額20名~&emsp;
      </marquee-text>
                 
      <h3 class="text-center bg-gray text-light py-3 mb-0">推薦商品</h3>   
      <div class="row"> 
        <div class="col-12">  
          <swiper :options="swiperOption">

            <swiper-slide v-for="item in products" :key="item.id">  
              <ProductList :item="item"/>                    
            </swiper-slide>

              <div class="swiper-pagination" slot="pagination"></div>
              <div class="swiper-button-prev" slot="button-prev"></div>
              <div class="swiper-button-next" slot="button-next"></div>  

          </swiper>
          </div>
        </div>
      </div>
    <br>
    
    <div class="container bg-gray text-light mb-md-5">
      <h2 class="text-center">Our Story</h2>
      <p class="">
          &emsp;Welcome to Trekkinn, your favorite store to buy trekking products from featured brands as
          Salomon, The North Face, Vaude, Salewa, Merrell, Trangoworld, Garmin, Columbia, Suunto and even more.
          Our main principles are cooperation, fair prices and good service. We only offer products which are of a
          quality we are convinced of. Trekkinn proposes exclusive models of leading international brands and 
          offers you the chance to get cheap mountain gear. Trekking is one of the most completed outdoor stores to 
          offer you everything you need to enjoy your goals in the mountain like camping gear and accessories, 
          backpacking, outdoor clothing, hiking gear, climbing gear… 
          <br><!--
          &emsp;Furthermore we guarantee punctual and fast delivery. Our team works carefully to offer a wide range of 
          items of trekking and climbing equipment with particular attention to the value. You´ll find everything 
          from camping tents, backpacks, trekking poles, hiking shoes/boots, sleeping bags, climbing gear for the 
          whole family, mountain lovers and even for professionals. Our goal is that you enjoy a safe equipment 
          in which you feel comfortable and to enjoy your outdoor activities. The satisfaction of our customers 
          is our absolute maximum.-->   
      </p>
      
      <div class="row">        
        <div class="col-md-6 col-12 pb-3 d-flex">
          <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2067.070872789065!2d2.8225591674684876!3d41.98311000350252!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x12bae6ddeade5a41%3A0xeef4cc45741263d8!2sThe+North+Face+Girona!5e0!3m2!1szh-TW!2ses!4v1555038340387!5m2!1szh-TW!2ses" width="450" height="350" frameborder="0" style="border:0" class="mx-auto" allowfullscreen></iframe>
        </div>
        <div class="col-md-6 col-12">
          <p>ADDRESS：<br>Rambla de la Llibertat, 12, 17004 Girona</p>
          <p>CONTACT：<br>Tel +34 972 29 62 46</p>
          <p>STORE HOURS：<br>From Monday to Saturday: 10:00am to 09:00pm</p>    
        </div>  
      </div>
    </div>

  </div>

</div>
</template>

<script> 
  import ProductList from './productList';
  import MarqueeText from 'vue-marquee-text-component';

  export default {
    components:{    
      ProductList, 
      MarqueeText,
    },  
    name: 'carrousel',
    data() {
      return {
        longdash:'&#151;',
        products:[], 
        product:{}, 
        status:{
          loadingItem:'',
        },
        //cart:{}, 
        seemore:'',  
        isLoading:false,
        swiperOption: {
          slidesPerView: 3,
          spaceBetween: 30,
          slidesPerGroup: 3, 
          pagination:{
            el: '.swiper-pagination',
            clickable: true
          },
          navigation:{
            nextEl: '.swiper-button-next',
            prevEl: '.swiper-button-prev'
          },
          breakpoints: {
            1024: {
              slidesPerView: 3,
              spaceBetween: 40,
              slidesPerGroup: 3,
            },
            768: {
              slidesPerView: 3,
              spaceBetween: 30,
              slidesPerGroup: 3,
            },
            640: {
              slidesPerView: 2,
              spaceBetween: 20,
              slidesPerGroup: 2,
            },
            320: {
              slidesPerView: 1,
              spaceBetween: 10,
              slidesPerGroup: 1,
            },
          },
        },
            
      }
    },
    methods:{      
      getProducts(){ 
        const url =`${process.env.APIPATH}/api/${process.env.CUSTOMPATH}/products/all`;        
        //取得商品列表_all  /api/:api_path/products/all  
        const vm=this;
        vm.isLoading=true;
        this.$http.get(url).then((response) => {
          console.log(response);
          vm.products=response.data.products; 
          vm.isLoading=false;
        });
      },
      getProduct(id){
        const url =`${process.env.APIPATH}/api/${process.env.CUSTOMPATH}/product/${id}`;
        //單一商品細節/api/:api_path/product/:id  
        const vm=this;
        vm.status.loadingItem=id;
        this.$http.get(url).then((response) => {
          vm.product=response.data.product;
          console.log(response);
          if(response.data.success){
            vm.status.loadingItem='';
            vm.$router.push(`/front/shopping_product/${response.data.product.id}`); 
            vm.seemore='/front/shopping_product/`${response.data.product.id}`';   
          }
        });
      },
      /*
      addtoCart(id,qty=1,product){
        const url =`${process.env.APIPATH}/api/${process.env.CUSTOMPATH}/cart`;  
        //加入購物車/api/:api_path/cart
        const vm=this;
        vm.status.loadingItem=id;        
        const cart={
          product_id:id,
          qty,
          product:{
            imageUrl:'',
          },    
        }
        this.$http.post(url,{data:cart}).then((response) => {
          console.log(response);          
          //vm.status.loadingItem='';    
          //重新整理
          //this.$router.go(0); 

          //testing                 
          this.$bus.$emit('getCartval');           
          
        });  
      },*/
  

    },
    computed: {
      swiper() {
        return this.$refs.mySwiper.swiper
      }
    },
    
    created(){
      this.getProducts();
    },
    
  };

</script>