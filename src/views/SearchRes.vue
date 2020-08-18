<template>
    <div>
        <el-container>
            <el-header>
                <Topbar></Topbar>
            </el-header>
                <el-container>
                    <el-main>
                        <div id="doc">
                            <el-row :gutter="12">
                                <el-col :span="6" v-for="Page in pageList" :key="Page.id">
                                    <el-card shadow="hover" @click.native="viewmk(Page.id)" style="font-size: 20px; font-weight: bold; height: 210px;">
<!--                                        <el-button icon="el-icon-more" circle style="float: right"></el-button><br>-->
                                        <span style="text-align: center; display: block">{{Page.title}}</span>
                                    </el-card>
                                </el-col>
                            </el-row>
                        </div>
                        <div id="group">
                            <el-row :gutter="12">
                                <el-col :span="6" v-for="Group in groupList" :key="Group.id">
                                    <el-card shadow="hover" @click.native="GotoGroupDoc(Group.id)" style="font-size: 20px; font-weight: bold; height: 210px;">
<!--                                        <el-button icon="el-icon-more" circle style="float: right"></el-button><br>-->
                                        <span style="text-align: center; display: block">{{Group.name}}</span>
                                    </el-card>
                                </el-col>
                            </el-row>
                        </div>
                    </el-main>
                    <el-footer>Footer</el-footer>
                </el-container>
            </el-container>      
    </div>
</template>

<script>
    import Topbar from "../components/Topbar";
    export default {
        name: "GroupDoc",
        data(){
            return{
                pageList:[],
                groupList:[],
                text:sessionStorage.getItem("text")
            }
        },
        components: {
            Topbar,
        },
        methods:{
            catwriter:function(id){
                sessionStorage.setItem("docId",id);
                this.getWriter(id,this.res);
            },
            GotoGroupDoc:function(id){
                sessionStorage.setItem("groupid",id);
                this.$router.push({path: '/groupdoc'});
            }
        },
        created() {
           this.$http.get(this.requestUrl + "/searchDoc",{
                    params:{
                        text:this.text,                        
                        userId:sessionStorage.getItem("userId"),
                    }
                }).then(res => {
                    console.log(res.data);
                    this.pageList = res.data;
            });
           this.$http.get(this.requestUrl + "/searchGroup",{
                    params:{
                        text:this.text,   
                        userId:sessionStorage.getItem("userId"),                     
                    }
                }).then(res => {
                    console.log(res.data);
                    this.groupList = res.data;    
            })             
            sessionStorage.setItem("type",4);
            this.getGroupPage(this.res);
        }
    }

</script>

<style scoped>

</style>