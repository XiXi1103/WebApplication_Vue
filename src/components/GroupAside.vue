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
                                    <el-dropdown-item @click.native="addMember(Group.id)">添加成员</el-dropdown-item>
                                    <el-dropdown-item @click.native="catMember(Group.id);drawer = true">查看成员</el-dropdown-item>
                                    <el-dropdown-item @click.native="delGroup(Group.id)" style="color:red" v-show="Group.isCreater">删除团队</el-dropdown-item>
                                    <el-dropdown-item @click.native="dropGroup(Group.id)" style="color:red" v-show="!Group.isCreater">退出团队</el-dropdown-item>
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
                <li v-for="member in res.memberList" :key="member.id">
                    <span>{{member.name}}</span>
                    <i class="el-icon-error" style="float:right;color:red;margin-right:30px;cursor:pointer" @click="delMember(member.id)"></i>
                </li>
            </ul>
        </el-drawer>
    </el-aside>
</template>

<script>
    export default {
        data(){
            return{
                res : {
                    groupList: [], 
                    memberList: []
                },
                drawer:false,
                direction:"rtl"
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

            }
        },
        created() {
            this.getGroup(this.res);
        }
    }

</script>