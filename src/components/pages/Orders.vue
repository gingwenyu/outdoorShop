<template>
  <div>
    <loading :active.sync="isLoading"></loading>
    <div class="text-right mt-4">
      <!-- <button class="btn btn-outline-primary" @click="openModal(true)">新增</button> -->   
    </div> 

    <table class="table mt-4">
      <thead>
        <tr>
          <th width="100">購買時間</th>
          <th width="200">Email</th>
          <th>購買品項</th>
          <th width="100">應付金額</th> 
          <th width="100">是否付款</th> 
          <th width="80">修改</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(item) in orders" :key="item.id">
          <td>{{item.create_at}}</td>
          <td v-if="item.user">{{item.user.email}}</td>
          <td>{{ productKey(`${item.id}`) }}</td>  <!--need to fix  {{item.products(key).product.title}}-->
          <td class="text-right">{{item.total}}</td>
          <td>
            <span v-if="item.is_paid" class="text-success">已付款</span>
            <span v-else class="text-danger">尚未付款</span>
          </td>
          <td>
            <button class="btn btn-outline-primary btn-sm" @click="openModal(false,item)">修改</button>
          </td>
        </tr>
      </tbody>
    </table>

    <nav aria-label="Page navigation example">
      <ul class="pagination justify-content-center">
        <li class="page-item" :class="{'disabled':!pagination.has_pre}">
          <a class="page-link" href="#" aria-label="Previous"
             @click.prevent="getOrders(pagination.current_page-1)">
            <span aria-hidden="true">&laquo;</span>
            <span class="sr-only">Previous</span>
          </a>
        </li>
        <li class="page-item" v-for="page in pagination.total_pages" :key="page"
            :class="{'active':pagination.current_page===page}">
          <a class="page-link" href="#" @click.prevent="getOrders(page)">{{page}}</a>
        </li>        
        <li class="page-item" :class="{'disabled':!pagination.has_next}">
          <a class="page-link" href="#" aria-label="Next"
             @click.prevent="getOrders(pagination.current_page+1)">
            <span aria-hidden="true">&raquo;</span>
            <span class="sr-only">Next</span>
          </a>
        </li>
      </ul>
    </nav>

    <!-- Modal -->
    <div class="modal fade" id="orderModal" tabindex="-1" role="dialog"
      aria-labelledby="exampleModalLabel" aria-hidden="true">
      <div class="modal-dialog modal-lg" role="document">
        <div class="modal-content border-0">
          <div class="modal-header bg-dark text-white">
            <h5 class="modal-title" id="exampleModalLabel">
              <span>修改訂單</span>
            </h5>
            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div class="modal-body">
            <div class="form-group">
              <label for="">購買時間</label>
              <input type="date" class="form-control" id=""
                v-model="tempOrders.create_at" 
                placeholder="date">
              
              <label v-if="tempOrders.user" for="">Email</label>
              <input type="email" class="form-control" id=""
                v-if="tempOrders.user"  
                v-model="tempOrders.user.email"
                placeholder="email">

              <label for="">購買品項</label>
              <input type="text" class="form-control" id=""
                v-model="tempOrders.products" 
                placeholder="item">

              <label for="">應付金額</label>
              <input type="number" class="form-control" id=""
                v-model="tempOrders.total" 
                placeholder="total">

            </div>

            <div class="form-group">
              <div class="form-check">
                <input class="form-check-input" type="checkbox"
                  id="is_paid" v-model="tempOrders.is_paid"
                  :true-value="1" :false-value="2">                      
                <label class="form-check-label" for="is_paid">
                  是否付款
                </label>
              </div>
            </div>
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-outline-secondary" data-dismiss="modal">取消</button>
            <button type="button" class="btn btn-primary" @click="updateOrders()">更新訂單</button>
          </div>
        </div>
      </div>
    </div>
    
    <!-- delModal -->

  </div>
</template>

<script>
import $ from 'jquery';

export default{
  data(){
    return{
      orders:{
        //products:{},
        user:{},
      },
      pagination:{},
      tempOrders:{},
      isNew:false,
      isLoading:false,
      status:{
        fileUploading:false,
      },
    }; 
  },
  methods:{
    getOrders(page=1){
      const api =`${process.env.APIPATH}/api/${process.env.CUSTOMPATH}/admin/orders?page=${page}`;  
      //取得訂單列表 /api/:api_path/admin/orders?page=:page
      const vm=this; 
      console.log(process.env.APIPATH,process.env.CUSTOMPATH);
      vm.isLoading=true;
      this.$http.get(api).then((response) => {
        console.log(response.data);
        vm.isLoading=false;
        vm.orders=response.data.orders;
        //分頁
        vm.pagination=response.data.pagination;
      });
    },
    openModal(isNew,item){      
      if(isNew){
        this.tempOrders={};
        this.isNew=true;
      }else{
        this.tempOrders=Object.assign({},item);    //因為物件傳參考特性，避免兩邊的值變相同
        this.isNew=false;    
      }
      $('#orderModal').modal('show');
    },
    //testing
    updateOrders(){ 
      const vm=this;    
      let api =`${process.env.APIPATH}/api/${process.env.CUSTOMPATH}/order`; 
      //新增  
      let httpMethod='post';
      if(!vm.isNew){
        api=`${process.env.APIPATH}/api/${process.env.CUSTOMPATH}/admin/order/${vm.tempOrders.id}`;         
        //修改
        httpMethod='put';
        }
        console.log(process.env.APIPATH,process.env.CUSTOMPATH);
        this.$http[httpMethod](api,{data:vm.tempOrders}).then((response) => {
          console.log(response.data);
          if(response.data.success){
            $('#orderModal').modal('hide');
            vm.getOrders();
          }else{
            $('#orderModal').modal('hide');
            vm.getOrders();
            console.log('新增失敗');
          }
        });
    },
    //testing
    productKey(id){
      const vm = this;
      let productId = Object.keys(vm.orders[id].products)[0];   //'products' of undefined >
      console.log(productId);
      let data = vm.orders[id].products[productId];
      let str = `${data.product.title} * ${data.qty}`;
      return str;
    },
  
   },  
  
  created(){
    this.getOrders();
    
  },

}
</script>

