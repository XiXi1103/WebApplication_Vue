<template>
    <div>
        <el-menu :default-active="activeIndex" class="el-menu-demo" mode="horizontal" @select="handleSelect">
            <el-submenu index="1">
                <template slot="title">我的工作台</template>
                <el-menu-item index="2-1">最近使用</el-menu-item>
                <el-menu-item index="2-2">我的收藏</el-menu-item>
                <el-menu-item index="2-3">我创建的</el-menu-item>
                <!--   <el-submenu index="2-4">
                     <template slot="title">选项4</template>
                     <el-menu-item index="2-4-1">选项1</el-menu-item>
                     <el-menu-item index="2-4-2">选项2</el-menu-item>
                     <el-menu-item index="2-4-3">选项3</el-menu-item>
                   </el-submenu> -->
            </el-submenu>
            <el-menu-item index='/Login' >团队空间</el-menu-item>
            <el-menu-item index="3"> 回收站</el-menu-item>
            <el-submenu index="4" style="float:right">
                <template slot="title" >{{username}}</template>
                <el-menu-item index="4-1" @click="GotoPersonalInfo" v-show="!isshow">个人信息</el-menu-item>
                <el-menu-item index="4-2" @click="logout" v-show="!isshow">退出登录</el-menu-item>
                <el-menu-item index="4-3" @click="GotoLogin" v-show="isshow">登录/注册</el-menu-item>
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
            logout() {
                this.username = "游客";
                this.status = "登录";
                this.isshow = false;
                sessionStorage.clear();
            },
            GotoLogin: function () {
                this.$router.push({path: '/login'});
            },
            GotoPersonalInfo:function(){
            this.$http.get('http://rap2.taobao.org:38080/app/mock/262266/personalinfo?username='+this.username)
            .then(function(response){
                console.log(response);
                sessionStorage.setItem("username",response.data.username);
                sessionStorage.setItem("passwd",response.data.passwd);
                sessionStorage.setItem("email",response.data.email);
                sessionStorage.setItem("phone_num",response.data.phone_num);
                sessionStorage.setItem("create_time",response.data.create_time);
            }),
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