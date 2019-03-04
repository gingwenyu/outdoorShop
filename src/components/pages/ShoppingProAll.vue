<template>
<div>
  <!--main content start -->
  <div class="container mt-5">
    <div class="row">
      <div class="col-md-3">
        <!-- 左側選單 (List group) -->
        <div class="list-group sticky-top">
          <a class="list-group-item list-group-item-action rounded-0" data-toggle="list" href="#list-gold">
            <i class="fas fa-hiking"></i>&emsp;露營/健行</a>
          <a class="list-group-item list-group-item-action rounded-0" data-toggle="list" href="#list-gift">
            <i class="fas fa-dumbbell"></i>&ensp;重訓/健身</a>
          <a href="#" class="list-group-item list-group-item-action rounded-0">
            <i class="fas fa-skiing"></i>&emsp;滑雪</a>
          <a href="#" class="list-group-item list-group-item-action rounded-0">
            <i class="fas fa-swimmer"></i>&ensp;衝浪/潛水</a>
          <a href="#" class="list-group-item list-group-item-action rounded-0">
            <i class="fas fa-bicycle"></i>&ensp;鐵人三項</a>  
        </div>
      </div>
      <div class="col-md-9">
        <div class="d-flex justify-content-end mb-4">
          <!-- Search bar -->
          <form class="form-inline my-3 my-lg-0">
            <div class="input-group">
              <input class="form-control rounded-0" type="text" placeholder="Search" aria-label="Search">
              <div class="input-group-append">
                <button class="btn btn-outline-secondary rounded-0" type="submit">
                  <i class="fa fa-search" aria-hidden="true"></i> Search</button>
              </div>
            </div>
          </form>
        </div>
        <!-- 主要商品列表 (Card) -->
        <div class="row mt-4">
          <div class="col-md-4 mb-4" v-for="item in products" :key="item.id">
            <div class="card border-0 shadow-sm">
              <div style="height: 150px; background-size: cover; background-position: center"
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
                <router-link to="/front/shopping_product">
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
        <!-- 主要商品列表 (Card) end -->

        <!--nav pagination-->
        <nav aria-label="Page navigation example">
          <ul class="pagination justify-content-center">
            <li class="page-item" :class="{'disabled':!pagination.has_pre}">
              <a class="page-link" href="#" aria-label="Previous"
                @click.prevent="getProducts(pagination.current_page-1)">
                <span aria-hidden="true">&laquo;</span>
                <span class="sr-only">Previous</span>
              </a>
            </li>
            <li class="page-item" v-for="page in pagination.total_pages" :key="page"
                :class="{'active':pagination.current_page===page}">
              <a class="page-link" href="#" @click.prevent="getProducts(page)">{{page}}</a>
            </li>        
            <li class="page-item" :class="{'disabled':!pagination.has_next}">
              <a class="page-link" href="#" aria-label="Next"
                @click.prevent="getProducts(pagination.current_page+1)">
                <span aria-hidden="true">&raquo;</span>
                <span class="sr-only">Next</span>
              </a>
            </li>
          </ul>
        </nav>


      </div>
    
    </div>
  </div>
  
  

  <div class="modal fade" id="removeModal" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
    <div class="modal-dialog" role="document">
      <div class="modal-content">
        <div class="modal-header bg-danger text-white">
          <h5 class="modal-title">刪除商品</h5>
          <button type="button" class="close" data-dismiss="modal" aria-label="Close">
            <span aria-hidden="true">&times;</span>
          </button>
        </div>
        <div class="modal-body">
          <p>是否確認刪除商品</p>
        </div>
        <div class="modal-footer">
          <button type="button" class="btn btn-outline-secondary" data-dismiss="modal">否</button>
          <button type="button" class="btn btn-outline-danger px-5">是</button>
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
      products:[], 
      product:{}, 
      status:{
        loadingItem:'',
      },
      cart:{},   
      isLoading:false,
      pagination:{}, 
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
        vm.pagination=response.data.pagination;
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
          vm.$router.push(`/shopping_product`);  //跳轉到單一商品頁面，剛才已點選的商品，資料如何儲存?到了下一頁，如何調用資料?
        }
      });
    },
    addtoCart(id,qty=1){
      const url =`${process.env.APIPATH}/api/${process.env.CUSTOMPATH}/cart`;  
      //加入購物車/api/:api_path/cart
      const vm=this;
      vm.status.loadingItem=id;
      const cart={
        product_id:id,
        qty,  
      }
      this.$http.post(url,{data:cart}).then((response) => {
        console.log(response);
        vm.status.loadingItem='';
        //新增重新整理的功能?尚未新增        
      });  
    },
    
  },


  created(){
    this.getProducts();
  },

};
</script>
