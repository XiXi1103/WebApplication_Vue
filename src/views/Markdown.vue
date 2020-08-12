<template>
    <div>
        <Topbar></Topbar>
        <div class="markdown">
            <div class="container">
                <mavon-editor v-model="content" ref="md" @imgAdd="$imgAdd" @change="change" style="width: 1500px;height: 800px;margin: 0 auto; "/>
                <button @click="submit">提交</button>
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
                this.result.docID=this.$route.query.docID;
                this.result.authorID = sessionStorage.getItem("userId");
                this.result.content = this.content;
                this.result.html = this.html;
                var re1 = new RegExp("<.+?>","g");
                this.result.abstract = this.result.html.replace(re1,'').substring(0,30);
                alert(this.result.abstract);
                // alert(msg);
                // this.result.abstract =
                this.$http.post("http://rap2.taobao.org:38080/app/mock/262266/newDoc",this.result).then(res=>{
                    alert(res.data.msg);
                    this.$router.push("/");
                })
            }
        },
        mounted() {
            console.log(this.$route.query.html);
            this.content = this.$route.query.content;
            this.html = this.$route.query.html;
        },
    }
</script>

<style scoped>

</style>