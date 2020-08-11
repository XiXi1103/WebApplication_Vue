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

<!--&lt;!&ndash;                            <el-button type="info" style="float:left" @click="CreateTeam">创建团队</el-button>&ndash;&gt;-->

                            <el-row :gutter="12" style="margin-bottom: 50px">
                                <el-col :span="8">
                                    <el-card shadow="hover">
                                        <el-button type="info" @click="GotoMarkDown">新建</el-button>
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
    export default {
        methods: {
            GotoMarkDown:function(){
                this.$router.push({path:'/markdown'});
            },
            viewmk(DocID){
                this.$http.get("http://rap2.taobao.org:38080/app/mock/262266/viewmk",{
                    params:{
                        userID:sessionStorage.getItem("userId"),
                        docID:DocID
                    }
                }).then(res=>{
                    document.getElementById("doc").innerHTML = res.data.html;
                })
            },
            editmk(DocID){
                this.$http.get("http://rap2.taobao.org:38080/app/mock/262266/editmk",{
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
</style>