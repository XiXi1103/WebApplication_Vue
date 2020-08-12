export default {
    install(Vue) {
        Vue.prototype.example = function (){
            this.$http.get("http://rap2.taobao.org:38080/app/mock/262266/example/1595992046862",{
                params:{
                    foo:"@ctitle"
                }
            }).then(res=>{
                console.log(res.data);
                return res;
            });
        };
        Vue.prototype.getRecentPage = function (){
            this.$http.get("http://rap2.taobao.org:38080/app/mock/262266/getRecentDoc",{
                params:{
                    userID:sessionStorage.getItem("userId")
                }
            }).then(res=>{
                console.log(res.data.PageList);
                return res.data.PageList;
            });
        };
        Vue.prototype.getMyPage = function (){
            this.$http.get("http://rap2.taobao.org:38080/app/mock/262266/getMyDoc",{
                params:{
                    userID:sessionStorage.getItem("userId")
                }
            }).then(res=>{
                console.log(res.data);
                return res.data.PageList;
            });
        };
    }

}
