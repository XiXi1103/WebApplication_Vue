<template>
    <div class="full">
        <el-container>
            <el-header>
                <Topbar></Topbar>
            </el-header>
            <el-container>
                <el-aside width="15%">
                    <el-row class="tac">
                        <el-col>
                            <br>
                            <br>
                            <el-button type="success" icon="el-icon-edit" style="margin-left: 5%;width: 60%" @click.native="GotoMarkDown(true)">新建模板</el-button>
                            <br>
                            <br>
                            <el-menu
                                    router :default-active="$route.path"
                                    class="el-menu-vertical-demo"
                                    @open="handleOpen"
                                    @close="handleClose">
                                <el-menu-item @click="showAllTem">
                                    <i class="el-icon-document"></i>
                                    <span slot="title">模板库</span>
                                </el-menu-item>
                                <el-menu-item  @click="showMyTem">
                                    <i class="el-icon-document"></i>
                                    <span slot="title">我的模板</span>
                                </el-menu-item>
                            </el-menu>
                        </el-col>
                    </el-row>
                </el-aside>
                <el-container>
                    <el-main>
                        <div v-if="res.pageList.length===0">
                            <span style="font-size: 16px;color: #8492a6">这里什么都没有~</span>
                        </div>
                        <div class="block" v-if="res.pageList.length>0">
                            <el-timeline>
                                <el-timeline-item v-for="Pages in res.pageList" :key="Pages.date" :timestamp="Pages.dates" placement="top">
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
                                                    <el-dropdown-menu slot="dropdown">
                                                        <el-dropdown-item @click.native="addTem(Page.id)">添加为我的模板</el-dropdown-item>
                                                        <el-dropdown-item @click.native="editmk(Page.id);dialogFormVisible = true">使用模板</el-dropdown-item>
<!--                                                        <el-dropdown-item @click.native="dropwrite(Page.id)" v-show="!Page.isCreator">退出协作</el-dropdown-item>-->
<!--                                                        <el-dropdown-item @click.native="delDoc(Page.id)" v-show="Page.isCreator" style="color:red">移至回收站</el-dropdown-item>-->
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
                        <div>
                            <div v-for="template in templateList" :key="template.id" >
                            <el-row :gutter="12" style="margin-bottom: 50px;">
                                <el-col :span="8">
                                    <el-card shadow="hover">
                                        <p>{{template.title}}</p>

                                        <el-button type="info" @click="viewmk(template.id)" v-show="flag">查看模板</el-button>
                                        <el-button type="info" @click="addTem(template.id)" v-show="flag">添加为我的模板</el-button>
                                        <el-button type="info" @click="editmk(template.id)" v-show="!flag">使用模板</el-button>
                                    </el-card>
                                </el-col>
                            </el-row>
                            </div>
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
    import "@/css/myCSS.css"

    export default {
        name: "Template",
        components:{
            Topbar,
        },
        data() {
            return {
                templateList:[],
                count: 0,
                flag:true,//控制显示内容，模板库页面为真，我的模板页面为假
                res : {
                    pageList : [],
                    writerList : []
                },
            };
        },
        methods:{
            showMyTem(){
                this.flag=false;
                this.templateList = null;
                this.$http.get(this.requestUrl+"/getMyTemplate1",{
                    params:{
                        userId:sessionStorage.getItem("userId"),
                        // userId:0//测试用
                    }
                }).then(res=>{
                    console.log(res.data);
                    if (!res.data) {
                        // alert(res.data.msg);
                        this.$message.error("获取失败");
                    }
                    else {
                        // this.templateList = res.data;
                        this.res.pageList = res.data;
                    }
                    // location.reload();
                    // alert(this.templateList.length);
                })
            },
            showAllTem(){
                this.flag=true;
                this.templateList = null;
                this.$http.get(this.requestUrl+"/getAllTemplate",).then(res=>{
                    this.res.pageList = res.data;
                })
            },

        },
        created() {
            this.showAllTem();
        }
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