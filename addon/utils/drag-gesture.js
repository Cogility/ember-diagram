import Gesture from './gesture';
import eventToSVGLocal from './event-to-svglocal';

export default Gesture.extend({
  dragStart: null,    // The point where the drag begain in local SVG cooridinates
  trans: null,        // The transform used to do the drag
  transList: null,    // The transform list used to do the drag
  dragTarget: null,   // The DOM element that was the mouseDown target
  component: null,    // The component being dragged
  mouseDown: function(evt) {
    this.get('diagram').set('gesture', this);
    var dragTarget = this.get('component.element');
    var pointLocal = eventToSVGLocal(evt);
    //console.log('@@@@ Mouse down on '+evt.clientX+','+evt.clientY+
    //  ' local: '+pointLocal.x+','+pointLocal.y);
    this.dragStart = {x:pointLocal.x, y:pointLocal.y};
    this.trans = dragTarget.ownerSVGElement.createSVGTransform();
    var myTransListAnim=dragTarget.transform;
    this.transList=myTransListAnim.baseVal;
    this.set('dragging', true);
    this.dragTarget = dragTarget;
    return false;
  },
  mouseMove: function(evt) {
    if (this.dragging) {
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
    console.log('@@@@ Drag completed '+evt.clientX+','+evt.clientY);
    this.set('dragging', false);
    this.get('diagram').set('gesture', null);
    this.get('component').send('dragged', this.dragStart, this.transList[0]);
    return false;
  },
  contextMenu: function() {
    return false;
  }
});
