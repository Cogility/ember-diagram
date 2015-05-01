import Ember from 'ember';
import DragGesture from 'ember-diagram/utils/drag-gesture';

export default Ember.Mixin.create({
  classNameBindings: ['draggable'],
  draggable: Ember.computed.alias('shape.draggable'),
  mouseDown: function(evt) {
    var d = this.get('diagram');
    var dg = DragGesture.create({
      diagram: d,
      component: this
    });
    dg.mouseDown(evt);
  }
});
