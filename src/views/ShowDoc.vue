<template>
    <div>
        <Topbar></Topbar>
        <br>
        <el-button type="primary" icon="el-icon-edit" round style="float: right;font-size:20px;width: 140px" @click="editmk(0)">编辑</el-button>
        <br>
        <br>
        <br>
        <el-button type="danger" icon="el-icon-star-off" round  style="float: right;font-size:20px;width: 140px" @click="collection()" v-if=!isCollect>收藏</el-button>
        <el-button type="danger" icon="el-icon-star-on" round  style="float: right;font-size:20px;width: 140px" @click="collection()" v-show=isCollect>已收藏</el-button>
        <Asidebar></Asidebar>

        <div id="doc">
            <mavon-editor  v-model="value" :toolbars="markdownOption" :editable = "false" :toolbarsFlag = "false" defaultOpen="preview" :subfield="false"  />
            <br>
            <el-input class="commentBox"
                    type="textarea"
                    :rows="2"
                    placeholder="快来评论吧"
                    v-model="comment.content">
            </el-input>
            <br>
            <br>
            <el-button id="commentButton" type="primary" :loading="false" @click="sendComment">发射！</el-button>
            <br>
            <br>
            <hr/>
            <div class="replyBox" v-for="reply in replyList" :key="reply.replyId">
                <br>
                <button class="el-icon-close" @click="delReply(reply.replyID)" style="float: right;"></button>
                <span style="float:left;padding-left:20px;font-size:25px">{{reply.username}}:</span>
                <br>
                <br>
                <span style="float:left;padding-left:9%;padding-top:1%">{{reply.content}}</span>
<!--                <article>-->
<!--                    <h1 style="float: left">{{reply.username}}:</h1>-->
<!--                    <p> {{reply.content}}</p>-->
<!--                </article>-->

            </div>
        </div>

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
                docID:'',
                comment: {
                    userID:'',
                    docID:'',
                    replyId:'',
                    isReply:'',
                    content:'',
                },
                replyList:[],
                isCollect:'',
            };
        },
        methods:{
            sendComment(){
                this.comment.userID=sessionStorage.getItem("username");
                this.comment.docID = this.docID;
                this.comment.replyId= 0;
                this.comment.isReply = false;
                this.$http.post("http://rap2.taobao.org:38080/app/mock/262266/reply",this.comment).then(res=>{
                    if (!res.data.success) alert(res.data.msg);
                    else{
                        this.findAllReply();
                    }
                })
            },
            findAllReply(){
                this.$http.get("http://rap2.taobao.org:38080/app/mock/262266/findAllReply",{
                    params:{
                        docId:this.docId
                    }
                }).then(res=>{
                    this.replyList = res.data.replyList;
                })
            },
            delReply(replyID){
                this.$http.get("http://rap2.taobao.org:38080/app/mock/262266/deleteReply",{
                    params:{
                        replyID:replyID,
                    }
                }).then(res=>{
                    console.log(res);
                    alert(res.data.msg);
                    this.findAllReply();
                })
            },
            collection(){
                this.$http.get("http://rap2.taobao.org:38080/app/mock/262266/collection",{
                    params:{
                        documentationId:this.docId,
                        userID:sessionStorage.getItem("userId"),
                    }
                }).then(res=>{
                    if (res.data.success==1){
                        this.isCollect=!this.isCollect;
                    }
                    else{
                        alert("收藏失败");
                    }
                })
            }
        },
        created() {
            if (this.$route.query.isCollect==1){
                this.isCollect=true;
            }
            else{
                this.isCollect=false;
            }
            this.value = this.$route.query.content;
            this.docID = this.$route.query.docID;
            this.findAllReply();
            this.$forceUpdate();
        }
    }
</script>

<style scoped>
    #doc{
        width: 70%;
        position:absolute;
        top:10%;
        left:20%;
    }
    .commentBox {
        border-radius: 15px;
        width: 70%;
        padding: 15px 25px 15px 25px;
        background: #fff;
        border: 1px solid #eaeaea;
        box-shadow: 0 0 5px #cac6c6;
    }
    .replyBox{
        width: 70%;
        min-height: 150px;
        margin: 0 auto;
        border: 1px solid #eaeaea;
        border-radius: 15px;
        padding: 1%;
    }
</style>