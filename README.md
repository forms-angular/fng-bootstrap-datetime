# fng-bootstrap-datetime

Plugin for forms-angular that adds datetime picker (github.com/zhaber/angular-js-bootstrap-datetimepicker) support.

## Usage

    bower install fng-bootstrap-datetime

Add the following lines to your index.html (or equivalent) file.

    <link rel="stylesheet" href="bower_components/angular-ui-bootstrap-datetimepicker/datetimepicker.css">
    <link rel="stylesheet" href="bower_components/fng-bootstrap-datetime/fng-bootstrap-datetime.css">
    <script src="bower_components/fng-bootstrap-datetime/fng-bootstrap-datetime.js"></script>
    <script src="bower_components/angular-ui-bootstrap-datetimepicker/datetimepicker.js"></script>

Add `fng.uiBootstrapDatetime` to the list of servies your Angular module depends on. 

In your Mongoose schemas you can set up fields like this:

    interviewDate: {type: Date, form:{
      directive: 'fng-ui-bootstrap-datetime-picker', 
      fngUiBootstrapDatetimePicker:{
        'date-format': 'dd-MMM-yyyy',
        'date-options':"{'show-weeks':true}"}
        }
      }
    },

Options can be added to a fngUiBootstrapDatetimePicker object within the form object as illustrated by the examples above.
A complete list of setting options can be found in the Settings section of [this page](https://github.com/zhaber/angular-js-bootstrap-datetimepicker).  Any setting
Date options (see [uib-datepicker](https://angular-ui.github.io/bootstrap/#!#datepicker) settings can be added as a JSON string as shown above.

For (my) convenience, the following defaults have been changed from https://github.com/zhaber/angular-js-bootstrap-datetimepicker:

    show-button-bar: false, 
    show-meridian: false,
    date-format: 'dd/MM/yyyy'
    showWeeks: false

###Known Limitations:

Styling in (unsupported) Bootstrap 2 applications (such as the forms-angular.org website at the time of writing) has a few issues,
including inline help placing and the width of the first columnof the dropdown when weeks are not shown. 