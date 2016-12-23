'use strict'

var moment = require('moment/moment.js');

angular.module('dahlia')
.controller('FormValidationController', ['$scope', function($scope) {
  $scope.applicant = {}
  $scope.form = {}
  $scope.addressType = 'home_address'
  $scope.showAlert = false

  $scope.inputInvalid = function(fieldName, identifier) {
    var field, form
    if (identifier == null) identifier = ''
    form = $scope.form.applicationForm
    if (!form) {
      return false
    }
    fieldName = identifier ? identifier + '_' + fieldName : fieldName
    field = form[fieldName]
    if (form && field) {
      return field.$invalid && (field.$touched || form.$submitted)
    } else {
      return false
    }
  }

  $scope.submitForm = function() {
    var form = $scope.form.applicationForm
    if (form.$valid) {
      $scope.showAlert = false
    } else {
      $scope.showAlert = true
    }
  }

  $scope.addressInputInvalid = function(identifier) {
    if (identifier == null) {
      identifier = ''
    }
    return $scope.inputInvalid('address1', identifier) || $scope.inputInvalid('city', identifier) || $scope.inputInvalid('state', identifier) || $scope.inputInvalid('zip', identifier)
  }

  // helper functions
  $scope.resetForm = function($ev) {
    $scope.showAlert = false
    if ($ev != null) $ev.preventDefault()
    angular.copy({}, $scope.applicant)
    var form = $scope.form.applicationForm
    form.$setPristine()
    form.$setUntouched()
  }

  $scope.fillForm = function($ev) {
    if ($ev != null) $ev.preventDefault()
    var filled = {
      firstName: 'Jane',
      home_address: {
        address1: '123 Main St.',
        city: 'San Francisco',
        state: 'california',
        zip: '94110'
      },
      dob_month: 5,
      dob_day: 4,
      dob_year: 1977,
      workInSf: 'Yes',
      referral: {
        newspaper: true,
        website: true
      },
      preferences: {
        dthp: true
      }
    }
    angular.copy(filled, $scope.applicant)
  }


  // DOB checking functions ---->
  $scope.DOBValid = function(field, value, model) {
    var values
    if (model == null) {
      model = 'applicant'
    }
    values = $scope.DOBValues(model)
    values[field] = parseInt(value)
    return $scope._DOBValid(field, values)
  }

  $scope.DOBValues = function(model) {
    if (model == null) {
      model = 'applicant'
    }
    return {
      month: parseInt($scope[model].dob_month),
      day: parseInt($scope[model].dob_day),
      year: parseInt($scope[model].dob_year)
    }
  }

  $scope._DOBValid = function(field, values) {
    var day, month, year
    if (field == null) {
      field = 'day'
    }
    month = values.month
    day = values.day
    year = values.year
    switch (field) {
      case 'day':
        return day >= 1 && day <= $scope._maxDOBDay(month, year)
      case 'month':
        return month >= 1 && month <= 12
      case 'year':
        return year >= 1900 && year <= 2016
    }
  }

  $scope._maxDOBDay = function(month, year) {
    var max
    month = parseInt(month)
    year = parseInt(year)
    max = 31
    if (month === 2) {
      max = year % 4 === 0 ? 29 : 28
    } else if (_.includes([4, 6, 9, 11], month)) {
      max = 30
    }
    return max
  }

  $scope.primaryApplicantUnder18 = function() {
    var age, dob, form, values, year
    values = $scope.DOBValues('applicant')
    form = $scope.form.applicationForm
    year = parseInt(form['date_of_birth_year'].$viewValue)
    if (!(values.month && values.day && year >= 1900)) {
      return false
    }
    dob = moment(year + "-" + values.month + "-" + values.day, 'YYYY-MM-DD')
    age = moment().diff(dob, 'years')
    if (age < 18) {
      return true
    }
  }

  $scope.recheckDOB = function(member) {
    var day, form, year
    form = $scope.form.applicationForm
    day = form['date_of_birth_day']
    day.$setViewValue(day.$viewValue + '')
    if (member === 'applicant') {
      year = form['date_of_birth_year']
      return year.$setViewValue(year.$viewValue + '')
    }
  }
  // --- </ end DOB checking functions

  $scope.checkboxesEmpty = function(field) {
    if (_.isEmpty($scope.applicant[field])) {
      return true
    }
    if (_.some(_.values($scope.applicant[field]), function(x) { return x == true})) {
      return false
    }
    return true
  }
}])
