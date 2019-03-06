<template>
  <div>
    <loading :active.sync="isLoading"></loading>
    <div class="container main-contant mb-1">
        <nav aria-label="breadcrumb" role="navigation">
          <ol class="breadcrumb bg-transparent pl-0">
            <li class="breadcrumb-item">
              <a href="#">首頁</a>
            </li>
            <li class="breadcrumb-item">
              <a href="#">金牌專賣店</a>
            </li>
            <li class="breadcrumb-item active" aria-current="page">金牌西裝</li>
          </ol>
        </nav>
        <div class="row" v-for="item in product" :key="item.id">
          <div class="col-md-4 mb-5">
            <div class="sticky-top" style="top: 10px;">   
              <h1 class="h2">
                金牌{{product.title}}
                <small class="text-muted">(哈德版)</small>
              </h1>
              <div class="d-flex my-3 align-items-end justify-content-end"> 
                <del class="text-muted">售價 {{product.origin_price}}</del>
                <div class="h3 mb-0 ml-auto text-danger">
                  <small>網路價 NT$</small>
                  <strong>{{product.price}}</strong>
                </div>
              </div>
              <hr>尺寸:
              <div class="btn-group btn-group-sm btn-group-toggle" data-toggle="buttons">
                <label class="btn btn-outline-secondary">
                  <input type="radio" name="size" checked> S
                </label>
                <label class="btn btn-outline-secondary">
                  <input type="radio" name="size"> M
                </label>
                <label class="btn btn-outline-secondary">
                  <input type="radio" name="size"> L
                </label>
              </div>

              <div class="input-group mt-3">
                <select name="" class="form-control mr-1" v-model="product.num">
                  <option :value="num" v-for="num in 10" :key="num">
                    選購{{num}} {{product.unit}}  
                  </option>
                </select>
                
                <button type="button" class="btn btn-primary"
                  @click="addtoCart(item.id)">
                  <i class="fas fa-spinner fa-spin" v-if="status.loadingItem===item.id"></i>
                  加入購物車
                </button>

              </div>

              <div class="mt-2 text-right text-muted">
                <i class="fa fa-cc-visa" aria-hidden="true"></i>
                <i class="fa fa-cc-jcb" aria-hidden="true"></i>
                <i class="fa fa-cc-paypal" aria-hidden="true"></i>
              </div>
            </div>
          </div>
          <div class="col-md-8">
            <h2>帥氣西裝{{product.description}}</h2>
            <p class="card-text">
              {{product.content}}
            </p>

            <h3 class="mt-5 text-center">簡單就好</h3>
            <img
              src="https://images.unsplash.com/photo-1497339100210-9e87df79c218?w=1500"
              class="w-100"
              alt
            >

            <div class="alert alert-secondary mt-4" role="alert">
              <h2 class="text-center">購物說明</h2>
              <p>
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolorem molestiae delectus eveniet 
                repalias accusamus at, consequatur iste consequuntur itaque enim id distinctio. Aut provident 
                cum voluptates ducimus, unde rem.
              </p>
            </div>
          </div>
        </div>
    </div>
  </div>
</template>

<script>
import $ from 'jquery';

export default{
  data(){
    return{
      product:{}, 
      status:{
        loadingItem:'',
      },
      cart:{},  
      id:'', 
      isLoading:false,
    }; 
  },
  methods:{
    getProduct(id){
      const url =`${process.env.APIPATH}/api/${process.env.CUSTOMPATH}/product/${id}`;  
      //單一商品細節/api/:api_path/product/:id  
      const vm=this;
      vm.status.loadingItem=id;
      vm.isLoading=true;
      this.$http.get(url).then((response) => {
        console.log(response);
        vm.product=response.data.product;
        vm.isLoading=false;
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

  created(){
    this.id = this.$route.params.id;
    console.log(this.id);
    this.getProduct();
  },

};
</script>

