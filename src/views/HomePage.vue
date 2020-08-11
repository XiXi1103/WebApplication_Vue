<template>
<div>
<Topbar></Topbar>

<el-button type="info" style="float:right" @click="GotoMarkDown">新建</el-button>
<el-button type="info" style="float:left" @click="CreateTeam">创建团队</el-button>
<el-button type="info" style="float:right" @click="viewmk(0)">查看文章</el-button>
<el-button type="info" style="float:right" @click="editmk(0)">修改文章</el-button>
    <div id="doc">文章在这里显示</div>
</div>
</template>


<script>
  import Topbar from "../components/Topbar";
  export default {
    methods: {
        GotoMarkDown:function(){
        this.$router.push({path:'/markdown'});
        },
        CreateTeam(){
            // this.$http.post("http://rap2.taobao.org:38080/app/mock/262266/register",this.user).then(res=>{
        },
        viewmk(DocID){
            this.$http.get("http://rap2.taobao.org:38080/app/mock/262266/viewDoc",{
                params:{
                    userID:sessionStorage.getItem("userId"),
                    docID:DocID
                }
            }).then(res=>{
                document.getElementById("doc").innerHTML = res.data.html;
            })
        },
        editmk(DocID){
            this.$http.get("http://rap2.taobao.org:38080/app/mock/262266/editDoc",{
                params:{
                    userID:sessionStorage.getItem("userId"),
                    docID:DocID
                }
            }).then(res=>{
                console.log(res);
                this.$router.push({
                    path: '/markdown',
                    query:{
                        content: res.data.content,
                        html: 123}
                })
            })

        },
    },
    components:{
      Topbar
    }
  }
</script>