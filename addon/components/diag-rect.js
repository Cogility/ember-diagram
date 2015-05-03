//import Ember from 'ember';
import layout from '../templates/components/diag-rect';
import DiagShape from './diag-shape';

export default DiagShape.extend({
  layout: layout,
  tagName: 'rect',
  attributeBindings: ['x','y','width','height'],
});
