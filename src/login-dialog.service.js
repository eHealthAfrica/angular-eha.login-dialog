;(function () {
  'use strict'
  /**
   * @ngdoc service
   * @name ehaCounter
   * @module eha.login-dialog
   */
  var ngModule = angular.module('eha.login-dialog.service', [
    'gettext',
    'ui.bootstrap.modal'
  ])

  ngModule.service('ehaLoginDialogService', function (
    $q,
    $log,
    $modal,
    gettextCatalog
  ) {
    /*
     * The loginDialogService caches the modal that is currently shown
     * to be able to call multiple retriables, while not showing more
     * than one modal
     */
    var dialog
    return function loginDialog () {
      if (dialog) {
        return dialog
      }

      var buttonLabels = [
        gettextCatalog.getString('yes'),
        gettextCatalog.getString('no')
      ]

      var confirmDialog = $modal.open({
        templateUrl: 'templates/login-dialog.template.tpl.html',
        backdrop: 'static',
        keyboard: false,
        resolve: {
          modalParams: function ($q) {
            return $q.when({
              buttonLabels: {
                YES: buttonLabels[0],
                NO: buttonLabels[1]
              }
            })
          }
        },
        controller: 'EhaLoginDialogController'
      })

      dialog = confirmDialog.result
      confirmDialog.result.finally(function () {
        dialog = null
      })

      return confirmDialog.result
    }
  })

  // Check for and export to commonjs environment
  if (typeof module !== 'undefined' && module.exports) {
    module.exports = ngModule
  }
})()
