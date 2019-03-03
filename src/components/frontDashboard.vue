<template>
<div>
  <!-- headers -->
  <nav class="navbar navbar-expand-md navbar-dark bg-dark">
    <a class="navbar-brand" href="#">
      <i class="fas fa-campground fa-2x text-light"></i>Outdoor Shop
    </a>
    <div class="collapse navbar-collapse" id="navbarNav">
      <ul class="navbar-nav">
        <li class="nav-item active">
          <router-link class="nav-link text-light px-3" to="/front/home">Home</router-link>           
        </li>
        <li class="nav-item">          
          <router-link class="nav-link text-light px-3" to="/front/shopping_proall">Product</router-link>
        </li>
        <li class="nav-item">
          <router-link class="nav-link text-light px-3" to="/">Administrator</router-link>
        </li>
      </ul>
    </div>
    <!-- 購物車內的數量 (Button 內包含 icon, 數量 badge) -->
    <div class="dropdown ml-auto">
      <button class="btn btn-sm btn-cart" data-toggle="dropdown" data-flip="false">
        <i class="fa fa-shopping-cart text-white fa-2x" aria-hidden="true"></i>
        <span class="badge badge-pill badge-danger">9</span>
        <span class="sr-only">unread messages</span>
      </button>
      <div class="dropdown-menu dropdown-menu-right p-3 rounded-0" style="min-width: 300px" data-offset="400">
        <h6>已選擇商品</h6>
        <table class="table table-sm">
          <tbody>
            <tr>
              <td class="align-middle text-center">
                <a href="#removeModal" class="text-muted" data-toggle="modal" data-title="刪除 金牌西裝 1 件">
                  <i class="fa fa-trash-o" aria-hidden="true"></i>
                </a>
              </td>
              <td class="align-middle">金牌西裝</td>
              <td class="align-middle">1 件</td>
              <td class="align-middle text-right">$520</td>
            </tr>
            <tr>
              <td class="align-middle text-center">
                <a href="#removeModal" class="text-muted" data-toggle="modal" data-title="刪除 金牌女裝 1 件">
                  <i class="fa fa-trash-o" aria-hidden="true"></i>
                </a>
              </td>
              <td class="align-middle">金牌女裝</td>
              <td class="align-middle">1 件</td>
              <td class="align-middle text-right">$480</td>
            </tr>
          </tbody>
        </table>
        <a href="#" class="btn btn-dark btn-block rounded-0">
          <i class="fa fa-cart-plus" aria-hidden="true"></i> 結帳去
        </a>
      </div>
    </div>
  </nav>
  
  <!--main content-->
  <div class="">
    <router-view></router-view> 
  </div>

  <!--footer-->
  <footer class="bg-dark text-white py-3">
    <div class="container">
      <ul class="list-inline text-center">
        <div class="input-group mb-3 w-50 mx-auto">
          <h5>Contact us</h5>
          <input type="text" class="form-control ml-2" placeholder="Enter your email">          
          <div class="input-group-append">
            <button class="btn btn-secondary rounded-0">Go</button>
          </div>
        </div>
        <li class="list-inline-item">
          <a class="text-white" href="#"><i class="fab fa-instagram"></i>&ensp;Instagram</a>
        </li>
        <li class="list-inline-item">
          <a class="text-white" href="#"><i class="fab fa-facebook"></i>&ensp;Facebook</a>  
        </li>
        <li class="list-inline-item">
          <a class="text-white" href="#"><i class="fab fa-line"></i>&ensp;Line</a>   
        </li>
      </ul>
      <p class="text-center">© Copright 2019 Outdoor Shop
        <i class="fas fa-campground text-light"></i>   
      </p>
      
    </div>
  </footer>

</div>
</template>