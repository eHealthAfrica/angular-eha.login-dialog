;(function () {
  'use strict'
  /**
   * @ngdoc run
   * @name ehaLoginDialog
   * @module eha.login-dialog
   */
  var ngModule = angular.module('eha.login-dialog.run', [
    'eha.login-service',
    'eha.login-dialog.service'
  ])

  ngModule.run(function (ehaLoginService, ehaLoginDialogService) {
    ehaLoginService.config(ehaLoginDialogService)
  })

  // Check for and export to commonjs environment
  if (typeof module !== 'undefined' && module.exports) {
    module.exports = ngModule
  }
})()
