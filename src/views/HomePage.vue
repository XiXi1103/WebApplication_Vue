<template>
<div>
<Topbar></Topbar>

<el-button type="info" style="float:right" @click="GotoMarkDown">新建</el-button>
</div>
</template>


<script>
  import Topbar from "../components/Topbar";
  export default {
    methods: {
      GotoMarkDown:function(){
        this.$router.push({path:'/markdown'});
      },
    },
    components:{
      Topbar
    }
  }
</script>