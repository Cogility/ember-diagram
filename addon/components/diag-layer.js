import Ember from 'ember';
import layout from '../templates/components/diag-layer';

export default Ember.Component.extend({
  layout: layout,
  tagName: 'g',
  layer: null,
  shapes: Ember.computed.alias('layer.shapes')
});
