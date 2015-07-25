var Backbone = require('backbone');
var _ = require('underscore');

var PlaceView = Backbone.View.extend({
  
  tagName: 'li',
  
	template: _.template('<div class="place-item-details-inner"><span class="place-item-details-name"><%= name %></span>' 
    + '<span class="place-item-details-address"><%= formatted_address %></span>'
    + '<% if (typeof(opening_hours) !== "undefined" && opening_hours.open_now === true) { %><span class="place-item-details-open">Open now!</span><% } %></div>'
    + '<div class="place-item-inner-img"><img src="<%= photos[0].getUrl({maxWidth:50, maxHeight: 50}) %>" /></div>'),
  
  
  initialize: function(options){
    this.render();
  },
  
  render: function(){
    this.$el.html(this.template(this.model.attributes));
    return this;
  }

});

module.exports = PlaceView;