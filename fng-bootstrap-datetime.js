(function () {
  'use strict';
  var uiBootstrapDateModule = angular.module('fng.uiBootstrapDateTime', ['ui.bootstrap']);
  uiBootstrapDateModule.directive('fngUiBootstrapDatetimePicker', ['$compile', '$filter', 'pluginHelper', 'formMarkupHelper', 'cssFrameworkService',
    function ($compile, $filter, pluginHelper) {
      return {
        restrict: 'E',
        replace: true,
        priority: 1,
        link: function (scope, element, attrs) {
          var template;
          var processedAttr = pluginHelper.extractFromAttr(attrs, 'fngUiBootstrapDatetimePicker');
          var overRiddenDefaults = {
            'show-button-bar': false,
            'show-meridian': false,
            'date-format': 'dd/MM/yyyy'
          };
          overRiddenDefaults = Object.assign({}, overRiddenDefaults, processedAttr.directiveOptions);
          var overRiddenDateStr = '';
          if (processedAttr.directiveOptions['date-options']) {
            var jsonDateOptions = JSON.parse(processedAttr.directiveOptions['date-options'].replace(/'/g, '"'));
            if (scope.dateOptions) {
              _.merge(scope.dateOptions, jsonDateOptions);
              if (scope.dateOptions.showWeeks === undefined) {
                scope.dateOptions.showWeeks = false;
              }
              overRiddenDateStr = ' date-options="dateOptions"'
            } else {
              var overRiddenDateDefaults = {
                showWeeks: false
              };
              _.merge(overRiddenDateDefaults, jsonDateOptions);
              overRiddenDateStr = ' date-options="' + JSON.stringify(overRiddenDateDefaults).replace(/"/g,"'") + '"'
            }
          }
          template = pluginHelper.buildInputMarkup(scope, attrs.model, processedAttr.info, processedAttr.options, false, false, function (buildingBlocks) {
            var str = '<div class="dtwrap"><datetimepicker ' + buildingBlocks.common;
            for (var opt in overRiddenDefaults) {
              if (opt !== 'date-options') {
                str += ' ' + opt + '="' + overRiddenDefaults[opt] + '"';
              }
            }
            str += overRiddenDateStr + '></datetimepicker></div>';
            return str;
          });
          element.replaceWith($compile(template)(scope));
        }
      };
    }]
  )
})();