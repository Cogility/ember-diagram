import Ember from 'ember';
import layout from '../templates/components/diag-connection';

export default Ember.Component.extend({
  layout: layout,
  tagName: 'line',
  attributeBindings: ['x1', 'y1', 'x2', 'y2'],
  x1: 110,
  y1: 90,
  x2: 410,
  y2: 390
});
