$(function () {
    initPropertyBtn();
    init();
});

function initParam() {
    //init table
    var oTable1 = $('#sample-table').dataTable({
        "aaSorting": [[1, "desc"]],//默认第几个排序
        "bStateSave": true,//状态保存
        "aoColumnDefs": [
            //{"bVisible": false, "aTargets": [ 3 ]} //控制列的隐藏显示
            {"orderable": false, "aTargets": [0, 1, 2, 3, 4, 5, 6]}// 制定列不参与排序
        ]
    });

    // init table
    $('table th input:checkbox').on('click', function () {
        var that = this;
        $(this).closest('table').find('tr > td:first-child input:checkbox')
            .each(function () {
                this.checked = that.checked;
                $(this).closest('tr').toggleClass('selected');
            });

    });
}

function initPropertyBtn() {
    // init property
    $("#attr-property").val("");
    var ul = $("#param-ul");
    ul.html("");
    var liHtml = '<li style="width: 28%;" id="param-input" name="param-input-name">' +
        '<span class="input-span">' +
        '<input value="" name="product-property" aname="属性值" type="text" size="7"/>' +
        '<a class="icon-trash" style="text-decoration:none;" href="javascript:void(0)" onclick="deleteParam(this);"></a>' +
        '</span>' +
        '</li>';
    var liBtn = '<li style="width: 28%;" id="param-add-btn">' +
        '<a href="javascript:void(0)" onclick="addParam();" class="btn btn-success"><i class="icon-plus"></i>添加</a>' +
        '</li>';
    ul.append(liHtml);
    ul.append(liBtn);
}

function init() {
    // get attr
    $.ajax({
        url: 'http://www.zhidevelop.com:8080/product/productattr/list',
        type: 'get',
        data: {},
        success: function (data) {
            var tbody = $("#property-tbody");
            for (var i = 0, j = data.data.page.rows.length; i < j; i++) {
                //判断是否是启用状态
                var propretyHtml = "";
                if (data.data.page.rows[i].status == "1") {
                    propretyHtml = '<tr>' +
                        '<td><label><input type="checkbox" class="ace" value="' + data.data.page.rows[i].id + '"><span class="lbl"></span></label></td>' +
                        '<td>' + data.data.page.rows[i].attrName + '</td>' +
                        '<td>' + data.data.page.rows[i].attrValue + '</td>' +
                        '<td>手机</td>' +
                        '<td>' + data.data.page.rows[i].createTime + '</td>' +
                        '<td class="td-status"><span class="label label-success radius">已启用</span></td>' +
                        '<td class="td-manage">' +
                        '<a onClick="propertyStop(this,' + data.data.page.rows[i].id + ')" href="javascript:;" title="停用"' +
                        'class="btn btn-xs btn-success"><i class="icon-ok bigger-120"></i></a>' +
                        '<a title="编辑" onclick="propertyEdit(' + data.data.page.rows[i].id + ')" href="javascript:;" class="btn btn-xs btn-info">' +
                        '<i class="icon-edit bigger-120"></i></a>' +
                        '<a title="删除" href="javascript:;" onclick="propertyDel(this,' + data.data.page.rows[i].id + ')" class="btn btn-xs btn-warning">' +
                        '<i class="icon-trash  bigger-120"></i></a></td>' +
                        '</tr>';
                } else {
                    propretyHtml = '<tr>' +
                        '<td><label><input type="checkbox" class="ace" value="' + data.data.page.rows[i].id + '"><span class="lbl"></span></label></td>' +
                        '<td>' + data.data.page.rows[i].attrName + '</td>' +
                        '<td>' + data.data.page.rows[i].attrValue + '</td>' +
                        '<td>手机</td>' +
                        '<td>' + data.data.page.rows[i].createTime + '</td>' +
                        '<td class="td-status"><span class="label label-defaunt radius">已停用</span></td>' +
                        '<td class="td-manage">' +
                        '<a onClick="propertyStart(this,' + data.data.page.rows[i].id + ')" href="javascript:;" title="启用"' +
                        'class="btn btn-xs"><i class="icon-ok bigger-120"></i></a>' +
                        '<a title="编辑" onclick="propertyEdit(' + data.data.page.rows[i].id + ')" href="javascript:;" class="btn btn-xs btn-info">' +
                        '<i class="icon-edit bigger-120"></i></a>' +
                        '<a title="删除" href="javascript:;" onclick="propertyDel(this,' + data.data.page.rows[i].id + ')" class="btn btn-xs btn-warning">' +
                        '<i class="icon-trash  bigger-120"></i></a></td>' +
                        '</tr>';
                }

                tbody.append(propretyHtml);
            }
            initParam();
        }, error: function () {
            alert("error");
        }

    });

}

//规格搜索
function searchProperty() {
    $.ajax({
        url: 'http://www.zhidevelop.com:8080/product/productattrvalue/findByAttrId',
        type: 'get',
        data: {
            "attrId": 10
        },
        success: function (data) {
            alert("attrsuccess");
        }, error: function () {
            alert("attrerror");
        }

    });
}

/*添加规格*/
$('#property-add').on('click', function () {
    layer.open({
        type: 1,
        title: '添加规格',
        maxmin: true,
        shadeClose: true, //点击遮罩关闭层
        area: ['800px', ''],
        content: $('#add-property-style'),
        btn: ['提交', '取消'],
        yes: function (index, layero) {
            var num = 0;
            var str = "";
            $(".add_menber input[type$='text']").each(function (n) {
                if ($(this).val() == "") {

                    layer.alert(str += "" + $(this).attr("aname") + "不能为空！\r", {
                        title: '提示框',
                        icon: 0,
                    });
                    num++;
                    return false;
                }
            });
            if (num > 0) {
                return false;
            }
            else {
                //添加属性
                var productParamEle = $("input[name='product-property']");
                var productAttrValues = "";
                for (var i = 0; i < productParamEle.length; i++) {
                    productAttrValues += $(productParamEle[i]).val() + ",";
                }
                productAttrValues = productAttrValues.substring(0, productAttrValues.length - 1);
                var propertyType = $("#property-type").text();
                $.ajax({
                    url: 'http://www.zhidevelop.com:8080/product/productattr/addSave',
                    type: 'post',
                    data: {
                        "attrName": $("#attr-property").val(),
                        "attrValues": productAttrValues,
                        "attrType": "1",
                    },
                    success: function (data) {
                        layer.alert('添加成功！', {
                            title: '提示框',
                            icon: 1,
                        });
                        layer.close(index);
                        self.location.reload();
                    }, error: function () {
                        alert("error");
                        layer.alert('添加失败！', {
                            title: '提示框',
                            icon: 1,
                        });
                        self.location.reload();
                    }

                });

            }
        }, end: function () {
            initPropertyBtn();
        }
    });
});

/*规格-停用*/
function propertyStop(obj, id) {
    layer.confirm('确认要停用吗？', function (index) {
        $.ajax({
            url: 'http://www.zhidevelop.com:8080/product/productattr/updateSave',
            type: 'post',
            data: {
                "id": id,
                "status": 0,
            },
            success: function () {
                $(obj).parents("tr").find(".td-manage").prepend('<a style="text-decoration:none" class="btn btn-xs " onClick="propertyStart(this,id)" href="javascript:;" title="启用"><i class="icon-ok bigger-120"></i></a>');
                $(obj).parents("tr").find(".td-status").html('<span class="label label-defaunt radius">已停用</span>');
                $(obj).remove();
                layer.msg('已停用!', {icon: 5, time: 1000});
            }, error: function () {
                alert("error");
            }
        });
    });
}

/*规格-启用*/
function propertyStart(obj, id) {
    layer.confirm('确认要启用吗？', function (index) {
        $.ajax({
            url: 'http://www.zhidevelop.com:8080/product/productattr/updateSave',
            type: 'post',
            data: {
                "id": id,
                "status": 1,
            },
            success: function () {
                $(obj).parents("tr").find(".td-manage").prepend('<a style="text-decoration:none" class="btn btn-xs btn-success" onClick="propertyStop(this,id)" href="javascript:;" title="停用"><i class="icon-ok bigger-120"></i></a>');
                $(obj).parents("tr").find(".td-status").html('<span class="label label-success radius">已启用</span>');
                $(obj).remove();
                layer.msg('已启用!', {icon: 6, time: 1000});
            }, error: function () {
                alert("error");
            }
        });
    });
}

/*规格-删除*/
function propertyDel(obj, id) {
    var length = $("input[type='checkbox']:checked").length;
    if (length > 1) {
        layer.msg('请选择一个!', {icon: 1, time: 1000});
        return;
    }
    layer.confirm('确认要删除吗？', function (index) {
        $.ajax({
            url: 'http://www.zhidevelop.com:8080/product/productattr/deleteById',
            type: 'post',
            data: {"id": id,},
            success: function () {
                $(obj).parents("tr").remove();
                self.location.reload();
                layer.msg('删除成功!', {icon: 1, time: 1000});
            }, error: function () {
                alert("error");
            }
        });
    });
}

/*规格-批量-删除*/
$("#batch-delete").click(function () {
    var checkBoxs = $("input[type='checkbox']:checked");
    var ids = "";
    for (var i = 0, j = checkBoxs.length; i < j; i++) {
        ids += $(checkBoxs[i]).val() + ",";
    }
    if(ids == ""){
        return;
    }
    ids = ids.substring(0,ids.length-1);
    $.ajax({
        url: 'http://www.zhidevelop.com:8080/product/productattr/deleteByIds',
        type: 'post',
        data: {"ids": ids,},
        success: function () {
            for (var i = 0, j = checkBoxs.length; i < j; i++) {
                $(checkBoxs[i]).parents("tr").remove();
            }
            layer.msg('删除成功!', {icon: 1, time: 1000});
            self.location.reload();
        }, error: function () {
            alert("error");
        }
    });

});

/*规格-编辑*/
function propertyEdit(id) {
    var attrInput = $("#attr-property");
    var ul = $("#param-ul");
    $.ajax({
        url: 'http://www.zhidevelop.com:8080/product/productattr/findById',
        type: 'get',
        data: {"id": id,},
        success: function (data) {
            attrInput.val(data.data.attrName);
            var attrValuesStr = data.data.attrValue;
            if (attrValuesStr.indexOf(",") != -1) {
                var attrValues = attrValuesStr.split(",");
                ul.html("");
                for (var i = 0, j = attrValues.length; i < j; i++) {
                    var liHtml = '<li style="width: 28%;" id="param-input" name="param-input-name">' +
                        '<span class="input-span">' +
                        '<input value="' + data.data.attrValue + '" name="product-property" aname="属性值" type="text" size="7"/>' +
                        '<a class="icon-trash" style="text-decoration:none;" href="javascript:void(0)" onclick="deleteParam(this);"></a>' +
                        '</span>' +
                        '</li>';
                    ul.append(liHtml);
                }
                ul.append(liBtn);
            } else {
                ul.html("");
                var liHtml = '<li style="width: 28%;" id="param-input" name="param-input-name">' +
                    '<span class="input-span">' +
                    '<input value="' + data.data.attrValue + '" name="product-property" aname="属性值" type="text" size="7"/>' +
                    '<a class="icon-trash" style="text-decoration:none;" href="javascript:void(0)" onclick="deleteParam(this);"></a>' +
                    '</span>' +
                    '</li>';
                var liBtn = '<li style="width: 28%;" id="param-add-btn">' +
                    '<a href="javascript:void(0)" onclick="addParam();" class="btn btn-success"><i class="icon-plus"></i>添加</a>' +
                    '</li>';
                ul.append(liHtml);
                ul.append(liBtn);
            }
            layer.open({
                type: 1,
                title: '修改规格信息',
                maxmin: true,
                shadeClose: false, //点击遮罩关闭层
                area: ['800px', ''],
                content: $('#add-property-style'),
                btn: ['提交', '取消'],
                yes: function (index, layero) {
                    var num = 0;
                    var str = "";
                    $(".add_menber input[type$='text']").each(function (n) {
                        if ($(this).val() == "") {

                            layer.alert(str += "" + $(this).attr("name") + "不能为空！\r\n", {
                                title: '提示框',
                                icon: 0,
                            });
                            num++;
                            return false;
                        }
                    });
                    if (num > 0) {
                        return false;
                    }
                    else {
                        //添加属性
                        var productParamEle = $("input[name='product-property']");
                        var productAttrValues = "";
                        for (var i = 0; i < productParamEle.length; i++) {
                            productAttrValues += $(productParamEle[i]).val() + ",";
                        }
                        productAttrValues = productAttrValues.substring(0, productAttrValues.length - 1);
                        var propertyType = $("#property-type").text();
                        $.ajax({
                            url: 'http://www.zhidevelop.com:8080/product/productattr/updateSave',
                            type: 'post',
                            data: {
                                "attrName": $("#attr-property").val(),
                                "attrValue": productAttrValues,
                                "attrType": "1",
                                "id": id,
                            },
                            success: function (data) {
                                layer.alert('修改成功！', {
                                    title: '提示框',
                                    icon: 1,
                                });
                                layer.close(index);
                                self.location.reload();
                            }, error: function () {
                                alert("error");
                                layer.alert('修改失败！', {
                                    title: '提示框',
                                    icon: 1,
                                });
                                self.location.reload();
                            }

                        });
                    }
                }
            });
        }, error: function () {
            alert("error");
        }

    });
}

/*添加属性值*/
function addParam() {
    var liHtml = '<li style="width: 28%;" id="param-input" name="param-input-name">' +
        '<span class="input-span">' +
        '<input value="" name="product-property" aname="属性值" type="text" size="7"/>' +
        '<a class="icon-trash" style="text-decoration:none;" href="javascript:void(0)" onclick="deleteParam(this);"></a>' +
        '</span>' +
        '</li>';
    var liBtn = '<li style="width: 28%;" id="param-add-btn">' +
        '<a href="javascript:void(0)" onclick="addParam();" class="btn btn-success"><i class="icon-plus"></i>添加</a>' +
        '</li>';
    var ul = $("#param-ul");
    $("#param-add-btn").remove();
    ul.append(liHtml);
    ul.append(liBtn);
}

/*删除属性值*/
function deleteParam(ele) {
    var paramInputs = $("li[name='param-input-name']");
    if (paramInputs.length != 1) {
        var ele = $(ele).parent().parent().remove();
    } else {
        layer.alert("至少有一个属性值", {
            title: '提示框',
            icon: 0,
        });
    }
}
