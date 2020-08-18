<template>
    <div>
        <el-container style="height: 100%">
            <el-header>
                <Topbar></Topbar>
            </el-header>
            <el-container>
                <Asidebar></Asidebar>
                <el-container>
                    <el-main>
                        <div>
                            <mavon-editor  v-model="value" :toolbars="markdownOption" :editable = "false" :toolbarsFlag = "false" defaultOpen="preview" :subfield="false" style="z-index:1;border: 1px solid #d9d9d9;height:auto"/>
                        </div>
                        <div v-if = isTemplate style="float: right">
                            <el-button type="danger" icon="el-icon-s-promotion" round  style="" @click="addTem(docId)">添加模板</el-button>
                            <el-popover
                                    title="复制以下连接来进行分享"
                                    width="200"
                                    trigger="click"
                                    :content=link>
                                <el-button slot="reference" icon="el-icon-link" type="warning" round style="margin-left: 10px" @click="shareDoc">分享</el-button>
                            </el-popover>
                        </div>

                        <!--        <el-button type="danger" icon="el-icon-link" round  style="float: right;font-size:20px;width: 160px" @click="shareDoc()" v-if="isTemplate&&permission>=3" >分享文档</el-button>-->
                        <div v-if=!isTemplate style="float: right">
                            <el-button type="primary" icon="el-icon-edit" round style="" @click="editmk(docId)">编辑</el-button>
                            <el-button type="danger" icon="el-icon-star-off" round  style="" @click="collection()" v-show=!isCollect>收藏</el-button>
                            <el-button type="danger" icon="el-icon-star-on" round  style="" @click="collection()" v-show=isCollect>已收藏</el-button>
                            <el-popover
                                    title="复制以下连接来进行分享"
                                    width="200"
                                    trigger="click"
                                    :content=link>
                                <el-button slot="reference" icon="el-icon-link" type="warning" round style="margin-left: 10px" @click="shareDoc()">分享</el-button>
                            </el-popover>
                            <el-button type="info" icon="el-icon-s-custom" round style="margin-left: 10px" @click="dialogFormVisible=true" >邀请协作者</el-button>

                        </div>
                        <div id="doc">
                            <div v-if="this.permission>=2">
                                <el-input v-model="comment.content" placeholder="快来评论吧" style="width: 65%;"></el-input>
<!--                                <el-input class="commentBox"-->
<!--                                          type="textarea"-->
<!--                                          :rows="5"-->
<!--                                          placeholder="快来评论吧"-->
<!--                                          v-model="comment.content">-->
<!--                                </el-input>-->
                                <el-button id="commentButton" icon="el-icon-position" type="success" round :loading="false" @click="sendComment()" style="margin-left: 15px">发射！</el-button>
                            </div>
                            <div v-else>
                                <el-input v-model="comment.content" placeholder="该文档不支持评论哦" style="width: 65%"></el-input>
<!--                                <el-input class="commentBox"-->
<!--                                          type="textarea"-->
<!--                                          :rows="5"-->
<!--                                          placeholder="该文档不支持评论哦"-->
<!--                                          :disabled="true"-->
<!--                                >-->
<!--                                </el-input>-->
                                <el-button id="commentButton" icon="el-icon-position" type="success" round :loading="false" @click="sendComment()" style="margin-left: 15px" :disabled="true">发射！</el-button>
                            </div>
                        </div>
                        <el-divider style=""></el-divider>
                        <el-card class="box-card" v-for="reply in replyList" :key="reply.replyId" style="width: 100%; margin-top: 10px">
                            <div slot="header" class="clearfix" style="height: 15px">
                                <span style="position: relative;top: -70px; float: left; font-size: 20px;font-weight: bold;height: 10px">{{reply.username}}</span>
                                <el-button style="float: right; padding: 3px 0;" type="text" class="textbutton" @click = "delReply(reply.id)" v-if="permission==5">删除</el-button>
                            </div>
                            <div style="height: auto;font-size: 25px">
                                {{reply.content}}
                            </div>

                            <el-tag style="position: relative; float: right;font-size: 15px; margin-bottom: 20px; margin-right: 2px">评论于{{reply.date}}</el-tag>
                        </el-card>
<!--                        <div class="replyBox" v-for="reply in replyList" :key="reply.replyId">-->
<!--                            <button class="el-icon-close" @click="delReply(reply.replyID)" style=""></button>-->
<!--                            <span style="float:left;padding-left:20px;font-size:25px">{{reply.username}}:</span>-->
<!--                            <span style="float:left;padding-left:9%;padding-top:1%">{{reply.content}}</span>-->
<!--                            &lt;!&ndash;                <article>&ndash;&gt;-->
<!--                            &lt;!&ndash;                    <h1 style="float: left">{{reply.username}}:</h1>&ndash;&gt;-->
<!--                            &lt;!&ndash;                    <p> {{reply.content}}</p>&ndash;&gt;-->
<!--                            &lt;!&ndash;                </article>&ndash;&gt;-->
<!--                        </div>-->
                    </el-main>

                    <el-footer>
                    </el-footer>
                </el-container>
            </el-container>
        </el-container>
        <el-dialog title="添加协作者" :visible.sync="dialogFormVisible">
            <el-select
                    v-model="name"
                    placeholder="输入用户名"
                    filterable
                    remote
                    :remote-method="remoteMethod">
                <el-option
                        v-for="user in searchList"
                        :key="user.id"
                        :label="user.name">
                </el-option>
            </el-select>
            <div slot="footer" class="dialog-footer">
                <el-button @click.native="dialogFormVisible = false">取 消</el-button>
                <el-button type="primary" @click.native="addWriter(docId,name);dialogFormVisible = false">添 加</el-button>
            </div>
        </el-dialog>
    </div>
</template>

<script>
    import Topbar from "../components/Topbar";
    import Asidebar from "../components/Asidebar";

    export default {
        name: "ShowDoc",
        components:{
            Topbar,
            Asidebar,
        },
        data() {
            return {
                value: ``,
                docId:'',
                comment: {
                    userId:'',
                    docId:'',
                    replyId:'',
                    isReply:'',
                    content:'',
                },
                replyList:[],
                isCollect:'',
                isTemplate:'',
                permission:'',
                link:'',
                dialogFormVisible:false,
                name:''
            };
        },
        methods:{
            sendComment(){
                this.comment.userId=sessionStorage.getItem("userId");
                this.comment.docId = this.docId;
                this.comment.replyId= 0;
                this.comment.isReply = false;
                this.$http.post(this.requestUrl+"/reply",this.comment).then(res=>{
                    if (!res.data.success) {
                        // alert(res.data.msg);
                        this.$message.error('res.data.msg');
                    }
                    else{
                        this.findAllReply();
                    }
                })
            },
            findAllReply(){
                this.$http.get(this.requestUrl+"/findAllReply",{
                    params:{
                        docId:this.docId
                    }
                }).then(res=>{
                    if(res.data.success) {
                        this.replyList = res.data.replyList;
                    }
                    else {
                        alert(res.data.msg);
                    }
                })
            },
            delReply(replyID){
                this.$http.get(this.requestUrl+"/deleteReply",{
                    params:{
                        replyId:replyID,
                    }
                }).then(res=>{
                    console.log(res);
                    // alert(res.data.msg);
                    this.$message(res.data.msg);
                    this.findAllReply();
                })
            },
            collection(){
                this.$http.get(this.requestUrl+"/collection",{
                    params:{
                        docId:this.docId,
                        userId:sessionStorage.getItem("userId"),
                    }
                }).then(res=>{
                    if (res.data.success){
                        alert(111)
                        this.isCollect=!this.isCollect;
                    }
                    else{
                        // alert("收藏失败");
                        this.$message.error('收藏失败！请重试');
                    }
                })
            },
            shareDoc(){
                if (this.permission<3) {
                    // alert("权限不足，无法分享哦");
                    this.$message.error('权限不足，无法分享哦');
                }
                else {
                    this.link=this.baseUrl+"showDoc?docId="+this.docId;
                }
            }
        },
        created() {
            if (this.$route.query.content==null&&this.$route.query.docId!=null){
                this.$http.get(this.requestUrl+"/viewDoc",{
                    params:{
                        userId:sessionStorage.getItem("userId"),
                        docId:this.$route.query.docId
                    }
                }).then(res=>{
                    if (res.data.success){
                        if (res.data.isCollect) this.isCollect=true;
                        else this.isCollect=false;
                        if (res.data.isTemplate) this.isTemplate=true;
                        else this.isTemplate=false;
                        this.value = res.data.content;
                        this.docId = this.$route.query.docId;
                        this.permission = res.data.userPermission;
                        this.findAllReply();
                    }
                    else {
                        // alert(res.data.msg);
                        this.$message.error(res.data.msg);
                    }
                })
            }
            else{
                if (this.$route.query.isCollect) this.isCollect=true;
                else this.isCollect=false;
                if (this.$route.query.isTemplate) this.isTemplate=true;
                else this.isTemplate=false;
                this.value = this.$route.query.content;
                this.docId = this.$route.query.docId;
                this.permission = this.$route.query.permission;
                this.findAllReply();
                this.$forceUpdate();
            }
            // alert(this.isTemplate);
        }
    }
</script>

<style scoped>
    #doc{
        width: 74%;
        /*position:absolute;*/
        /*top:10%;*/
        /*left:20%;*/
    }
    /*.commentBox {*/
    /*    border-radius: 15px;*/
    /*    width: 70%;*/
    /*    padding: 15px 25px 15px 25px;*/
    /*    background: #fff;*/
    /*    border: 1px solid #eaeaea;*/
    /*    box-shadow: 0 0 5px #cac6c6;*/
    /*    !*position: center;*!*/
    /*}*/
    /*.replyBox{*/
    /*    width: 70%;*/
    /*    min-height: 150px;*/
    /*    margin: 0 auto;*/
    /*    border: 1px solid #eaeaea;*/
    /*    border-radius: 15px;*/
    /*    padding: 1%;*/
    /*}*/
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
    .text {
        font-size: 14px;
    }

    .item {
        margin-bottom: 18px;
    }

    .clearfix:before,
    .clearfix:after {
        display: table;
        content: "";
    }
    .clearfix:after {
        clear: both
    }

    .box-card {
        width: 480px;
    }
    .textbutton {
        color: red;
    }
    .textbutton:hover {
        color: lightcoral;
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