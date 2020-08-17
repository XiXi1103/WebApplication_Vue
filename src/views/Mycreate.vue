<template>
    <div style="height: 100%">
        <el-container style="height: 100%" direction="vertical">
            <el-header>
                <Topbar></Topbar>
            </el-header>
            <el-container>
                <Asidebar></Asidebar>
                <el-container>
                    <el-main>
                        <div id="doc">
                            <el-row :gutter="14">
<!--                                <el-col :span="6">-->
<!--                                    <el-card shadow="hover" @click.native="GotoMarkDown" style="font-size: 20px; font-weight: bold; height: 210px;">-->
<!--                                        新建<i class="el-icon-plus"></i>-->
<!--                                        &lt;!&ndash;                                        <el-button type="info" @click="GotoMarkDown" style="width: 100%; height: 100%; background-color: white"><i class="el-icon-plus" style="size: auto"></i>新建</el-button>&ndash;&gt;-->
<!--                                    </el-card>-->
<!--                                </el-col>-->
                                <el-col :span="6" v-for="Page in res.pageList" :key="Page.id">
                                    <el-card shadow="hover" @click.native="viewmk(Page.id)" style="font-size: 20px; font-weight: bold; height: 210px;margin-bottom: 20px">
                                        <!--                                        <el-button icon="el-icon-more" circle style="float: right"></el-button><br>-->
                                        <el-dropdown trigger="hover" style="float: right;">
<!--                                            <el-button type="primary" style="border-color: white;background-color: white">-->
<!--                                            </el-button>-->
                                            <i class="el-icon-more"></i>
                                            <!--                                            <el-button icon="el-icon-more" circle style="float: right" type="info"></el-button>-->
                                            <el-dropdown-menu slot="dropdown" style="margin-top: -55px">
                                                <!--                                                <el-dropdown-item @click.native="editmk(0)">修改文章</el-dropdown-item>-->
                                                <!--                                                <el-dropdown-item @click.native="editmk(0)">分享</el-dropdown-item>-->
                                                <el-dropdown-item @click.native="catwriter(Page.id);drawer = true">查看协作者</el-dropdown-item>
                                                <el-dropdown-item @click.native="dialogFormVisible = true">邀请协作</el-dropdown-item>
                                                <el-dropdown-item @click.native="dropwrite(Page.id)" v-show="!Page.isCreator">退出协作</el-dropdown-item>
                                                <el-dropdown-item @click.native="delDoc(Page.id)" v-show="Page.isCreator" style="color:red">移至回收站</el-dropdown-item>
                                                <!--                                                <el-dropdown-item @click.native="editmk(0)">收藏</el-dropdown-item>-->
                                                <el-dropdown-item @click.native="cancelCollection(Page.id)" style="color:red">取消收藏</el-dropdown-item>
                                            </el-dropdown-menu>
                                        </el-dropdown>

                                        <span style="text-align: center; display: block">{{Page.title}}</span>
                                    </el-card>
                                </el-col>
                            </el-row>                            
                        </div>
                    </el-main>
<!--                    <el-footer>Footer</el-footer>-->
                </el-container>
            </el-container>
        </el-container>
        <el-drawer
            title="协作者列表"
            :visible.sync="drawer"
            :direction="direction">
            <ul>
                <li v-for="writer in res.writerList" :key="writer.id" style="padding:20px 0 20px 0;border:0.5px solid black">
                    <span>{{writer.name}}</span>
                    <el-button type="danger" style="float:right;margin-top:-10px" @click="delWriter(writer.id)" v-show="writer.permission!=5">移除</el-button> 
                    <el-dropdown style="float:right;margin-top:-10px" v-show="writer.permission!=5">
                        <el-button type="primary">{{permission[writer.permission-1]}}</el-button>
                        <el-dropdown-menu slot="dropdown">
                            <el-dropdown-item @click.native="writerPermission(writer.id,1)">查看</el-dropdown-item>
                            <el-dropdown-item @click.native="writerPermission(writer.id,2)">评论</el-dropdown-item>
                            <el-dropdown-item @click.native="writerPermission(writer.id,3)">分享</el-dropdown-item>
                            <el-dropdown-item @click.native="writerPermission(writer.id,4)">修改</el-dropdown-item>
                            <el-dropdown-item @click.native="writerPermission(writer.id,5)">管理</el-dropdown-item>
                        </el-dropdown-menu>
                    </el-dropdown>
                </li>
            </ul>
        </el-drawer>
        <el-dialog title="添加协作者" :visible.sync="dialogFormVisible">
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
                <el-button type="primary" @click.native="addWriter(docId,value);dialogFormVisible = false">添 加</el-button>
            </div>
        </el-dialog>            
    </div>
</template>

<script>
    import Topbar from "../components/Topbar";
    import Asidebar from "../components/Asidebar";
    export default {
        name: "Mycreate",
        components:{
            Topbar,
            Asidebar
        },
        data() {
            return {
                res : {
                    pageList : [],
                    writerList : []
                },
                permission:["查看","评论","分享","修改","管理"],
                drawer:false,
                direction:"rtl",
                searchList: [],
                value:"",
                dialogFormVisible: false,
                docId:sessionStorage.getItem("docId")
            }
        },
        created() {
            sessionStorage.setItem("type",1);
            this.getMyPage(this.res);
        },
        methods : {
            delDoc:function(docId){
                this.$http.post(this.requestUrl+"/delDoc",{
                    params:{
                        userId:sessionStorage.getItem("userId"),
                        docId:docId
                    }
                }).then(res=>{
                    if (res.data.success){
                        // alert("删除成功");
                        this.$message({
                            type: 'success',
                            message: '删除成功!'
                        });
                        this.res.pageList.splice(this.ArrayIndexOfBydocId(this.res.pageList, docId),1);
                        location.reload();
                    }
                    else {
                        // alert("删除失败");
                        this.$message.error('删除失败！请重试');
                    }
                });
            },
            catwriter:function(id){
                sessionStorage.setItem("docId",id);
                this.getWriter(id,this.res);
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
        }
    }
</script>

<style>
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
        overflow-y: hidden;
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
    html,body,#app,.el-container{
        /*设置内部填充为0，几个布局元素之间没有间距*/
        padding: 0px;
        /*外部间距也是如此设置*/
        margin: 0px;
        /*统一设置高度为100%*/
        height: 100%;
    }
</style>
