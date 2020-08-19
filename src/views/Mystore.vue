<template>
    <div>
        <Topbar></Topbar>
        <Asidebar></Asidebar>
        <span>我的收藏</span>
    </div>
</template>

<script>
    import Topbar from "../components/Topbar";
    import Asidebar from "../components/Asidebar";
    export default {
        name: "Mystore",
        components:{
            Topbar,
            Asidebar
        }
    }
</script>

<style scoped>

</style>