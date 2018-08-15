
import angular from 'angular';

import headDirective from './head/head.directive';
import menuDirective from './menu/menu.directive';
import modalDirective from './modal/modal.directive';
import datepickerDirective from './datepicker/datepicker.directive';
import datatableDirective  from './datatable/datatable.directive';
import filestyleDirective from './filestyle/filestyle.directive';
import wysiwygDirective from './wysiwyg/wysiwyg.directive';
import timepickerDirective from './timepicker/timepicker.directive';
 

var directivesModule = angular.module('wabgApp.directives', [
    headDirective,
    modalDirective,
    wysiwygDirective,
    filestyleDirective,
    datepickerDirective,
    datatableDirective,
    timepickerDirective,
    menuDirective
])
 
export default directivesModule;