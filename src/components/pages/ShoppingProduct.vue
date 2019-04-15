<template>
  <div>
    <loading :active.sync="isLoading"></loading>
    <div class="container main-contant mb-1">
        
        <nav aria-label="breadcrumb" role="navigation">
          <ol class="breadcrumb bg-transparent pl-0">
            <router-link class="breadcrumb-item" to="/front/shopping_proall">
              <a href="#">商品列表</a>
            </router-link>
            <!--testing -->  
            <router-link class="breadcrumb-item" :to="`/front/shopping_proall/?category=${product.category}`" >  
              <a href="#">{{product.category}}</a>    
            </router-link>            
            <li class="breadcrumb-item active" aria-current="page">{{product.title}}</li>
          </ol>
        </nav>
        
        <div class="row">
          <div class="col-md-4 mb-5">
            <div class="sticky-top" style="top: 10px;">   
              <h1 class="h2">
                {{product.title}}
              </h1>
              <div class="d-flex my-3 align-items-end justify-content-end"> 
                <del class="text-muted">售價 {{product.origin_price}}</del>
                <div class="h4 mb-0 ml-auto text-danger">
                  <small>網路價 </small>
                  <strong>NT${{product.price}}</strong>
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
                  @click="addtoCart(product.id,product.num)">
                  <i class="fas fa-spinner fa-spin" v-if="status.loadingItem!==ID"></i>
                  加入購物車
                </button>

              </div>

              <div class="mt-2 text-right text-muted">
                <img src="http://bit.ly/2Ug6ScJ " style="width:40px;height:40px;margin-top:-15px;">  
                <i class="fab fa-cc-mastercard fa-2x"></i>
                <i class="fab fa-cc-visa fa-2x "></i>
                <i class="fab fa-cc-jcb fa-2x" ></i>
                <i class="fab fa-cc-paypal fa-2x" ></i> 
              </div>
            </div>
          </div>
          <div class="col-md-8">
            <h2>{{product.description}}</h2>
            <p class="card-text">
              {{product.content}}
            </p>
            <img :src="`${product.imageUrl}`" class="img-fluid">
            
            <div class="alert alert-warning mt-4" role="alert">
              <h5 class="text-center">購物說明</h5> 
              <ul>
                <p>出貨方式</p>    
                <li>寄送時間：完成付款後 7 個工作天內送達(不含週六日)。</li>
                <li>送貨方式：透過宅配(目前沒有郵寄服務)。</li>
                <li>送貨範圍：限台灣本島地區，注意！收件地址請勿為郵政信箱。(若有台灣本島以外地區送貨需求，請事先知會)。</li>
                <li>產品保固/售後服務：若產品本身瑕疵或運送過程導致新品瑕疵，到貨7日內可更換新品。</li>
                <li>其他：由於與門市同步銷售，故下單前敬請來電確認是否有所需之商品。若因門市售出造成無法即時出貨請見諒，謝謝合作！</li>
              </ul>               
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
      cart:{
        qty:'',
      },  
      ID:'', 
      isLoading:false,             
    }; 
  },
  methods:{
    getProduct(){
      const vm=this;
      const url =`${process.env.APIPATH}/api/${process.env.CUSTOMPATH}/product/${vm.ID}`;  
      //單一商品細節/api/:api_path/product/:id  
      vm.status.loadingItem=vm.ID;
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
      let cart={
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
        //this.$router.go(0);

        this.$bus.$emit('getCartval');  
      });  
    },  
    
  },

  created(){
    this.ID = this.$route.params.id;       
    console.log(this.ID);
    this.getProduct();   
  },
 
};  
</script>

