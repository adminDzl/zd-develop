
var angular = require('angular');

function views() {
    return {        
        base:require('./base.view.html'),
        head: require('./head/head.view.html'),
        menu: require('./menu/menu.view.html'),
        login: require('./login/login.view.html'),
        map: require('./map/map.view.html'),
        about: require('./about/about.view.html'),
        home:require('./home/home.view.html'),
        richedit:require('./richedit/richedit.view.html'),
        meetingroombase:require('./roommanage/meetingroombase.view.html'),
        
        addmeetingroom:require('./roommanage/meetingroom/addmeetingroom.view.html'),
        pricemanage:require('./roommanage/price/list.view.html'),
        addprice:require('./roommanage/price/add.view.html'),
        goodsmanage:require('./roommanage/goods/list.view.html'),
        addgoods:require('./roommanage/goods/add.view.html'),
        demo:require('./demo/demo.view.html'),
        timemanage:require('./roommanage/time/list.view.html'),
        addtime:require('./roommanage/time/add.view.html'),
        modal:require('./plugins/modal/modal.view.html'),
        valueaddmanage:require('./roommanage/valueadd/list.view.html'),
        addvalues:require('./roommanage/valueadd/add.view.html'),
        favourablemanage:require('./roommanage/favourable/list.view.html'),
        addfavourable:require('./roommanage/favourable/add.view.html'),
        bespeakmanage:require('./roommanage/bespeak/bespeak.view.html'),
        things:require('./things/list.view.html'),
        addthings:require('./things/add.view.html'),
        vas:require('./vas/list.view.html'),
        addvas:require('./vas/add.view.html'),
        basedata:require('./basedata/list.view.html'),
        basedatagroup:require('./basedata/group.view.html'),        
        addbasedata:require('./basedata/add.view.html'),
        addbasedatagroup:require('./basedata/addgroup.view.html'),
        addshowinfo:require('./showinfo/add.view.html'),
        infomation:require('./infomation/list.view.html'),
        showinfo:require('./showinfo/list.view.html'),
        orders:require('./orders/list.view.html'),
        addorder:require('./orders/add.view.html'),
        orderFen:require('./orders/fen.view.html'),
        editOrderGoods:require('./orders/editGoods.view.html'),
        closeOrder:require('./orders/close.view.html'),
        editServ:require('./orders/editServ.view.html'),
        addServ:require('./orders/addServ.view.html'),
        detailOrder:require('./orders/detail.view.html'),
        staff:require('./staff/list.view.html'),
        staffQuery:require('./staff/query.view.html'),
        staffRole:require('./staff/role.view.html'),
        
        staffDetail:require('./staff/detail.view.html'),
        staffEdit:require('./staff/edit.view.html'),
        censusIndex:require('./census/data1.view.html'),
        meettingInfo:require('./showinfo/show.view.html'),
        addvasDetail:require('./roommanage/valueadd/detail.view.html'),
        screen:require('./home/screen.view.html'),
        see:require('./showinfo/see.view.html'),
        auditmanage:require('./roommanage/audit/list.view.html')
    };
}

exports = module.exports = views();

var viewsModule = angular.module('wabgApp.views', [])
    .constant(views.name, exports);
 
exports.default = viewsModule.name;