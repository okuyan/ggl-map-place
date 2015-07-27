var $ = require('jquery');
var Backbone = require('Backbone');
var _ = require('underscore');
var PlacesCollection = require('./collections/places');
var PlacesCollectionView = require('./views/places');

var App = Backbone.View.extend({
    
    map: {},
    service: {},
    infowindow: {},
    pos: {},
    placesCollection: [],
    markers: [],
    
    mapOptions: {
      zoom: 14
    },
    
    el: '#app-container',
    
    events: {
      'click #search-button': 'search',
      'keydown #search-text': 'onKeydown'
    },
    
    initialize: function() {

      this.map = new google.maps.Map(document.getElementById('map-canvas'), this.mapOptions);
      
      // Try HTML5 geolocation
      if(navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(_.bind(this.geolocationSuccess, this));
      } else {
        // Browser doesn't support Geolocation
        handleNoGeolocation(false);
      }

    },
    
    render: function() {
      this.map = new google.maps.Map(document.getElementById('map-canvas'), this.mapOptions);
      
    },
    
    geolocationSuccess: function(position) {
      this.pos = new google.maps.LatLng(position.coords.latitude, position.coords.longitude);
      this.map.setCenter(this.pos); 
      
      google.maps.event.addListener(this.map, 'center_changed', _.bind(function() {
        this.pos = this.map.getCenter();
      }, this));
    },
    
    
    search: function(e) {
      e.preventDefault();
      var request = {
        location: this.pos,
        radius: '500',
        query: $('#search-text').val()
      };

      this.service = new google.maps.places.PlacesService(this.map);
      this.service.textSearch(request, _.bind(this.callback, this));
      
    },
    
    onKeydown: function(e) {
      if (e.keyCode === 13) {
        this.search(e);
      }
    },
    
    callback: function(results, status) {
      console.log(results);
            
      // Render search result list
      if (this.placesCollection.length > 0) {
        this.placesCollection.reset();
      }   
      this.placesCollection = new PlacesCollection(results);
      var placesCollectionView = new PlacesCollectionView({collection: this.placesCollection});
      
      placesCollectionView.render();

      this.setAllMap(null);
      this.markers = [];
      
      if (status == google.maps.places.PlacesServiceStatus.OK) {
        for (var i = 0; i < results.length; i++) {
          // Eliminate the one w/o photo
          if (!_.isUndefined(results[i]['photos'])) {
            this.createMarker(results[i]);
          }
        }
        this.setAllMap(this.map);
      }      
    },
    
    createMarker: function(place) {
      var marker = new google.maps.Marker({
        map: this.map,
        position: place.geometry.location,
        zoomControl: true,
        icon: {
          // Star
          path: 'M 0,-24 6,-7 24,-7 10,4 15,21 0,11 -15,21 -10,4 -24,-7 -6,-7 z',
          fillColor: '#ffff00',
          fillOpacity: 1,
          scale: 1/4,
          strokeColor: '#bd8d2c',
          strokeWeight: 1
        }
      });
      
      // Pushing marker to keep track
      this.markers.push(marker);
      
      google.maps.event.addListener(marker, 'click', _.bind(function() {
        if (this.infowindow.hasOwnProperty('gm_accessors_')) {
          this.infowindow.close();
        }
        this.infowindow = new google.maps.InfoWindow();
        this.service.getDetails(place, _.bind(function(result, status) {
          if (status != google.maps.places.PlacesServiceStatus.OK) {
            alert(status);
            return;
          }
          this.infowindow.setContent(result.name);
          this.infowindow.open(this.map, marker);
        }, this));
      }, this));      
    },
    
    // Sets the map on all markers in the array
    setAllMap: function(map) {
      for (var i = 0; i < this.markers.length; i++) {
        this.markers[i].setMap(map);
      }
    },
    
    handleNoGeolocation: function(errorFlag) {
      if (errorFlag) {
        var content = 'Error: The Geolocation service failed.';
      } else {
        var content = 'Error: Your browser doesn\'t support geolocation.';
      }

      var options = {
        map: this.map,
        position: new google.maps.LatLng(60, 105),
        content: content
      };

      this.infowindow = new google.maps.InfoWindow(options);
      this.map.setCenter(options.position);      
    }

});
  

module.exports = App;