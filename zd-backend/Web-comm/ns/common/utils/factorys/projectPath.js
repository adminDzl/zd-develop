app.factory('Project', function () {
    var rootPath = function () {
    	var curWwwPath=window.document.location.href;
        //获取主机地址之后的目录，如： uimcardprj/share/meun.jsp
        var pathName=window.document.location.pathname;
        var pos=curWwwPath.indexOf(pathName);
        //获取主机地址，如： http://localhost:8083
        var localhostPaht=curWwwPath.substring(0,pos);
        //获取带"/"的项目名，如：/uimcardprj
        var projectName=pathName.substring(0,pathName.substr(1).indexOf('/')+1);
//        return localhostPaht + projectName;
       //return "http://arch-test.yuanqu.cc";
        return "http://192.168.91.103:8080";
        //return "http://192.168.91.72:8080";
        //return localhostPaht;
    }
    
    return {
    	 rootPath: function () {
             return rootPath();
         }
    }
    
});

