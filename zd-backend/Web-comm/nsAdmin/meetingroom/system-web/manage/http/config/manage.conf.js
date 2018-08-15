  
import views from'../views';
const title = '场地系统';
function manage($stateProvider,$locationProvider,$urlRouterProvider){
    // $urlRouterProvider.otherwise("/manage/home");
    console.log('000');
    $locationProvider.hashPrefix(''); //#
    
    $urlRouterProvider.otherwise('/manage/things');
    $stateProvider
    .state('meettinginfo',{
        url:'/meettinginfo',
        title:'场地展播',
        controller:'meettingInfoController',
        templateUrl:views.meettingInfo
    })
    .state('see',{
        url:'/see/:id',
        title:'图片展播',
        controller:'seeController',
        templateUrl:views.see
    })
    .state('manage',{//配置一级域名
        url:'/manage',
        controller:'baseController',
        abstract:true,
        templateUrl:views.base//'<div ui-view></div>'
    })
    // .state('login', {
    //     url: '/login',
    //     controller: 'loginController',
    //     title:title+'登录',
    //     templateUrl: views.login
    // })
    // .state('manage.about', {
    //     url: '/about',
    //     controller: 'aboutController',
    //     templateUrl: views.about
    // })
    .state('manage.home', {
        url: '/home',
        nav:{name:'首页',url:'manage.home'},
        title:title,
        controller: 'homeController',
        templateUrl: views.home
    })
    .state('manage.meettingscreen',{
        url: '/screen',
        nav:{name:'首页',url:'manage.meettingscreen'},
        title:title,
        controller: 'screenController',
        templateUrl: views.screen
    })
    .state('manage.meetingroom',{//配置二级域名
        url:'/meetingroom',            
        abstract:true,             
        controller:'rmController',
        templateUrl:views.meetingroombase 
    })
    .state('manage.meetingroom.addroom',{//创建场地
        url:'/addroom',      
        title:title,     
        nav1:{name:'管理',url:'manage.home'},
        nav:{name:'首页',url:'manage.home'},
        act:'addroom',
        controller: 'addController',
        templateUrl:views.addmeetingroom 
    })
    .state('manage.meetingroom.editroom',{//创建场地
        url:'/editroom/:id',
        params:{id:''},    
        isEdit:true,  
        title:title,     
        nav1:{name:'管理',url:'manage.home'},
        nav:{name:'首页',url:'manage.home'},
        act:'editroom',
        controller: 'addController',
        templateUrl:views.addmeetingroom 
    })
    .state('manage.meetingroom.timemanage',{//时间
        url:'/timemanage',
        title:title,     
        nav1:{name:'管理',url:'manage.home'},
        nav:{name:'首页',url:'manage.home'},
        act:'timemanage',
        controller: 'timeController',
        templateUrl:views.timemanage 
    })
    .state('manage.meetingroom.addtime',{//时间
        url:'/addtime',
        title:title,     
        nav1:{name:'管理',url:'manage.home'},
        nav:{name:'首页',url:'manage.home'},
        act:'timemanage',
        controller: 'timeController',
        templateUrl:views.timemanage 
    })
    .state('manage.meetingroom.favourablemanage',{//优惠
        url:'/favourablemanage',
        title:title,     
        nav1:{name:'管理',url:'manage.home'},
        nav:{name:'首页',url:'manage.home'},
        act:'favourablemanage',
        controller: 'favourableController',
        templateUrl:views.favourablemanage 
    })
     
    .state('manage.meetingroom.pricemanage',{//价格
        url:'/pricemanage',
        title:title,     
        nav1:{name:'管理',url:'manage.home'},
        nav:{name:'首页',url:'manage.home'},
        act:'pricemanage',
        controller: 'priceController',
        templateUrl:views.pricemanage 
    })
    .state('manage.meetingroom.addprice',{
        url:'/addprice',
        title:title,     
        nav1:{name:'管理',url:'manage.home'},
        nav:{name:'首页',url:'manage.home'},
        act:'pricemanage',
        controller: 'priceController',
        templateUrl:views.addprice 
    })

    .state('manage.meetingroom.goodsmanage',{//提供物品
        url:'/goodsmanage',
        title:title,     
        nav1:{name:'管理',url:'manage.home'},
        nav:{name:'首页',url:'manage.home'},
        act:'goodsmanage',
        controller: 'goodsController',
        templateUrl:views.goodsmanage 
    })
    
    .state('manage.meetingroom.addgoods',{
        url:'/addgoods',
        title:title,     
        nav1:{name:'管理',url:'manage.home'},
        nav:{name:'首页',url:'manage.home'},
        act:'goodsmanage',
        controller: 'goodsController',
        templateUrl:views.addgoods 
    })
    .state('manage.meetingroom.valueaddmanage',{//增值服务
        url:'/valueaddmanage',
        title:title,     
        nav1:{name:'管理',url:'manage.home'},
        nav:{name:'首页',url:'manage.home'},
        act:'valueaddmanage',
        controller: 'valueaddController',
        templateUrl:views.valueaddmanage 
    })
    
    .state('manage.meetingroom.bespeakmanage',{//预约
        url:'/bespeakmanage',
        title:title,     
        nav1:{name:'管理',url:'manage.home'},
        nav:{name:'首页',url:'manage.home'},
        act:'bespeakmanage',
        controller: 'bespeakController',
        templateUrl:views.bespeakmanage 
    })        
    .state('manage.basedata',{//基础数据设置
        url:'/basedata',
        title:title,
        nav:{name:'首页',url:'manage.home'},
        nav1:{name:'数据字典',url:'manage.basedata'},
        act:'basedata',
        controller: 'basedataController',
        templateUrl:views.basedata 
    })
    .state('manage.basedatagroup',{//基础数据设置
        url:'/basedatagroup',
        title:title,
        nav:{name:'首页',url:'manage.home'},
        nav1:{name:'数据分组',url:'manage.basedatagroup'},
        act:'basedata',
        controller: 'basedataController',
        templateUrl:views.basedatagroup
    })
    .state('manage.things',{
        url:'/things',
        title:title,     
        nav1:{name:'物品管理',url:'manage.things'},
        nav:{name:'首页',url:'manage.home'},
        act:'things',
        controller: 'thingsController',
        templateUrl:views.things 
    }) 

    .state('manage.vas',{
        url:'/vas',
        title:title,     
        nav1:{name:'增值服务',url:'manage.vas'},
        nav:{name:'首页',url:'manage.home'},
        act:' ',
        controller: 'vasController',
        templateUrl:views.vas 
    }) 
    .state('manage.showinfo',{//外屏信息展示
        url:'/showinfo',
        title:title,     
        nav1:{name:'外屏信息展示',url:'manage.showinfo'},
        nav:{name:'首页',url:'manage.home'},
        act:' ',
        controller: 'showInfoController',
        templateUrl:views.showinfo 
    }) 
    .state('manage.infomation',{
        url:'/infomation',
        title:title,     
        nav1:{name:'信息设置',url:'manage.infomation'},
        nav:{name:'首页',url:'manage.home'},
        act:' ',
        controller: 'infomationController',
        templateUrl:views.infomation 
    }) 
    .state('manage.orders',{
        url:'/orders',
        title:title,     
        nav1:{name:'订单管理',url:'manage.orders'},
        nav:{name:'首页',url:'manage.home'},
        act:' ',
        controller: 'ordersController',
        templateUrl:views.orders 
    }) 
    .state('manage.addorder',{
        url:'/addorder',
        title:title,     
        nav1:{name:'新增订单',url:'manage.addorder'},
        nav:{name:'订单管理',url:'manage.orders'},
        act:' ',
        controller: 'addOrderController',
        templateUrl:views.addorder 
    }) 
    .state('manage.detailorder',{
        url:'/detailorder/:id',
        title:title,     
        nav1:{name:'订单详情',url:'manage.detailorder'},
        nav:{name:'订单管理',url:'manage.orders'},
        act:' ',
        controller: 'detailController',
        templateUrl:views.detailOrder 
    })
    .state('manage.staff',{
        url:'/staff',
        nav1:{name:'人员管理',url:'manage.staff'},
        nav:{name:'首页',url:'manage.home'},
        title:title,
        controller: 'staffController',
        templateUrl:views.staff 
    })
    .state('manage.staffquery',{
        url:'/staffquery',
        nav1:{name:'添加人员',url:'manage.staffquery'},
        nav:{name:'人员管理',url:'manage.staff'},
        title:title,
        controller: 'staffController',
        templateUrl:views.staffQuery 
    })
    .state('manage.staffdetail',{
        url:'/staffdetail/:id',
        params:{id:null},
        nav1:{name:'人员信息',url:'manage.staffquery'},
        nav:{name:'人员管理',url:'manage.staff'},
        title:title,
        controller: 'staffDetailController',
        templateUrl:views.staffDetail 
    })
    
    .state('manage.staffrole',{
        url:'/staffrole',
        nav1:{name:'权限设置',url:'manage.staffrole'},
        nav:{name:'人员管理',url:'manage.staff'},
        title:title,
        controller: 'staffController',
        templateUrl:views.staffRole
    })
    .state('manage.censusindex',{
        url:'/censusindex',      
        nav1:{name:'统计',url:'manage.censusindex'},
        nav:{name:'统计',url:'manage.censusindex'}, 
        title:title,
        controller: 'censusIndexController',
        templateUrl:views.censusIndex
    })
     
}
export default manage;