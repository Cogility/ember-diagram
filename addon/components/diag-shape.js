import Ember from 'ember';
import layout from '../templates/components/diag-shape';

export default Ember.Component.extend({
  layout: layout,
  shape: null,
  diagram: null,
  x: Ember.computed.alias('shape.x'),
  y: Ember.computed.alias('shape.y'),
  height: Ember.computed.alias('shape.height'),
  width: Ember.computed.alias('shape.width'),
  attributeBindings: ['data-shape-id'],
  'data-shape-id': Ember.computed.alias('shape.id'),

  initTransform: Ember.on('init', 'didInsertElement', function() {
    //console.log('@@@@ In diag-shape initTransform');
    this.setTransform();
  }),
  updateTransform: Ember.observer('shape.transform', function() {
    //console.log('@@@@ In diag-shape updateTransform');
    this.setTransform();
  }),

  inRect: function(rect) {
    var bbox = this.get('transformedBBox');
    return bbox.x <= rect.x+rect.width && bbox.x+bbox.width >= rect.x &&
      bbox.y <= rect.y+rect.height && bbox.y+bbox.height >= rect.y;
  },

  contextMenu: function(evt) {
    return this.get('diagram').contextMenu(evt);
  },

  transformedBBox: Ember.computed('shape.{x,y,width,height,transform}',
    'shape.title', function() {
    var ele = this.get('element');
    return this.transformedBoundingBox(ele);
  }),
  alignmentPoint: Ember.computed('transformedBBox', function() {
    var bbox = this.get('transformedBBox');
    if (bbox === null || bbox === undefined) {
      return {x:100.0, y:100.0};
    } else {
      return {x: bbox.x+bbox.width/2.0, y:bbox.y+bbox.height/2.0};
    }
  }),

  updateDiagramMap: Ember.observer('diagram', 'shape', function() {
    this.registerWithDiagram();
  }),

  initDiagramMap: Ember.on('init', function() {
    this.registerWithDiagram();
  }),

  registerWithDiagram: function() {
    var diagram = this.get('diagram');
    var shape = this.get('shape');
    if (diagram !== null && diagram !== undefined &&
      shape !== null && shape !== undefined) {
      diagram.registerComponent(shape, this);
    }
  },

  saveTransform: function(m) {
    this.get('shape').set('transform', {a:m.a, b:m.b, c:m.c, d:m.d, e:m.e, f:m.f});
  },
  setTransform: function() {
    var ele = this.get('element');
    if (ele !== null && ele !== undefined) {
      var trans = this.get('element').transform;
      if (trans !== null && trans !== undefined) {
        var base = trans.baseVal;
        if (base.length === 0) {
          //console.log('@@@@ Initializing transform for element');
          var ident = this.get('element').ownerSVGElement.createSVGTransform();
          base.appendItem(ident);
          base.consolidate();
        }
        var mat = base[0].matrix;
        var tran = this.get('shape.transform');
        if (tran !== null && tran !== undefined) {
          //console.log('@@@@ Setting transform in component from shape model: '+JSON.stringify(tran));
          mat.a = tran.a;
          mat.b = tran.b;
          mat.c = tran.c;
          mat.d = tran.d;
          mat.e = tran.e;
          mat.f = tran.f;
        }
      }
    }
  },

  transformedBoundingBox: function (el){
    var bb  = el.getBBox(),
        svg = el.ownerSVGElement,
        m   = el.getTransformToElement(el.parentNode);

    // Create an array of all four points for the original bounding box
    var pts = [
      svg.createSVGPoint(), svg.createSVGPoint(),
      svg.createSVGPoint(), svg.createSVGPoint()
    ];
    pts[0].x=bb.x;          pts[0].y=bb.y;
    pts[1].x=bb.x+bb.width; pts[1].y=bb.y;
    pts[2].x=bb.x+bb.width; pts[2].y=bb.y+bb.height;
    pts[3].x=bb.x;          pts[3].y=bb.y+bb.height;

    // Transform each into the space of the parent,
    // and calculate the min/max points from that.
    var xMin=Infinity,xMax=-Infinity,yMin=Infinity,yMax=-Infinity;
    pts.forEach(function(pt){
      pt = pt.matrixTransform(m);
      xMin = Math.min(xMin,pt.x);
      xMax = Math.max(xMax,pt.x);
      yMin = Math.min(yMin,pt.y);
      yMax = Math.max(yMax,pt.y);
    });

    // Update the bounding box with the new values
    bb.x = xMin; bb.width  = xMax-xMin;
    bb.y = yMin; bb.height = yMax-yMin;
    return bb;
  },

  actions: {
    dragged: function(dragStart, transform) {
      var m = transform.matrix;
      this.get('shape').set('transform', {a:m.a, b:m.b, c:m.c, d:m.d, e:m.e, f:m.f});
    }
  }
});
