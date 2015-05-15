import {
  moduleForComponent,
  test
} from 'ember-qunit';
import Ember from 'ember';

/* global setInterval */

moduleForComponent('ember-diagram', { integration: true
  // Specify the other units that are required for this test
  // needs: ['component:foo', 'helper:bar']
});

function delay(ms=20000) {
  return new Ember.RSVP.Promise(function(resolve) {
    setInterval(function() {resolve();}, ms);
  });
}

test('it should render from a template with no content', function(assert) {
  this.set('layers', Ember.A());
  this.render(`{{ember-diagram layers=layers registerAs=diagram}}`);
  assert.ok(this.get('diagram') !== null, 'Failed to register diagram from template');
});

test('it should render from a template with text block content', function(assert) {
  this.set('layers', Ember.A());
  this.render(`
    {{#ember-diagram layers=layers registerAs=diagram}}
      <text x=10 y=10 width=300 height=400>This is a test</text>
    {{/ember-diagram}}
  `);
  assert.ok(this.get('diagram') !== null, 'Failed to register diagram from template');
  assert.equal(this.$('text').length, 1, 'Failed to find text element');
  assert.ok(this.$('text').height() > 0, 'Failed to render svg text with height');
  assert.ok(this.$('text').width() > 0, 'Failed to render svg text with width');
});

test('it should render from a template with foreign object block content', function(assert) {
  this.set('layers', Ember.A());
  this.render(`
    {{#ember-diagram layers=layers registerAs=diagram}}
      <foreignObject id="foo" height="700" width="370" y="0" x="0">
        <span xmlns="http://www.w3.org/1999/xhtml" class="tooltip">
           <div><b>Comments</b></div>
        </span>
      </foreignObject>
    {{/ember-diagram}}
  `);
  assert.ok(this.get('diagram') !== null, 'Failed to register diagram from template');
  assert.equal(this.$('span div b').length, 1, 'Failed to find foreign object element');
  var bbox = this.$('span div b')[0].getBBox();
  console.log('@@@@ Bounding box of foreign object: '+JSON.stringify(bbox));
  assert.ok(bbox.height > 0, 'Failed to render svg foreign object with height');
  assert.ok(bbox.width > 0, 'Failed to render svg foreign object with width');
});

test('it should render nested shapes', function(assert) {
  var shapes = Ember.A([Ember.Object.create({
    component: 'diag-rect', hasComponent: true, x:100, y:200, width: 100, height: 50
  })]);
  var layers = Ember.A([Ember.Object.create({
    component: 'diag-layer', shapes:shapes
  })]);
  this.set('layers', layers);
  this.render(`
    <style>svg rect {fill: #ccbbaa; stroke: black;}</style>
    {{ember-diagram layers=layers registerAs=diagram}}
  `);
  assert.ok(this.get('diagram') !== null, 'Failed to register diagram from template');
  assert.equal(this.$('rect').length, 1, 'Failed to find rect element');
  console.log('!!!! Rect returned: '+this.$('rect').length+' matches');
  var bbox = this.$('rect')[0].getBBox();
  console.log('!!!! Bounding box: '+JSON.stringify(bbox));
  assert.equal(bbox.height, 50, 'Failed to render svg rect with height');
  assert.equal(bbox.width, 100, 'Failed to render svg rect with width');
  return delay(0);
});
