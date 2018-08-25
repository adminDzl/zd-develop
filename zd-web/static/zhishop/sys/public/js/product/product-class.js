function initZTree() {
    $.ajax({
        url: 'http://www.zhidevelop.com:8080/product/productclass/list',
        type: 'get',
        data: {},
        //判断是不是父节点
        success: function (data) {
            var zNodes = [];
            for (var i = 0, j = data.data.page.rows.length; i < j; i++) {
                var nodeObj;
                if (data.data.page.rows[i].parentid == "-1") {
                    nodeObj = {id: data.data.page.rows[i].id, pId: 0, name: data.data.page.rows[i].name}
                } else {
                    nodeObj = {
                        id: data.data.page.rows[i].id,
                        pId: data.data.page.rows[i].parentId,
                        name: data.data.page.rows[i].name
                    }
                }
                zNodes.push(nodeObj);
            }
            $.fn.zTree.init($("#treeDemo"), setting, zNodes);
            $.fn.zTree.init($("#treeDemo2"), setting);
        }, error: function () {
            alert("error");
        }

    });
}

function demo() {

}

/* 新增类型*/
function addClass() {
    let name = $("#category-name").val();
    let treeObj = parent.getZTree();
    let selectedNodes = treeObj.getSelectedNodes();
    if (selectedNodes.length > 1) {
        alert("最多选择一个节点");
    }
    let parentId = "";
    if (selectedNodes.length != 0) {
        parentId = selectedNodes[0].id;
    }
    let newNode = {name: name};
    treeObj.addNodes(selectedNodes[0], newNode);

    let sort = $("#order-name").val();
    let description = $("#class-description").val();

    if (parentId == "") {
        parentId = "-1";
    }
    $.ajax({
        url: 'http://www.zhidevelop.com:8080/product/productclass/addSave',
        type: 'post',
        data: {
            "name": name,
            "description": description,
            "parentId": parentId,
            "sort": sort,
        },
        success: function () {
            layer.msg('添加成功!', {icon: 1, time: 1000});
            parent.location.reload();
        }, error: function () {
            alert("error");
        }

    });
}

/*delete class*/
function delClass() {
    layer.confirm('确认要删除吗？', function (index) {
        let treeObj = parent.getZTree();
        let selectedNodes = treeObj.getSelectedNodes();
        if (selectedNodes.length == 0) {
            layer.msg('请选择你要删除的类别!', {icon: 1, time: 1000});
        }
        let ids = "";
        for (let i = 0, j = selectedNodes.length; i < j; i++) {
            ids += selectedNodes[i].id + ",";
        }
        ids = ids.substring(0, ids.length - 1);
        $.ajax({
            url: 'http://www.zhidevelop.com:8080/product/productclass/deleteByIds',
            type: 'post',
            data: {
                "ids": ids,
            },
            success: function () {
                for (let i = 0, j = selectedNodes.length; i < j; i++) {
                    treeObj.removeNode(selectedNodes[i]);
                }
                layer.msg('删除成功!', {icon: 1, time: 1000});
            }, error: function () {
                alert("error");
            }
        });
    });
}