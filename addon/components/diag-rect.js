import Ember from 'ember';
import layout from '../templates/components/diag-rect';
import Draggable from'ember-diagram/mixins/draggable';
import DiagShape from './diag-shape';

export default DiagShape.extend(Draggable, {
  layout: layout,
  tagName: 'rect',
  attributeBindings: ['x','y','width','height'],
});
