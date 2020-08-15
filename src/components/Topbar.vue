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
            <el-menu-item index="/Template">模板</el-menu-item>
            <!--            <el-menu-item index="/groupspace">团队空间</el-menu-item>-->
<!--            <el-menu-item index="/recyclebin">回收站</el-menu-item>-->
            <el-submenu index="4" style="float:right">
                <template slot="title" >{{username}}</template>
                <el-menu-item @click="GotoPersonalInfo" v-show="!isshow">个人信息</el-menu-item>
                <el-menu-item @click="logout" v-show="!isshow">退出登录</el-menu-item>
                <el-menu-item @click="GotoLogin" v-show="isshow">登录/注册</el-menu-item>
            </el-submenu>
            <el-menu-item style="float:right">
                <el-dropdown class="project-container">
                    <el-button type="primary" style="background-color: white; border-color: white;  padding-right: 0;">
                            <el-badge :value="this.notificationList.length" class="item">
                        <i class="el-icon-bell"></i>
                            </el-badge>
                    </el-button>
                    <el-dropdown-menu slot="dropdown" style="overflow-y: auto" class="project-dropdown">
                        <el-dropdown-item v-for="Notification in notificationList" :key="Notification.id">
<!--                            <span v-if="Notification.statusboolean" @click.native="viewmk(0)">{{Notification.msg}}</span>-->
<!--                            <span v-if="!Notification.statusboolean">{{Notification.msg}}(未读)</span>-->
                            <el-button v-if="Notification.category === 1" @click="viewmk(Notification.id)" style="border: white">{{Notification.msg}}</el-button>
                            <el-button v-if="Notification.category === 2" @click="viewmk(Notification.id)" style="border: white">{{Notification.msg}}</el-button>
                            <el-button v-if="Notification.category === 3" @click="viewmk(Notification.id)" style="border: white">{{Notification.msg}}</el-button>
                            <el-button v-if="Notification.category === 4" @click="viewmk(Notification.id)" style="border: white">{{Notification.msg}}</el-button>
                            <el-button v-if="Notification.category === 5" @click="confirmGroupInvitation()" style="border: white">{{Notification.msg}}</el-button>
                            <el-button v-if="Notification.category === 6" @click="viewmk(Notification.id)" style="border: white">{{Notification.msg}}</el-button>
                            <el-button v-if="Notification.category === 7" @click="viewmk(Notification.id)" style="border: white">{{Notification.msg}}</el-button>
                            <el-button v-if="Notification.category === 8" @click="viewmk(Notification.id)" style="border: white">{{Notification.msg}}</el-button>
                        </el-dropdown-item>
                    </el-dropdown-menu>
                </el-dropdown>
            </el-menu-item>
<!--            <el-menu-item index="" style="float:right">-->
<!--                <el-popover-->
<!--                        placement="top-start"-->
<!--                        title="通知"-->
<!--                        width="400"-->
<!--                        trigger="hover"-->
<!--                >-->
<!--&lt;!&ndash;                    <ul class="infinite-list" v-infinite-scroll="load" style="overflow:auto">&ndash;&gt;-->
<!--&lt;!&ndash;                        <li v-for="i in count" :key="i" class="infinite-list-item">{{ i }}</li>&ndash;&gt;-->
<!--&lt;!&ndash;                    </ul>&ndash;&gt;-->
<!--                    <div style="height: 200px; overflow-y: auto">-->
<!--                        <div v-for="Notification in notificationList" :key="Notification.id">-->
<!--                            <el-card shadow="hover">-->
<!--                                {{Notification.msg}}-->
<!--                            </el-card>-->
<!--&lt;!&ndash;                            <span>{{Notification.msg}}</span>&ndash;&gt;-->
<!--                        </div>-->

<!--&lt;!&ndash;                        <ul>&ndash;&gt;-->
<!--&lt;!&ndash;&lt;!&ndash;                            <li v-for="i in count" :key="i" >{{ i }}</li>&ndash;&gt;&ndash;&gt;-->
<!--&lt;!&ndash;                        </ul>&ndash;&gt;-->
<!--                    </div>-->
<!--&lt;!&ndash;                    <el-button slot="reference">hover 激活</el-button>&ndash;&gt;-->
<!--                    <el-button type="primary" style="background-color: white; border-color: white;  padding-right: 0;" slot="reference">-->
<!--                        <el-badge :value="this.notificationList.length" class="item">-->
<!--                            <i class="el-icon-bell"></i>-->
<!--                        </el-badge>-->
<!--                    </el-button>-->

<!--                </el-popover>-->
<!--            </el-menu-item>-->
            <el-menu-item style="float:right;margin-right: 50px">
                <el-input v-model="text" placeholder="请输入内容"></el-input>
                <el-button type="primary" @click="search">搜索</el-button>
            </el-menu-item>
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
                text:"",
                type:sessionStorage.getItem("type"),
                pageList:[],
                groupList:[],
                notificationList:[],
                drawer: false,
                direction: 'rtl',
                count: 0,
                visible: false
            };
        },
        methods: {
            handleSelect(key, keyPath) {
                console.log(key, keyPath);
            },
            CreateTeam(){
                // this.$http.post(this.requestUrl+"/register",this.user).then(res=>{
            },
            logout() {
                this.username = "游客";
                this.status = "登录";
                this.isshow = false;
                this.$router.push({path: '/'});
                sessionStorage.clear();
            },
            GotoLogin: function () {
                this.$router.push({path: '/login'});
            },
            GotoPersonalInfo:function(){
                this.$router.push({path:'/PersonalInfo'});
            },
            getNotification: function () {
                this.$http.get("http://rap2.taobao.org:38080/app/mock/262266/getNotification",{
                    params:{
                        userID:sessionStorage.getItem("userId"),
                    }
                }).then(res => {
                    console.log(res.data);
                    this.notificationList = res.data.List;
                });

            },
            goToNotification: function () {

            },
            load () {
                this.count += 2
            },
            // handleClose(done) {
            //     this.$confirm('确认关闭？')
            //         .then(_ => {
            //             done();
            //         })
            //         .catch(_ => {});
            // }
            GotoGroupDoc:function(id){
                sessionStorage.setItem("groupid",id);
                this.$router.push({path: '/groupdoc'});
            },
            search(){
                sessionStorage.setItem("text",this.text);
                this.$router.push({path:'/searchres'});
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

            this.getNotification();
        }
    }
</script>

<style scoped>
    .project-dropdown{
    /*//设置高度才能显示出滚动条 !important*/
    height:300px;
        overflow: auto;
    }
    .project-dropdown::-webkit-scrollbar
    {
        width: 5px;
        height: 5px;
        background-color: #F5F5F5;
    }
    .project-dropdown::-webkit-scrollbar-track
    {
    /*-webkit-box-shadow: inset 0 0 6px rgba(0,0,0,0.3);*/
        border-radius: 10px;
        background-color: #F5F5F5;
    }
    .searchlist1{
        background-color:white;
        margin-top:-8px;
    }
    .searchlist1{
        border-style: solid;
        border-color: black;
        border-width: 1px;
    }
</style>
