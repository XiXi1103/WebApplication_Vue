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
        Vue.prototype.getRecentPage = function (PageList){
            this.$http.get("http://rap2.taobao.org:38080/app/mock/262266/getRecentDoc",{
                params:{
                    userID:sessionStorage.getItem("userId")
                }
            }).then(res=>{
                console.log(res.data);
                PageList.pageList = res.data.PageList;
            });
        };
        Vue.prototype.getMyPage = function (PageList){
            this.$http.get("http://rap2.taobao.org:38080/app/mock/262266/getMyDoc",{
                params:{
                    userID:sessionStorage.getItem("userId")
                }
            }).then(res=>{
                console.log(res.data);
                PageList.pageList = res.data.PageList;
            });
        };
        Vue.prototype.getCollectionPage = function (PageList){
            this.$http.get("http://rap2.taobao.org:38080/app/mock/262266/getCollectionDoc",{
                params:{
                    userID:sessionStorage.getItem("userId")
                }
            }).then(res=>{
                console.log(res.data);
                PageList.pageList = res.data.PageList;
            });
        };
        Vue.prototype.getDelPage = function (PageList){
            this.$http.get("http://rap2.taobao.org:38080/app/mock/262266/getDelDoc",{
                params:{
                    userID:sessionStorage.getItem("userId")
                }
            }).then(res=>{
                console.log(res.data);
                PageList.pageList = res.data.PageList; 
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
            this.$http.get("http://rap2.taobao.org:38080/app/mock/262266/viewDoc",{
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
        Vue.prototype.ArrayIndexOfByDocID = function (array, DocID) {
            for (var i = 0; i < array.length; i++) {
                if (array[i].id == DocID) return i;
            }
            return -1;
        };
        // Vue.prototype.delDoc = function (DocID, PageList){
        //     this.$http.post("http://rap2.taobao.org:38080/app/mock/262266/delDoc",{
        //         params:{
        //             userID:sessionStorage.getItem("userId"),
        //             docID:DocID
        //         }
        //     }).then(res=>{
        //         if (res.data.success){
        //             alert("删除成功");
        //             PageList.pageList.splice(this.ArrayIndexOfByDocID(this.res.pageList, DocID),1);
        //         }
        //         else {
        //             alert("删除失败");
        //         }
        //     });
        // }
    }

}
