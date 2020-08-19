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
                        <div v-if="res.pageList.length===0">
                            <span style="font-size: 16px;color: #8492a6">这里什么都没有~</span>

                        </div>
                        <div class="block" style="line-height: normal" v-if="res.pageList.length>0">
                            <el-timeline>
                                <el-timeline-item v-for="Pages in this.res.pageList" :key="Pages.date" :timestamp="Pages.dates" placement="top">
                                    <el-row :gutter="14">
                                        <el-col :span="12" v-for="Page in Pages.pageList" :key="Page.id">
                                            <el-card shadow="hover" :body-style="{ padding: '0px' }" style="margin-bottom: 10px" @click.native="viewmk(Page.id)">
                                                <el-image
                                                        style="width: 50px; height: 50px; float: left; margin-left: 10px"
                                                        :src="require('@/assets/document-gray.png')"
                                                        :fit="fit"></el-image>
                                                <el-dropdown style="float: right;margin-top: -15px;margin-right: 5px">
                                                    <el-button style="border-color: white">
                                                        <i class="el-icon-more"></i>
                                                    </el-button>
                                            <el-dropdown-menu slot="dropdown" style="float: right">
                                                <el-dropdown-item @click.native="recover(Page.id)">还原</el-dropdown-item>
                                                <el-dropdown-item @click.native="deleteCompletely(Page.id)" style="color:red">彻底删除</el-dropdown-item>
                                                <!--                                                <el-dropdown-item @click.native="editmk(0)">分享</el-dropdown-item>-->
                                            </el-dropdown-menu>
                                                </el-dropdown>
                                                <h4>{{Page.title}}</h4>
                                                <p>{{Page.dates}}</p>
                                            </el-card>
                                        </el-col>
                                    </el-row>
                                </el-timeline-item>
                            </el-timeline>
                        </div>
                        <!--                        <el-timeline :reverse="reverse">-->
                        <!--                            <el-timeline-item-->
                        <!--                                    v-for="Page in res.pageList"-->
                        <!--                                    :key="Page.id"-->
                        <!--                                    :timestamp="2020-12-1">-->
                        <!--                                {{Page.title}}-->
                        <!--                            </el-timeline-item>-->
                        <!--                        </el-timeline>-->
                        <!--                        <div id="doc">-->
                        <!--                            <el-row :gutter="14">-->
                        <!--&lt;!&ndash;                                <el-col :span="6">&ndash;&gt;-->
                        <!--&lt;!&ndash;                                    <el-card shadow="hover" @click.native="GotoMarkDown" style="font-size: 20px; font-weight: bold; height: 210px;">&ndash;&gt;-->
                        <!--&lt;!&ndash;                                        新建<i class="el-icon-plus"></i>&ndash;&gt;-->
                        <!--&lt;!&ndash;                                        &lt;!&ndash;                                        <el-button type="info" @click="GotoMarkDown" style="width: 100%; height: 100%; background-color: white"><i class="el-icon-plus" style="size: auto"></i>新建</el-button>&ndash;&gt;&ndash;&gt;-->
                        <!--&lt;!&ndash;                                    </el-card>&ndash;&gt;-->
                        <!--&lt;!&ndash;                                </el-col>&ndash;&gt;-->
                        <!--                                <el-col :span="10" v-for="Page in res.pageList" :key="Page.id">-->
                        <!--                                    <el-card shadow="hover" @click.native="viewmk(Page.id)" style="margin-bottom: 20px; width: 100%;height: 140px">-->
                        <!--                                        &lt;!&ndash;                                        <el-button icon="el-icon-more" circle style="float: right"></el-button><br>&ndash;&gt;-->
                        <!--                                        &lt;!&ndash;                                        <el-dropdown trigger="hover" style="float: right;">&ndash;&gt;-->
                        <!--                                        &lt;!&ndash;&lt;!&ndash;                                            <el-button type="primary" style="border-color: white;background-color: white">&ndash;&gt;&ndash;&gt;-->
                        <!--                                        &lt;!&ndash;&lt;!&ndash;                                            </el-button>&ndash;&gt;&ndash;&gt;-->
                        <!--                                        &lt;!&ndash;                                            <i class="el-icon-more"></i>&ndash;&gt;-->
                        <!--                                        &lt;!&ndash;                                            &lt;!&ndash;                                            <el-button icon="el-icon-more" circle style="float: right" type="info"></el-button>&ndash;&gt;&ndash;&gt;-->
                        <!--                                        &lt;!&ndash;                                            <el-dropdown-menu slot="dropdown" style="margin-top: -55px">&ndash;&gt;-->
                        <!--                                                <el-dropdown-item @click.native="editmk(0)">修改文章</el-dropdown-item>-->
                        <!--                                                <el-dropdown-item @click.native="editmk(0)">分享</el-dropdown-item>-->
                        <!--                                                                                        <el-dropdown-item @click.native="catwriter(Page.id);drawer = true">查看协作者</el-dropdown-item>-->
                        <!--                                                                                        <el-dropdown-item @click.native="dialogFormVisible = true">邀请协作</el-dropdown-item>-->
                        <!--                                                                                        <el-dropdown-item @click.native="dropwrite(Page.id)" v-show="!Page.isCreator">退出协作</el-dropdown-item>-->
                        <!--                                                                                        <el-dropdown-item @click.native="delDoc(Page.id)" v-show="Page.isCreator" style="color:red">移至回收站</el-dropdown-item>-->
                        <!--                                                                                        &lt;!&ndash;                                                <el-dropdown-item @click.native="editmk(0)">收藏</el-dropdown-item>&ndash;&gt;-->
                        <!--                                                                                        <el-dropdown-item @click.native="cancelCollection(Page.id)" style="color:red">取消收藏</el-dropdown-item>-->
                        <!--                                        &lt;!&ndash;                                            </el-dropdown-menu>&ndash;&gt;-->
                        <!--                                        &lt;!&ndash;                                        </el-dropdown>&ndash;&gt;-->
                        <!--                                        <div  style="float: left; margin-top: -57px">-->
                        <!--                                            <div style="margin-bottom: 0; height: 50px; margin-left: -40px">-->
                        <!--                                                <i class="el-icon-document" style="margin-right: 5px"></i>-->
                        <!--                                                &lt;!&ndash;                                            <span >{{Page.title}}</span>&ndash;&gt;-->
                        <!--                                                <span style="font-size: 20px; font-weight: bold">标题</span><br>-->
                        <!--                                            </div>-->
                        <!--                                            <el-button type="primary" style="float: right;margin-right: -300px">主要按钮</el-button>-->
                        <!--                                            <div style="float: right">-->
                        <!--                                                <el-tag type="info" style=" font-size: 15px;">2020-12-2 廉皓然</el-tag>-->
                        <!--                                            </div>-->
                        <!--                                        </div>-->
                        <!--                                    </el-card>-->
                        <!--                                </el-col>-->
                        <!--                            </el-row>                            -->
                        <!--                        </div>-->
                    </el-main>
<!--                    <el-footer>Footer</el-footer>-->
                </el-container>
            </el-container>
        </el-container>
        <el-dialog
                title="协作者"
                :visible.sync="dialogVisible"

                style="overflow-x: hidden;overflow-y: scroll"
                :before-close="handleClose">
            <el-table
                    :data="res.writerList"
                    style="width: 100%">
                <el-table-column
                        label="用户名"
                        width="180">
                    <template slot-scope="scope">
                        <!--                        <i class="el-icon-time"></i>-->
                        <span style="margin-left: 10px">{{ scope.row.name }}</span>
                    </template>
                </el-table-column>
                <el-table-column
                        label="权限"
                        width="180">
                    <template slot-scope="scope">
                        <!--                        <el-popover trigger="hover" placement="top">-->
                        <!--                            <p>姓名: {{ scope.row.name }}</p>-->
                        <!--                            <p>住址: {{ scope.row.address }}</p>-->
                        <div slot="reference" class="name-wrapper">
                            <el-tag size="medium">{{ permission[scope.row.permission-1] }}</el-tag>
                        </div>
                        <!--                        </el-popover>-->
                    </template>
                </el-table-column>
                <el-table-column label="操作">
                    <template slot-scope="scope">
                        <el-dropdown style="margin-right: 5px">
                            <el-button
                                    size="mini"
                                    @click="handleEdit(scope.$index, scope.row)">改变权限</el-button>
                            <el-dropdown-menu slot="dropdown">
                                <el-dropdown-item @click.native="writerPermission(scope.row.id,1)">查看</el-dropdown-item>
                                <el-dropdown-item @click.native="writerPermission(scope.row.id,2)">评论</el-dropdown-item>
                                <el-dropdown-item @click.native="writerPermission(scope.row.id,3)">分享</el-dropdown-item>
                                <el-dropdown-item @click.native="writerPermission(scope.row.id,4)">修改</el-dropdown-item>
                                <el-dropdown-item @click.native="writerPermission(scope.row.id,5)">管理</el-dropdown-item>
                            </el-dropdown-menu>
                        </el-dropdown>
                        <!--                        <el-button-->
                        <!--                                size="mini"-->
                        <!--                                @click="handleEdit(scope.$index, scope.row)">改变权限</el-button>-->
                        <el-button
                                size="mini"
                                type="danger"
                                @click="delWriter(scope.row.id)">删除</el-button>
                    </template>
                </el-table-column>
            </el-table>
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
                },
                dialogVisible: false,
                permission:["查看","评论","分享","修改","管理"],
                drawer:false,
                direction:"rtl",
                searchList: [],
                value:"",
                dialogFormVisible: false,
                docId:0,
                dialogTableVisible: false,
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
                this.$http.get(this.requestUrl+"/recoverDoc",{
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
                this.$http.get(this.requestUrl+"/delDocCompletely",{
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
            catwriter:function(id){
                this.docId = id;
                // sessionStorage.setItem("docId",id);
                this.getWriter(id,this.res);
                this.dialogVisible = true;
                // this.drawer = true;
                // this.openDialog();
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
