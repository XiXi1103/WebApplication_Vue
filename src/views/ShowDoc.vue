<template>
    <div>
        <Topbar></Topbar>
        <Asidebar></Asidebar>
        <mavon-editor v-model="value" :toolbars="markdownOption" :editable = "false" :toolbarsFlag = "false" defaultOpen="preview" :subfield="false"  />
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
            };
        },
        mounted() {
            this.value = this.$route.query.content;
        }
    }
</script>

<style scoped>
</style>