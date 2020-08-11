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

<style>
.el-header, .el-footer {
  background-color: #B3C0D1;
  color: #333;
  text-align: center;
  line-height: 60px;
}

.el-aside {
  background-color: #D3DCE6;
  color: #333;
  text-align: center;
  line-height: 200px;
}

.el-main {
  background-color: #E9EEF3;
  color: #333;
  text-align: center;
  line-height: 160px;
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
</style>
