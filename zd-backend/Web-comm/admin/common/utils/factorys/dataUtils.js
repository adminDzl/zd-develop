/**
 * 数据格式装换工具（如：数组转树形）
 * Created by fangwj 18/04/10 
 */
(function () {
    'use strict'

    angular.module("app")
        .factory("DataUtils", function () {

            return {
                parseTree: parseTree
            }

           	/**
           	 * 普通数组数据转化为树状数据(有children的)
           	 * fangwj
           	 */
        	function parseTree(dataArr,parentKey,textKey){
        		if(!parentKey)
        			parentKey="parentId";
        		var dataMap={};
        		//变成hashmap
        		for (var i=0;i<dataArr.length;i++){
        			//{123:{ID:123,NAME:HEHE,PID:20}}
        			dataArr[i]["children"]=[];
        			dataMap[dataArr[i].id]=dataArr[i];
        			if(textKey)
        				dataArr[i]["label"]=dataArr[i][textKey];
        		}
        		//console.log("input:"+JSON.stringify(dataMap,null,"\t"));
        		//添加children
        		for (var i=0;i<dataArr.length;i++){
        			var parentId = dataArr[i][parentKey];
        			if(parentId!=null&&parentId!=""){
        				var parent = dataMap[dataArr[i][parentKey]];
        				if(parent!=null)
        					parent.children.push(dataArr[i]);
        				else
        					dataArr[i][parentKey]='';//找不到上级则认为该记录无上级，以免数据丢失
        			}
        		}
        		//console.log("transit:"+JSON.stringify(dataArr,null,"\t"));
        		//保留无上级的对象
        		var dataArrNew=[];
        		for (var i=0;i<dataArr.length;i++){
        			var parentId = dataArr[i][parentKey];
        			if(parentId==null||parentId=="")
        				dataArrNew.push(dataArr[i]);
        		}
        		//console.log("output:"+JSON.stringify(dataArrNew,null,"\t"));
        		return dataArrNew;
        	}
        	
        });
})();