<template>
  <div>
    <loading :active.sync="isLoading"></loading>
    
    <table class="table mt-4">
      <thead>
        <tr>
          <th width="100">購買時間</th>
          <th width="200">Email</th>
          <th>購買品項</th>
          <th width="100">應付金額</th> 
          <th width="100">是否付款</th> 
        </tr>
      </thead>
      <tbody>
        <tr v-for="(item) in orders" :key="item.id">
          <td>{{item.create_at}}</td>
          <td>{{item.user.email}}</td>
          <td>{{item.products}}</td>
          <td class="text-right">{{item.total}}</td>
          <td class="text-danger">{{item.is_paid}}</td>
        </tr>
      </tbody>
    </table>

    <nav aria-label="Page navigation example">
      <ul class="pagination">
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

  </div>
</template>

<script>
import $ from 'jquery';

export default{
  data(){
    return{
      orders:[],
      pagination:{},
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
        vm.pagination=response.data.pagination;
      });
    },
  
   },  
  
  created(){
    this.getOrders();
    
  },

}
</script>

