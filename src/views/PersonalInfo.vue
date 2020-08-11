<template>
<div>
  <el-button icon="el-icon-arrow-left" @click="back"> 返回主页</el-button>
  <el-form  class="Info-container" label-position="left"
           label-width="90px" v-loading="loading">
    <h3 class="title">个人信息</h3>
    <el-form-item label="用户名：">
      <el-input type="text" v-model="user.username" auto-complete="off" disabled></el-input>
    </el-form-item>
    <el-form-item label="密码：">
      <el-input type="password" v-model="user.passwd" auto-complete="off" :disabled="ischange"></el-input>
    </el-form-item>    
    <el-form-item label="邮箱：">
      <el-input type="text" v-model="user.email" auto-complete="off" :disabled="ischange"></el-input>
    </el-form-item>
    <el-form-item label="电话：">
      <el-input type="text" v-model="user.phone_num" auto-complete="off" :disabled="ischange"></el-input>
    </el-form-item>
    <el-form-item label="创建日期：">
      <el-input type="text" v-model="user.create_time" auto-complete="off" disabled></el-input>
    </el-form-item>
    <br>
    <el-form-item style="width: 75%">
      <el-button type="primary" @click="changeinfo" style="width: 50%">编辑</el-button>
    </el-form-item>
    <el-form-item style="width: 75%">
      <el-button @click="preserve" style="width: 50%">保存</el-button>
    </el-form-item>
  </el-form>
</div>
</template>
<script>
  export default{
    data(){
      return {
        checked: true,
        ischange: 1,
        user: {
          username: "",
          passwd: "",
          email:"",
          phone_num:"", 
          create_time:"",
        },
        loading: false,

      }
    },
    methods: {
        changeinfo:function(){
            this.ischange=0;
        },
        preserve:function(){
            this.ischange=1;
            this.$http.post("http://rap2.taobao.org:38080/app/mock/262266/personalinfo",this.user)
            .then(res=>{console.log(res)})
        },
        back:function(){
          if(this.ischange == 0){
            this.$confirm('修改未保存，是否仍返回？','提示',{
              confirmButtonText:'确定',
              cancelButtonText:'取消',
              type:'warning'
            }).then(()=>{
              this.$router.push('/homepage');
            }).catch(()=>{
              
            })
          }
          else{
            this.$router.push('/homepage');
          }
          
        }
    },
    created() {
        this.user.username = sessionStorage.getItem("username");
        this.user.passwd = sessionStorage.getItem("passwd");
        this.user.email = sessionStorage.getItem("email");
        this.user.phone_num = sessionStorage.getItem("phone_num");
        this.user.create_time = sessionStorage.getItem("create_time");
    }
}
</script>
<style>
  .Info-container {
    border-radius: 15px;
    background-clip: padding-box;
    margin: 180px auto;
    width: 400px;
    padding: 35px 35px 15px 35px;
    background: #fff;
    border: 1px solid #eaeaea;
    box-shadow: 0 0 25px #cac6c6;
  }

  .title {
    margin: 0px auto 40px auto;
    text-align: center;
    color: #505458;
  }

</style>
