
import angular from 'angular';
import uibootstrap from 'angular-ui-bootstrap';
import baseController from './base.controller';
import homeController from './home/home.controller';
// import aboutController from './about/about.controller';
// import loginController from './login/login.controller';
import addController from './roommanage/meetingroom/add.controller';
import priceController from './roommanage/price/price.controller';
import timeController from './roommanage/time/time.controller';
// import demoController from './demo/demo.controller';
import goodsController from './roommanage/goods/goods.controller';
import valueaddController from './roommanage/valueadd/valueadd.controller';
import favourableController from './roommanage/favourable/favourable.controller';
import bespeakController from './roommanage/bespeak/bespeak.controller';
import ordersController from './orders/orders.controller';
import addOrderController from './orders/addOrder.controller';
import basedataController from './basedata/basedata.controller';
import thingsController from './things/things.controller';
import vasController from './vas/vas.controller';
import infomationController from './infomation/infomation.controller';
import showInfoController from './showinfo/showinfo.controller';
import rmController from './roommanage/rm.controller';
import staffController from './staff/staff.controller';
import detailController from './orders/detail.controller';
import staffDetailController from './staff/detail.controller';
import censusIndexController from './census/censusIndex.controller';
import meettingInfoController from './showinfo/meettingInfo.controller';
import screenController from './home/screen.controller';
import seeController from './showinfo/see.controller'
const controllersModule = angular.module('wabgApp.controllers', [uibootstrap,
    staffDetailController,
    seeController,
    screenController,
    baseController,
    meettingInfoController,
    censusIndexController,
    detailController,
    staffController,
    addOrderController,
    homeController,
    priceController,
    addController,
    timeController,
    goodsController,
    valueaddController,
    favourableController,
    bespeakController,
    basedataController,
    thingsController,
    vasController,
    showInfoController,
    infomationController,
    ordersController,
    rmController
    ])
   
 export  default controllersModule;
 

 
