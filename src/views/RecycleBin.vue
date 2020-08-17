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
                                    <el-card shadow="hover" @click.native="viewmk(0)" style="font-size: 20px; font-weight: bold; height: 210px;margin-bottom: 20px">
                                        <!--                                        <el-button icon="el-icon-more" circle style="float: right"></el-button><br>-->
                                        <el-dropdown trigger="hover" style="float: right;">
                                            <i class="el-icon-more"></i>
                                            <!--                                            <el-button icon="el-icon-more" circle style="float: right" type="info"></el-button>-->
                                            <el-dropdown-menu slot="dropdown" style="margin-top: -55px">
                                            <el-dropdown-item @click.native="recover(0)">还原</el-dropdown-item>
                                                <el-dropdown-item @click.native="deleteCompletely(0)" style="color:red">彻底删除</el-dropdown-item>
                                                <!--                                                <el-dropdown-item @click.native="editmk(0)">分享</el-dropdown-item>-->
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
    </div>
</template>

<script>
    import Topbar from "../components/Topbar";
    import Asidebar from "../components/Asidebar";

    export default {
        data() {
            return {
                res : {
                    pageList : []
                }
            }
        },
        created() {
            sessionStorage.setItem("type",3);
            this.getDelPage(this.res);
        },
        components:{
            Topbar,
            Asidebar
        },
        methods:{
            load(){
                this.count +=2
            },
            recover:function(docId){
                this.$http.post(this.requestUrl+"/recoverDoc",{
                    params:{
                        userId:sessionStorage.getItem("userId"),
                        docId:docId
                    }
                }).then(res=>{
                    if (res.data.success){
                        // alert("恢复成功");
                        this.$message({
                            message: '恢复成功',
                            type: 'success'
                        });
                        location.reload();
                    }
                    else {
                        // alert("恢复失败");
                        this.$message.error('恢复失败！请重试');
                    }
                });
            },
            deleteCompletely:function(docId){
                this.$http.post(this.requestUrl+"/delDocCompletely",{
                    params:{
                        userId:sessionStorage.getItem("userId"),
                        docId:docId
                    }
                }).then(res=>{
                    if (res.data.success){
                        // alert("删除成功");
                        this.$message({
                            message: '删除成功',
                            type: 'success'
                        });
                        location.reload();
                    }
                    else {
                        // alert("删除失败");
                        this.$message.error('删除失败！请重试');
                    }
                });
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
