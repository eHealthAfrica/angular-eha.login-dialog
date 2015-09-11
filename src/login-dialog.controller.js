;(function () {
  'use strict'
  /**
   * @ngdoc controller
   * @name ehaCounter
   * @module eha.login-dialog
   */
  var ngModule = angular.module('eha.login-dialog.controller', [])

  ngModule.controller('EhaLoginDialogController', function (
    $scope,
    $modalInstance,
    modalParams,
    ehaLoginService
  ) {
    $scope.headerMessage = !angular.isArray(modalParams.title) ? modalParams.title : ''
    $scope.headerMessage2 = modalParams.title
    $scope.bodyMessage = modalParams.bodyText
    $scope.confirmBtnMsg = modalParams.buttonLabels.YES
    $scope.cancelBtnMsg = modalParams.buttonLabels.NO
    $scope.confirm = $modalInstance.close
    $scope.cancel = $modalInstance.dismiss
    $scope.wrongPasskey = false
    $scope.dismissMessage = 'Cancel confirm dialog'
    $scope.online = true

    $scope.authenticate = function (username, passkey) {
      $scope.wrongPasskey = false
      $scope.isAuthenticating = true
      $scope.cannotReachServer = false

      if (!username || !passkey) {
        $scope.wrongPasskey = true
        $scope.isAuthenticating = false
        return
      }

      return ehaLoginService.login(username, passkey)
        .then($modalInstance.close)
        .catch(function (err) {
          // TODO: allow to dismiss / cancel if user wants to keep
          //       using the app

          // pw is wrong, update form with error, ask to enter again
          if (err.status === 401) {
            $scope.wrongPasskey = true
          // Server is unreachable/phone is offline
          } else {
            $scope.cannotReachServer = true
          }

          console.log('error', err)
        })
        .finally(function () {
          $scope.isAuthenticating = false
        })
    }

    console.log($scope.cannotReachServer)

    $scope.cancel = function () {
      $modalInstance.dismiss('cancelled')
    }
  })

  // Check for and export to commonjs environment
  if (typeof module !== 'undefined' && module.exports) {
    module.exports = ngModule
  }
})()
