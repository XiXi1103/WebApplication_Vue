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
                <el-menu-item @click="GotoPersonalInfo(id)" v-show="!isshow">个人信息</el-menu-item>
                <el-menu-item @click="logout" v-show="!isshow">退出登录</el-menu-item>
                <el-menu-item @click="GotoLogin" v-show="isshow">登录/注册</el-menu-item>
            </el-submenu>
            <el-menu-item style="float:right">
                <el-dropdown class="project-container">
                    <el-button type="primary" style="background-color: white; border-color: white;  padding-right: 0;">
                        <i class="el-icon-bell"></i>
                        <el-badge :value="numberOfUnreadMessages" class="item" v-if="numberOfUnreadMessages!==0" style="top: -10px"></el-badge>
                    </el-button>
                    <el-dropdown-menu slot="dropdown" style="overflow-y: auto;height: auto" class="project-dropdown">
                        <el-dropdown-item v-for="notification in notificationList" :key="notification.id">
<!--                            <span v-if="notification.statusboolean" @click.native="viewmk(0)">{{notification.msg}}</span>-->
<!--                            <span v-if="!notification.statusboolean">{{notification.msg}}(未读)</span>-->
                            <i class="el-icon-message-solid" v-if="!notification.status"></i>
                            <el-button v-if="notification.category === 1" @click="goToNotification(notification)" style="border: white">{{notification.msg}}</el-button>
                            <el-button v-if="notification.category === 2" @click="goToNotification(notification)" style="border: white">{{notification.msg}}</el-button>
                            <el-button v-if="notification.category === 3" @click="confirmDocInvitationPopout(notification)" style="border: white">{{notification.msg}}</el-button>
                            <el-button v-if="notification.category === 4" @click="read(notification)" style="border: white">{{notification.msg}}</el-button>
                            <el-button v-if="notification.category === 5" @click="goToNotification(notification)" style="border: white">{{notification.msg}}</el-button>
                            <el-button v-if="notification.category === 6" @click="read(notification)" style="border: white">{{notification.msg}}</el-button>
                            <el-button v-if="notification.category === 7" @click="read(notification)" style="border: white">{{notification.msg}}</el-button>
<!--                            <el-button v-if="notification.category === 8" @click="goToNotification(notification)" style="border: white">{{notification.msg}}</el-button>-->
<!--                            <el-button v-if="notification.category === 9" @click="confirmGroupInvitationPopout(notification)" style="border: white">{{notification.msg}}</el-button>-->
<!--                            <el-button v-if="notification.category === 10" @click="read(notification)" style="border: white">{{notification.msg}}</el-button>-->

                            <el-button v-if="notification.category === 11" @click="goToNotification(notification)" style="border: white">{{notification.msg}}</el-button>
                            <el-button v-if="notification.category === 12" @click="goToNotification(notification)" style="border: white">{{notification.msg}}</el-button>

                            <el-button v-if="notification.category === 21" @click="confirmGroupInvitationPopout(notification)" style="border: white">{{notification.msg}}</el-button>
                            <el-button v-if="notification.category === 22" @click="read(notification)" style="border: white">{{notification.msg}}</el-button>
                            <el-button v-if="notification.category === 23" @click="read(notification)" style="border: white">{{notification.msg}}</el-button>
                            <el-button v-if="notification.category === 24" @click="read(notification)" style="border: white">{{notification.msg}}</el-button>

                            <el-button v-if="notification.category === 31" @click="goToNotification(notification)" style="border: white">{{notification.msg}}</el-button>
                            <el-button v-if="notification.category === 32" @click="read(notification)" style="border: white">{{notification.msg}}</el-button>

                            <el-button v-if="notification.category === 41" @click="read(notification)" style="border: white">{{notification.msg}}</el-button>
                            <el-button v-if="notification.category === 42" @click="goToNotification(notification)" style="border: white">{{notification.msg}}</el-button>
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
<!--                        <div v-for="notification in notificationList" :key="notification.id">-->
<!--                            <el-card shadow="hover">-->
<!--                                {{notification.msg}}-->
<!--                            </el-card>-->
<!--&lt;!&ndash;                            <span>{{notification.msg}}</span>&ndash;&gt;-->
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
                <el-button type="primary" @click="search()">搜索</el-button>
            </el-menu-item>
        </el-menu>
    </div>
</template>

<script>
    export default {
        data() {
            return {
                id:sessionStorage.getItem("userId"),
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
                notificationList : [],
                // notificationList:[
                //     {
                //         "msg": "XXX评论了你的文章",
                //         "category": 1,
                //         "objectID": 0,
                //         "status": false,
                //         "date": "2020-8-14",
                //         "id": 1,
                //         "name": ""
                //     },
                //     {
                //         "msg": "邀请协作文档",
                //         "category": 3,
                //         "objectID": 0,
                //         "status": false,
                //         "date": "2020-8-14",
                //         "id": 2,
                //         "name": ""
                //     },
                //     {
                //         "msg": "邀请加入团队",
                //         "category": 21,
                //         "objectID": 0,
                //         "status": false,
                //         "date": "2020-8-14",
                //         "id": 2,
                //         "name": ""
                //     },
                //     {
                //         "msg": "被踢出团队",
                //         "category": 22,
                //         "objectID": 0,
                //         "status": false,
                //         "date": "2020-8-14",
                //         "id": 2,
                //         "name": ""
                //     },
                //     {
                //         "msg": "被踢出团队",
                //         "category": 22,
                //         "objectID": 0,
                //         "status": true,
                //         "date": "2020-8-14",
                //         "id": 2,
                //         "name": ""
                //     }
                // ],
                drawer: false,
                direction: 'rtl',
                count: 0,
                visible: false,
                numberOfUnreadMessages: 0
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
                location.reload();
                sessionStorage.clear();
            },
            GotoLogin: function() {
                this.$router.push({path: '/login'});
            },
            // GotoPersonalInfo:function(){
            //     this.$router.push({path:'/PersonalInfo',
            //         query:{
            //             isOther: false,
            //         }}
            //     );
            // },
            getNotification: function() {
                this.$http.get(this.requestUrl + "/getNotification",{
                    params:{
                        userId:sessionStorage.getItem("userId"),
                    }
                }).then(res => {
                    console.log(res.data);
                    this.notificationList = res.data;
                    for (var i = 0; i < this.notificationList.length; i++) {
                        if (this.notificationList[i].status) {
                            break;
                        }
                        else {
                            this.numberOfUnreadMessages++;
                        }
                    }

                });

                // this.notificationList = [
                //     {
                //         "msg": "XXX评论了你的文章",
                //         "category": 1,
                //         "objectID": 0,
                //         "status": false,
                //         "date": "2020-8-14",
                //         "id": 1,
                //         "name": ""
                //     },
                //     {
                //         "msg": "邀请协作文档",
                //         "category": 3,
                //         "objectID": 0,
                //         "status": false,
                //         "date": "2020-8-14",
                //         "id": 2,
                //         "name": ""
                //     },
                //     {
                //         "msg": "邀请加入团队",
                //         "category": 21,
                //         "objectID": 0,
                //         "status": false,
                //         "date": "2020-8-14",
                //         "id": 2,
                //         "name": ""
                //     },
                //     {
                //         "msg": "被踢出团队",
                //         "category": 22,
                //         "objectID": 0,
                //         "status": false,
                //         "date": "2020-8-14",
                //         "id": 2,
                //         "name": ""
                //     },
                //     {
                //         "msg": "被踢出团队",
                //         "category": 22,
                //         "objectID": 0,
                //         "status": true,
                //         "date": "2020-8-14",
                //         "id": 2,
                //         "name": ""
                //     }
                // ];
                // for (var i = 0; i < this.notificationList.length; i++) {
                //     if (this.notificationList[i].status) {
                //         break;
                //     }
                //     else {
                //         this.numberOfUnreadMessages++;
                //     }
                // }
            },
            goToNotification(notification) {
                this.viewmk(notification.objectID);
                this.read(notification);
            },
            // handleClose(done) {
            //     this.$confirm('确认关闭？')
            //         .then(_ => {
            //             done();
            //         })
            //         .catch(_ => {});
            // }
            GotoGroupDoc:function(id) {
                sessionStorage.setItem("groupid",id);
                this.$router.push({path: '/groupdoc'});

            },
            search(){
                sessionStorage.setItem("text",this.text);
                if (this.$route.path=='/searchres')
                    location.reload();
                else
                    this.$router.push({path:'/searchres'});
            },
            confirmGroupInvitationPopout(notification) {
                // var msg = {};
                // msg.groupID = groupID;
                // msg.success = false;
                // Vue.set(msg, "groupID", groupID);
                if (notification.status) {
                    this.$message({
                        message: '已读：' + notification.msg,
                        type: 'success'
                    });
                }
                else {
                    this.$confirm(notification.msg, '邀请', {
                        confirmButtonText: '同意',
                        cancelButtonText: '拒绝',
                        type: 'info'
                    }).then(() => {
                        if (this.confirmGroupInvitation(notification, true)) {
                            this.$message({
                                type: 'success',
                                message: '加入团队成功!'
                            });
                            notification.status = true;
                            this.numberOfUnreadMessages--;
                        }
                        else {
                            // this.$message({
                            //     type: 'warning',
                            //     message: '加入团队失败!'
                            // });
                            this.$message.error('加入团队失败！请重试');
                        }
                    }).catch(() => {
                        if (this.confirmGroupInvitation(notification, false)) {
                            this.$message({
                                type: 'warning',
                                message: '已拒绝加入团队！'
                            });
                            notification.status = true;
                            this.numberOfUnreadMessages--;
                        }
                        else {
                            // this.$message({
                            //     type: 'warning',
                            //     message: '拒绝加入团队失败！请重试'
                            // });
                            this.$message.error('拒绝加入团队失败！请重试');
                        }
                    });
                }
            },
            confirmGroupInvitation(notification, userResponse) {
                this.$http.get(this.requestUrl + "/confirmGroupInvitation",{
                    params:{
                        userId:sessionStorage.getItem("userId"),
                        groupId:notification.objectID,
                        userResponse:userResponse,
                        noticeId:notification.id
                    }
                }).then(res => {
                    console.log(res.data);
                    // return res.data.success;
                    return true;
                });
                return true;
            },
            // collaborationDocumentModified(docId) {
            //     this.viewmk(docId);
            // },
            // collaborationDocumentDeleted(docId) {
            //     this.viewmk(docId);
            // },
            confirmDocInvitationPopout(notification) {
                // var msg = {};
                // msg.groupID = docId;
                // msg.success = false;
                if (notification.status) {
                    this.$message({
                        message: '已读：' + notification.msg,
                        type: 'success'
                    });
                }
                else {
                    this.$confirm(notification.msg, '邀请', {
                        confirmButtonText: '同意',
                        cancelButtonText: '拒绝',
                        type: 'info'
                    }).then(() => {
                        if (this.confirmDocInvitation(notification, true)) {
                            this.$message({
                                type: 'success',
                                message: '加入协作文档成功！'
                            });
                            notification.status = true;
                            this.numberOfUnreadMessages--;
                        }
                        else {
                            // this.$message({
                            //     type: 'warning',
                            //     message: '加入协作文档失败！请重试'
                            // });
                            this.$message.error('加入协作文档失败！请重试');
                        }
                    }).catch(() => {
                        if (this.confirmDocInvitation(notification, false)) {
                            this.$message({
                                type: 'warning',
                                message: '已拒绝加入协作文档！'
                            });
                            notification.status = true;
                            this.numberOfUnreadMessages--;
                        }
                        else {
                            // this.$message({
                            //     type: 'warning',
                            //     message: '拒绝加入协作文档失败！请重试'
                            // });
                            this.$message.error('拒绝加入协作文档失败！请重试');
                        }
                    });
                }
            },
            confirmDocInvitation(notification, userResponse) {
                this.$http.get(this.requestUrl + "/confirmDocInvitation",{
                    params:{
                        userId:sessionStorage.getItem("userId"),
                        docId:notification.objectID,
                        userResponse:userResponse,
                        noticeId:notification.id
                    }
                }).then(res => {
                    console.log(res.data);
                    return true;
                    // return res.data.success;
                });
                return true;
            },
            read(notification) {
                this.$http.get(this.requestUrl + "/readNotifications",{
                    params:{
                        userId:sessionStorage.getItem("userId"),
                        notificationID:notification.id
                    }
                }).then(res => {
                    this.$message({
                        message: '已读：' + notification.msg,
                        type: 'success'
                    });
                    console.log(res.data);
                    notification.status = true;
                    this.numberOfUnreadMessages--;
                    // this.findNotificationById(notificationID).status=true;
                });
            },
            findNotificationById(id) {
                for (var i = 0; i < this.notificationList.length; i++) {
                    if (this.notificationList[i].id == id) return this.notificationList[i];
                }
                return -1;
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
