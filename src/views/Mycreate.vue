<template>
    <div>
        <Topbar></Topbar>
        <Asidebar></Asidebar>
        <span>我创建的</span>
    </div>
</template>

<script>
    import Topbar from "../components/Topbar";
    import Asidebar from "../components/Asidebar";
    export default {
        name: "Mycreate",
        components:{
            Topbar,
            Asidebar
        }
    }
</script>

<style scoped>

</style>