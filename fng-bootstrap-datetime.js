(function () {
  'use strict';
  var uiBootstrapDateModule = angular.module('fng.uiBootstrapDateTime', ['ui.bootstrap']);
  uiBootstrapDateModule.controller('fngUiBootstrapDatetimePickerCtrl',['$scope', function($scope) {
      $scope.dateOptions = {};
    }])
    .directive('fngUiBootstrapDatetimePicker', ['$compile', '$filter', 'pluginHelper', 'formMarkupHelper', 'cssFrameworkService',
    function ($compile, $filter, pluginHelper) {
      return {
        restrict: 'E',
        replace: true,
        controller: 'fngUiBootstrapDatetimePickerCtrl',
        priority: 1,
        link: function (scope, element, attrs) {
          var template;
          var processedAttr = pluginHelper.extractFromAttr(attrs, 'fngUiBootstrapDatetimePicker');
          var overRiddenDefaults = {
            'show-button-bar': false,
            'show-meridian': false,
            'date-format': 'dd/MM/yyyy'
          };

          // Set form to dirty when required.  Works OK with existing records - hopefully new records will have other field types
          var watchField = attrs.model + '.' + attrs.fngFldName;
          var formName = attrs.fngOptName;
          scope.$watch(watchField, function (newVal, oldVal) {
            if (newVal && oldVal && newVal !== oldVal) {
              scope[formName].$setDirty();
            }
          });

          overRiddenDefaults = Object.assign({}, overRiddenDefaults, processedAttr.directiveOptions);
          var overRiddenDateDefaults = {
            showWeeks: false
          };
          var jsonDateOptions = {};
          if (processedAttr.directiveOptions['date-options']) {
            jsonDateOptions = JSON.parse(processedAttr.directiveOptions['date-options'].replace(/'/g, '"'));
          }
          scope.dateOptions = Object.assign({}, overRiddenDateDefaults, jsonDateOptions);
          template = pluginHelper.buildInputMarkup(scope, attrs.model, processedAttr.info, processedAttr.options, false, false, function (buildingBlocks) {
            var str = '<div class="dtwrap"><datetimepicker ' + buildingBlocks.common;
            for (var opt in overRiddenDefaults) {
              if (opt !== 'date-options') {
                str += ' ' + opt + '="' + overRiddenDefaults[opt] + '"';
              }
            }
            str += ' date-options="dateOptions"></datetimepicker></div>';
            return str;
          });
          element.replaceWith($compile(template)(scope));
        }
      };
    }]
  )
})();