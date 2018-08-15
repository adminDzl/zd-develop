 
 import orderStatus from './orderStatus.filter';
 import payType from './payType.filter';
const filtersModule = angular.module('wabgApp.filters', [
    orderStatus,
    payType
    
    ])
   
 export  default filtersModule;