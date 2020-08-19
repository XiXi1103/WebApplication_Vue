<template>
    <div>
        <Topbar></Topbar>
        <div class="markdown">
            <div class="container">
                <br>
                <el-button type="warning" icon="el-icon-time" circle @click="getHistory" style="float: right"></el-button>
                <el-drawer
                        :visible.sync="drawer"
                        :with-header="false">
                    <span style="float: left;font-size: 25px;padding: 20px">修改历史</span>
                    <br>
                    <br>
                    <el-divider></el-divider>
                    <el-card class="box-card"  v-for="history in historyList" :key="history.id" style="width: 100%; margin-top: 10px;height:130px">
                        <p style="float: left;margin-top: 0px;padding:2px;">{{history.time}}2020-1-1</p>
                        <br>
                        <br>
                        修改内容
                        {{history.msg}}
                    </el-card>
                </el-drawer>



                <el-input v-model="title" placeholder="请输入标题" style="width: 20%;margin-left: 90px"></el-input>
                <br>
                <br>
                <mavon-editor v-model="content" ref="md" @imgAdd="$imgAdd" @change="change" style="width: 1500px;height: 800px;margin: 0 auto; "/>
                <br>
                <el-button type="success" icon="el-icon-check" round @click="submit" style="margin-left: 0px">提交</el-button>
                <el-dropdown @command="changePermission" >
                    <el-button type="primary" style="margin-left: 20px" :disabled="!(userPermission==5||this.$route.query.docID==null)" >
                        当前权限：{{otherPermission}}<i class="el-icon-arrow-up el-icon--right"></i>
                    </el-button>
                    <el-dropdown-menu slot="dropdown" >
                        <el-dropdown-item command="0">私密</el-dropdown-item>
                        <el-dropdown-item command="1">公开</el-dropdown-item>
                        <el-dropdown-item command="2">公开且可评论</el-dropdown-item>
                        <el-dropdown-item command="3">公开且可评论转发</el-dropdown-item>
                    </el-dropdown-menu>
                </el-dropdown>
            </div>
        </div>
    </div>
</template>

<script>
    import { mavonEditor } from 'mavon-editor'
    import 'mavon-editor/dist/css/index.css'
    import Topbar from "../components/Topbar";

    export default {
        name: "Markdown",
        props: [],
        components: {
            mavonEditor,
            Topbar
        },
        data() {
            return {
                content:'',
                title:'',
                html:'',
                configs: {},
                result: {},
                otherPermission:'私密',
                permissionLevel:0,
                userPermission:4,
                docID:'',
                drawer: false,
                historyList: [],
            }
        },
        methods: {
            // 将图片上传到服务器，返回地址替换到md中
            $imgAdd(pos,$img){
                let formdata = new FormData();
                formdata.append('file', $img)
                alert(111231);
                this.$http.post(this.requestUrl+"/imgAdd", formdata).then(res => {
                    alert(res.data.url);
                    this.$refs.md.$img2Url(pos, res.data.url);
                })
            },
            // 所有操作都会被解析重新渲染
            change(value, render){
                // render 为 markdown 解析后的结果[html]
                this.html = render;
            },
            // 提交
            submit(){
                if (this.html==null) {
                    // alert("内容不能为空哦");
                    this.$message({
                        message: '内容不能为空哦',
                        type: 'warning'
                    });
                }
                else{
                    this.result.docID=this.$route.query.docID;
                    this.result.authorID = sessionStorage.getItem("userId");
                    this.result.userID = sessionStorage.getItem("userId");
                    this.result.content = this.content;
                    this.result.html = this.html;
                    this.result.otherPermission = this.permissionLevel;
                    this.result.title = this.title;
                    this.result.groupId = this.$route.query.groupId;
                    this.result.isTemplate = this.$route.query.isTemplate;
                    var re1 = new RegExp("<.+?>","g");
                    this.result.summary = this.result.html.replace(re1,'').substring(0,30);
                    this.$http.post(this.requestUrl+"/newDoc",this.result).then(res=>{
                        // alert(res.data.msg);
                        this.$message({
                            message: res.data.msg,
                            type: 'success'
                        });
                        this.$router.push("/homepage");
                    })
                    // alert(this.result.content)
                }

            },
            changePermission(level){
                this.permissionLevel=level;
                if (this.permissionLevel==0) this.otherPermission="私密";
                if (this.permissionLevel==1) this.otherPermission="公开";
                if (this.permissionLevel==2) this.otherPermission="可评论";
                if (this.permissionLevel==3) this.otherPermission="可评论分享";
            },
            getHistory(){
                this.drawer=true;
                this.$http.get(this.requestUrl+"/modifyRecord",{
                    params:{
                        docId:this.docID,
                    }
                }).then(res=>{
                    this.historyList=res.data;
                })
            }
        },
        mounted() {
            this.content = this.$route.query.content;
            this.html = this.$route.query.html;
            this.changePermission(this.$route.query.currentPermission);
            this.userPermission=this.$route.query.permission;
            this.title=this.$route.query.title;
        },
    }
</script>

<style scoped>

</style>