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
                                                <el-dropdown-item @click.native="delDoc(0)" style="color:red">移至回收站</el-dropdown-item>
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
    import GroupAside from "../components/GroupAside";
    export default {
        name: "GroupDoc",
        data(){
            return{
                res:{
                    groupPage:[]
                }
            }
        },
        components: {
            Topbar,
            GroupAside
        },
        methods:{
            
        },
        created() {
            sessionStorage.setItem("type",4);
            this.getGroupPage(this.res);
        }
    }

</script>

<style scoped>

</style>