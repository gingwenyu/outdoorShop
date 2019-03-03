<template>
  <div>
    <loading :active.sync="isLoading"></loading>
    <div class="text-right mt-4">
      <button class="btn btn-primary" @click="openModal(true)">建立新優惠券</button>
      <!--data-toggle="modal" data-target="#couponModal"-->
    </div>  
    <table class="table mt-4">
      <thead>
        <tr>
          <th>名稱</th>
          <th width="120">折扣百分比</th>
          <th width="120">到期日</th>
          <th width="120">是否啟用</th>
          <th width="80">編輯</th> 
          <th width="80">刪除</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="item in coupons" :key="item.id">
          <td>{{item.title}}</td>
          <td>{{item.percent}}</td>
          <td>{{item.due_date}}</td>
          <td>
            <span v-if="item.is_enabled" class="text-success">啟用</span>
            <span v-else>未啟用</span>
          </td>
          <td>
            <button class="btn btn-outline-primary btn-sm" @click="openModal(false,item)">編輯</button>
          </td>
          <td>
            <button class="btn btn-outline-danger btn-sm" @click="delModal(item.id)">刪除</button>
          </td>
          
        </tr>
      </tbody>
    </table>

    <nav aria-label="Page navigation example">
      <ul class="pagination justify-content-center">
        <li class="page-item" :class="{'disabled':!pagination.has_pre}">
          <a class="page-link" href="#" aria-label="Previous"
             @click.prevent="getCoupons(pagination.current_page-1)">
            <span aria-hidden="true">&laquo;</span>
            <span class="sr-only">Previous</span>
          </a>
        </li>
        <li class="page-item" v-for="page in pagination.total_pages" :key="page"
            :class="{'active':pagination.current_page===page}">
          <a class="page-link" href="#" @click.prevent="getCoupons(page)">{{page}}</a>
        </li>        
        <li class="page-item" :class="{'disabled':!pagination.has_next}">
          <a class="page-link" href="#" aria-label="Next"
             @click.prevent="getCoupons(pagination.current_page+1)">
            <span aria-hidden="true">&raquo;</span>
            <span class="sr-only">Next</span>
          </a>
        </li>
      </ul>
    </nav>

    <!-- Modal -->
    <div class="modal fade" id="couponModal" tabindex="-1" role="dialog"
      aria-labelledby="exampleModalLabel" aria-hidden="true">
      <div class="modal-dialog modal-lg" role="document">
        <div class="modal-content border-0">
          <div class="modal-header bg-dark text-white">
            <h5 class="modal-title" id="exampleModalLabel">
              <span>新增優惠券</span>
            </h5>
            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div class="modal-body">
            <div class="form-group">
              <label for="title">標題</label>
              <input type="text" class="form-control" id="title"
                v-model="tempCoupons.title" 
                placeholder="請輸入標題">

              <label for="code">優惠碼</label>
              <input type="text" class="form-control" id="code"
                v-model="tempCoupons.id"    
                placeholder="code"> 

              <label for="date">到期日</label>
              <input type="date" class="form-control" id="date"
                v-model="tempCoupons.due_date"  
                placeholder="date"> 

              <label for="percent">折扣百分比</label>
              <input type="number" class="form-control" id="percent"
                v-model="tempCoupons.percent"  
                placeholder="%"> 
            </div>

            <div class="form-group">
              <div class="form-check">
                <input class="form-check-input" type="checkbox"
                  id="is_enabled" v-model="tempCoupons.is_enabled"
                  :true-value="1" :false-value="0">                      
                <label class="form-check-label" for="is_enabled">
                  是否啟用
                </label>
              </div>
            </div>
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-outline-secondary" data-dismiss="modal">取消</button>
            <button type="button" class="btn btn-primary" @click="updateCoupons">更新優惠券</button>
          </div>
        </div>
      </div>
    </div>
    <div class="modal fade" id="delCouponModal" tabindex="-1" role="dialog"
      aria-labelledby="exampleModalLabel" aria-hidden="true">
      <div class="modal-dialog" role="document">
        <div class="modal-content border-0">
          <div class="modal-header bg-danger text-white">
            <h5 class="modal-title" id="exampleModalLabel">
              <span>刪除優惠券</span>
            </h5>
            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div class="modal-body">
            是否刪除 <strong class="text-danger">{{ tempCoupons.title }}</strong>(刪除後將無法恢復)。 <!--在modal上無法顯示商品名稱-->
          </div>
          <div class="modal-footer">  <!--testing-->
            <button type="button" class="btn btn-outline-secondary" data-dismiss="modal">取消</button>
            <button type="button" class="btn btn-danger" @click="delConfirm()"
              >確認刪除</button><!--testing-->
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
      coupons:[],
      pagination:{},
      tempCoupons:{},
      isNew:false,
      isLoading:false,
      status:{
        fileUploading:false,
      },
    }; 
  },
  methods:{
    getCoupons(page=1){
      const api =`${process.env.APIPATH}/api/${process.env.CUSTOMPATH}/admin/coupons?page=${page}`; 
      //取得優惠券列表/api/:api_path/admin/coupons?page=:page  
      const vm=this; 
      console.log(process.env.APIPATH,process.env.CUSTOMPATH);
      vm.isLoading=true;
      this.$http.get(api).then((response) => {
        console.log(response.data);
        vm.isLoading=false;
        vm.coupons=response.data.coupons;
        vm.pagination=response.data.pagination;
      });
    },
    openModal(isNew,item){      
      if(isNew){
        this.tempCoupons={};
        this.isNew=true;
      }else{
        this.tempCoupons=Object.assign({},item);    //因為物件傳參考特性，避免兩邊的值變相同
        this.isNew=false;    
      }
      $('#couponModal').modal('show');
    },
    delModal(id){
      $('#delCouponModal').modal('show');
      const vm=this; 
      const api =`${process.env.APIPATH}/api/${process.env.CUSTOMPATH}/admin/coupon/${id}`;
      //刪除優惠券 /api/:api_path/admin/coupon/:coupon_id 
      this.$http.delete(api).then((response) => {
        console.log(response.data);
      });
    },
    //testing need to fix
    delConfirm(){
      //const vm=this; 
      //const api =`${process.env.APIPATH}/api/${process.env.CUSTOMPATH}/admin/coupon/${vm.coupons[0].id}`;
      ////刪除優惠券 /api/:api_path/admin/coupon/:coupon_id 
      //this.$http.delete(api).then((response) => {
      //  console.log(response.data);
      //  //vm.coupons.splice(vm.coupons[0].id, 1);  
      //});
      $('#delCouponModal').modal('hide');
      vm.getCoupons();
      //要修改三處:1.modal商品名稱沒有顯示  2.選取刪除第幾個項目(迴圈or偵測行為   3.刪除之後的畫面更新 
    },
    updateCoupons(){
      let api =`${process.env.APIPATH}/api/${process.env.CUSTOMPATH}/admin/coupon`; 
      //新增優惠券/api/:api_path/admin/coupon  
      let httpMethod='post';
      const vm=this; 
      if(!vm.isNew){
        api=`${process.env.APIPATH}/api/${process.env.CUSTOMPATH}/admin/coupon/${vm.tempCoupons.id}`;
        //修改優惠券/api/:api_path/admin/coupon/:id
        httpMethod='put';
      }
      console.log(process.env.APIPATH,process.env.CUSTOMPATH);
      this.$http[httpMethod](api,{data:vm.tempCoupons}).then((response) => {
        console.log(response.data);
        if(response.data.success){
          $('#couponModal').modal('hide');
          vm.getCoupons();
        }else{
          $('#couponModal').modal('hide');
          vm.getCoupons();
          console.log('新增失敗');
        }
        //vm.products=response.data.products;
      });
    },
   
   },  
  
  created(){
    this.getCoupons();
    
  },

}
</script>

