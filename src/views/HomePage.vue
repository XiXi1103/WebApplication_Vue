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
                                <el-col :span="6">
                                    <el-card shadow="hover" @click.native="GotoMarkDown" style="font-size: 20px; font-weight: bold; height: 210px;">
                                        新建<i class="el-icon-plus"></i>
<!--                                        <el-button type="info" @click="GotoMarkDown" style="width: 100%; height: 100%; background-color: white"><i class="el-icon-plus" style="size: auto"></i>新建</el-button>-->
                                    </el-card>
                                </el-col>
                                <el-col :span="6" v-for="Page in res.pageList" :key="Page.id">
                                    <el-card shadow="hover" @click.native="viewmk(0)" style="font-size: 20px; font-weight: bold; height: 210px;">
<!--                                        <el-button icon="el-icon-more" circle style="float: right"></el-button><br>-->
                                        <el-dropdown trigger="hover" style="float: right;">
                                            <i class="el-icon-more"></i>
<!--                                            <el-button icon="el-icon-more" circle style="float: right" type="info"></el-button>-->
                                            <el-dropdown-menu slot="dropdown" style="float: right">
<!--                                                <el-dropdown-item @click.native="editmk(0)">修改文章</el-dropdown-item>-->
                                                <el-dropdown-item @click.native="editmk(0)">分享</el-dropdown-item>
                                                <el-dropdown-item @click.native="editmk(0)">收藏</el-dropdown-item>
                                                <el-dropdown-item @click.native="addwriter(0)">协作</el-dropdown-item>
                                                <el-dropdown-item @click.native="removeRecentBrowsing(0)" style="color:red">移除最近浏览</el-dropdown-item>
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
            sessionStorage.setItem("type",0);
            this.getRecentPage(this.res);
        },
        components:{
            Topbar,
            Asidebar
        },
        methods : {
            removeRecentBrowsing:function(DocID){
                this.$http.post("http://rap2.taobao.org:38080/app/mock/262266/removeRecentBrowsing",{
                    params:{
                        userID:sessionStorage.getItem("userId"),
                        docID:DocID
                    }
                }).then(res=>{
                    if (res.data.success){
                        alert("移出最近浏览成功");
                        this.res.pageList.splice(this.ArrayIndexOfByDocID(this.res.pageList, DocID),1);
                    }
                    else {
                        alert("移出最近浏览失败");
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