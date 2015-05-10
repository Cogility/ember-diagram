import Gesture from './gesture';
import eventToSVGLocal from './event-to-svglocal';
import Ember from 'ember';

export default Gesture.extend({
  selection: Ember.inject.service(),
  diagram: null,        // The diagram for this gesture
  diagramElement: null, // The SVG element for the diagram
  x1: 0,
  x2: 0,
  y1: 0,
  y2: 0,

  gestureComponent: 'select-rect',

  mouseDown: function(evt) {
    var pt = eventToSVGLocal(evt, this.get('diagramElement'));
    console.log('@@@@ Mouse down in select gesture');
    this.set('x1', pt.x);
    this.set('y1', pt.y);
    this.set('x2', pt.x);
    this.set('y2', pt.y);
    return false;
  },
  mouseMove: function(evt) {
    var pt = eventToSVGLocal(evt, this.get('diagramElement'));
    console.log('@@@@ Mouse moved in select gesture '+evt.clientX+','+evt.clientY+' local: '+pt.x+','+pt.y);
    this.set('x2', pt.x);
    this.set('y2', pt.y);
    return false;
  },
  mouseUp: function() {
    console.log('@@@@ Mouse up in select gesture');
    var rect = {
      x:Math.min(this.get('x1'), this.get('x2')),
      y:Math.min(this.get('y1'), this.get('y2')),
      width: Math.abs(this.get('x1')-this.get('x2')),
      height: Math.abs(this.get('y1')-this.get('y2'))
    };
    var sel = this.get('selection');
    var comps = this.get('diagram').findComponentsInRect(rect);
    console.log('@@@@ Found '+comps.get('length')+' components in rect: '+JSON.stringify(rect));
    sel.clearSelection();
    comps.forEach(function(c) {
      sel.addSelection(c.get('shape'), c);
    });
    this.get('diagram').set('gesture', null);
    return false;
  },
  contextMenu: function() {
    return false;
  },
  click: function() {
    return false;
  }
});
