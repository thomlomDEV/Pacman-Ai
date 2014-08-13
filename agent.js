
var update;

;(function () {
  "use strict";
  window.addEventListener('load', function (event) {


    PACMAN.start(); // Start on your own.

    // The agent that will play pacman; hopefully well.
    var AGENT = {
      status: {
        currentPosition: BOARD[11][8],
        goingTo: BOARD[11][7],
        // eaten: PACMAN.getUserState().eaten,
        ghosts: PACMAN.getGhosts(),
        lives: PACMAN.getUserState().lives,
        score: PACMAN.getUserState().score
      },
      beenTo: [
        "11,8"
      ],
      snapshots: [
        [0,0,2,2,'left']
      ],
      move: function (status, options) {

        // Check if you've been here already. If not, take note.
        if (AGENT.beenTo.indexOf(status.currentPosition.id) === -1) {
          AGENT.beenTo.push(status.currentPosition.id);
        }

        // Evaluate your surroundings.
        var position = status.currentPosition.id.split(',');
        position[0] = parseInt(position[0], 10);
        position[1] = parseInt(position[1], 10);
        var up = [ (position[0] - 1), position[1] ];
        var down = [ (position[0] + 1), position[1] ];
        var left = [ position[0], (position[1] - 1) ];
        var right = [ position[0], (position[1] + 1) ];

        var state = [ // Take note of surroundings.
          whatsOverHere(status, up),
          whatsOverHere(status, down),
          whatsOverHere(status, left),
          whatsOverHere(status, right)
        ];

        //  TODO Check against snapshots.
        AGENT.snapshots.forEach(function (snapshot) {
          arraysEqual(snapshot, state);
        });

        // Crunch numbers and make a move.
        var random = Math.round(Math.random() * (options.length - 1) );
        AGENT.direct(options[random].dir);
        state[4] = options[random].dir; // Take note of which way you decided to go.
        var position = options[random].id.split(',');
        AGENT.status.goingTo = BOARD[position[0]][position[1]];

        // How'd that turn out for ya? (use a callback)

        // Store a new snapshot.
        AGENT.snapshots.push(state);
      },
      direct: function (direction) { // Moves pacman in whatever direction you'd like.
        if (direction === 'up') { PACMAN.up() }
        if (direction === 'down') { PACMAN.down() }
        if (direction === 'right') { PACMAN.right() }
        if (direction === 'left') { PACMAN.left() }
      },
      update: function (user, ghosts) { // Runs on every repaint. Checks to see if new board position is reached.
        if (user.lives !== AGENT.status.lives) {
          AGENT.status.goingTo = BOARD[11][7];
          AGENT.status.lives -= 1;
        }
        if (user.position.x === AGENT.status.goingTo.x && user.position.y === AGENT.status.goingTo.y) {
          var userState = PACMAN.getUserState();
          AGENT.status.currentPosition = AGENT.status.goingTo;
          // AGENT.status.eaten = userState.eaten;
          AGENT.status.lives = userState.lives;
          AGENT.status.score = userState.score;
          AGENT.status.ghosts = PACMAN.getGhosts();

          // and.... move.
          AGENT.move(AGENT.status, AGENT.status.goingTo.go);
        }
      }
    };

    update = AGENT.update; // Export this for pacman.js to call.

    /*
     * Some Helper Functions:
     */

    // Tells you what's in a particular box.
    function whatsOverHere (status, place) {
      // Capture place coordinates.
      if ( BOARD[place[0]] && BOARD[place[0]][place[1]] ) {
        var x = BOARD[place[0]][place[1]].x;
        var y = BOARD[place[0]][place[1]].y;
      }
      // (1) First check for walls.
      if ( BOARD[place[0]] === undefined || !BOARD[place[0]][place[1]] ) {
        return 0; // console.log('Ooo, wall.');
      }
      // (2) Then check for ghosts.
      var ahhGhost = false;
      status.ghosts.forEach(function (ghost) {
        if (Math.abs(ghost.position.x - x) <= 10 && Math.abs(ghost.position.y - y) <= 10) {
          ahhGhost = true;
        }
      });
      if (ahhGhost) { // Ahhh, ghost!
        return 3; // console.log('Ghost!');
      }
      // (3) Well, if there's no ghosts, then maybe you've been here?
      if (AGENT.beenTo.indexOf(place.toString()) !== -1) {
        return 1; // console.log('been here');
      // (4) Hmmm, ok, must be a pellet.
      } else {
        return 2; // console.log('must be a pellet');
      }
    }

    // Quick way to check if arrays are equal.
    function arraysEqual (arr1, arr2) {
      if(arr1.length !== arr2.length) { return false; }
      for(var i = arr1.length; i--;) {
        if(arr1[i] !== arr2[i]) { return false; }
      }
      return true;
    }

    // Just hit spacebar to log some info.
    document.addEventListener('keydown', function (event) {
      if (event.keyCode === 32) {
        console.log("Logging game status: ", AGENT);
      }
    }, false);

  }, false);
}());
