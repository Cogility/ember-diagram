import Ember from 'ember';
import layout from '../templates/components/diag-line';

export default Ember.Component.extend({
  layout: layout,
  tagName: 'line',
  attributeBindings: ['x1', 'y1', 'x2', 'y2'],
  x1: 100,
  y1: 100,
  x2: 400,
  y2: 400
});
