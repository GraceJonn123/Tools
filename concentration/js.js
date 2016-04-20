document.addEventListener('touchmove', function(e) {
  e.preventDefault()
}, false);

var streak = 0;
var demo = document.getElementById('demo');
var link = document.getElementById('tweet');
var streakspan = document.getElementById('streak');
var finger = document.getElementById('finger');
var connectors = document.querySelectorAll(".connector");
var tracer = document.getElementById('tracer');
var container = document.getElementById('container');

function getTracePath(desiredPath) {

  finger.setAttribute('fill', '#40d3d1');

  var pathCoords = "M 300,300";
  var lastCoords = {
    'x': 300,
    'y': 300
  };

  demo.setAttribute('style', 'opacity: 1');
  demo.setAttribute('d', '');

  interact('#finger')
    .styleCursor(false)
    .draggable({
      inertia: false,
      restrict: {
        restriction: container,
        endOnly: false
      },

      onmove: dragMoveListener,
      onend: function(event) {
        var target = event.target;
        tracer.setAttribute('style', 'opacity: 0');
        target.setAttribute('cx', 300);
        target.setAttribute('cy', 300);
        tracer.setAttribute('d', pathCoords);
        if (desiredPath == pathCoords) {

          streak++;
          if (streak > parseFloat(streakspan.innerHTML)) {
            streakspan.innerHTML = streak;
            link.setAttribute('href', 'https://twitter.com/intent/tweet?text=I%20got%20a%20' + streak + '%20path%20streak%20on%20@path_tracer%20http://goo.gl/zzv5pQ%20a%20CodePen%20from%20@zapplebee')
          }
          if (streak > 2) {

            modal('Correct! ' + streak + ' path streak!', 5000, createDemoPath);

          } else {
            modal('Correct!', 5000, createDemoPath);
          }

        } else {
          modal('Incorrect.', 5000, createDemoPath);
          streak = 0;
        }
      }
    });

  function dragMoveListener(event) {
    var i, cX, cY, target = event.target,
      x = parseFloat(target.getAttribute('cx')) + event.dx,
      y = parseFloat(target.getAttribute('cy')) + event.dy;
    target.setAttribute('cx', x);
    target.setAttribute('cy', y);

    for (i = 0; i < connectors.length; i++) {
      cX = parseFloat(connectors[i].getAttribute('cx'));
      cY = parseFloat(connectors[i].getAttribute('cy'));
      if ((cX - 50) <= x && x <= (cX + 50) && (cY - 50) <= y && y <= (cY + 50)) {
        addToPath(cX, cY);
        connectors[i].setAttribute('fill', '#40d3d1');
      }
    }
    tracer.setAttribute('d', pathCoords + ' L ' + x + ',' + y);
  }

  function addToPath(x, y) {
    if (pathCoords.indexOf(x + "," + y) < 0) {
      pathCoords += (' L ' + x + ',' + y);
      lastCoords.x = x;
      lastCoords.y = y;
    }
  }
}

function createDemoPath() {

  var i, d = "M 300,300 L ",
    pointsArray = [];
  finger.setAttribute('fill', '#ddd');
  tracer.setAttribute('d', '');
  tracer.setAttribute('style', 'opacity: 1');
  for (i = 0; i < connectors.length - 1; i++) {

    connectors[i].setAttribute('fill', '#ddd');

    pointsArray[Math.random() > .5 ? 'push' : 'unshift']([parseFloat(connectors[i].getAttribute('cx')), parseFloat(connectors[i].getAttribute('cy'))]);

  }

  d += pointsArray.join(' L ');

  console.log(pointsArray);
  console.log(d);
  demo.setAttribute('d', d);
  console.log(demo.getTotalLength());

  demo.setAttribute('stroke-dasharray', demo.getTotalLength());
  demo.setAttribute('stroke-dashoffset', demo.getTotalLength());
  var dashoffset = 0;

  var doDraw = function() {
    dashoffset += Math.min((10 * (streak == 0 ? 1 : streak)), 80);
    if (dashoffset < demo.getTotalLength()) {
      demo.setAttribute('stroke-dashoffset', demo.getTotalLength() - dashoffset);
      setTimeout(function() {
        doDraw()
      }, 10);
    } else {
      demo.setAttribute('stroke-dashoffset', 0);
      demo.setAttribute('style', 'opacity: 0');
      modal((streak < 3 ? 'Drag the blue circle along the path.' : ''), 5000 / (streak == 0 ? 1 : streak), function() {
        getTracePath(d);
        demo.setAttribute('d', '');
      });

    }
  }
  doDraw();

}

var modal = function(text, timeout, action, args) {

  var div = document.createElement('div'),
    h1 = document.createElement('h1');
  h1.innerHTML = text;
  div.appendChild(h1);
  document.body.appendChild(div);
  div.setAttribute('class', 'modal');
  window.getComputedStyle(div).opacity;
  div.setAttribute('style', 'opacity: 1');

  setTimeout(function() {
    div.setAttribute('style', 'opacity: 0');
    window.getComputedStyle(div).opacity;

  }, Math.min(1000, timeout - 1000));
  setTimeout(function() {

    document.body.removeChild(div);
    action(args);
  }, Math.min(2000, timeout));

}

modal('Watch and remember the path.', 5000, createDemoPath);