/**
 * Created by longHuang on 2016/7/29.
 */
(function () {
    'use strict'

    app.directive('wiseTree',function () {
        return{
            restrict:'E',
            templateUrl:'../../../pages/toolsViews/wise_tree.html?version='+new Date().getTime(),
            scope:{
                treeData:'=',
                action:'&',
            },
            link:function (scope,element,attrs) {
                scope.$watch('treeData',function (aa) {
                    if(aa)dealData(aa);
                })

                function dealData(aa) {
                    if(element.find('ul').children().length)element.find('ul').children().remove();
                    forEachNext(aa,element.find('ul'));
                    element.find('i').click(function(){
                        element.find(this).parent().children('li').slideToggle();
                        if(element.find(this).hasClass('fa-minus')){
                            element.find(this).removeClass('fa-minus').addClass('fa-plus');
                        }else{
                            element.find(this).removeClass('fa-plus').addClass('fa-minus');
                        }
                        return false;
                    });
                    element.find('span.treeMain').click(function(){
                        scope.action({id:element.find(this).attr('value'),
                                        fatherId:element.find(this).attr('fatherid'),
                                        type:'open'});
                        return false;
                    });
                    element.find('button').click(function () {
                        scope.action({id:element.find(this).attr('value'),
                                        fatherId:element.find(this).attr('fatherid'),
                                        type:(element.find(this).hasClass('btn-info') ? 'change' : 'delete')});
                        return false;
                    })
                }

                function forEachNext(aa,e) {
                    if(aa.length){
                        angular.forEach(aa,function (a,i) {
                            e.append('<li><ul class="wise-tree alert">'+ (a.children.length ? '<i class="fa fa-minus pull-left"><\/i>':'') +'  <span class="treeMain" value="'+a.id+'" fatherid="'+a.fatherId+'">'+(i+1)+'、'+a.text+'<span>      排序值：'+ a.attributes.protoTypeEntity.orderNo +'<\/span>'+
                                '<div class="button-group pull-right"><button value="'+a.id+'" fatherid="'+a.fatherId+'" type="button" class="btn btn-info btn-addon btn-sm">修改</button><button value="'+a.id+'" type="button" class="btn btn-danger btn-addon btn-sm">刪除</button><\/div>'+'<\/span><\/ul><\/li>');
                            if(a.children.length){
                                forEachNext(a.children,e.children('li').last().children('ul').last());
                            }
                        })
                    }
                }
            }
        }
    })
})()