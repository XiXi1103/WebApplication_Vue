<template>
    <div>
        <Topbar></Topbar>
        <Asidebar></Asidebar>
        <span>回收站</span>
    </div>
</template>

<script>
    import Topbar from "../components/Topbar";
    import Asidebar from "../components/Asidebar";
    export default {
        name: "RecycleBin",
        components:{
            Topbar,
            Asidebar
        }
    }
</script>

<style scoped>

</style>