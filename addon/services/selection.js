import Ember from 'ember';

export default Ember.Service.extend({
  shapes: Ember.A(),
  menuTarget: null,
  components: Ember.Map.create(),
  inSelection: function(shape) {
    var shapeId = shape.get('id');
    var found = false;
    this.get('shapes').forEach(function(s) {
      if (s.get('id') === shapeId) {
        found = true;
      }
    });
    return found;
  },
  clearSelection: function() {
    console.log('@@@@ Clearing selection');
    this.get('shapes').clear();
    this.get('components').clear();
  },
  addSelection: function(shape, component) {
    this.get('shapes').addObject(shape);
    this.get('components').set(shape.get('id'), component);
    console.log('@@@@ Adding to selection: '+shape+' component: '+component);
  }
});
