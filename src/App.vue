<template>
  <div id="app">
    <img src="./assets/logo.png">
    <HelloWorld/>
    <h2>test h2-2</h2>
    <div class="card" style="width: 18rem;">  
    <div class="card-body">
      <h5 class="card-title">Card title</h5>
      <p class="card-text">Some quick example text to b the bulk of the card's content.</p>    
    </div>
  </div>
  </div>
</template>

<script>
import HelloWorld from './components/HelloWorld'

export default {
  name: 'App',
  created(){
    const api =`${process.env.APIPATH}/api/${process.env.CUSTOMPATH}/products`;
    //'http://localhost:3000/api/810382/products';
    // API伺服器路徑
    // 所申請的APIPath
    console.log(process.env.APIPATH,process.env.CUSTOMPATH);
    this.$http.get(api).then((response) => {
      console.log(response.data);
    })
  },
  components: {
    HelloWorld
  }
}
</script>

<style lang='scss'>
@import "~bootstrap/scss/bootstrap";

/*
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
*/
</style>
