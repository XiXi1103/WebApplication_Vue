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
                                                <el-dropdown-item @click.native="addwriter(0)">邀请协作</el-dropdown-item>
                                                <el-dropdown-item @click.native="delDoc(0)" style="color:red" v-show="Page.isCreator">移至回收站</el-dropdown-item>
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
            title="协作成员"
            :visible.sync="drawer"
            :direction="direction">
                <ul>
                    <li v-for="writer in res.writerList" :key="writer.id">
                        <span>{{writer.name}}</span>
                        <i class="el-icon-error" style="float:right;color:red;margin-right:30px;cursor:pointer" @click="delWriter(writer.id)"></i>
                    </li>
                </ul>
        </el-drawer>        
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
                drawer:false,
                direction:"rtl"
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
            }
        },
        created() {
            sessionStorage.setItem("type",4);
            this.getGroupPage(this.res);
        }
    }

</script>

<style scoped>

</style>