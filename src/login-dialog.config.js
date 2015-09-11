;(function () {
  'use strict'
  /**
   * @ngdoc config
   * @name ehaLoginDialog
   * @module eha.login-dialog
   */
  var ngModule = angular.module('eha.login-dialog.config', [
    'pouchdb'
  ])

  ngModule.config(function (pouchDBProvider, POUCHDB_METHODS) {
    POUCHDB_METHODS.login = 'qify'
  })
  // Check for and export to commonjs environment
  if (typeof module !== 'undefined' && module.exports) {
    module.exports = ngModule
  }
})()
