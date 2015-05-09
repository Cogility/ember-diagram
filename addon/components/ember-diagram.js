import Ember from 'ember';
import layout from '../templates/components/ember-diagram';

/* global jQuery */

export default Ember.Component.extend({
  layout: layout,
  tagName: "svg",
  attributeBindings: ['width', 'height'],
  width: 1000,
  height: 1000,
  gesture: null,

  componentMap: null,
  registerAs: null,
  registerDiagram: Ember.on('init', function() {
    this.set('registerAs', this);
  }),
  registerComponent(shape, component) {
    var map = this.get('componentMap');
    if (map === null || map === undefined) {
      map = Ember.Map.create();
      this.set('componentMap', map);
    }
    console.log('@@@@ Registering component for '+shape.get('id'));
    map.set(shape.get('id'), component);
  },

  findComponent: function(shape) {
    var map = this.get('componentMap');
    if (map === null || map === undefined) {
      return null;
    } else {
      return map.get(shape.get('id'));
    }
  },

  findShape: function(evt) {
    var tar = evt.target;
    while (tar !== null && tar !== undefined) {
    //console.log('@@@@ Looking for hit '+jQuery(tar).html());
      var found = null;
      this.layers.forEach(function(l) {
        //console.log('@@@@   Layer '+l.get('component'));
        l.shapes.forEach(function(s) {
          //console.log('@@@@     Shape: '+s.get('component'));
          if (jQuery(tar).attr('data-shape-id') === s.get('id')) {
            found = s;
          }
        });
      });
      if (found !== null) {
        return found;
      }
      tar = tar.parentNode;
    }
    //console.log('@@@@ No match found');
    return null;
  },

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
