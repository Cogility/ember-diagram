# Ember-diagram

This add on provides support for data bound diagarms.  Diagrams are in the style of boxes and lines.
Shapes are components, and lines are updated as the shapes they are anchored to move.  Decorations
can be added to shapes and lines.  Shapes can be dragged, and diagarms support the notion of a "current gesture"
which controls the interaction.  This allows an interaction to extend outside the scope of the diagram or the
initial element interacted with.  This is important as mouse move is only delivered normally to the shape under
the cursor.  When the user moves the mouse too fast the drag events stop being sent to the source element.  Thus
all components register for the initial events such as mouse down, but let the other events bubble up to the
diagram where they are forwarded to the gesture.  Inserting a transparent element to catch events during the gesture
is also a possibility for more complex interactions, or where events might both serve to start a new interaction
and be part of a gesture.  For example a gesture using multiple clicks on elements would need to prevent the targetted
elements of the click from handling the events themselves.  They could also just ignore events when the diagram has
a current gesture.

## Installation

* `git clone` this repository
* `npm install`
* `bower install`

## Running

* `ember server`
* Visit your app at http://localhost:4200.

## Running Tests

* `ember test`
* `ember test --server`

## Building

* `ember build`

For more information on using ember-cli, visit [http://www.ember-cli.com/](http://www.ember-cli.com/).
