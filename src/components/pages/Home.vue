<template>
<div>
  <loading :active.sync="isLoading"></loading>
  <div class="jumbotron jumbotron-fluid jumbotron-bg d-flex align-items-end jumbotron-homeimg bg-cover py-6">
    <div class="container ">
      <div class="p-3 bg-lighter text-right text-light">
        <h1 class="font-weight-bold">Enjoy the outdoor activities!</h1>
        <p class="lead">&#151;Just do it.</p>
        <router-link to="/front/shopping_proall">
          <button class="btn btn-outline-success btn-sm rounded-0">more detail</button>
        </router-link> 
      </div>
    </div>
  </div>
  <!--swiper-->
  <div class="container"><!---->
    <h3 class="text-center">推薦商品</h3>   
    <div class="row"> 
    <div class="col-sm-8 col-md-12" style="height:400px;">
            <swiper :options="swiperOption">
              <swiper-slide v-for="item in products" :key="item.id">
                  <div class="card border-0 shadow-sm">
                    <div style="height: 180px; background-size: cover; background-position: center"
                        :style="{backgroundImage:`url(${item.imageUrl})`}">
                  </div>
                  <div class="card-body">
                    <span class="badge badge-secondary float-right ml-2">{{item.category}}</span>
                    <h5 class="card-title">
                      <a href="#" class="text-dark">{{item.title}}</a>
                    </h5>
                    <p class="card-text">{{item.content}}</p>
                    <div class="d-flex justify-content-between align-items-baseline">
                      <div class="h5" v-if="!item.price">{{item.origin_price}}</div> 
                      <del class="h6" v-if="item.price">{{item.origin_price}}</del>
                      <div class="h5" v-if="item.price">{{item.price}}</div>
                    </div>
                  </div>
                  <div class="card-footer d-flex">
                    <router-link to="/front/shopping_product/:id"><!--/:id testing-->
                      <button type="button" class="btn btn-outline-secondary btn-sm"
                        @click="getProduct(item.id)">
                        <i class="fas fa-spinner fa-spin" v-if="status.loadingItem===item.id"></i>
                        查看更多
                      </button>
                    </router-link>
                    <button type="button" class="btn btn-outline-danger btn-sm ml-auto"
                      @click="addtoCart(item.id)">
                      <i class="fas fa-spinner fa-spin" v-if="status.loadingItem===item.id"></i>
                      加到購物車
                    </button>
                  </div>
                </div>
              </swiper-slide>
              <div class="swiper-pagination" slot="pagination"></div>
              <div class="swiper-button-prev" slot="button-prev"></div>
              <div class="swiper-button-next" slot="button-next"></div>

            </swiper>
          </div>
    </div>
    </div>
  <hr>
  
  <div class="container">
    <h2 class="text-center">Our Story</h2>
    <p class="mb-5">Lorem, ipsum dolor sit amet consectetur adipisicing elit. Iste corporis unde quam, officiis minus vel cupiditate asperiores totam modi! Beatae dolorem possimus dicta earum tempora nisi porro dignissimos. Porro, cum.
    Est fugiat suscipit quibusdam provident distinctio facilis animi necessitatibus molestiae nobis, ipsa minus corporis dolorem dolor id tenetur, repudiandae incidunt laborum repellat eum esse reprehenderit ad dolores. Beatae, non ullam?
    Nobis beatae eum reprehenderit, fuga debitis provident animi laudantium aperiam quod ipsam magni illum culpa numquam eaque, labore, voluptates quae perspiciatis dignissimos deserunt. Nemo sequi exercitationem voluptatum explicabo praesentium ducimus!
    Ex saepe aperiam illo at accusamus vitae magni expedita soluta quos eos doloremque, veniam libero placeat rerum, beatae quasi corporis mollitia, autem aspernatur fuga dignissimos molestias! Illo sequi placeat excepturi.
    Architecto alias aperiam illo, neque at commodi blanditiis! Porro delectus unde aperiam itaque, id nemo eius harum natus nulla iure velit sapiente cumque sed maiores facilis accusamus quia nam animi?
    Cupiditate reiciendis doloremque soluta provident veritatis alias nostrum dignissimos ut neque delectus? Blanditiis veniam placeat soluta et autem minima consectetur eaque quisquam provident? Expedita aut qui id, voluptas aliquid ipsam.</p>
  </div>
</div>
</template>

<script>
  export default {
    name: 'carrousel',
    data() {
      return {
        products:[], 
        product:{}, 
        status:{
          loadingItem:'',
        },
        cart:{},   
        isLoading:false,
        swiperOption: {
          slidesPerView: 3,
          spaceBetween: 30,
          pagination:{
            el: '.swiper-pagination',
            clickable: true
          },
          navigation:{
            nextEl: '.swiper-button-next',
            prevEl: '.swiper-button-prev'
          },
        }
      }
    },
    methods:{
      getProducts(page=1){
        const url =`${process.env.APIPATH}/api/${process.env.CUSTOMPATH}/products?page=${page}`;
        //取得商品列表/api/:api_path/products?page=:page 
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
          //vm.ID=response.data.product.id;
          //console.log(vm.ID);
          if(response.data.success){
            vm.status.loadingItem='';
            vm.$router.push(`/shopping_product/${response.data.product.id}`);  //此處id沒有傳送到下一頁
          }
        });
      },
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
          vm.status.loadingItem='';
          //重新整理
          this.$router.go(0);
        });  
      },
      
    },
    computed: {
      swiper() {
        return this.$refs.mySwiper.swiper
      }
    },
    
    created(){
      this.getProducts();
    },
    mounted() {
      this.swiper.slideTo(3, 1000, false)
    },
  };

</script>