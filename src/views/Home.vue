<template>
<el-container>
  <el-header>
    <div>
      <el-button type="primary" @click="GotoRegister">注册</el-button>
      <el-button type="success" @click="GotoLogin">登录</el-button>
    </div>
  </el-header>
  <el-main>
    <img src='../assets/logo.png'>
  </el-main>
</el-container>

</template>

<script>

export default {
  name: 'Home',
  components: {
    
  },
  methods:{
    GotoRegister:function(){
       this.$router.push({path:'/register'});
    },
    GotoLogin:function(){
       this.$router.push({path:'/login'});
    }
  }
}
</script>

<style scoped>
  .el-header, .el-footer {
    background-color: white;
    color: #333;
    text-align: center;
    line-height: 60px;
  }

  .el-aside {
    background-color: white;
    color: #333;
    text-align: center;
    /*line-height: 200px;*/
  }

  .el-main {
    background-color: #E9EEF3;
    color: #333;
    text-align: center;
    line-height: 160px;
    overflow-y: hidden;
  }

  body > .el-container {
    margin-bottom: 40px;
  }

  .el-container:nth-child(5) .el-aside,
  .el-container:nth-child(6) .el-aside {
    line-height: 260px;
  }

  .el-container:nth-child(7) .el-aside {
    line-height: 320px;
  }
  .el-dropdown-link {
    cursor: pointer;
    color: #409EFF;
  }
  .el-icon-arrow-down {
    font-size: 12px;
  }
  .demonstration {
    display: block;
    color: #8492a6;
    font-size: 14px;
    margin-bottom: 20px;
  }
  html,body,#app,.el-container{
    /*设置内部填充为0，几个布局元素之间没有间距*/
    padding: 0px;
    /*外部间距也是如此设置*/
    margin: 0px;
    /*统一设置高度为100%*/
    height: 100%;
  }
</style>
