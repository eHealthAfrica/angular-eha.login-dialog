;(function () {
  'use strict'

  var ngModule = angular.module('eha.login-dialog', [
    'eha.login-dialog.service',
    'eha.login-dialog.template',
    'eha.login-dialog.controller',
    'eha.login-dialog.run',
    'eha.login-dialog.config'
  ])

  // Check for and export to commonjs environment
  if (typeof module !== 'undefined' && module.exports) {
    module.exports = ngModule
  }
})()
