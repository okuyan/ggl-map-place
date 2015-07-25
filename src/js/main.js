var $ = require('jquery');
var PlacesCollection = require('./collections/places');
var PlacesCollectionView = require('./views/places');
var App = require('./app');

(function(){
  var app = new App();
  google.maps.event.addDomListener(window, 'load', app.initialize());
  
})();

