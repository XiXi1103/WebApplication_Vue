<template>
    <div>
        <el-container>
            <el-header>
                <Topbar></Topbar>
            </el-header>
            <el-container>
                <Asidebar></Asidebar>
                <el-container>
                    <el-main>
                        <div id="doc">
                            <el-row :gutter="12">
<!--                                <el-col :span="6">-->
<!--                                    <el-card shadow="hover" @click.native="GotoMarkDown" style="font-size: 20px; font-weight: bold; height: 210px;">-->
<!--                                        新建<i class="el-icon-plus"></i>-->
<!--                                        &lt;!&ndash;                                        <el-button type="info" @click="GotoMarkDown" style="width: 100%; height: 100%; background-color: white"><i class="el-icon-plus" style="size: auto"></i>新建</el-button>&ndash;&gt;-->
<!--                                    </el-card>-->
<!--                                </el-col>-->
                                <el-col :span="6" v-for="Page in res.pageList" :key="Page.id">
                                    <el-card shadow="hover" @click.native="viewmk(0)" style="font-size: 20px; font-weight: bold; height: 210px;">
                                        <!--                                        <el-button icon="el-icon-more" circle style="float: right"></el-button><br>-->
                                        <el-dropdown trigger="hover" style="float: right;">
                                            <i class="el-icon-more"></i>
                                            <!--                                            <el-button icon="el-icon-more" circle style="float: right" type="info"></el-button>-->
                                            <el-dropdown-menu slot="dropdown" style="float: right">
                                                <!--                                                <el-dropdown-item @click.native="editmk(0)">修改文章</el-dropdown-item>-->
<!--                                                <el-dropdown-item @click.native="editmk(0)">分享</el-dropdown-item>-->
                                                <el-dropdown-item @click.native="catwriter(0);drawer = true">查看协作者</el-dropdown-item>
                                                <el-dropdown-item @click.native="dialogFormVisible = true">邀请协作</el-dropdown-item>
                                                <el-dropdown-item @click.native="dropwrite(0)" v-show="!Page.isCreator">退出协作</el-dropdown-item>
                                                <el-dropdown-item @click.native="delDoc(0)" v-show="Page.isCreator" style="color:red">移至回收站</el-dropdown-item>
<!--                                                <el-dropdown-item @click.native="editmk(0)">收藏</el-dropdown-item>-->
                                                <el-dropdown-item @click.native="cancelCollection(0)" style="color:red">取消收藏</el-dropdown-item>
                                            </el-dropdown-menu>
                                        </el-dropdown>

                                        <span style="text-align: center; display: block">{{Page.title}}</span>
                                    </el-card>
                                </el-col>
                            </el-row>
                        </div>
                    </el-main>
                    <el-footer>Footer</el-footer>
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
                    <el-button type="danger" style="float:right;margin-top:-10px" @click="delWriter(writer.id)">移除</el-button> 
                    <el-dropdown style="float:right;margin-top:-10px" >
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
        data() {
            return {
                res : {
                    pageList : [],
                    writerList:[]
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
            sessionStorage.setItem("type",2);
            this.getCollectionPage(this.res);
        },
        components:{
            Topbar,
            Asidebar
        },
        methods : {
            cancelCollection:function(DocID){
                this.$http.post(this.requestUrl+"/cancelCollection",{
                    params:{
                        userID:sessionStorage.getItem("userId"),
                        docID:DocID
                    }
                }).then(res=>{
                    if (res.data.success){
                        alert("取消收藏成功");
                        this.res.pageList.splice(this.ArrayIndexOfByDocID(this.res.pageList, DocID),1);
                    }
                    else {
                        alert("取消收藏失败");
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
</style>
