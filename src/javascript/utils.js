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
        Vue.prototype.editmk = function editmk(DocID){
            this.$http.get("http://rap2.taobao.org:38080/app/mock/262266/editDoc",{
                params:{
                    userID:sessionStorage.getItem("userId"),
                    docID:DocID
                }
            }).then(res=>{
                if (res.data.success){
                    this.$router.push({
                        path: '/markdown',
                        query:{
                            content: res.data.content,
                            html: res.data.html,
                            docID: DocID,
                        }
                    })
                }
                else{
                    alert(res.data.msg);
                }
            })
        };
        Vue.prototype.viewmk = function (DocID){
            this.$http.get("http://rap2.taobao.org:38080/app/mock/262266/viewmk",{
                params:{
                    userID:sessionStorage.getItem("userId"),
                    docID:DocID
                }
            }).then(res=>{
                if (res.data.success){
                    this.$router.push({
                        path: '/ShowDoc',
                        query:{
                            content: res.data.content,
                        }
                    })
                }
                else {
                    alert(res.data.msg);
                }
            })
        };
        Vue.prototype.GotoMarkDown = function (){
            this.$router.push({path:'/markdown'});
        };
    }

}
