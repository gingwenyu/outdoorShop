<template>
  <div>
    <div v-for="item in products" :key="item.id">    
      <div class="card border-0">
        <div style="height: 220px; background-size: cover; background-position: center"
          :style="{backgroundImage:`url(${item.imageUrl})`}"></div>
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
        <div class="card-footer d-flex mb-3">
          <router-link :to="`${seemore}`">
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

    </div>
  </div>
</template>

<script>
export default {
  //name: 'Navbar',  
  data() {
    return {
      products:[], 
      product:{}, 
      status:{
        loadingItem:'',
      },
      cart:{}, 
      seemore:'',  
      isLoading:false,  
    };
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
          if(response.data.success){
            vm.status.loadingItem='';
            vm.$router.push(`/front/shopping_product/${response.data.product.id}`); 
            vm.seemore='/front/shopping_product/`${response.data.product.id}`';   
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

    created(){
      this.getProducts();
    },    


};
</script>
