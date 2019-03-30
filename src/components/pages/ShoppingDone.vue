<template>
  <div>
    <loading :active.sync="isLoading"></loading>
    <div class="container main-contant py-5">
      <div class="row justify-content-center">
        <div class="col-md-8">
          <h1 class="text-center mb-3 text-secondary">結帳完成</h1>
          <section class="form-row align-items-center text-center">
            <div class="col">
              <div class="alert alert-success alert-rounded mb-0" role="alert">
                完成
              </div>
            </div>
          </section>
          
          <h4 class="text-center my-4">購買資訊</h4>
          <table class="table table-sm">
              <thead>
                <tr>
                  <th width="50">圖片</th>
                  <th>商品名稱</th>
                  <th width="100" class="text-right">數量</th>
                  <th width="80" class="text-right">小計</th>
                </tr>
              </thead>
              <tbody v-for="item in order.products" :key="item.id">
                <tr>
                  <td class="align-middle">
                    <img :src="`${item.product.imageUrl}`" 
                      style="height: 100px; background-size: cover; background-position: center"/>
                  </td>
                  <td class="align-middle">{{item.product.title}}</td>
                  <td class="align-middle text-right">{{item.qty}}{{item.product.unit}}</td>
                  <td class="align-middle text-right">{{item.qty*item.product.price|currency}}</td>
                </tr>
                <tr>
                  <td colspan="3" class="text-right">運費</td>
                  <td class="text-right">
                    <strong>$100</strong>
                  </td>
                </tr>
                <tr>
                  <td colspan="3" class="text-right">合計</td>
                  <td class="text-right">
                    <strong>{{item.total+100|currency}}</strong>
                  </td>
                </tr>                  
                <tr v-if="item.final_total!==item.total">
                  <td class="text-right text-success" colspan="3">折扣價</td>  
                  <td class="text-right text-success">{{item.final_total|currency}}</td>  
                </tr>
                <tr v-if="item.total+100-item.final_total!==100">    
                  <td class="text-right" colspan="3">總計</td>  
                  <td class="text-right">{{item.total+100-item.final_total|currency}}</td>                
                </tr>  
              </tbody>
          </table>
          
          <hr>
          <h4 class="text-center my-4">個人資料</h4>
          <table class="table">
            <tbody>
              <tr>
                <th>姓名 </th>
                <td>{{ order.user.name }}</td>
              </tr>
              <tr>
                <th>電話 </th>
                <td>{{ order.user.tel }}</td>
              </tr>
              <tr>
                <th width="200">Email</th>
                <td>{{ order.user.email }}</td>
              </tr>
              <tr>
                <th>地址 </th>
                <td>{{ order.user.address }}</td>
              </tr>
            </tbody>
          </table>
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
      order:{
        products:{},  
        user:{},
      },
      orderId:'',     
      isLoading:false,
    }; 
  },
  methods:{    
    getOrder(){
      const vm=this;
      const url =`${process.env.APIPATH}/api/${process.env.CUSTOMPATH}/order/${vm.orderId}`; 
      vm.isLoading=true;
      this.$http.get(url).then((response) => {
        console.log(response);
        vm.order = response.data.order;
        vm.isLoading=false;
      });
    },
  
  },
  
  created(){
    this.orderId = this.$route.params.orderId;
    console.log(this.orderId);
    this.getOrder();      
  },

};
</script>
