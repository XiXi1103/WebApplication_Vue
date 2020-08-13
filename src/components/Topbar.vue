<template>
    <div>
        <el-menu router :default-active="$route.path" class="el-menu-demo" mode="horizontal" @select="handleSelect">
            <el-menu-item style="font-weight: bold">金刚石文档</el-menu-item>
            <el-menu-item index="/homepage">我的工作台</el-menu-item>
            <el-menu-item index="/groupspace">团队空间</el-menu-item>
<!--                <el-menu-item index="2-2"><el-button type="info" style="float:left" @click="CreateTeam">创建团队</el-button></el-menu-item>-->
<!--                <el-menu-item index="2-3">我创建的</el-menu-item>-->
                <!--   <el-submenu index="2-4">
                     <template slot="title">选项4</template>
                     <el-menu-item index="2-4-1">选项1</el-menu-item>
                     <el-menu-item index="2-4-2">选项2</el-menu-item>
                     <el-menu-item index="2-4-3">选项3</el-menu-item>
                   </el-submenu> -->
            <el-menu-item index="">模板</el-menu-item>
            <!--            <el-menu-item index="/groupspace">团队空间</el-menu-item>-->
<!--            <el-menu-item index="/recyclebin">回收站</el-menu-item>-->
            <el-submenu index="4" style="float:right">
                <template slot="title" >{{username}}</template>
                <el-menu-item @click="GotoPersonalInfo" v-show="!isshow">个人信息</el-menu-item>
                <el-menu-item @click="logout" v-show="!isshow">退出登录</el-menu-item>
                <el-menu-item @click="GotoLogin" v-show="isshow">登录/注册</el-menu-item>
            </el-submenu>
            <el-menu-item index="5" style="float:right"> <i class="el-icon-bell"></i> </el-menu-item>
        </el-menu>
    </div>
</template>

<script>
    export default {
        data() {
            return {
                navList:[],
                username:"游客",
                passwd:"",
                email:"",
                phone_num:"",
                create_time:"",
                isshow: true,
                status: "退出登录",
            };
        },
        methods: {
            handleSelect(key, keyPath) {
                console.log(key, keyPath);
            },
            CreateTeam(){
                // this.$http.post("http://rap2.taobao.org:38080/app/mock/262266/register",this.user).then(res=>{
            },
            logout() {
                this.username = "游客";
                this.status = "登录";
                this.isshow = false;
                this.$router.push({path: '/'})
                sessionStorage.clear();
            },
            GotoLogin: function () {
                this.$router.push({path: '/login'});
            },
            GotoPersonalInfo:function(){
            this.$router.push({path:'/PersonalInfo'});
        }
        },
        created() {
            if (sessionStorage.getItem("username") != null) {
                this.isshow = false;
                this.username = sessionStorage.getItem("username");
            }
            else {
                this.isshow = true;
            }
        }
    }
</script>

<style scoped>

</style>