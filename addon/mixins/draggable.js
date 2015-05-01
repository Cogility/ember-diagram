import Ember from 'ember';
import DragGesture from 'ember-diagram/utils/drag-gesture';

export default Ember.Mixin.create({
  classNameBindings: ['draggable'],
  draggable: Ember.computed.alias('shape.draggable'),
  mouseDown: function(evt) {
    var d = this.get('diagram');
    var g = d.get('gesture');
    if (g !== null && g !== undefined) {
      return true;
    } else {
      var dg = DragGesture.create({
        diagram: d,
        component: this
      });
      dg.mouseDown(evt);
    }
  }
});
