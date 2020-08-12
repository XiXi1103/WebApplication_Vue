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
                            <el-col :span="6" v-for="(item,index) in delList" :key="item.title">
                                <el-card shadow="hover" @click.native="viewmk(0)" style="font-size: 20px; font-weight: bold; height: 210px;">
<!--                                        <el-button icon="el-icon-more" circle style="float: right"></el-button><br>-->
                                    <el-dropdown trigger="hover" style="float: right;">
                                        <i class="el-icon-more"></i>
<!--                                            <el-button icon="el-icon-more" circle style="float: right" type="info"></el-button>-->
                                        <el-dropdown-menu slot="dropdown" style="float: right">
                                            <el-dropdown-item @click.native="recover(index)">恢复</el-dropdown-item>
                                            <el-dropdown-item @click.native="del(index)" style="color:red">删除</el-dropdown-item>
                                        </el-dropdown-menu>
                                    </el-dropdown>

                                    <span style="text-align: center; display: block">{{item.title}}</span>
                                </el-card>
                            </el-col>
                        </el-row>
                    </div>
                </el-main>
            </el-container>
            </el-container>
        </el-container>
    </div>
</template>

<script>
    import Topbar from "../components/Topbar";
    import Asidebar from "../components/Asidebar";
    export default {
        name: "RecycleBin",
        components:{
            Topbar,
            Asidebar
        },
        data(){
            return{
                delList: [],
                count: 0
            }
        },
        created() {
            this.$http.get("http://rap2.taobao.org:38080/app/mock/262266/getDelDoc",{
                params:{
                    userID:sessionStorage.getItem("userId"),
                }
            }).then(res=>{
                this.delList = res.data.DelList;
                console.log(this.DelList)
            });
        },
        methods:{
            load(){
                this.count +=2
            },
            viewmk(DocID){
                this.$http.get("http://rap2.taobao.org:38080/app/mock/262266/viewmk",{
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
            recover:function(DocID){
                this.$http.post("http://rap2.taobao.org:38080/app/mock/262266/recoverDoc",{
                    params:{
                        userID:sessionStorage.getItem("userId"),
                        docID:DocID
                    }
                }).then(res=>{
                    if (res.data.success){
                        alert("恢复成功");
                    }
                    else {
                        alert("恢复失败");
                    }
                })
                this.delList.splice(DocID,1)
            },
            del:function(DocID){
                this.$http.post("http://rap2.taobao.org:38080/app/mock/262266/delDoc",{
                    params:{
                        userID:sessionStorage.getItem("userId"),
                        docID:DocID
                    }
                }).then(res=>{
                    if (res.data.success){
                        alert("删除成功");
                    }
                    else {
                        alert("删除失败");
                    }
                })
                this.delList.splice(DocID,1)
            }
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