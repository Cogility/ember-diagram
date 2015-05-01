import Ember from 'ember';
import layout from '../templates/components/ember-diagram';

export default Ember.Component.extend({
  layout: layout,
  tagName: "svg",
  attributeBindings: ['width', 'height'],
  width: 1000,
  height: 1000,
  gesture: null,

  registerAs: null,
  registerDiagram: Ember.on('init', function() {
    this.set('registerAs', this);
  }),

  mouseDown: function(evt) {
    var gesture = this.get('gesture');
    if (gesture !== null && gesture !== undefined) {
      return gesture.mouseDown(evt);
    } else {
      //console.log('@@@@ Mouse Down button: '+evt.button+' buttons: '+evt.buttons+' which: '+evt.which);
      return false;
    }
  },
  mouseMove: function(evt) {
    var gesture = this.get('gesture');
    if (gesture !== null && gesture !== undefined) {
      return gesture.mouseMove(evt);
    } else {
      //console.log('@@@@ Mouse Move button: '+evt.button+' buttons: '+evt.buttons+' which: '+evt.which);
      return false;
    }
  },
  mouseUp: function(evt) {
    var gesture = this.get('gesture');
    if (gesture !== null && gesture !== undefined) {
      return gesture.mouseUp(evt);
    } else {
      //console.log('@@@@ Mouse Up button: '+evt.button+' buttons: '+evt.buttons+' which: '+evt.which);
      return false;
    }
  },
  click: function(evt) {
    var gesture = this.get('gesture');
    if (gesture !== null && gesture !== undefined) {
      return gesture.click(evt);
    } else {
      //console.log('@@@@ Click button: '+evt.button+' buttons: '+evt.buttons+' which: '+evt.which);
      return false;
    }
  },
  contextMenu: function(evt) {
    var gesture = this.get('gesture');
    if (gesture !== null && gesture !== undefined) {
      return gesture.mouseUp(evt);
    } else {
      //console.log('@@@@ ContextMenu: '+evt.button+' buttons: '+evt.buttons+' which: '+evt.which);
      return false;
    }
  }
});
