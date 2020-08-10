<template>
  <el-form  class="Register-container" label-position="left"
           label-width="80px" v-loading="loading">
    <h3 class="Register_title">注册</h3>
    <el-form-item prop="account" label="账号">
      <el-input type="text" v-model="RegisterForm.username" auto-complete="off" placeholder="账号"></el-input>
    </el-form-item>
    <el-form-item prop="checkPass" label="密码">
      <el-input type="password" v-model="RegisterForm.password" auto-complete="off" placeholder="密码"></el-input>
    </el-form-item>
    <br>
    <el-form-item style="width: 80%">
      <el-button type="primary" @click="submit" style="width: 100%">注册</el-button>
    </el-form-item>
  </el-form>
</template>
<script>
  export default{
    data(){
      return {
        checked: true,
        RegisterForm: {
          username: '',
          password: ''
        },
        loading: false,
      }
    },
    methods: {
        
  }
}
</script>
<style>
  .Register-container {
    border-radius: 15px;
    background-clip: padding-box;
    margin: 180px auto;
    width: 350px;
    padding: 35px 35px 15px 35px;
    background: #fff;
    border: 1px solid #eaeaea;
    box-shadow: 0 0 25px #cac6c6;
  }

  .Register_title {
    margin: 0px auto 40px auto;
    text-align: center;
    color: #505458;
  }

  .Register_remember {
    margin: 0px 0px 35px 0px;
    text-align: left;
  }
</style>