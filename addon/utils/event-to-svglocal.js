export default function eventToSVGLocal(evt, tar) {
  var target = evt.target;
  if (tar !== null && tar !== undefined) {
    target = tar;
  }
  var svg = target.ownerSVGElement;
  if (svg === null || svg === undefined) {
    svg = target;
  }
  var pointGlobal = svg.createSVGPoint();
  pointGlobal.x = evt.clientX;
  pointGlobal.y = evt.clientY;
  var sCTM = target.getScreenCTM();
  var pointLocal = pointGlobal.matrixTransform(sCTM.inverse());
  return pointLocal;
}
