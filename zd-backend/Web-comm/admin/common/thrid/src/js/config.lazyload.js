// lazyload config

angular.module('app')
    /**
   * jQuery plugin config use ui-jq directive , config the js and css files that required
   * key: function name of the jQuery plugin
   * value: array of the css js file located
   */
  .constant('JQ_CONFIG', {
      easyPieChart:   [   'common/thrid/libs/jquery/jquery.easy-pie-chart/dist/jquery.easypiechart.fill.js'],
      sparkline:      [   'common/thrid/libs/jquery/jquery.sparkline/dist/jquery.sparkline.retina.js'],
      plot:           [   'common/thrid/libs/jquery/flot/jquery.flot.js',
                          'common/thrid/libs/jquery/flot/jquery.flot.pie.js', 
                          'common/thrid/libs/jquery/flot/jquery.flot.resize.js',
                          'common/thrid/libs/jquery/flot.tooltip/js/jquery.flot.tooltip.min.js',
                          'common/thrid/libs/jquery/flot.orderbars/js/jquery.flot.orderBars.js',
                          'common/thrid/libs/jquery/flot-spline/js/jquery.flot.spline.min.js'],
      moment:         [   'common/thrid/libs/jquery/moment/moment.js'],
      screenfull:     [   'common/thrid/libs/jquery/screenfull/dist/screenfull.min.js'],
      slimScroll:     [   'common/thrid/libs/jquery/slimscroll/jquery.slimscroll.min.js'],
      sortable:       [   'common/thrid/libs/jquery/html5sortable/jquery.sortable.js'],
      nestable:       [   'common/thrid/libs/jquery/nestable/jquery.nestable.js',
                          'common/thrid/libs/jquery/nestable/jquery.nestable.css'],
      filestyle:      [   'common/thrid/libs/jquery/bootstrap-filestyle/src/bootstrap-filestyle.js'],
      slider:         [   'common/thrid/libs/jquery/bootstrap-slider/bootstrap-slider.js',
                          'common/thrid/libs/jquery/bootstrap-slider/bootstrap-slider.css'],
      chosen:         [   'common/thrid/libs/jquery/chosen/chosen.jquery.min.js',
                          'common/thrid/libs/jquery/chosen/bootstrap-chosen.css'],
      TouchSpin:      [   'common/thrid/libs/jquery/bootstrap-touchspin/dist/jquery.bootstrap-touchspin.min.js',
                          'common/thrid/libs/jquery/bootstrap-touchspin/dist/jquery.bootstrap-touchspin.min.css'],
      wysiwyg:        [   'common/thrid/libs/jquery/bootstrap-wysiwyg/bootstrap-wysiwyg.js',
                          'common/thrid/libs/jquery/bootstrap-wysiwyg/external/jquery.hotkeys.js'],
      dataTable:      [   'common/thrid/libs/jquery/datatables/media/js/jquery.dataTables.min.js',
                          'common/thrid/libs/jquery/plugins/integration/bootstrap/3/dataTables.bootstrap.js',
                          'common/thrid/libs/jquery/plugins/integration/bootstrap/3/dataTables.bootstrap.css'],
      vectorMap:      [   'common/thrid/libs/jquery/bower-jvectormap/jquery-jvectormap-1.2.2.min.js', 
                          'common/thrid/libs/jquery/bower-jvectormap/jquery-jvectormap-world-mill-en.js',
                          'common/thrid/libs/jquery/bower-jvectormap/jquery-jvectormap-us-aea-en.js',
                          'common/thrid/libs/jquery/bower-jvectormap/jquery-jvectormap.css'],
      footable:       [   'common/thrid/libs/jquery/footable/v3/js/footable.min.js',
                          'common/thrid/libs/jquery/footable/v3/css/footable.bootstrap.min.css'],
      fullcalendar:   [   'common/thrid/libs/jquery/moment/moment.js',
                          'common/thrid/libs/jquery/fullcalendar/dist/fullcalendar.min.js',
                          'common/thrid/libs/jquery/fullcalendar/dist/fullcalendar.css',
                          'common/thrid/libs/jquery/fullcalendar/dist/fullcalendar.theme.css'],
      daterangepicker:[   'common/thrid/libs/jquery/moment/moment.js',
                          'common/thrid/libs/jquery/bootstrap-daterangepicker/daterangepicker.js',
                          'common/thrid/libs/jquery/bootstrap-daterangepicker/daterangepicker-bs3.css'],
      tagsinput:      [   'common/thrid/libs/jquery/bootstrap-tagsinput/dist/bootstrap-tagsinput.js',
                          'common/thrid/libs/jquery/bootstrap-tagsinput/dist/bootstrap-tagsinput.css']
                      
    }
  )
  .constant('MODULE_CONFIG', [
      {
          name: 'ngGrid',
          files: [
              'common/thrid/libs/angular/ng-grid/build/ng-grid.min.js',
              'common/thrid/libs/angular/ng-grid/ng-grid.min.css',
              'common/thrid/libs/angular/ng-grid/ng-grid.bootstrap.css'
          ]
      },
      {
          name: 'ui.grid',
          files: [
              'common/thrid/libs/angular/angular-ui-grid/ui-grid.min.js',
              'common/thrid/libs/angular/angular-ui-grid/ui-grid.min.css',
              'common/thrid/libs/angular/angular-ui-grid/ui-grid.bootstrap.css'
          ]
      },
      {
          name: 'ui.select',
          files: [
              'common/thrid/libs/angular/angular-ui-select/dist/select.min.js',
              'common/thrid/libs/angular/angular-ui-select/dist/select.min.css'
          ]
      },
      {
          name:'angularFileUpload',
          files: [
            'common/thrid/libs/angular/angular-file-upload/angular-file-upload.js'
          ]
      },
      {
          name:'ui.calendar',
          files: ['common/thrid/libs/angular/angular-ui-calendar/src/calendar.js']
      },
      {
          name: 'ngImgCrop',
          files: [
              'common/thrid/libs/angular/ngImgCrop/compile/minified/ng-img-crop.js',
              'common/thrid/libs/angular/ngImgCrop/compile/minified/ng-img-crop.css'
          ]
      },
      {
          name: 'angularBootstrapNavTree',
          files: [
              'common/thrid/libs/angular/angular-bootstrap-nav-tree/dist/abn_tree_directive.js',
              'common/thrid/libs/angular/angular-bootstrap-nav-tree/dist/abn_tree.css'
          ]
      },
      {
          name: 'toaster',
          files: [
              'common/thrid/libs/angular/angularjs-toaster/toaster.js',
              'common/thrid/libs/angular/angularjs-toaster/toaster.css'
          ]
      },
      {
          name: 'textAngular',
          files: [
              'common/thrid/libs/angular/textAngular/dist/textAngular-sanitize.min.js',
              'common/thrid/libs/angular/textAngular/dist/textAngular.min.js'
          ]
      },
      {
          name: 'vr.directives.slider',
          files: [
              'common/thrid/libs/angular/venturocket-angular-slider/build/angular-slider.min.js',
              'common/thrid/libs/angular/venturocket-angular-slider/build/angular-slider.css'
          ]
      },
      {
          name: 'com.2fdevs.videogular',
          files: [
              'common/thrid/libs/angular/videogular/videogular.min.js'
          ]
      },
      {
          name: 'com.2fdevs.videogular.plugins.controls',
          files: [
              'common/thrid/libs/angular/videogular-controls/controls.min.js'
          ]
      },
      {
          name: 'com.2fdevs.videogular.plugins.buffering',
          files: [
              'common/thrid/libs/angular/videogular-buffering/buffering.min.js'
          ]
      },
      {
          name: 'com.2fdevs.videogular.plugins.overlayplay',
          files: [
              'common/thrid/libs/angular/videogular-overlay-play/overlay-play.min.js'
          ]
      },
      {
          name: 'com.2fdevs.videogular.plugins.poster',
          files: [
              'common/thrid/libs/angular/videogular-poster/poster.min.js'
          ]
      },
      {
          name: 'com.2fdevs.videogular.plugins.imaads',
          files: [
              'common/thrid/libs/angular/videogular-ima-ads/ima-ads.min.js'
          ]
      },
      {
          name: 'xeditable',
          files: [
              'common/thrid/libs/angular/angular-xeditable/dist/js/xeditable.min.js',
              'common/thrid/libs/angular/angular-xeditable/dist/css/xeditable.css'
          ]
      },
      {
          name: 'smart-table',
          files: [
              'common/thrid/libs/angular/angular-smart-table/dist/smart-table.min.js'
          ]
      },
      {
          name: 'angular-skycons',
          files: [
              'common/thrid/libs/angular/angular-skycons/angular-skycons.js'
          ]
      }
    ]
  )
  // oclazyload config
  .config(['$ocLazyLoadProvider', 'MODULE_CONFIG', function($ocLazyLoadProvider, MODULE_CONFIG) {
      // We configure ocLazyLoad to use the lib script.js as the async loader
      $ocLazyLoadProvider.config({
          debug:  false,
          events: true,
          modules: MODULE_CONFIG
      });
  }])
;
