// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
// 'starter.controllers' is found in controllers.js
angular.module('starter', ['ionic','ionic.service.core','ngCordova', 
                           'starter.controllers', 'ionic.service.push', 
                           'ui.router', 'aCarousel', 'ksSwiper'])

.run(function($ionicPlatform) {
  $ionicPlatform.ready(function() {
    // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
    // for form inputs)
    if (window.cordova && window.cordova.plugins.Keyboard) {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
      cordova.plugins.Keyboard.disableScroll(true);

    }
    if (window.StatusBar) {
      // org.apache.cordova.statusbar required
      StatusBar.styleDefault();
    }
    
    
      var push = new Ionic.Push({
        "debug": true
      });
      
      
  if(ionic.Platform.isAndroid()) {
          var deviceInfo = cordova.require("cordova/plugin/DeviceInformation");
          
          deviceInfo.get(function(result) {
            //alert(result);
            var results = eval('(' + result + ')');
            alert(JSON.stringify(results));
          
          }, function() {
            // alert("error");
          });
      }    

    /* push.register(function(token) {
        console.log("Device token:",token.token);
      }); */
    
    
    
  });
  
  
  
  
})


.factory("$fileFactory", function($q) {
	
    var File = function() { };

    File.prototype = {

        getParentDirectory: function(path) {
            var deferred = $q.defer();
            window.resolveLocalFileSystemURI(path, function(fileSystem) {
                fileSystem.getParent(function(result) {
                    deferred.resolve(result);
                }, function(error) {
                    deferred.reject(error);
                });
            }, function(error) {
            	//alert("got parent directory");
                deferred.reject(error);
            });
            
            
            return deferred.promise;
        },

        getEntriesAtRoot: function() {
        	
        	
        	
            var deferred = $q.defer();
            window.requestFileSystem(LocalFileSystem.PERSISTENT, 0, function(fileSystem) {
            	
            	
            	
                var directoryReader = fileSystem.root.createReader();
                directoryReader.readEntries(function(entries) {
                	
                	
                    deferred.resolve(entries);
                }, function(error) {
                    deferred.reject(error);
                });
                
                
                
                
            }, function(error) {
            	alert(error)
                deferred.reject(error);
            });
            return deferred.promise;
        },

        getEntries: function(path) {
            var deferred = $q.defer();
            window.resolveLocalFileSystemURI(path, function(fileSystem) {
                var directoryReader = fileSystem.createReader();
                directoryReader.readEntries(function(entries) {
                    deferred.resolve(entries);
                }, function(error) {
                    deferred.reject(error);
                });
            }, function(error) {
                deferred.reject(error);
            });
            return deferred.promise;
        }

    };

    return File;
})

.config(function($stateProvider, $urlRouterProvider, $ionicAppProvider) {
	
	
	
	$ionicAppProvider.identify({
	    // The App ID (from apps.ionic.io) for the server
	    app_id: '9d2da783',
	    // The public API key all services will use for this app
	    api_key: '15d08f7c7f637171da8f87f6470244bf49693128575b4203',
	    // Set the app to use development pushes
	    dev_push: true
	  });
	
	
  $stateProvider

    .state('app', {
    url: '/app',
    abstract: true,
    templateUrl: 'templates/menu.html',
    controller: 'AppCtrl'
  })

  .state('app.search', {
    url: '/search',
    views: {
      'menuContent': {
        templateUrl: 'templates/search.html'
      }
    }
  })

  .state('app.browse', {
      url: '/browse',
      views: {
        'menuContent': {
          templateUrl: 'templates/browse.html'
        }
      }
    })
    .state('app.playlists', {
      url: '/playlists',
      views: {
        'menuContent': {
          templateUrl: 'templates/playlists.html',
          controller: 'PlaylistsCtrl'
        }
      }
    })
    .state('app.downloads', {
      url: '/downloads',
      views: {
        'menuContent': {
          templateUrl: 'templates/downloads.html',
          controller: 'DownloadsCtrl'
        }
      }
    })

  .state('app.single', {
    url: '/playlists/:playlistId',
    views: {
      'menuContent': {
        templateUrl: 'templates/playlist.html',
        controller: 'PlaylistCtrl'
      }
    }
  });
  
  
  
  
  // if none of the above states are matched, use this as the fallback
  $urlRouterProvider.otherwise('/app/playlists');
});



