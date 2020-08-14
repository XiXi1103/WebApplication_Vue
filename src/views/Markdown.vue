<template>
    <div>
        <Topbar></Topbar>
        <div class="markdown">
            <div class="container">
                <mavon-editor v-model="content" ref="md" @imgAdd="$imgAdd" @change="change" style="width: 1500px;height: 800px;margin: 0 auto; "/>
                <br>
                <el-button type="success" icon="el-icon-check" round @click="submit" style="margin-left: 0px">提交</el-button>
                <el-dropdown @command="changePermission" >
                    <el-button type="primary" style="margin-left: 20px" :disabled="!(this.userPermission==5||this.$route.query.docID==null)" >
                        当前权限：{{this.permission}}<i class="el-icon-arrow-up el-icon--right"></i>
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
                html:'',
                configs: {},
                result: [],
                permission:'私密',
                permissionLevel:0,
                userPermission:4,
                docID:'',
            }
        },
        methods: {
            // 将图片上传到服务器，返回地址替换到md中
            $imgAdd(pos){
                let formdata = new FormData();

                this.$upload.post('/上传接口地址', formdata).then(res => {
                    console.log(res.data);
                    this.$refs.md.$img2Url(pos, res.data);
                }).catch(err => {
                    console.log(err)
                })
            },
            // 所有操作都会被解析重新渲染
            change(value, render){
                // render 为 markdown 解析后的结果[html]
                this.html = render;
            },
            // 提交
            submit(){
                if (this.html==null) alert("内容不能为空哦");
                else{
                    this.result.docID=this.$route.query.docID;
                    this.result.authorID = sessionStorage.getItem("userId");
                    this.result.content = this.content;
                    this.result.html = this.html;
                    this.result.permission = this.permissionLevel;
                    var re1 = new RegExp("<.+?>","g");
                    this.result.summary = this.result.html.replace(re1,'').substring(0,30);
                    this.$http.post(this.requestUrl+"/newDoc",this.result).then(res=>{
                        alert(res.data.msg);
                        this.$router.push("/");
                    })
                }

            },
            changePermission(level){
                this.permissionLevel=level;
                if (this.permissionLevel==0) this.permission="私密";
                if (this.permissionLevel==1) this.permission="公开";
                if (this.permissionLevel==2) this.permission="可评论";
                if (this.permissionLevel==3) this.permission="可评论分享";
            }
        },
        mounted() {
            this.content = this.$route.query.content;
            this.html = this.$route.query.html;
            this.changePermission(this.$route.query.currentPermission);
            this.userPermission=this.$route.query.permission;
        },
    }
</script>

<style scoped>

</style>