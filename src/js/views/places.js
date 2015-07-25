var Backbone = require('backbone');
var _ = require('underscore');
var PlaceView = require('./place');

var Places = Backbone.View.extend({

  el: '#search-result-list',
  app: {},
  
  initialize: function(options) {
    this.listenTo(this.collection, 'reset', this.render);
  },
  
  render: function() {
    this.$el.find('li').remove();
    this.collection.each(function(model) {
      // let's show the one has photo!
      if (!_.isUndefined(model.get('photos'))) {
        var childView = new PlaceView({model: model});
        this.$el.append(childView.el);
      }
    }, this);
    return this;
  }
});

module.exports = Places;