var Backbone = require('backbone');
var PlaceModel = require('../models/place');

var PlacesCollection = Backbone.Collection.extend({
  model: PlaceModel
});

module.exports = PlacesCollection;