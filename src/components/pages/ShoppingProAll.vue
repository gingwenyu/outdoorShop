<template>
<div>
  <loading :active.sync="isLoading"></loading> 
  <!--main content start -->
  <div class="container mt-5">
    <div class="row">
      <div class="col-md-3">
        <!-- 左側選單 (List group) -->
        <div class="list-group sticky-top">
          <li class="list-group-item list-group-item-action rounded-0" 
            v-for="(item,key) in filter.list" :key='key'>
            <span :class="`${item.icon}`"></span>  
            <a @click.prevent="changeCategory(item)"    
               >{{item.name}}
            </a>  <!--ref="myBtn"-->  
          </li> 
        </div>
      </div>
      <div class="col-md-9">        
        <!-- 主要商品列表 (Card) -->
        <div class="row mt-4">
          <div class="col-md-4 mb-4" v-for="item in products" :key="item.id">
            <ProductList :item="item"/>            
          </div>
        </div> 
        <!-- 主要商品列表 (Card) end -->

        <!--nav pagination-->
        <nav aria-label="Page navigation example">
          <ul class="pagination justify-content-center">
            <li class="page-item" :class="{'disabled':!pagination.has_pre}">
              <a class="page-link" aria-label="Previous"
                @click.prevent="getProducts(pagination.current_page-1)">
                <span aria-hidden="true">&laquo;</span>
                <span class="sr-only">Previous</span>
              </a>
            </li>
            <li class="page-item" v-for="page in pagination.total_pages" :key="page"
                :class="{'active':pagination.current_page===page}">
              <a class="page-link" @click.prevent="getProducts(page)">{{page}}</a>
            </li>        
            <li class="page-item" :class="{'disabled':!pagination.has_next}">
              <a class="page-link" aria-label="Next"
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
import ProductList from './productList';  

export default{  
  components:{
    ProductList,
  },
  data(){
    return{
      products:[], 
      product:{}, 
      status:{
        loadingItem:'',  
      },
      //cart:{},   
      isLoading:false,      
      productpage:'',
      pagination:{},
      filter:{        
        str: '全部商品',        
        list:[
          {
            icon: 'fas fa-list',
            name: '全部商品',
          },
          {
            icon: 'fas fa-hiking',
            name: '露營健行',
          },
          {
            icon: 'fas fa-dumbbell',
            name: '重訓健身',
          },
          {
            icon: 'fas fa-skiing',
            name: '滑雪',
          },
          {
            icon: 'fas fa-swimmer',
            name: '衝浪潛水',
          },
          {
            icon: 'fas fa-bicycle',
            name: '鐵人三項',   
          },
        ],
                   
      },
      productCategory:'',
     
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
        if(vm.filter.str!=='全部商品'){
          let filterpro=response.data.products.filter(function(item,index,arr){
            return item.category==vm.filter.str;                               
        })
          vm.products=filterpro;  
        //單一商品頁 跳轉 商品類別群組       
        }else if(vm.productCategory!==undefined){  
          console.log(vm.productCategory);         //ok
          vm.changeCategory(vm.productCategory); 
          vm.filter.str=vm.productCategory;         
        }
        else{
          vm.products=response.data.products;  
        }
        vm.pagination=response.data.pagination;         
        vm.isLoading=false;  
      });
    },    
    changeCategory(item) {  
      const vm = this;      
      vm.filter.str = item.name
      console.log(vm.filter.str);
      vm.getProducts();                
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
          vm.productpage=`/front/shopping_product/${response.data.product.id}`;
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
        vm.status.loadingItem='';
        //重新整理
        this.$router.go(0);
      });  
    }, */
    
  },
  
  created(){
    this.getProducts();
    //$route.query，一个 key/value 对象，表示 URL 查询参数。例如，对于路径 /foo?user=1，则有 $route.query.user == 1，如果没有查询参数，则是个空对象。
    this.productCategory=this.$route.query.category;     
    console.log(this.productCategory);  
    //當this.productCategory!==undefined，表示有類別名稱
  },

};
</script>
