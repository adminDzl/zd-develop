
import angular from 'angular';

import meetingRoomService from './meetingroom/meetingroom.service';

import baseService from './base.service';
import priceService from './meetingroom/price.service';
import timeService from './meetingroom/time.service';
import goodsService from './meetingroom/goods.service';
import roomService from './meetingroom/room.service';
import favourableService from './meetingroom/favourable.service';
import valuesService from './meetingroom/values.service';
import thingsService from './things/things.service';
import vasService from './vas/vas.service';
import infomationService from './infomation/infomation.service';
import basedataService from './basedata/basedata.service';
import homeService from './home/home.service';
import showInfoService from './showinfo/showinfo.service';
import bespeakService from './meetingroom/bespeak.service';
import ordersService from './orders/orders.service';
import staffService from './staff/staff.service';
import detailOrderServive from './orders/detail.service';
import proxy  from './proxy.service'
const servicesModule = angular.module('wabgApp.services', [
    baseService,
    proxy,
    detailOrderServive,
    staffService,
    meetingRoomService,
    priceService,
    roomService,
    thingsService,
    goodsService,
    infomationService,
    basedataService,
    homeService,
    showInfoService,
    timeService,
    valuesService,
    favourableService,
    bespeakService,
    ordersService,
    vasService
])
  
export default servicesModule;