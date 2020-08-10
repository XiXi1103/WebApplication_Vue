<template>
    <div>
        登录注册界面
        <el-input v-model="user.username" placeholder="用户名"></el-input>
        <el-input v-model="user.passwd" placeholder="密码" type="password"></el-input>
        <input type="button" @click="submit" value="登录">
    </div>
</template>

<script>
    export default {
        name: "Login",
        data() {
            return {
                user:{}
            }
        },
        methods:{
            submit(){
                this.$http.post("http://rap2.taobao.org:38080/app/mock/262266/login",this.user).then(res=>{
                    if (this.user.passwd==3){//if (res.data.success){
                        alert(res.data.msg);
                        this.$router.push("/");
                        sessionStorage.setItem("username", this.user.username);//存入session
                        console.log(sessionStorage.getItem("username"));
                    }
                    else{
                        alert("登录失败");
                        this.$router.push("/login");
                    }
                })
            }
        }
    }

</script>

<style scoped>

</style>