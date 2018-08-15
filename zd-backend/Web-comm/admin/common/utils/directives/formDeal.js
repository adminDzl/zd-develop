/**
 * Created by longHuang on 2016/7/20.
 */
(function () {
    'use strict'

    app.directive('formDeal', function (DrapMove,$compile) {
        return {
            templateUrl: 'common/utils/toolsViews/form_init.html',
            scope: {
                htmlValue:'=',
                nameValue:'=',
                action:'&'
            },
            link: function (scope, elements, attrs) {
                DrapMove.init(scope,$compile);
                scope.$watch('htmlValue',function (newValue) {
                    elements.find('#inserHtmlZone').html(newValue);
                    var childs = elements.find('#inserHtmlZone').children();
                    angular.forEach(childs,function(obj,i){
                    	if(!$(obj).attr("data-html")){
                    		$(obj).attr("data-html",true);
                    	}
                    });
                })

                scope.$watch('nameValue',function (newValue) {
                    elements.find("input[name='form_name']").val(newValue).siblings().html(newValue);
                })

                scope.$root.getHtml = function (callback) {
                    callback(elements.find("input[name='form_name']").val(),elements.find('#inserHtmlZone').html());
                }

            }
        }
    })
        .factory('DrapMove', function (ModalCtrl,modalCode) {
            return {
                init: init
            }

            function init(scope,$compile) {
                var LPB = window.LPB = window.LPB || {
                        plugins: [],
                        genSource: function () {
                            var $temptxt = $("<div>").html($("#build").html());
                            //scrubbbbbbb
                            $($temptxt).find(".component").attr({
                                "title": null,
                                "data-original-title": null,
                                "data-type": null,
                                "data-content": null,
                                "rel": null,
                                "trigger": null,
                                "style": null
                            });
                            $($temptxt).find(".valtype").attr("data-valtype", null).removeClass("valtype");
                            $($temptxt).find(".component").removeClass("component");
                            $($temptxt).find("form").attr({
                                "id": null,
                                "style": null
                            });
                            $("#source").val($temptxt.html().replace(/\n\ \ \ \ \ \ \ \ \ \ \ \ /g, "\n"));
                        }

                    };

                /* 表单名称控件 form_name
                 acc  是 class="component" 的DIV
                 e 是 class="leipiplugins" 的控件
                 */
                LPB.plugins['form_name'] = function (active_component, leipiplugins) {
                    var plugins = 'form_name',
                        popover = $(".popover");
                    //右弹form  初始化值
                    $(popover).find("#orgvalue").val($(leipiplugins).val());
                    //右弹form  取消控件
                    $(popover).delegate(".btn-danger", "click", function (e) {
                        e.preventDefault();
                        active_component.popover("hide");
                    });
                    //右弹form  确定控件
                    $(popover).delegate(".btn-info", "click", function (e) {
                        e.preventDefault(); //阻止元素发生默认的行为(例如,当点击提交按钮时阻止对表单的提交
                        var inputs = $(popover).find("input");
                        var orgVal = $("#orgvalue").val();
                        if (orgVal == "") {
                            ModalCtrl.show('提示','请填写表单名称！',modalCode.warning);
                        } else {
                            $.each(inputs, function (i, e) {
                                var attr_name = $(e).attr("id"); //属性名称
                                var attr_val = $("#" + attr_name).val();
                                if (attr_name == 'orgvalue') {
                                    $(leipiplugins).attr("value", attr_val);
                                    active_component.find(".leipiplugins-orgvalue").text(attr_val);
                                }
                                active_component.popover("hide");
                                LPB.genSource(); //重置源代码
                            });
                        }

                    });

                }

                LPB.plugins['title'] = function (active_component, leipiplugins) {
                    var plugins = 'text',
                        popover = $(".popover");
                    //右弹form  初始化值
                    $(popover).find("#orgname").val($(leipiplugins).attr("title"));
                    $(popover).find("#orgvalue").val($(leipiplugins).val());
                    //右弹form  取消控件
                    $(popover).delegate(".btn-danger", "click", function (e) {
                        active_component.popover("hide");
                    });
                    //右弹form  确定控件
                    $(popover).delegate(".btn-info", "click", function (e) {
                        var leftInputVal = $("#orgvalue").val();
                        if (leftInputVal == "") {
                            ModalCtrl.show('提示','控件名称不能为空！',modalCode.warning);
                        } else {
                            $(leipiplugins).text(leftInputVal);
                            active_component.popover("hide");
                            LPB.genSource(); //重置源代码
                        }
                        ;
                    });
                }
                /* 文本框控件 text
                 acc  是 class="component" 的DIV
                 e 是 class="leipiplugins" 的控件
                 */
                LPB.plugins['text'] = function (active_component, leipiplugins) {
                    var plugins = 'text',
                        popover = $(".popover");
                    //右弹form  初始化值
                    $(popover).find("#orgname").val($(leipiplugins).attr("title"));
                    $(popover).find("#orgvalue").val($(leipiplugins).val());
                    //右弹form  取消控件
                    $(popover).delegate(".btn-danger", "click", function (e) {
                        active_component.popover("hide");
                    });
                    //右弹form  确定控件
                    $(popover).delegate(".btn-info", "click", function (e) {

                        var inputs = $(popover).find("input");

                        if ($(popover).find("textarea").length > 0) {
                            inputs.push($(popover).find("textarea")[0]);
                        }
                        ;
                        var leftInputVal = inputs[0].value;
                        if (leftInputVal == "") {
                            ModalCtrl.show('提示','控件名称不能为空！',modalCode.warning)
                        } else {
                            $.each(inputs, function (i, e) {
                                var attr_name = $(e).attr("id"); //属性名称
                                var attr_val = $(e).val();
                                switch (attr_name) {
                                    //要break
                                    case 'orgvalue':
                                        //$(leipiplugins).val(attr_val);
                                        $(leipiplugins).attr("value", attr_val);
                                        break;
                                    //没有break
                                    case 'orgname':
                                        $(leipiplugins).attr("title", attr_val);
                                        active_component.find(".leipiplugins-orgname").text(attr_val);
                                        break;
                                    default:
                                        $(leipiplugins).attr(attr_name, attr_val);
                                }
                                active_component.popover("hide");
                                LPB.genSource(); //重置源代码
                            });
                        }
                        ;

                    });
                }
                /* 多行文本框控件 textarea
                 acc  是 class="component" 的DIV
                 e 是 class="leipiplugins" 的控件
                 */
                LPB.plugins['textarea'] = function (active_component, leipiplugins) {
                    var plugins = 'textarea',
                        popover = $(".popover");
                    //右弹form  初始化值
                    $(popover).find("#orgname").val($(leipiplugins).attr("title"));
                    $(popover).find("#orgvalue").val($(leipiplugins).val());
                    //右弹form  取消控件
                    $(popover).delegate(".btn-danger", "click", function (e) {

                        active_component.popover("hide");
                    });
                    //右弹form  确定控件
                    $(popover).delegate(".btn-info", "click", function (e) {

                        var inputs = $(popover).find("input");
                        if ($(popover).find("textarea").length > 0) {
                            inputs.push($(popover).find("textarea")[0]);
                        }
                        $.each(inputs, function (i, e) {
                            var attr_name = $(e).attr("id"); //属性名称
                            var attr_val = $(e).val();
                            switch (attr_name) {
                                //要break
                                case 'orgvalue':
                                    //$(leipiplugins).val(attr_val);
                                    $(leipiplugins).text(attr_val);
                                    break;
                                //没有break
                                case 'orgname':
                                    $(leipiplugins).attr("title", attr_val);
                                    active_component.find(".leipiplugins-orgname").text(attr_val);
                                default:
                                    $(leipiplugins).attr(attr_name, attr_val);
                            }
                            active_component.popover("hide");
                            LPB.genSource(); //重置源代码
                        });

                    });
                }
                /* 下拉框控件 select
                 acc  是 class="component" 的DIV
                 e 是 class="leipiplugins" 的控件
                 */
                LPB.plugins['select'] = function (active_component, leipiplugins) {
                    var plugins = 'select',
                        popover = $(".popover");
                    //右弹form  初始化值
                    $(popover).find("#orgname").val($(leipiplugins).attr("title"));
                    var val = $.map($(leipiplugins).find("option"), function (e, i) {
                        return $(e).text()
                    });
                    val = val.join("\r");
                    $(popover).find("#orgvalue").text(val);
                    //右弹form  取消控件
                    $(popover).delegate(".btn-danger", "click", function (e) {
                        active_component.popover("hide");
                    });
                    //右弹form  确定控件
                    $(popover).delegate(".btn-info", "click", function (e) {

                        var inputs = $(popover).find("input");
                        if ($(popover).find("textarea").length > 0) {
                            inputs.push($(popover).find("textarea")[0]);
                        }
                        $.each(inputs, function (i, e) {
                            var attr_name = $(e).attr("id"); //属性名称
                            var attr_val = $(e).val();
                            switch (attr_name) {
                                //要break
                                case 'orgvalue':
                                    var options = attr_val.split("\n");
                                    $(leipiplugins).html("");
                                    $.each(options, function (i, e) {
                                        $(leipiplugins).append("\n      ");
                                        $(leipiplugins).append($("<option>").text(e));
                                    });
                                    //$(leipiplugins).text(attr_val);
                                    break;

                                case 'orgname':
                                    $(leipiplugins).attr("title", attr_val);
                                    active_component.find(".leipiplugins-orgname").text(attr_val);
                                    break;
                                default:
                                    $(leipiplugins).attr(attr_name, attr_val);
                            }
                            active_component.popover("hide");
                            LPB.genSource(); //重置源代码
                        });

                    });
                }

                /* 复选控件 checkbox
                 acc  是 class="component" 的DIV
                 e 是 class="leipiplugins" 的控件
                 */
                LPB.plugins['checkbox'] = function (active_component, leipiplugins) {
                    var plugins = 'checkbox',
                        popover = $(".popover");
                    //右弹form  初始化值
                    $(popover).find("#orgname").val($(leipiplugins).attr("title"));
                    console.log($(leipiplugins));
                    var val = $.map($(leipiplugins), function (e, i) {
                        return $(e).val().trim()
                    });
                    val = val.join("\r");
                    $(popover).find("#orgvalue").text(val);
                    //右弹form  取消控件
                    $(popover).delegate(".btn-danger", "click", function (e) {

                        active_component.popover("hide");
                    });
                    //右弹form  确定控件
                    $(popover).delegate(".btn-info", "click", function (e) {

                        var inputs = $(popover).find("input");
                        if ($(popover).find("textarea").length > 0) {
                            inputs.push($(popover).find("textarea")[0]);
                        }
                        $.each(inputs, function (i, e) {
                            var attr_name = $(e).attr("id"); //属性名称
                            var attr_val = $(e).val();
                            var requiredAtt = $(e).attr("data-required");
                            switch (attr_name) {
                                //要break
                                case 'orgvalue':
                                    var checkboxes = attr_val.split("\n");
                                    var html = "<!-- Multiple Checkboxes -->\n";
                                    $.each(checkboxes, function (i, e) {
                                        if (e.length > 0) {
                                            var vName = $(leipiplugins).eq(i).attr("name"),
                                                vTitle = $(leipiplugins).eq(i).attr("title"),
                                                orginline = $(leipiplugins).eq(i).attr("orginline");
                                            if (!vName) vName = '';
                                            if (!vTitle) vTitle = '';
                                            if (!orginline) orginline = '';
                                            if (requiredAtt == "1") {
                                                html += '<label class="checkbox ' + orginline + '">\n<input type="checkbox" name="' + vName + '" title="' + vTitle + '" value="' + e + '" orginline="' + orginline + '" class="c_validate leipiplugins" leipiplugins="checkbox" >' + e + '<i class="i2"></i>\n</label>';
                                            } else {
                                                html += '<label class="checkbox ' + orginline + '">\n<input type="checkbox" name="' + vName + '" title="' + vTitle + '" value="' + e + '" orginline="' + orginline + '" class="leipiplugins" leipiplugins="checkbox" >' + e + '<i class="i2"></i>\n</label>';
                                            }

                                        }
                                        if (requiredAtt == "1" && i == checkboxes.length - 1) {
                                            html += "<em>*</em>"
                                        }
                                        $(active_component).find(".leipiplugins-orgvalue").html(html);
                                    });

                                    break;

                                case 'orgname':
                                    $(leipiplugins).attr("title", attr_val);
                                    active_component.find(".leipiplugins-orgname").text(attr_val);
                                    break;
                                default:
                                    $(leipiplugins).attr(attr_name, attr_val);
                            }
                            active_component.popover("hide");
                            LPB.genSource(); //重置源代码
                        });

                    });
                }

                /* 单选控件 radio
                 acc  是 class="component" 的DIV
                 e 是 class="leipiplugins" 的控件
                 */
                LPB.plugins['radio'] = function (active_component, leipiplugins) {
                    var plugins = 'radio',
                        popover = $(".popover");
                    //右弹form  初始化值
                    $(popover).find("#orgname").val($(leipiplugins).attr("title"));
                    var val = $.map($(leipiplugins), function (e, i) {
                        return $(e).val().trim()
                    });
                    val = val.join("\r");
                    $(popover).find("#orgvalue").text(val);
                    //右弹form  取消控件
                    $(popover).delegate(".btn-danger", "click", function (e) {

                        active_component.popover("hide");
                    });
                    //右弹form  确定控件
                    $(popover).delegate(".btn-info", "click", function (e) {

                        var inputs = $(popover).find("input");
                        if ($(popover).find("textarea").length > 0) {
                            inputs.push($(popover).find("textarea")[0]);
                        }
                        $.each(inputs, function (i, e) {
                            var attr_name = $(e).attr("id"); //属性名称
                            var attr_val = $(e).val();
                            var requiredAtt = $(e).attr("data-required");
                            switch (attr_name) {
                                //要break
                                case 'orgvalue':
                                    var checkboxes = attr_val.split("\n");
                                    var html = "<!-- Multiple Checkboxes -->\n";
                                    $.each(checkboxes, function (i, e) {
                                        if (e.length > 0) {
                                            var vName = $(leipiplugins).eq(i).attr("name"),
                                                vTitle = $(leipiplugins).eq(i).attr("title"),
                                                orginline = $(leipiplugins).eq(i).attr("orginline");
                                            if (!vName) vName = '';
                                            if (!vTitle) vTitle = '';
                                            if (!orginline) orginline = '';
                                            if (requiredAtt == "1") {
                                                html += '<label class="radio ' + orginline + '">\n<input type="radio" name="' + vName + '" title="' + vTitle + '" value="' + e + '" orginline="' + orginline + '" class="c_validate leipiplugins" leipiplugins="radio" >' + e + '<i class="i1"></i>\n</label>';
                                            } else {
                                                html += '<label class="radio ' + orginline + '">\n<input type="radio" name="' + vName + '" title="' + vTitle + '" value="' + e + '" orginline="' + orginline + '" class="leipiplugins" leipiplugins="radio" >' + e + '<i class="i1"></i>\n</label>';
                                            }
                                        }
                                        if (requiredAtt == "1" && i == checkboxes.length - 1) {
                                            html += "<em>*</em>"
                                        }
                                        $(active_component).find(".leipiplugins-orgvalue").html(html);
                                    });
                                    break;

                                case 'orgname':
                                    $(leipiplugins).attr("title", attr_val);
                                    active_component.find(".leipiplugins-orgname").text(attr_val);
                                    break;
                                default:
                                    $(leipiplugins).attr(attr_name, attr_val);
                            }
                            active_component.popover("hide");
                            LPB.genSource(); //重置源代码
                        });

                    });
                }

                /* 上传控件 uploadfile
                 acc  是 class="component" 的DIV
                 e 是 class="leipiplugins" 的控件
                 */
                LPB.plugins['uploadfile'] = function (active_component, leipiplugins) {
                    var plugins = 'uploadfile',
                        popover = $(".popover");
                    //右弹form  初始化值
                    $(popover).find("#orgname").val($(leipiplugins).attr("title"));
                    //右弹form  取消控件
                    $(popover).delegate(".btn-danger", "click", function (e) {

                        active_component.popover("hide");
                    });
                    //右弹form  确定控件
                    $(popover).delegate(".btn-info", "click", function (e) {

                        var inputs = $(popover).find("input");
                        if ($(popover).find("textarea").length > 0) {
                            inputs.push($(popover).find("textarea")[0]);
                        }
                        $.each(inputs, function (i, e) {
                            var attr_name = $(e).attr("id"); //属性名称
                            var attr_val = $(e).val();
                            switch (attr_name) {
                                case 'orgname':
                                    $(leipiplugins).attr("title", attr_val);
                                    active_component.find(".leipiplugins-orgname").text(attr_val);
                                    break;
                                default:
                                    $(leipiplugins).attr(attr_name, attr_val);
                            }
                            active_component.popover("hide");
                            LPB.genSource(); //重置源代码
                        });

                    });
                }
                init2(scope,$compile);
            }

            function init2(scope,$compile) {
                $("#navtab").undelegate("#sourcetab", "click").delegate("#sourcetab", "click", function (e) {
                    LPB.genSource();
                });
                $("form").undelegate(".component", "mousedown").delegate(".component", "mousedown", function (md) {
                    var buildObj = $("#build");
                    var textNum = buildObj.find("input[type='text']").length || 0;
                    var textareaNum = buildObj.find("textarea").length || 0;
                    var selectNum = buildObj.find("select").length || 0;
                    var checkboxNum = buildObj.find("input[type='checkbox']").length || 0;
                    var radioNum = buildObj.find("input[type='radio']").length || 0;
                    var fileUpload = buildObj.find("input[type='file']").length || 0;

                    $(".popover").remove();

                    md.preventDefault();
                    var tops = [];
                    var mouseX = md.pageX;
                    var mouseY = md.pageY;
                    var $temp;
                    var timeout;
                    var $this = $(this);

                    var leipipluginsObj = $this.find(".leipiplugins");

                    var dragType = leipipluginsObj.attr("leipiplugins");

                    var delays = {
                        main: 0,
                        form: 500
                    }
                    var type;

                    if ($this.parent().parent().parent().parent().attr("id") === "components") {
                        if (dragType == "text") {
                            leipipluginsObj.attr("name", "text" + textNum);
                            textNum++;
                        } else if (dragType == "select") {
                            leipipluginsObj.attr("name", "select" + selectNum);
                            textareaNum++;
                        } else if (dragType == "textarea") {
                            leipipluginsObj.attr("name", "textarea" + textareaNum);
                            selectNum++;
                        } else if (dragType == "checkbox") {
                            leipipluginsObj.attr("name", "checkbox" + checkboxNum);
                            checkboxNum++;
                        } else if (dragType == "radio") {
                            leipipluginsObj.attr("name", "radio" + radioNum);
                            radioNum++;
                        } else if (dragType == "uploadfile") {
                            leipipluginsObj.attr("name", "uploadfile" + fileUpload);
                            leipipluginsObj.attr("id", "uploadfile" + fileUpload);

                            leipipluginsObj.attr("rel", "wrapAllFile" + fileUpload);
                            leipipluginsObj.parent().parent().siblings(".file-wrap-zone").attr("id", "wrapAllFile" + fileUpload);
                            fileUpload++;
                        }
                        ;

                        type = "main";
                    } else {
                        type = "form";
                    }

                    var delayed = setTimeout(function () {
                        if (type === "main") {
                            $temp = $("<form class='form-horizontal span6' id='temp'></form>").append($this.clone());
                        } else {
                            if ($this.attr("id") !== "legend") {
                                $temp = $("<form class='form-horizontal span6' id='temp'></form>").append($this);
                            }
                        }

                        $("body").append($temp);

                        $temp.css({
                            "position": "absolute",
                            "top": mouseY - ($temp.height() / 2) + "px",
                            "left": mouseX - ($temp.width() / 2) + "px",
                            "opacity": "0.9"
                        }).show()

                        var half_box_height = ($temp.height() / 2);
                        var half_box_width = ($temp.width() / 2);
                        var $target = $("#target");
                        var tar_pos = $target.offset();
                        var $target_component = $("#target .component");

                        $(document).undelegate("body", "mousemove").delegate("body", "mousemove", function (mm) {

                            var mm_mouseX = mm.pageX;
                            var mm_mouseY = mm.pageY;

                            $temp.css({
                                "top": mm_mouseY - half_box_height + "px",
                                "left": mm_mouseX - half_box_width + "px"
                            });

                            if (mm_mouseX > tar_pos.left &&
                                mm_mouseX < tar_pos.left + $target.width() + $temp.width() / 2 &&
                                mm_mouseY > tar_pos.top &&
                                mm_mouseY < tar_pos.top + $target.height() + $temp.height() / 2
                            ) {
                                $("#target").css("background-color", "#fafdff");
                                $target_component.css({
                                    "border-top": "1px solid white",
                                    "border-bottom": "none"
                                });
                                tops = $.grep($target_component, function (e) {
                                    return ($(e).position().top + tar_pos.top - mm_mouseY > 0 && $(e).attr("id") !== "legend");
                                });
                                if (tops.length > 0) {
                                    $(tops[0]).css("border-top", "1px solid #22aaff");
                                } else {
                                    if ($target_component.length > 0) {
                                        $($target_component[$target_component.length - 1]).css("border-bottom", "1px solid #22aaff");
                                    }
                                }
                            } else {
                                $("#target").css("background-color", "#fff");
                                $target_component.css({
                                    "border-top": "1px solid white",
                                    "border-bottom": "none"
                                });
                                $target.css("background-color", "#fff");
                            }
                        });

                        $("body").undelegate("#temp", "mouseup").delegate("#temp", "mouseup", function (mu) {
                            mu.preventDefault();

                            var mu_mouseX = mu.pageX;
                            var mu_mouseY = mu.pageY;
                            var tar_pos = $target.offset();

                            $("#target .component").css({
                                "border-top": "1px solid white",
                                "border-bottom": "none"
                            });

                            // acting only if mouse is in right place
                            if (mu_mouseX + half_box_width > tar_pos.left &&
                                mu_mouseX - half_box_width < tar_pos.left + $target.width() &&
                                mu_mouseY + half_box_height > tar_pos.top &&
                                mu_mouseY - half_box_height < tar_pos.top + $target.height()
                            ) {
                                $temp.attr("style", null);
                                // where to add
                                if (tops.length > 0) {
                                    $($temp.html()).insertBefore(tops[0]);
                                } else {
                                    //$("#target fieldset").append($temp.append("\n\n\ \ \ \ ").html());
                                    $("#inserHtmlZone").append($temp.html());
                                }
                            } else {
                                // no add
                                $("#target .component").css({
                                    "border-top": "1px solid white",
                                    "border-bottom": "none"
                                });
                                tops = [];
                            }

                            //clean up & add popover
                            $target.css("background-color", "#fff");
                            $(document).undelegate("body", "mousemove");
                            $("body").undelegate("#temp", "mouseup");
                            $("#target .component").popover({
                                trigger: "manual"
                            });
                            $temp.remove();
                            LPB.genSource();
                        });
                    }, delays[type]);

                    $(document).mouseup(function () {
                        clearInterval(delayed);
                        return false;
                    });
                    $(this).mouseout(function () {
                        clearInterval(delayed);
                        return false;
                    });
                });

                initClickEvent(scope,$compile);
            };

            function initClickEvent(scope,$compile) {
                //activate legend popover

                $("#target .component").popover({
                    trigger: "manual"
                });
                //popover on click event
                $("#target").undelegate(".component", "click").delegate(".component", "click", function (e) {
                    // console.log($('.popover'));
                    $(".popover").remove();
                    e.preventDefault();
                    // $(".popover").hide();
                    var active_component = $(this);
                    active_component.popover("show");
                    //class="leipiplugins"
                    var leipiplugins = active_component.find(".leipiplugins"),
                        plugins = $(leipiplugins).attr("leipiplugins"); //leipiplugins="text"
                    //exec plugins
                    if (typeof(LPB.plugins[plugins]) == 'function') {
                        try {
                            LPB.plugins[plugins](active_component, leipiplugins);
                        } catch (e) {
                            console.log(e);
                            ModalCtrl.show('提示',e.toString(),modalCode.warning);
                        }
                    } else {
                        ModalCtrl.show('提示','控件有误或不存在',modalCode.warning);
                    }

                });
            };
        });
})()