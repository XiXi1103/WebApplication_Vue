<template>
    <div>
        <el-container>
            <el-header>
                <Topbar></Topbar>
            </el-header>
            <el-container>
                <el-aside width="15%">
                    <el-row class="tac">
                        <el-col>
                            <h5>默认颜色</h5>
                            <el-menu
                                    router :default-active="$route.path"
                                    class="el-menu-vertical-demo"
                                    @open="handleOpen"
                                    @close="handleClose">
<!--                                <el-submenu index="1">-->
<!--                                    <template slot="title">-->
<!--                                        <i class="el-icon-location"></i>-->
<!--                                        <span>导航一</span>-->
<!--                                    </template>-->
<!--                                    <el-menu-item-group>-->
<!--                                        <template slot="title">分组一</template>-->
<!--                                        <el-menu-item index="1-1">选项1</el-menu-item>-->
<!--                                        <el-menu-item index="1-2">选项2</el-menu-item>-->
<!--                                    </el-menu-item-group>-->
<!--                                    <el-menu-item-group title="分组2">-->
<!--                                        <el-menu-item index="1-3">选项3</el-menu-item>-->
<!--                                    </el-menu-item-group>-->
<!--                                    <el-submenu index="1-4">-->
<!--                                        <template slot="title">选项4</template>-->
<!--                                        <el-menu-item index="1-4-1">选项1</el-menu-item>-->
<!--                                    </el-submenu>-->
<!--                                </el-submenu>-->
                                <el-menu-item index="/homepage">
                                    <i class="el-icon-document"></i>
                                    <span slot="title">最近使用</span>
                                </el-menu-item>
                                <el-menu-item index="3">
                                    <i class="el-icon-document"></i>
                                    <span slot="title">我的文档</span>
                                </el-menu-item>
                                <el-menu-item index="4">
                                    <i class="el-icon-menu"></i>
                                    <span slot="title">我的收藏</span>
                                </el-menu-item>
                                <el-menu-item index="5">
                                    <i class="el-icon-document"></i>
                                    <span slot="title">  回  收  站  </span>
                                </el-menu-item>
<!--                                <el-menu-item index="5" disabled>-->
<!--                                    <i class="el-icon-document"></i>-->
<!--                                    <span slot="title">导航三</span>-->
<!--                                </el-menu-item>-->
<!--                                <el-menu-item index="6">-->
<!--                                    <i class="el-icon-setting"></i>-->
<!--                                    <span slot="title">导航四</span>-->
<!--                                </el-menu-item>-->
                            </el-menu>
                        </el-col>
                    </el-row>
                </el-aside>
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
                                <el-col :span="6" v-for="Page in pageList" :key="Page.title">
                                    <el-card shadow="hover" @click.native="viewmk(0)" style="font-size: 20px; font-weight: bold; height: 210px;">
<!--                                        <el-button icon="el-icon-more" circle style="float: right"></el-button><br>-->
                                        <el-dropdown trigger="hover" style="float: right;">
                                            <i class="el-icon-more"></i>
<!--                                            <el-button icon="el-icon-more" circle style="float: right" type="info"></el-button>-->
                                            <el-dropdown-menu slot="dropdown" style="float: right">
                                                <el-dropdown-item @click.native="editmk(0)">修改文章</el-dropdown-item>
                                                <el-dropdown-item @click.native="editmk(0)">分享</el-dropdown-item>
                                                <el-dropdown-item @click.native="editmk(0)" style="color:red">删除</el-dropdown-item>
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

    export default {
        data() {
            return {
                pageList : []
            }
        },
        created() {
            this.$http.get("http://rap2.taobao.org:38080/app/mock/262266/getRecentPage",{
                params:{
                    userID:sessionStorage.getItem("userId"),
                }
            }).then(res=>{
                this.pageList = res.data.PageList;
                console.log(this.pageList)
            });
        },
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
                    document.getElementById("doc").innerHTML = res.data.html;
                })
            },
            editmk(DocID){
                this.$http.get("http://rap2.taobao.org:38080/app/mock/262266/editDoc",{
                    params:{
                        userID:sessionStorage.getItem("userId"),
                        docID:DocID
                    }
                }).then(res=>{
                    console.log(res);
                    this.$router.push({
                        path: '/markdown',
                        query:{
                            content: res.data.content,
                            html: 123}
                    })
                })
            },
            // getRecentPage(){
            //     this.$http.get("http://rap2.taobao.org:38080/app/mock/262266/editDoc",{
            //         params:{
            //             userID:sessionStorage.getItem("userId"),
            //             pageCategory:0
            //         }
            //     }).then(res=>{
            //
            //     })
            // },
            handleOpen(key, keyPath) {
                console.log(key, keyPath);
            },
            handleClose(key, keyPath) {
                console.log(key, keyPath);
            }
        },
        components:{
            Topbar
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