import Ember from 'ember';
import layout from '../templates/components/diag-shape';

export default Ember.Component.extend({
  layout: layout,
  shape: null,
  diagarm: null,
  x: Ember.computed.alias('shape.x'),
  y: Ember.computed.alias('shape.y'),
  height: Ember.computed.alias('shape.height'),
  width: Ember.computed.alias('shape.width'),

  initTransform: Ember.on('init', 'didInsertElement', function() {
    console.log('@@@@ In diag-shape initTransform');
    this.setTransform();
  }),
  updateTransform: Ember.observer('shape.transform', function() {
    console.log('@@@@ In diag-shape updateTransform');
    this.setTransform();
  }),
  setTransform: function() {
    var ele = this.get('element');
    if (ele !== null && ele !== undefined) {
      var base = this.get('element').transform.baseVal;
      if (base.length === 0) {
        console.log('@@@@ Initializing transform for element');
        var ident = this.get('element').ownerSVGElement.createSVGTransform();
        base.appendItem(ident);
        base.consolidate();
      }
      var mat = base[0].matrix;
      var tran = this.get('shape.transform');
      if (tran !== null && tran !== undefined) {
        console.log('@@@@ Setting transform in component from shape model');
        mat.a = tran.a;
        mat.b = tran.b;
        mat.c = tran.c;
        mat.d = tran.d;
        mat.e = tran.e;
        mat.f = tran.f;
      }
    }
  },

  actions: {
    dragged: function(dragStart, transform) {
      var m = transform.matrix;
      this.get('shape').set('transform', {a:m.a, b:m.b, c:m.c, d:m.d, e:m.e, f:m.f});
    }
  }
});
