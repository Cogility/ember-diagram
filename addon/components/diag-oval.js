import Ember from 'ember';
import layout from '../templates/components/diag-oval';
import Draggable from'ember-diagram/mixins/draggable';
import DiagShape from './diag-shape';

export default DiagShape.extend(Draggable, {
  layout: layout,
  tagName: 'ellipse',
  attributeBindings: ['cx','cy','rx','ry'],
  cx: Ember.computed('shape.x', 'shape.width', function() {
    if (this.get('shape.x') === null || this.get('shape.x') === undefined) {
      return 0;
    }
    if (this.get('shape.width') === null || this.get('shape.width') === undefined) {
      return 0;
    }
    return this.get('shape.x')+this.get('rx');
  }),
  cy: Ember.computed('shape.y', 'shape.height', function() {
    if (this.get('shape.y') === null || this.get('shape.y') === undefined) {
      return 0;
    }
    if (this.get('shape.height') === null || this.get('shape.height') === undefined) {
      return 0;
    }
    return this.get('shape.y')+this.get('ry');
  }),
  rx: Ember.computed('shape.width', function() {
    if (this.get('shape.x') === null || this.get('shape.x') === undefined) {
      return 0;
    }
    if (this.get('shape.width') === null || this.get('shape.width') === undefined) {
      return 0;
    }
    return this.get('shape.width')/2.0;
  }),
  ry: Ember.computed('shape.height', function() {
    if (this.get('shape.y') === null || this.get('shape.y') === undefined) {
      return 0;
    }
    if (this.get('shape.height') === null || this.get('shape.height') === undefined) {
      return 0;
    }
    return this.get('shape.height')/2.0;
  })
});
