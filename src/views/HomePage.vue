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
<!--&lt;!&ndash;                                        <el-button type="info" @click="GotoMarkDown" style="width: 100%; height: 100%; background-color: white"><i class="el-icon-plus" style="size: auto"></i>新建</el-button>&ndash;&gt;-->
<!--                                    </el-card>-->
<!--                                </el-col>-->
<!--                                <el-col :span="6" v-for="Page in res.pageList" :key="Page.id">-->
<!--                                    <el-card shadow="hover" @click.native="viewmk(0)" style="font-size: 20px; font-weight: bold; height: 210px;">-->
<!--&lt;!&ndash;                                        <el-button icon="el-icon-more" circle style="float: right"></el-button><br>&ndash;&gt;-->
<!--                                        <el-dropdown trigger="hover" style="float: right;">-->
<!--                                            <i class="el-icon-more"></i>-->
<!--&lt;!&ndash;                                            <el-button icon="el-icon-more" circle style="float: right" type="info"></el-button>&ndash;&gt;-->
<!--                                            <el-dropdown-menu slot="dropdown" style="float: right">-->
<!--&lt;!&ndash;                                                <el-dropdown-item @click.native="editmk(0)">修改文章</el-dropdown-item>&ndash;&gt;-->
<!--                                                <el-dropdown-item @click.native="editmk(0)">分享</el-dropdown-item>-->
<!--                                                <el-dropdown-item @click.native="editmk(0)">收藏</el-dropdown-item>-->
<!--                                                <el-dropdown-item @click.native="catwriter(0);drawer = true">查看协作者</el-dropdown-item>-->
<!--                                                <el-dropdown-item @click.native="addwriter(0)">邀请协作</el-dropdown-item>-->
<!--                                                <el-dropdown-item @click.native="dropwrite(0)" v-show="!Page.isCreator">退出协作</el-dropdown-item>-->
<!--                                                <el-dropdown-item @click.native="delDoc(0)" v-show="Page.isCreator" style="color:red">移至回收站</el-dropdown-item>-->
<!--                                                <el-dropdown-item @click.native="removeRecentBrowsing(0)" style="color:red">移除最近浏览</el-dropdown-item>-->
<!--                                            </el-dropdown-menu>-->
<!--                                        </el-dropdown>-->

<!--                                        <span style="text-align: center; display: block">{{Page.title}}</span>-->
<!--                                    </el-card>-->
<!--                                </el-col>-->
                                <div class="block">
                                    <el-timeline style="margin-left: 20px">
                                        <el-timeline-item v-for="Page in res.pageList" :key="Page.id" timestamp="2018/4/12" placement="top" style="width: 50%;" >
                                            <el-card shadow="hover" @click.native="viewmk(Page.id)" style="line-height:55px">
                                                <span style="height: 20px;font-weight: bold;font-size: 16px">{{Page.title}}</span><br>
                                                <span style="height: 20px">(可以写点文档属性)</span>
                                            </el-card>
                                        </el-timeline-item>



                                    </el-timeline>
                                </div>
                            </el-row>
                        </div>
                    </el-main>
<!--                    <el-footer>Footer</el-footer>-->
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
    import Asidebar from "../components/Asidebar";

    export default {
        data() {
            return {
                res : {
                    pageList : [
                        {
                            "title": "最近浏览",
                            "id": 1,
                            "isCreator": false
                        },
                        {
                            "title": "最近浏览",
                            "id": 2,
                            "isCreator": false
                        }
                    ],
                    writerList:[]
                },
                drawer:false,
                direction:"rtl"
            }
        },
        created() {
            sessionStorage.setItem("type",0);
            // this.getRecentPage(this.res);
        },
        components:{
            Topbar,
            Asidebar
        },
        methods : {
            removeRecentBrowsing:function(docId){
                this.$http.post(this.requestUrl+"/removeRecentBrowsing",{
                    params:{
                        userId:sessionStorage.getItem("userId"),
                        docId:docId
                    }
                }).then(res=>{
                    if (res.data.success){
                        // alert("移出最近浏览成功");
                        this.$message({
                            type: 'success',
                            message: '移出最近浏览成功'
                        });
                        this.res.pageList.splice(this.ArrayIndexOfBydocId(this.res.pageList, docId),1);
                        location.reload();
                    }
                    else {
                        // alert("移出最近浏览失败");
                        this.$message.error('移出最近浏览失败！请重试');
                    }
                });
            },
            catwriter:function(id){
                sessionStorage.setItem("docId",id);
                this.getWriter(id,this.res);
            }
        },
    }
</script>
<style scoped>
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