<template>
  <div>
    <el-container>
      <el-header>
        <Topbar></Topbar>
      </el-header>
    <el-container>
      <el-aside width="15%">
          <el-row class="tac">
              <el-col>
                  <h5>默认颜色</h5>
                  <el-menu
                          router :default-active="$route.path"
                          class="el-menu-vertical-demo"
                          @open="handleOpen"
                          @close="handleClose">
                      <el-menu-item >
                          <i class="el-icon-document"></i>
                          <span slot="title">我的信息</span>
                      </el-menu-item>
                  </el-menu>
              </el-col>
          </el-row>
      </el-aside>  
    <el-container>
      <el-main>
      <el-form  class="Info-container" label-position="left"
          label-width="90px" v-loading="loading">
        <h2 class="title">个人信息</h2>
        <el-form-item label="用户名：">
          <el-input type="text" v-model="user.username" auto-complete="off" disabled></el-input>
        </el-form-item>
        <el-form-item label="密码：">
          <el-input type="password" v-model="user.passwd" auto-complete="off" :disabled="ischange"></el-input>
        </el-form-item>    
        <el-form-item label="邮箱：">
          <el-input type="email" v-model="user.email" auto-complete="off" :disabled="ischange"></el-input>
        </el-form-item>
        <el-form-item label="电话：">
          <el-input type="text" v-model="user.phoneNum" auto-complete="off" :disabled="ischange"></el-input>
        </el-form-item>
        <el-form-item label="创建日期：">
          <el-input type="text" v-model="user.create_time" auto-complete="off" disabled></el-input>
        </el-form-item>
        <el-form-item style="width: 75%">
          <el-button type="primary" @click="changeinfo" style="width: 50%">编辑</el-button>
        </el-form-item>
        <el-form-item style="width: 75%">
          <el-button @click="preserve" style="width: 50%">保存</el-button>
        </el-form-item>
      </el-form>
      </el-main>
    </el-container>
    </el-container>
    </el-container>
  </div>
</template>

<script>
  import Topbar from "../components/Topbar";
  export default {
      name: "RecycleBin",
      components:{
          Topbar,
      },
      data(){
        return {
          checked: true,
          ischange: 1,
          user: {
            username: "",
            passwd: "",
            email:"",
            phoneNum:"", 
            create_time:"",
          },
          loading: false,

        }
      },
      methods: {
        changeinfo:function(){
            this.ischange=0;
        },
        preserve(){
            const emailPattern =  /^([a-zA-Z0-9_-])+@([a-zA-Z0-9_-])+(.[a-zA-Z0-9_-])+/;
            const phoneNumPattern = /^1[3|4|5|7|8][0-9]{9}$/;
            if(this.user.passwd == ''){
              alert("密码不能为空");
            }
            else if(!emailPattern.test(this.user.email)){
              alert("请输入正确的邮箱");
            }
            else if(!phoneNumPattern.test(this.user.phoneNum)){
              alert("请输入正确的电话号码");
            }
            else{
              this.ischange=1;
              this.$http.post("http://rap2.taobao.org:38080/app/mock/262266/changePerInfo",{
                param:{
                  userID: sessionStorage.getItem("userId"),
                  passwd: this.passwd,
                  email: this.email,
                  phoneNum: this.phoneNum
                }
              })
              .then(res=>{
                if(res.data.success){
                  alert("保存成功");
                }
                else{
                  alert("修改失败");
                }
              })              
            }
        },
  },
  created() {
      this.$http.get("http://rap2.taobao.org:38080/app/mock/262266/personalInfo",{
        param:{
          userid:sessionStorage.getItem("userId"),
        }
      }).then(res=>{
        if(res.data.success){
          this.user.username= res.data.username;
          this.user.passwd= res.data.passwd;
          this.user.email= res.data.email;
          this.user.phoneNum= res.data.phoneNum;
          this.user.create_time= res.data.create_time;
        }
        else{
          alert(res.data.msg);
        }
      })
  }
}
</script>

<style>
  .Info-container {
    border-radius: 15px;
    background-clip: padding-box;
    margin: 90px auto;
    width: 450px;
    padding: 35px 35px 15px 35px;
    background: #fff;
    border: 1px solid #eaeaea;
    box-shadow: 0 0 25px #cac6c6;
  }

  .title {
    margin: 0px auto 5px auto;
    text-align: center;
    color: #505458;
  }
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
</style>