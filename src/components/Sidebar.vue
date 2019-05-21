<template>
  <div>
     <nav class="col-md-2 d-none d-md-block bg-light sidebar">
         <div class="sidebar-sticky">
           <h6 class="sidebar-heading d-flex justify-content-between align-items-center px-3 mt-4 mb-1 text-muted">
             <span>管理員</span>
             <a class="d-flex align-items-center text-muted" href="#">
               <span data-feather="plus-circle"></span>
             </a>
           </h6>
           <ul class="nav flex-column mb-2">
             <li class="nav-item">               
               <router-link class="nav-link" to="/admin/products">
                 <i class="fas fa-box-open"></i>產品列表    
               </router-link>
             </li>      
             <li class="nav-item">
               <router-link class="nav-link" to="/admin/orders">
                 <i class="far fa-list-alt"></i>訂單列表                 
               </router-link>
             </li>       
             <li class="nav-item">
               <router-link class="nav-link" to="/admin/coupons">
                 <i class="fas fa-ticket-alt"></i>優惠券                
               </router-link>
             </li>              
           </ul>
           <h6 class="sidebar-heading d-flex justify-content-between align-items-center px-3 mt-4 mb-1 text-muted">
             <span>模擬功能</span>
             <a class="d-flex align-items-center text-muted" href="#">
               <span data-feather="plus-circle"></span>
             </a>
           </h6>
           <ul class="nav flex-column mb-2">
             <li class="nav-item">    
               <router-link class="nav-link" to="/customer_order">
                 <i class="fas fa-shopping-cart"></i>模擬訂單    
               </router-link>
             </li>              
           </ul>
         </div>
       </nav> 
       <!--testing-->
       <div class="nav-item dropdown d-block d-md-none mt-80">
        <a class="nav-link dropdown-toggle text-dark" href="#" id="navbarDropdownMenuLink" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
          管理員
        </a>
        <ul class="dropdown-menu" aria-labelledby="navbarDropdownMenuLink">          
          <li class="dropdown-item">               
            <router-link class="nav-link text-dark" to="/admin/products">
              <i class="fas fa-box-open"></i>產品列表    
            </router-link>
          </li>      
          <li class="dropdown-item">
            <router-link class="nav-link text-dark" to="/admin/orders">
              <i class="far fa-list-alt"></i>訂單列表                 
            </router-link>
          </li>       
          <li class="dropdown-item">
            <router-link class="nav-link text-dark" to="/admin/coupons">
              <i class="fas fa-ticket-alt"></i>優惠券                
            </router-link>
          </li>              
          <hr>
          <li class="dropdown-item">    
            <router-link class="nav-link text-dark" to="/customer_order">
              <i class="fas fa-shopping-cart"></i>模擬訂單    
            </router-link>
          </li>              
        </ul>
      </div>  
  </div>
</template>