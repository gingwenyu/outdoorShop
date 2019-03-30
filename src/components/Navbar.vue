<template>
  <div>
    <nav class="navbar navbar-dark fixed-top bg-dark flex-md-nowrap p-0 shadow">
      <router-link class="navbar-brand col-sm-3 col-md-2 mr-0" to="/front/home">
        <i class="fas fa-campground fa-2x text-light"></i>Outdoor Shop  
      </router-link>
      <!--<input class="form-control form-control-dark w-100" type="text" placeholder="Search" aria-label="Search">-->
      <ul class="navbar-nav px-3">        
        <li class="nav-item text-nowrap">
          <router-link to="/login" class="nav-link" href="#" >
            <i class="fas fa-sign-in-alt text-light mr-2"></i>Sign in
          </router-link>           
        </li>
        <li class="nav-item text-nowrap">
          <a class="nav-link" href="#" @click.prevent="signout">
            <i class="fas fa-sign-out-alt text-light mr-2"></i>Sign out
          </a>           
        </li>
      </ul>
    </nav>
  </div>
</template>

<script>
export default{
  name:'Navbar',
  methods:{
    signout(){
      const vm=this;
      const url=`${process.env.APIPATH}/logout`;
      this.$http.post(url).then((response) => {
        console.log(response.data);
        if(response.data.success){
          vm.$router.push('/signin');
        }
      });

    }
  }
}

</script>