<template>
  <div class="full">
    <el-form  class="Register-container" label-position="left"
              label-width="80px" v-loading="loading">
      <h3 class="Register_title">注册</h3>
      <el-form-item prop="account" label="账号">
        <el-input type="text" v-model="RegisterForm.username" auto-complete="off" placeholder="账号"></el-input>
      </el-form-item>
      <el-form-item prop="checkPass" label="密码">
        <el-input type="password" v-model="RegisterForm.password1" auto-complete="off" placeholder="请输入您的密码"></el-input>
      </el-form-item>
      <el-form-item prop="checkPass">
        <el-input type="password" v-model="RegisterForm.password2" auto-complete="off" placeholder="请重复输入密码"></el-input>
      </el-form-item>
      <el-form-item prop="checkPass" label="邮箱">
        <el-input type="email" v-model="RegisterForm.email" auto-complete="off" placeholder="请输入您的邮箱" style="float:left;width: 160px"></el-input>
        <el-button type="primary" style="float: right;font-size: 5px" @click="sendEmail">发送验证码</el-button>
      </el-form-item>
      <el-form-item prop="checkPass" label="验证码">
        <el-input type="text" v-model="RegisterForm.code" auto-complete="off" placeholder="请输入验证码" ></el-input>
      </el-form-item>
      <br>
      <el-form-item style="width: 80%">
        <el-button type="primary" @click="submit" style="width: 100%">注册</el-button>
      </el-form-item>
    </el-form>
  </div>

</template>
<script>
  export default{
    data(){
      return {
        checked: true,
        RegisterForm: {
          username: '',
          password1: '',
          password2: '',
          email: '',
          code: '',
        },
        loading: false
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
        else if (this.RegisterForm.password1!==this.RegisterForm.password2){
          // alert("两次密码不一致，请重新输入");
          this.$message({
            message: '两次密码不一致，请重新输入',
            type: 'warning'
          });
        }
        else{
          this.$http.post(this.requestUrl + "/register",//
                  {
                    username:this.RegisterForm.username,
                    password:this.RegisterForm.password1,
                    email:this.RegisterForm.email,
                    code:this.RegisterForm.code
          }).then(res=>{ //严：springboot开启8081端口测试
          // this.$http.post(this.requestUrl+"/register",this.user).then(res=>{
          //   if (this.RegisterForm.password1==3){
            if (res.data.success){
              sessionStorage.setItem("username",this.RegisterForm.username);
              sessionStorage.setItem("userId",res.data.ID);
              // alert(res.data.msg);
              this.$message({
                message: res.data.msg,
                type: 'success'
              });
              this.$router.push("/homepage");
            }
            else{
              this.$message.error({
                message: res.data.msg,
                type: 'danger'
              });
              this.$router.push("/register");
            }
          })
        }
      },
      sendEmail(){
        this.$http.get(this.requestUrl+"/sendEmail",{
          params:{
            email:this.RegisterForm.email
          }
        }).then(res=>{
          if (!res.data.success) {
            this.$message.error("发送失败");
          }
          else {
            this.$message({
              message: '已发送，请接收',
              type: 'success'
            });
          }
        })
      }
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
  .full{
    background:url("../assets/backgroud1.jpg");
    width:100%;
    height:100%;
    position:fixed;
    background-size:100% 100%;
  }
</style>