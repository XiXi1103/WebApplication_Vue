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
                        <div>
                            <div v-for="template in templateList" :key="template.ID" >
                            <el-row :gutter="12" style="margin-bottom: 50px;">
                                <el-col :span="8">
                                    <el-card shadow="hover">
                                        <p>{{template.name}}</p>

                                        <el-button type="info" @click="viewmk(template.ID)" v-show="flag">查看模板</el-button>
                                        <el-button type="info" @click="addCollection(template.ID)" v-show="flag">添加为我的模板</el-button>
                                        <el-button type="info" @click="editmk(template.ID)" v-show="!flag">使用模板</el-button>
                                    </el-card>
                                </el-col>
                            </el-row>
                            </div>
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
        name: "Template",
        components:{
            Topbar,
        },
        data() {
            return {
                templateList:[],
                count: 0,
                flag:true,//控制显示内容，模板库页面为真，我的模板页面为假
            };
        },
        methods:{
            showMyTem(){
                this.flag=false;
                this.$http.get(this.requestUrl+"/getMyTemplate1",{
                    params:{
                        // userId:sessionStorage.getItem("userId")
                        userId:0//测试用
                    }
                }).then(res=>{
                    if (res.data.success!=1) {
                        // alert(res.data.msg);
                        this.$message.error(res.data.msg);
                    }
                    else {
                        this.templateList = res.data;
                    }
                })
            },
            showAllTem(){
                this.flag=true;
                this.$http.get(this.requestUrl+"/getAllTemplate",).then(res=>{
                    this.templateList = res.data;
                })
            },

        },
        created() {
            this.showAllTem();
        }
    }
</script>

<style scoped>

</style>