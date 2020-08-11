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
                <el-menu-item index="4-1" v-show="!isshow">个人信息</el-menu-item>
                <el-menu-item index="4-2" @click="logout" v-show="!isshow">退出登录</el-menu-item>
                <el-menu-item index="4-2" @click="GotoLogin" v-show="isshow">登录/注册</el-menu-item>
            </el-submenu>
            <el-menu-item index="5" style="float:right"> <i class="el-icon-bell"></i> </el-menu-item>
        </el-menu>
    </div>
</template>

<script>
    export default {
        data() {
            return {
                navList: [],
                username: "游客",
                isshow: true,
                status: "退出登录",
                name: "Topbar",
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