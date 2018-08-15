/**
 * Created by longHuang on 2016/7/11.
 */
(function () {
    'use strict'

    app.directive('inputImgs', function (pubDeal, modalCode, ModalCtrl,Project) {
        return {
            restrict: 'E',
            replace: true,
            templateUrl: 'common/utils/toolsViews/img_input.html',
            scope: {
                single: '=',
                inits: '=',
                eId: '@',
                eSize: '@',
                eType: '@',
                action: '&',
                start:'&'
            },
            link: function (scope, element, attrs) {
                var types = scope.eType ? scope.eType.split(',') : undefined;
                var esize = scope.eSize ? Number(scope.eSize) : undefined;
                var fs = [];
                var single = scope.single;
                var eUrl = Project.rootPath()+'/upload/file.do';
                if (single) {
                    element.find('input').removeAttr('multiple');
                }

                //点击heading触发input[type="file"]
                element.find('.fullAll').click(function () {
                    element.find('input[type="file"]').click();
                })

                scope.$watch('inits', function (newInits) {
                    // var newInits = JSON.parse(newInits);
                    console.log(newInits);
                    fs = [];
                    if (newInits) {
                        for (var i = 0; i < newInits.length; i++) {
                            fs.push({
                                src: newInits[i].src,
                                name: newInits[i].name,
                                size: newInits[i].size,
                                type: newInits[i].type,
                                attachmentUrl:newInits[i].src
                            })
                        }
                        console.log(fs);
                        scope.imgs = fs;
                        
                        pubDeal.dealFilesType(scope.imgs, function (datas) {
                            scope.action({datas: datas});
                        });                        
                    }
                })

                element.bind('change', function (e) {
                    var flag = true;
                    console.log(e.srcElement || e.target);
                    if ((e.srcElement || e.target).files.length > 0) {
                        var files = (e.srcElement || e.target).files;
                        fs = [];
                        if (!scope.imgs) {
                            scope.imgs = [];
                        }
                        angular.forEach(files, function (file) {
                            if(file.type && types && file.name){
                            	var type = file.name.substring(file.name.lastIndexOf(".")+1);
                            	if(type && types.indexOf(type) == -1){
                            		ModalCtrl.show('提示','上传的文件格式不符',modalCode.warning);
                            		flag = false;
                            		return false;
                            	}
                            }
                            if (file.size && esize && esize < file.size) {
                                ModalCtrl.show('提示', '文件过大，请换图片或者压缩后再上传', modalCode.warning);
                                flag = false;
                                return false;
                            }
                            console.log(file);
                        });
                        if (!flag)return false;
                        angular.forEach(files, function (file) {
                            fs.push(file);
                        })
                        if (single) {
                            scope.imgs = fs;
                        } else {
                            scope.imgs = scope.imgs.concat(fs);
                        }
                        var i = 0;
                        if (scope.imgs.length > 0) {
                            scope.start();
                            angular.element('ui-loading').fadeIn('slow');
                            pubDeal.read(scope.imgs, scope, i, function () {
                                pubDeal.dealFs(eUrl, scope.imgs, function (datas) {
                                    angular.element('ui-loading').fadeOut('slow');
                                    scope.action({datas: datas});
                                });
                            });
                        }
                    }
                })

                scope.cover = function () {
                    return attrs.disabled;
                }

                scope.delete = function (index) {
                    var i = scope.imgs.splice(index, 1);
                    pubDeal.dealFilesType(scope.imgs, function (datas) {
                    	$("#imgInput").val("");
                        scope.action({datas: datas});
                    });                    
                }

                if (!scope.$root.postImg)scope.$root.postImg = [];
                if (!scope.$root.postImgIds)scope.$root.postImgIds = [];
                var imgIndex = scope.$root.postImgIds.indexOf(scope.eId);
                if (imgIndex > -1) {
                    scope.$root.postImg.splice(imgIndex, 1);
                    scope.$root.postImgIds.splice(imgIndex, 1);
                }
                scope.$root.postImgIds.push(scope.eId);
                scope.$root.postImg.push(function (id, url, callback) {
                    if (id == scope.eId) {
                        var fs = scope.imgs;
                        if (fs && fs.length > 0) {
                            console.log(fs);
                            pubDeal.dealFs(url, fs, callback);
                        } else {
                            callback();
                        }
                    }
                })
            }
        }
    })
    app.directive('inputFiles', function (pubDeal, modalCode,Project, ModalCtrl) {
        return {
            restrict: 'E',
            replace: true,
            templateUrl: 'common/utils/toolsViews/file_input.html',
            scope: {
                single: '=',
                inits: '=',
                eId: '@',
                eSize: '@',
                eType: '@',
                action: '&',
                start:'&',
            },
            link: function (scope, element, attrs) {
                var types = scope.eType ? (scope.eType.toLowerCase()).split(',') : undefined;
                var esize = scope.eSize ? Number(scope.eSize) : undefined;
                var fs = [];
                var single = scope.single;
                var eUrl = Project.rootPath()+'/upload/file.do';
                if (single) {
                    element.find('input').removeAttr('multiple');
                }

                //点击heading触发input[type="file"]
                element.find('.fullAll').click(function () {
                    element.find('input[type="file"]').click();
                })

                scope.$watch('inits', function (newInits) {
                    // var newInits = JSON.parse(newInits);
                    console.log(newInits);
                    fs = [];
                    if (newInits) {
                        for (var i = 0; i < newInits.length; i++) {
                            fs.push({
                                src: newInits[i].src,
                                name: newInits[i].name,
                                size: newInits[i].size,
                                type: newInits[i].type,
                                attachmentUrl:newInits[i].src
                            })
                        }
                        console.log(fs);
                        scope.files = fs;
                        pubDeal.dealFilesType(scope.files, function (datas) {
                            scope.action({datas: datas});
                        });                         
                    }
                })

                element.bind('change', function (e) {
                    var flag = true;
                    if ((e.srcElement || e.target).files.length > 0) {
                        var files = (e.srcElement || e.target).files;
                        var fs = [];
                        if (!scope.files) {
                            scope.files = [];
                        }
                        angular.forEach(files, function (file) {
                            if(file.type && types && file.name){
                            	var type = file.name.substring(file.name.lastIndexOf(".")+1);
                            	if(type && types.indexOf(type.toLowerCase()) == -1){
                            		ModalCtrl.show('提示','上传的文件格式不符',modalCode.warning);
                            		flag = false;
                            		return false;
                            	}
                            }
                            if (file.size && esize && esize < file.size) {
                                ModalCtrl.show('提示', '文件过大，请换图片或者压缩后再上传', modalCode.warning);
                                flag = false;
                                return false;
                            }
                            console.log(file);
                        });
                        if (!flag)return false;
                        angular.forEach(files, function (file) {
                            fs.push(file);
                        })
                        if (single) {
                            scope.files = fs;
                        } else {
                            scope.files = scope.files.concat(fs);
                        }
                        var i = 0;
                        if (scope.files.length > 0) {
                            scope.start();
                            angular.element('ui-loading').fadeIn('slow');
                            pubDeal.read(scope.files, scope, i, function () {
                                pubDeal.dealFs(eUrl, scope.files, function (datas) {
                                    angular.element('ui-loading').fadeOut('slow');
                                    scope.action({datas: datas});
                                });
                            });
                        }
                    }
                })

                scope.cover = function () {
                    return attrs.disabled;
                }

                scope.delete = function (index) {
                    var i = scope.files.splice(index, 1);
                    pubDeal.dealFilesType(scope.files, function (datas) {
                    	$("#fileInput").val("");
                        scope.action({datas: datas});
                    });
                }

                if (!scope.$root.postFile)scope.$root.postFile = [];
                if (!scope.$root.postFileIds)scope.$root.postFileIds = [];
                var fileIndex = scope.$root.postFileIds.indexOf(scope.eId);
                if (fileIndex > -1) {
                    scope.$root.postFile.splice(fileIndex, 1);
                    scope.$root.postFileIds.splice(fileIndex, 1);
                }
                scope.$root.postFileIds.push(scope.eId);

                scope.$root.postFile.push(function (id, url, callback) {
                    if (id == scope.eId) {
                        var fs = scope.files;
                        if (fs && fs.length > 0) {
                            console.log(fs);
                            pubDeal.dealFs(url, fs, callback);
                        } else {
                            callback();
                        }
                    }
                });
            }
        }
    })
    app.factory('pubDeal', function (fileReader, $http, Project) {
        return {
            dealFs: dealFs,
            read: read,
            dealFilesType: dealFilesType
        }
        
        //文件类型转换
        function dealFilesType(fs,callback){
        	var datas = [];
        	angular.forEach(fs, function(data){
        		var url = data.attachmentUrl;
        		if(url.indexOf("http") > -1){
        			if(url.indexOf("csc_file") > -1){
        				url = url.substring(url.indexOf("csc_file")+9);
        			}
        			else{
        				url = url.replace(Project.rootPath()+"/","");
        			}
        		}
//        		var url = data.attachmentUrl.indexOf("csc_file") == -1 ? data.attachmentUrl:;
                var postData = {
                		attachmentUrl: url,
                        fileName: data.name,
                        size: data.size+"",
                        type: data.name?data.name.substring(data.name.lastIndexOf(".")+1):""
                    };  
                datas.push(postData);
        	});
        	callback(datas);
        }

        function dealFs(url, fs, callback) {
            var number = fs.length;
            var datas = [];
            sendFile(number);
            function sendFile(number) {
                number--;
                var postData = {
                    inputFileStr: fs[number].src,
                    fileName: fs[number].name,
                    size: fs[number].size,
                    type: fs[number].name.substring(fs[number].name.lastIndexOf(".")+1)
                };
                
                if(fs[number].constructor == Object){
            		var url1 = angular.copy(fs[number].src);
            		if(url1.indexOf("http") > -1){
            			if(url1.indexOf("csc_file") > -1){
            				url1 = url1.substring(url1.indexOf("csc_file")+9);
            			}
            			else{
            				url1 = url1.replace(Project.rootPath()+"/","");
            			}
            		}                	
                	
                	fs[number].attachmentUrl = url1;
                	fs[number].fileName = fs[number].name;
            		datas.push(fs[number]);
            		if(number>0){
            			sendFile(number);
            		}else{
            			callback(datas);
            		}                    	
                }
                else{
                    postMultipart(url, postData,function (status,data) {
                        switch (status){
                            case 'complete':
                                whenComplete(data,number,datas,postData);
                                break;
                            case 'progress':
                                break;
                            case 'fail':
                                break;
                            case 'cancel':
                                break;
                            default:
                                break;
                        }
                    })
                }

                function whenComplete(data,number,datas,postData) {
                    data.size = postData.size;
                    data.type = postData.type;
                    fs[number].attachmentUrl = data.attachmentUrl;
                    datas.push(data);
                    if(number>0){
                        sendFile(number);
                    }else{
                        callback(datas);
                    }
                }
            }
        }

        function postMultipart(url, data,callback) {
            var fd = new FormData();
            angular.forEach(data, function (val, key) {
                fd.append(key, val);
            });

            uploadFiles(url,fd,function (status,data) {
                callback(status,data);
            });
        }

        function uploadFiles(url, fd,callback) {
            console.log(fd);
            var xhr = new XMLHttpRequest();

            xhr.upload.addEventListener("progress", uploadProgress, false);
            xhr.addEventListener("load", uploadComplete, false);
            xhr.addEventListener("error", uploadFailed, false);
            xhr.addEventListener("abort", uploadCanceled, false);
            xhr.open("POST", url);
            xhr.send(fd);

            function uploadProgress(ev) {
                // console.log(ev);
                callback('progress',Math.round(ev.loaded*100/ev.total));
            }

            function uploadComplete(ev) {
                // console.log(ev);
                callback('complete',JSON.parse(ev.target.response.replace(/[ \n\t]/g,"")));
            }

            function uploadFailed(ev) {
                // console.log(ev);
                callback('fail');
            }

            function uploadCanceled(ev) {
                console.log(ev);
                callback('cancel');
            }
        }

        function read(files, scope, i, callback) {
            fileReader.readAsDataUrl(files[i], scope).then(function (result) {
                files[i].src = result;
                i++;
                if (i < files.length) {
                    read(files, scope, i ,callback);
                } else {
                    callback();
                }
            },function(error){
            	console.log(error);
            })
        }
    })
    app.factory('fileReader', ["$q", "$log", function ($q, $log) {
        var onLoad = function (reader, deferred, scope) {
            return function () {
                scope.$apply(function () {
                    deferred.resolve(reader.result);
                });
            };
        };
        var onError = function (reader, deferred, scope) {
            return function () {
                scope.$apply(function () {
                    deferred.reject(reader.result);
                });
            };
        };
        var getReader = function (deferred, scope) {
            var reader = new FileReader();
            reader.onload = onLoad(reader, deferred, scope);
            reader.onerror = onError(reader, deferred, scope);
            return reader;
        };
        var readAsDataURL = function (file, scope) {
            var deferred = $q.defer();
            if(!file.lastModifiedDate){
                deferred.resolve(file.src);
            }else{
                var reader = getReader(deferred, scope);
                reader.readAsDataURL(file);
            }
            return deferred.promise;
        };
        return {
            readAsDataUrl: readAsDataURL
        };
    }]);
})()