import Gesture from './gesture';
import eventToSVGLocal from './event-to-svglocal';
import Ember from 'ember';

export default Gesture.extend({
  selection: Ember.inject.service(),
  dragStart: null,    // The point where the drag begain in local SVG cooridinates
  trans: null,        // The transform used to do the drag
  transList: null,    // The transform list used to do the drag
  dragTarget: null,   // The DOM element that was the mouseDown target
  component: null,    // The component being dragged
  moved: false,       // Flag for whether the object actually moved

  gesureComponent: null,

  mouseDown: function(evt) {
    console.log('@@@@ Mouse down in drag gesture: '+evt.which);
    var sel = this.get('selection');
    var component = this.get('component');
    var shape = component.get('shape');
    
    if (!sel.inSelection(shape)) {
      sel.clearSelection();
      sel.addSelection(shape, component);
    }
    if (evt.which !== 3) {
      this.get('diagram').set('gesture', this);
      var dragTarget = component.get('element');
      var pointLocal = eventToSVGLocal(evt);
      //console.log('@@@@ Mouse down on '+evt.clientX+','+evt.clientY+
      //  ' local: '+pointLocal.x+','+pointLocal.y);
      this.dragStart = {x:pointLocal.x, y:pointLocal.y};
      this.trans = dragTarget.ownerSVGElement.createSVGTransform();
      var myTransListAnim=dragTarget.transform;
      this.transList=myTransListAnim.baseVal;
      this.set('dragging', true);
      this.set('moved', false);
      this.dragTarget = dragTarget;
    }
    return false;
  },
  mouseMove: function(evt) {
    if (this.dragging) {
      this.set('moved', true);
      var pointLocal = eventToSVGLocal(evt, this.dragTarget);
      pointLocal.x -= this.dragStart.x;
      pointLocal.y -= this.dragStart.y;
      //console.log('@@@@ Mouse move on '+evt.clientX+','+evt.clientY+
      //  ' local: '+pointLocal.x+','+pointLocal.y);
      this.trans.setTranslate(pointLocal.x,pointLocal.y);
      this.transList.appendItem(this.trans);
      this.transList.consolidate();
      this.get('component').saveTransform(this.transList[0].matrix);
      return false;
    }
  },
  mouseUp: function(evt) {
    if (this.get('dragging') && this.get('moved')) {
      console.log('@@@@ Mouse up in drag gesture: '+evt.which);
      this.get('diagram').set('gesture', null);
      this.get('component').send('dragged', this.dragStart, this.transList[0]);
    }
    this.set('dragging', false);
    return false;
  },
  contextMenu: function() {
    return false;
  },
  click: function() {
    return false;
  }
});
