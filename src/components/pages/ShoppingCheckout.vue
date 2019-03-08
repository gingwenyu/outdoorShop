<template>
  <div>
    <loading :active.sync="isLoading"></loading>
    <div class="container main-contant py-5">
      <!--結帳流程-->
      <h1 class="text-center mb-3 text-secondary">結帳</h1>
      <section class="form-row align-items-center text-center">
        <div class="col">
          <div class="alert alert-success alert-rounded mb-0" role="alert">
            1.輸入訂單資料
          </div>
        </div>
        <div class="col">
          <div class="alert alert-light alert-rounded mb-0" role="alert">
            2.金流付款
          </div>
        </div>
        <div class="col">
          <div class="alert alert-light alert-rounded mb-0" role="alert">
            3.完成
          </div>
        </div>
      </section>

      <section class="row justify-content-center mt-5">
        <div class="col-md-8">
          <div class="card">
            <div class="card-header" id="headingOne">
              <h6 class="mb-0 d-flex align-items-center">
                <a data-toggle="collapse" href="#collapseOne">
                  顯示購物車細節
                  <i class="fa fa-angle-down" aria-hidden="true"></i>
                </a>
                <span class="h3 ml-auto mb-0">{{total}}</span>
              </h6>
            </div>
          </div>
          <div id="collapseOne" class="collapse mt-3">
            <table class="table table-sm">
              <thead>
                <tr>
                  <th width="30"></th>
                  <th width="100"></th>
                  <th>商品名稱</th>
                  <th width="100" class="text-right">數量</th>
                  <th width="80" class="text-right">小計</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="item in cart.carts" :key="item.id">
                  <td class="align-middle">
                    <button type="button" class="btn btn-outline-danger border-0"
                      @click="removeCartItem(item.id)">
                      <i class="far fa-trash-alt fa-1x"></i>
                    </button>   
                  </td>
                  <td class="align-middle">
                    <img :src="`${item.product.imageUrl}`" 
                      style="height: 100px; background-size: cover; background-position: center"/>
                  </td>
                  <td class="align-middle">{{item.product.title}}</td>
                  <td class="align-middle text-right">{{item.qty}}{{item.product.unit}}</td>
                  <td class="align-middle text-right">{{item.product.price|currency}}</td>
                </tr>
                <tr>
                  <td colspan="4" class="text-right">運費</td>
                  <td class="text-right">
                    <strong>$100</strong>
                  </td>
                </tr>
                <tr>
                  <td colspan="4" class="text-right">合計</td>
                  <td class="text-right">
                    <strong>{{total}}</strong>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>

          <h5 class="py-3 mt-5 mb-2 text-center bg-light">
            訂購人資訊
          </h5>
          <form id="needs-validation" @submit.prevent="createOrder()">
            <div class="form-row">
              <div class="form-group col-md-6">
                <label for="name">姓名</label>
                <div class="input-group mb-3">
                  <input type="text" class="form-control" name="name" v-validate="'required'" placeholder="請輸入姓名" id=""
                    v-model="form.user.name" :class="{'is-invalid':errors.has('name')}">
                  <span class="text-danger" v-if="errors.has('name')">姓名必須填寫</span>  
                </div>
              </div>
              <div class="form-group col-md-6">
                <label for="">電話</label>
                <div class="input-group mb-3">
                  <input type="tel" class="form-control" name="tel" v-validate="'required'" placeholder="請輸入電話" id=""
                    v-model="form.user.tel" :class="{'is-invalid':errors.has('tel')}">
                  <span class="text-danger" v-if="errors.has('tel')">電話必須填寫</span>  
                </div>
              </div>
            </div>
            <div class="form-group">
              <label for="">Email</label>
              <div class="input-group mb-3">
                <input type="email" class="form-control" name="email" v-validate="'required|email'" placeholder="請輸入email" id=""
                  v-model="form.user.email" :class="{'is-invalid':errors.has('email')}">
                <span class="text-danger" v-if="errors.has('email')">
                  {{ errors.first('email') }}
                </span> 
              </div>
            </div>
            <div class="form-row">
              <div class="form-group col-md-4">
                <label for="state">國家</label>
                <select id="state" class="form-control" required>
                  <option selected>台灣</option>
                  <option>...</option>
                </select>
              </div>
              <div class="form-group col-md">
                <label for="city">城市</label>
                <select name="" id="city" class="form-control" required>
                  <option value="台北市">台北市</option>
                  <option value="台中市">台中市</option>
                  <option value="高雄市">高雄市</option>
                  <option value="...">...</option>
                </select>
              </div>
              <div class="form-group col-md">
                <label for="post">郵遞區號</label>
                <input type="text" class="form-control" name="post" v-validate="'required'" placeholder="請輸入郵遞區號" id="post"
                  v-model="form.user.postCode" :class="{'is-invalid':errors.has('post')}">
                <span class="text-danger" v-if="errors.has('add')">郵遞區號必須填寫</span>  
              </div>
            </div>
            <div class="form-group">
              <label for="">地址</label>
              <div class="input-group mb-3">
                <input type="address" class="form-control" name="add" v-validate="'required'" placeholder="請輸入地址" id=""
                  v-model="form.user.address" :class="{'is-invalid':errors.has('add')}">
                <span class="text-danger" v-if="errors.has('add')">地址必須填寫</span>
              </div>
            </div>
            <div class="text-right">
              <router-link class="btn btn-secondary" to="/front/shopping_proall">
                繼續選購
              </router-link>
              <button type="submit" class="btn btn-primary">確認付款</button>
              
            </div>
          </form>
          
        </div>
      </section>
    </div>
  </div>
</template>

<script>
import $ from 'jquery';

export default{
  data(){
    return{
      cart:{
        carts:{},
      },
      total:{},
      form:{
        user:{
          name:'',
          tel:'',
          email:'',
          country:'',    
          city:'',
          postCode:'',
          address:'',
        },
        message:'',  
      },
      isLoading:false,
    }; 
  },
  methods:{
    getCart(){   
      const url =`${process.env.APIPATH}/api/${process.env.CUSTOMPATH}/cart`;  
      //取得購物車列表/api/:api_path/cart
      const vm=this;
      vm.isLoading=true;
      this.$http.get(url).then((response) => {
        console.log(response);
        vm.cart = response.data.data; 
        vm.total = response.data.data.total+100;
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
    createOrder(){
      const vm=this;
      const url =`${process.env.APIPATH}/api/${process.env.CUSTOMPATH}/order`; 
      //結帳頁面/api/:api_path/order 
      const order=vm.form;
      //vm.isLoading=true;
      this.$validator.validate().then((result)=>{
        if(result){
          this.$http.post(url,{data:order}).then((response) => {
            alert('訂單已建立');
            console.log('訂單已建立',response);
            if(response.data.success){
              vm.$router.push(`/front/shopping_done/${response.data.orderId}`);
            }
            vm.isLoading=false;
          });
        }else{          
          alert('欄位不完整');   
        }
      });
    },


  },
  
  created(){
    this.getCart();
  },

};
</script>
              

