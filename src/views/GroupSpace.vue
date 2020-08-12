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
                                <el-menu-item index="">
                                    <i class="el-icon-document"></i>
                                    <span slot="title">最近使用</span>
                                </el-menu-item>
                                <el-menu-item index="3">
                                    <i class="el-icon-document"></i>
                                    <span slot="title">我的文档</span>
                                </el-menu-item>
<!--                                <el-menu-item index="4">-->
<!--                                    <i class="el-icon-menu"></i>-->
<!--                                    <span slot="title">我的收藏</span>-->
<!--                                </el-menu-item>-->
                                <el-menu-item index="5">
                                    <i class="el-icon-document"></i>
                                    <span slot="title">  回  收  站  </span>
                                </el-menu-item>
                                <el-menu-item index="5" disabled>
                                    <i class="el-icon-document"></i>
                                    <span slot="title">导航三</span>
                                </el-menu-item>
                                <el-menu-item index="6">
                                    <i class="el-icon-setting"></i>
                                    <span slot="title">导航四</span>
                                </el-menu-item>
                            </el-menu>
                        </el-col>
                    </el-row>
                </el-aside>
                <el-container>
                    <el-main>
                        <div id="doc">
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
        name: "GroupSpace",
        components: {
            Topbar
        },
        methods:{
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
                                docID:DocID,
                            }
                        })
                    }
                    else {
                        alert(res.data.msg);
                    }
                })
            },
        }
    }

</script>

<style scoped>

</style>