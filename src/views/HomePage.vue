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

<!--&lt;!&ndash;                            <el-button type="info" style="float:left" @click="CreateTeam">创建团队</el-button>&ndash;&gt;-->

                            <el-row :gutter="12" style="margin-bottom: 50px">
                                <el-col :span="8">
                                    <el-card shadow="hover">
                                        <el-button type="info" @click="GotoMarkDown">新建</el-button>
                                        <br>
                                        <br>
                                    </el-card>
                                </el-col>
                                <el-col :span="8">
                                    <el-card shadow="hover">
                                        文章在这里显示<br>
                                        <el-button type="info" @click="viewmk(0)">查看文章</el-button>
                                        <el-button type="info" @click="editmk(0)">修改文章</el-button>
                                    </el-card>
                                </el-col>
                                <el-col :span="8">
                                    <el-card shadow="hover">
                                        文章在这里显示<br>
                                        <el-button type="info" @click="viewmk(0)">查看文章</el-button>
                                        <el-button type="info" @click="editmk(0)">修改文章</el-button>
                                    </el-card>
                                </el-col>
                                <el-col :span="8">
                                    <el-card shadow="hover">
                                        文章在这里显示<br>
                                        <el-button type="info" @click="viewmk(0)">查看文章</el-button>
                                        <el-button type="info" @click="editmk(0)">修改文章</el-button>
                                    </el-card>
                                </el-col>
                            </el-row>
                        </div>
                    </el-main>
                    <el-footer>Footer</el-footer>
                </el-container>
            </el-container>
        </el-container>





    </div>
</template>


<script>
    import Topbar from "../components/Topbar";
    import Asidebar from "../components/Asidebar";
    export default {
        methods: {
            GotoMarkDown:function(){
                this.$router.push({path:'/markdown'});
            },
            viewmk(DocID){
                this.$http.get("http://rap2.taobao.org:38080/app/mock/262266/viewDoc",{
                    params:{
                        userID:sessionStorage.getItem("userId"),
                        docID:DocID
                    }
                }).then(res=>{
                    if (res.data.success){
                        this.$router.push({
                            path: '/ShowDoc',
                            query:{
                                content: res.data.content,
                            }
                        })
                    }
                    else {
                        alert(res.data.msg);
                    }
                })
            },
            editmk(DocID){
                this.$http.get("http://rap2.taobao.org:38080/app/mock/262266/editDoc",{
                    params:{
                        userID:sessionStorage.getItem("userId"),
                        docID:DocID
                    }
                }).then(res=>{
                    if (res.data.success){
                        this.$router.push({
                            path: '/markdown',
                            query:{
                                content: res.data.content,
                                html: res.data.html,
                                docID: DocID,
                            }
                        })
                    }
                    else{
                        alert(res.data.msg);
                    }
                })
            },
            handleOpen(key, keyPath) {
                console.log(key, keyPath);
            },
            handleClose(key, keyPath) {
                console.log(key, keyPath);
            }
        },
        components:{
            Topbar,
            Asidebar
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
</style>