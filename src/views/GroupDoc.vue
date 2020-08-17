<template>
    <div>
        <el-container>
            <el-header>
                <Topbar></Topbar>
            </el-header>
            <el-container>
                <GroupAside></GroupAside>
                <el-container>
                    <el-main>
                        <div id="doc">
                            <el-row :gutter="12">
                                <el-col :span="6" v-for="Page in res.groupPage" :key="Page.id">
                                    <el-card shadow="hover" @click.native="viewmk(Page.id)" style="font-size: 20px; font-weight: bold; height: 210px;">
<!--                                        <el-button icon="el-icon-more" circle style="float: right"></el-button><br>-->
                                        <el-dropdown trigger="hover" style="float: right;">
                                            <i class="el-icon-more"></i>
<!--                                            <el-button icon="el-icon-more" circle style="float: right" type="info"></el-button>-->
                                            <el-dropdown-menu slot="dropdown" style="float: right">
<!--                                                <el-dropdown-item @click.native="editmk(0)">修改文章</el-dropdown-item>-->
<!--                                                <el-dropdown-item @click.native="editmk(0)">分享</el-dropdown-item>-->
                                                <el-dropdown-item @click.native="editmk(0)">收藏</el-dropdown-item>
                                                <el-dropdown-item @click.native="catwriter(0);drawer = true">查看协作者</el-dropdown-item>
                                                <el-dropdown-item @click.native="dialogFormVisible = true">邀请协作</el-dropdown-item>
                                                <el-dropdown-item @click.native="delDoc(0)" style="color:red" v-show="Page.isCreator">移至回收站</el-dropdown-item>
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
                    <el-dropdown style="float:right;margin-top:-10px"  v-show="writer.permission!=5">
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
    import GroupAside from "../components/GroupAside";
    export default {
        name: "GroupDoc",
        data(){
            return{
                res:{
                    groupPage:[],
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
        components: {
            Topbar,
            GroupAside
        },
        methods:{
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
        },
        created() {
            sessionStorage.setItem("type",4);
            this.getGroupPage(this.res);
        }
    }

</script>

<style scoped>

</style>
