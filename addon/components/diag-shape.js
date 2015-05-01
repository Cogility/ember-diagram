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
  updateTransform: Ember.observer('shape.transform', function() {
    var ele = this.get('element');
    if (ele !== null && ele !== undefined) {
      var base = this.get('element').transform.baseVal;
      if (base.length === 0) {
        var ident = this.get('element').ownerSVGElement.createSVGTransform();
        base.appendItem(ident);
        base.consolidate();
      }
      var mat = base[0].matrix;
      var tran = this.get('shape.transform');
      if (tran !== null && tran !== undefined) {
        mat.a = tran.a;
        mat.b = tran.b;
        mat.c = tran.c;
        mat.d = tran.d;
        mat.e = tran.e;
        mat.f = tran.f;
      }
    }
  }),

  actions: {
    dragged: function(dragStart, transform) {
      var m = transform.matrix;
      this.get('shape').set('transform', {a:m.a, b:m.b, c:m.c, d:m.d, e:m.e, f:m.f});
    }
  }
});
