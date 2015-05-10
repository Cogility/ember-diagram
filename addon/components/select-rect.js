import Ember from 'ember';
import layout from '../templates/components/diag-rect';
import DiagShape from './diag-shape';

export default DiagShape.extend({
  layout: layout,
  tagName: 'rect',
  attributeBindings: ['x','y','width','height'],
  classNames: ['select-rect'],

  x: Ember.computed('gesture.{x1,x2}', function() {
    var x = Math.min(this.get('gesture.x1'), this.get('gesture.x2'));
    return x;
  }),
  y: Ember.computed('gesture.{y1,y2}', function() {
    return Math.min(this.get('gesture.y1'), this.get('gesture.y2'));
  }),
  width: Ember.computed('gesture.{x1,x2}', function() {
    return Math.abs(this.get('gesture.x1')-this.get('gesture.x2'));
  }),
  height: Ember.computed('gesture.{y1,y2}', function() {
    return Math.abs(this.get('gesture.y1')-this.get('gesture.y2'));
  }),
});
