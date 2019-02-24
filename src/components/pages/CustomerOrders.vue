<template>
  <div>
    <loading :active.sync="isLoading"></loading>
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
            <button type="button" class="btn btn-outline-secondary btn-sm"
              @click="getProduct(item.id)">
              <i class="fas fa-spinner fa-spin" v-if="status.loadingItem===item.id"></i>
              查看更多
            </button>
            <button type="button" class="btn btn-outline-danger btn-sm ml-auto"
              @click="addtoCart(item.id)">
              <i class="fas fa-spinner fa-spin" v-if="status.loadingItem===item.id"></i>
              加到購物車
            </button>
          </div>
        </div>
      </div>
    </div>
   
    <!--table & form-->
    <div class="w-75">
      <table class="table mt-4">
        <thead>
          <tr>
            <th width="50"></th>
            <th>品名</th>
            <th width="120" class="text-right">數量</th>
            <th width="120" class="text-right">單價</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="item in cart.carts" :key="item.id" v-if="cart.carts">
          <!--<tr v-for="(item) in products" :key="item.id">-->
            <td>
              <button type="button" class="btn btn-outline-danger btn-sm"
              @click="removeCartItem(item.id)">
                <i class="far fa-trash-alt fa-1x"></i>
              </button>   
            </td>
            <td>{{item.product.title}}</td>
            <td class="text-right">{{item.qty}}/{{item.product.unit}}</td>
            <td class="text-right">{{item.product.price|currency}}</td>
          </tr>
        </tbody>
        <tfoot>
          <tr>
            <td class="text-right" colspan="3">總計</td>
            <td class="text-right">{{cart.total}}</td>    <!--{{cart.total}}???-->      
          </tr>
          <tr v-if="cart.final_total!==cart.total">
            <td class="text-right text-success"colspan="3">折扣價</td>
            <td class="text-right text-success">{{cart.final_total}}</td><!--???-->
          </tr>
        </tfoot>
      </table>

      <div class="input-group mb-3">
        <input type="text" class="form-control" v-model="coupon_code" placeholder="請輸入優惠碼">
        <button type="button" class="btn btn-outline-secondary"
         @click="addCouponCode()"><!--v-model="coupon_code"-->
          套用優惠碼
        </button>
      </div>

      <label for="emailID">Email</label>
      <div class="input-group mb-3">
        <input type="email" class="form-control" placeholder="請輸入email" id="emailID">
      </div>
    </div>

    <!-- Modal -->
    <div class="modal fade" id="productModal" tabindex="-1" role="dialog"
      aria-labelledby="exampleModalLabel" aria-hidden="true">
      <div class="modal-dialog" role="document">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title" id="exampleModalLabel">{{product.title}}</h5>
            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div class="modal-body">
            <img :src="product.image" class="img-fluid">
            <!--<blockquoto class="blockquoto mt-3">-->
            <div class="blockquoto mt-3">
              <p class="mb-0">{{product.content}}</p>
              <footer class="blockquoto-footer text-right">{{product.description}}</footer>
            </div>
            <!--</blockquoto>-->
            <div class="d-flex justify-content-between align-items-baseline">
            </div>
            <select name="" class="form-control mt-3" v-model="product.num">
              <option :value="num" v-for="num in 10" :key="num"> 
                選購{{num}} {{product.unit}}
              </option>
            </select> 
          </div>
          <div class="modal-footer">
            <div class="text-muted text-nowrap mr-3">
              小計<strong>{{product.num*product.price}}</strong>元
            </div>
            <button type="button" class="btn btn-primary"
              @click="addtoCart(product.id,product.num)">
              <i class="fas fa-spinner fa-spin" v-if="product.id===status.loadingItem"></i>
              加到購物車
            </button>
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
      coupon_code:'',   
    }; 
  },
  methods:{
    getProducts(){
      const url =`${process.env.APIPATH}/api/${process.env.CUSTOMPATH}/products`; 
      const vm=this;
      vm.isLoading=true;
      this.$http.get(url).then((response) => {
        vm.products=response.data.products;
        console.log(response);
        vm.isLoading=false;
      });
    },
    getProduct(id){
      const url =`${process.env.APIPATH}/api/${process.env.CUSTOMPATH}/product/${id}`;  
      const vm=this;
      vm.status.loadingItem=id;
      this.$http.get(url).then((response) => {
        vm.product=response.data.product;
        $('#productModal').modal('show');
        console.log(response);
        vm.status.loadingItem='';
      });
    },
    addtoCart(id,qty=1){
      const url =`${process.env.APIPATH}/api/${process.env.CUSTOMPATH}/cart`;  
      const vm=this;
      vm.status.loadingItem=id;
      const cart={
        product_id:id,
        qty,  
      }
      this.$http.post(url,{data:cart}).then((response) => {
        console.log(response);
        vm.status.loadingItem='';
        vm.getCart();
        $('#productModal').modal('hide');
      });  
    },
    getCart(){
      const url =`${process.env.APIPATH}/api/${process.env.CUSTOMPATH}/cart`;  
      const vm=this;
      vm.isLoading=true;
      this.$http.get(url).then((response) => {
        console.log(response);
        //vm.cart=response.data.data.carts;  //testing
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
      });
    },
    addCouponCode(){
      const url =`${process.env.APIPATH}/api/${process.env.CUSTOMPATH}/coupon`;  
      const vm=this;
      const coupon={
        code:vm.coupon_code
      }
      vm.isLoading=true;
      this.$http.post(url,{data:coupon}).then((response) => {
        vm.getCart();
        console.log(response);
        vm.isLoading=false;
      });
    },
  },


  created(){
    this.getProducts();
    this.getCart();   
  },

};
</script>
