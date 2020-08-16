<template>

    <el-aside width="15%">
        <el-row class="tac">
            <el-col>
                <h3><i class="el-icon-circle-plus-outline" @click="GotoGroupSpace"></i></h3>
                <el-menu
                        router :default-active="$route.path"
                        class="el-menu-vertical-demo"
                        @open="handleOpen"
                        @close="handleClose">
                    <!--                                <el-submenu index="1">-->
                    <!--                                    <template slot="title">-->
                    <!--                                        <i class="el-icon-location"></i>-->
                    <!--                                        <span>导航一</span>-->
                    <!--                                    </template>-->
                    <!--                                    <el-menu-item-group>-->
                    <!--                                        <template slot="title">分组一</template>-->
                    <!--                                        <el-menu-item index="1-1">选项1</el-menu-item>-->
                    <!--                                        <el-menu-item index="1-2">选项2</el-menu-item>-->
                    <!--                                    </el-menu-item-group>-->
                    <!--                                    <el-menu-item-group title="分组2">-->
                    <!--                                        <el-menu-item index="1-3">选项3</el-menu-item>-->
                    <!--                                    </el-menu-item-group>-->
                    <!--                                    <el-submenu index="1-4">-->
                    <!--                                        <template slot="title">选项4</template>-->
                    <!--                                        <el-menu-item index="1-4-1">选项1</el-menu-item>-->
                    <!--                                    </el-submenu>-->
                    <!--                                </el-submenu>-->
                    <el-submenu index="">
                        <span slot="title"> <i class="el-icon-document"></i>团队空间</span>
                        <el-menu-item v-for="Group in res.groupList" :key="Group.id">
                            <el-dropdown trigger="hover" style="float: right;">
                                <i class="el-icon-more"></i>
    <!--                                            <el-button icon="el-icon-more" circle style="float: right" type="info"></el-button>-->
                                <el-dropdown-menu slot="dropdown" style="float: right">
    <!--                                                <el-dropdown-item @click.native="editmk(0)">修改文章</el-dropdown-item>-->
                                    <el-dropdown-item @click.native="reserveId(Group.id);dialogFormVisible = true">添加成员</el-dropdown-item>
                                    <el-dropdown-item @click.native="catMember(Group.id);drawer = true">查看成员</el-dropdown-item>
                                    <el-dropdown-item @click.native="delGroup(Group.id)" style="color:red" v-show="Group.isCreator">删除团队</el-dropdown-item>
                                    <el-dropdown-item @click.native="dropGroup(Group.id)" style="color:red" v-show="!Group.isCreator">退出团队</el-dropdown-item>
                                </el-dropdown-menu>
                            </el-dropdown>
                            <span style="text-align: center; display: block" @click="GotoGroupDoc(Group.id)">{{Group.name}}</span>
                        </el-menu-item>                     
                    </el-submenu>
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
                    <el-button type="danger" style="float:right;margin-top:-10px" @click="delMember(member.id)">移除</el-button> 
                    <el-dropdown style="float:right;margin-top:-10px" >
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
             filterable
             remote
             :remote-method="remoteMethod">
             <el-option
                v-for="user in searchList"
                 :key="user.id"
                 :label="user.name">
             </el-option>
            </el-select>
            <div slot="footer" class="dialog-footer">
                <el-button @click.native="dialogFormVisible = false">取 消</el-button>
                <el-button type="primary" @click.native="addMember(groupId,value);dialogFormVisible = false">添 加</el-button>
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
                groupId:sessionStorage.getItem("groupId")
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
            delGroup:function(id){
                this.$http.post(this.requestUrl+"/delGroup",{
                    params:{
                        groupID:id,
                        userID:sessionStorage.getItem("userId"),
                    }
                }).then(res =>{
                    console.log(res.data);
                    if(res.data.success){
                        alert("删除成功");
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
                    }
                    else{
                        alert("权限不足");
                    }
                })
            },
            remoteMethod(query){
                if(query !== ''){
                    this.$http.get("http://rap2.taobao.org:38080/app/mock/262266/searchUser",{
                            params:{
                                text:query,
                            }
                        }).then(res => {
                            console.log(res.data);
                            this.searchList = res.data.userLists.filter(user =>{
                                return user.name.toLowerCase()
                                .indexOf(query.toLowerCase()) > -1;
                            });
                    })                                   
                }
                else{
                    this.searchList = [];
                }
            },
            reserveId:function(id){
                sessionStorage.setItem("groupId",id);
            }  
        },
        created() {
            this.getGroup(this.res);
        }
    }

</script>
