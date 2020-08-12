<template>
    <div>
        <Topbar></Topbar>
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
                comment: {
                    userID:'',
                    docID:'',
                    replyId:'',
                    isReply:'',
                    content:'',
                },
            };
        },
        methods:{
            sendComment(){
                this.$http.post("http://rap2.taobao.org:38080/app/mock/262266/reply",this.comment).then(res=>{
                    if (!res.data.success) alert(res.data.msg);
                    else{
                        this.findAllReply();
                    }

                })
            },
            findAllReply(){
                
            }
        },
        mounted() {
            this.value = this.$route.query.content;
            this.docID = this.$route.query.docID;
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
</style>