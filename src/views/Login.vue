<template>
<!--  <div :style="{backgroundImage:'url('+require('@/assets/backgroud1.jpg')+')'}" style="height: 100%;width: 100%">-->
  <div class="full">
    <el-menu router :default-active="$route.path" class="el-menu-demo" mode="horizontal" @select="handleSelect">
      <el-menu-item style="font-weight: bold">金刚石文档</el-menu-item>
    </el-menu>
    <el-form  class="login-container" label-position="left"
              label-width="0px" v-loading="loading" style="margin-top: 7%">
      <h3 class="login_title">登录</h3>
      <el-form-item prop="account">
        <el-input type="text" v-model="user.username" auto-complete="off" placeholder="账号"></el-input>
      </el-form-item>
      <el-form-item prop="checkPass">
        <el-input type="password" v-model="user.password" auto-complete="off" placeholder="密码"></el-input>
      </el-form-item>
      <br>
      <el-form-item style="width: 100%">
        <el-button type="primary" @click="submit" style="width: 50%">登录</el-button>
      </el-form-item>
      <el-button type="text" @click="gotoRegister">还没有账号?快来注册吧</el-button>
      <!--    <router-link :to="{path:'/register'}" >还没有账号?快去注册</router-link>-->
    </el-form>
  </div>
</template>
<script>
  export default{
    data(){
      return {
        checked: true,
        user: {
          username: '',
          password: ''
        },
        loading: false,

      }
    },
    methods: {
      submit(){
        if(sessionStorage.getItem("username")!=null||sessionStorage.getItem("userId")!=null){
          // alert("您已登录");
          this.$message({
            message: '您已登录',
            type: 'warning'
          });
          this.$router.push("/homepage");
        }
        else {
          this.$http.post(this.requestUrl+"/login",this.user).then(res=>{
            // if (this.user.password==3){
              if (res.data.success){
              sessionStorage.setItem("username",this.user.username);
              sessionStorage.setItem("userId",res.data.ID);
              this.$router.push("/homepage");
            }
            else{
              // alert("登录失败");
              this.$message.error('登录失败！请重试');
              this.$router.push("/login");
            }
          })
        }
      },
      gotoRegister(){
        this.$router.push("/register");
      }
    }
}
</script>
<style>
  .login-container {
    border-radius: 15px;
    background-clip: padding-box;
    margin: 180px auto;
    width: 350px;
    padding: 35px 35px 15px 35px;
    background: #fff;
    border: 1px solid #eaeaea;
    box-shadow: 0 0 25px #cac6c6;
  }

  .login_title {
    margin: 0px auto 40px auto;
    text-align: center;
    color: #505458;
  }

  .login_remember {
    margin: 0px 0px 35px 0px;
    text-align: left;
  }

  body{
    margin:0;
    padding:0;
  }
  .full{
    background:url("../assets/backgroud1.jpg");
    width:100%;
    height:100%;
    position:fixed;
    background-size:100% 100%;
  }
</style>
