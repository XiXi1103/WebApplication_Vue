<template>

    <el-aside width="15%">
        <el-row class="tac">
            <el-col>
                <br>
                <el-button type="warning" @click.native="creategroup" icon="el-icon-circle-plus-outline">创建团队</el-button>

                <!--                <h3><i class="el-icon-circle-plus-outline" @click="GotoGroupSpace"></i></h3>-->
<!--                router :default-active="$route.path" 原来是el-menu的属性-->
                <el-menu
                        default-active="-1"
                        class="el-menu-vertical-demo"
                        @open="handleOpen"
                        @close="handleClose"
                >
<!--                        <span slot="title"> <i class="el-icon-document"></i>团队空间</span>-->
                        <el-menu-item v-for="Group in res.groupList" :key="Group.id">
                            <el-menu-item :index=Group.id>
                                <i class="el-icon-s-custom"></i>
                                <span slot="title" @click="GotoGroupDoc(Group.id)">{{Group.name}}</span>
                                <el-dropdown trigger="hover" style="float: right;">
                                    <i class="el-icon-more"></i>
                                    <!--                                            <el-button icon="el-icon-more" circle style="float: right" type="info"></el-button>-->
                                    <el-dropdown-menu slot="dropdown" style="float: right">
                                        <!--                                                <el-dropdown-item @click.native="editmk(0)">修改文章</el-dropdown-item>-->
                                        <el-dropdown-item @click.native="createDoc(Group.id)">创建文档</el-dropdown-item>
                                        <el-dropdown-item @click.native="reserveId(Group.id);dialogFormVisible = true">添加成员</el-dropdown-item>
                                        <el-dropdown-item @click.native="catMember(Group.id);drawer = true">查看成员</el-dropdown-item>
                                        <el-dropdown-item @click.native="delGroup(Group.id)" style="color:red" v-show="Group.isCreator">删除团队</el-dropdown-item>
                                        <el-dropdown-item @click.native="dropGroup(Group.id)" style="color:red" v-show="!Group.isCreator">退出团队</el-dropdown-item>
                                    </el-dropdown-menu>
                                </el-dropdown>
                            </el-menu-item>
<!--                            <el-dropdown trigger="hover" style="float: right;">-->
<!--                                <i class="el-icon-more"></i>-->
<!--    &lt;!&ndash;                                            <el-button icon="el-icon-more" circle style="float: right" type="info"></el-button>&ndash;&gt;-->
<!--                                <el-dropdown-menu slot="dropdown" style="float: right">-->
<!--    &lt;!&ndash;                                                <el-dropdown-item @click.native="editmk(0)">修改文章</el-dropdown-item>&ndash;&gt;-->
<!--                                    <el-dropdown-item @click.native="reserveId(Group.id);dialogFormVisible = true">添加成员</el-dropdown-item>-->
<!--                                    <el-dropdown-item @click.native="catMember(Group.id);drawer = true">查看成员</el-dropdown-item>-->
<!--                                    <el-dropdown-item @click.native="delGroup(Group.id)" style="color:red" v-show="Group.isCreator">删除团队</el-dropdown-item>-->
<!--                                    <el-dropdown-item @click.native="dropGroup(Group.id)" style="color:red" v-show="!Group.isCreator">退出团队</el-dropdown-item>-->
<!--                                </el-dropdown-menu>-->
<!--                            </el-dropdown>-->
<!--                            <span style="text-align: center; display: block" @click="GotoGroupDoc(Group.id)">{{Group.name}}</span>-->
                        </el-menu-item>
<!--                    </el-submenu>-->
                </el-menu>
                </el-col>
        </el-row>

        <el-drawer
            title="团队成员"
            :visible.sync="drawer"
            :direction="direction">
            <ul>
                <li v-for="member in res.memberList" :key="member.id" style="padding:20px 0 20px 0;border:0.5px solid black">
                    <span>{{member.name}}</span>
                    <el-button type="danger" style="float:right;margin-top:-10px" @click="delMember(member.id)" v-show="member.permission!=5">移除</el-button> 
                    <el-dropdown style="float:right;margin-top:-10px"  v-show="member.permission!=5">
                        <el-button type="primary">{{permission[member.permission-1]}}</el-button>
                        <el-dropdown-menu slot="dropdown">
                            <el-dropdown-item @click.native="changePermission(member.id,1)">查看</el-dropdown-item>
                            <el-dropdown-item @click.native="changePermission(member.id,2)">评论</el-dropdown-item>
                            <el-dropdown-item @click.native="changePermission(member.id,3)">分享</el-dropdown-item>
                            <el-dropdown-item @click.native="changePermission(member.id,4)">修改</el-dropdown-item>
                            <el-dropdown-item @click.native="changePermission(member.id,5)">管理</el-dropdown-item>
                        </el-dropdown-menu>
                    </el-dropdown>
                </li>
            </ul>
        </el-drawer>
        <el-dialog title="添加团队成员" :visible.sync="dialogFormVisible">
            <el-select
             v-model="value"
             placeholder="输入用户名"
             reserve-keyword
             filterable
             remote
             :remote-method="remoteMethod">
             <el-option
                v-for="user in searchList"
                 :key="user.id"
                 :label="user.name"
                :value="user.name">
             </el-option>
            </el-select>
            <div slot="footer" class="dialog-footer">
                <el-button @click.native="dialogFormVisible = false">取 消</el-button>
                <el-button type="primary" @click="addMember(groupId,value);dialogFormVisible = false">添 加</el-button>
            </div>
        </el-dialog>

    </el-aside>

</template>

<script>
    export default {
        data(){
            return{
                res : {
                    groupList: [],
                    memberList: [],
                },
                permission:["查看","评论","分享","修改","管理"],
                drawer:false,
                direction:"rtl",
                value:"",
                searchList: [],         
                dialogFormVisible: false,
                groupId :0
            }
        },
        methods:{
            handleOpen(key, keyPath) {
                console.log(key, keyPath);
            },
            handleClose(key, keyPath) {
                console.log(key, keyPath);
            },
            GotoGroupDoc:function(id){
                sessionStorage.setItem("groupid",id);
                this.$router.push({path: '/groupdoc'});
            },
            GotoGroupSpace:function(){
                this.$router.push({path: '/groupspace'});
            },
            createDoc:function(id){
                this.$router.push({
                    path:'/markdown',
                    query:{
                        groupId:id
                    }
                })
            },            
            delGroup:function(id){
                this.$http.get(this.requestUrl+"/delGroup",{
                    params:{
                        userID:sessionStorage.getItem("userId"),
                        groupID:id,
                    }
                }).then(res =>{
                    console.log(res.data);
                    if(res.data.success){
                        alert("删除成功");
                        location.reload();
                    }
                    else{
                        alert(res.data.msg);
                    }
                })
            },
            dropGroup:function(id){
                this.$http.post(this.requestUrl+"/delGroup",{
                    params:{
                        groupID:id,
                        userID:sessionStorage.getItem("userId"),
                    }
                }).then(res =>{
                    console.log(res.data);
                    if(res.data.success){
                        alert("退出成功");
                        location.reload();
                    }
                    else{
                        alert("退出失败");
                    }
                })
            },
            catMember:function(id){
                sessionStorage.setItem("groupId",id);
                this.getMember(id,this.res);
            },
            delMember:function(id){
                this.$http.post(this.requestUrl+"/kickMember",{
                    params:{
                        userId1:sessionStorage.getItem("userId"),
                        userId2:id,
                        groupId:sessionStorage.getItem("groupId")
                    }
                }).then(res =>{
                    if(res.data.success){
                        alert("成功踢出");
                        location.reload();
                    }
                    else{
                        alert("权限不足");
                    }
                })
            },
            remoteMethod(query){
                if(query !== ''){
                    this.$http.get(this.requestUrl+"/searchUser",{
                            params:{
                                text:query,
                            }
                        }).then(res => {
                            console.log(res.data);
                            this.searchList = res.data;
                            /*this.searchList = res.data.filter(user =>{
                                return user.name.toLowerCase()
                                .indexOf(query.toLowerCase()) > -1;
                            });*/
                    })                                   
                }
                else{
                    this.searchList = [];
                }
            },
            reserveId:function(id){
                this.groupId = id ;
                // sessionStorage.setItem("groupId",id);
            }  
        },
        created() {
            this.getGroup(this.res);
        }
    }

</script>
