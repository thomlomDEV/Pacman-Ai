// This file captures most of the ai functionality

var AGENT;

;(function () {
  "use strict";
  window.addEventListener('load', function (event) {


    // PACMAN.start(); // Start on your own.

    // The agent that will play pacman; hopefully well.
    AGENT = {
      status: {
        currentPosition: BOARD[11][8],
        goingTo: BOARD[11][7],
        // eaten: PACMAN.getUserState().eaten,
        ghosts: PACMAN.getGhosts(),
        lives: PACMAN.getUserState().lives,
        score: PACMAN.getUserState().score
      },
      beenTo: [
        "11,8",
        "9,0",
        "9,1",
        "9,2",
        "9,14",
        "9,15",
        "9,16"
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
        var directions = {
          up: [ (position[0] - 1), position[1] ],
          down: [ (position[0] + 1), position[1] ],
          left: [ position[0], (position[1] - 1) ],
          right: [ position[0], (position[1] + 1) ]
        };

        var ways = ['up', 'down', 'left', 'right'];
        ways = shuffle(ways); // shuffle order of surroundings to ensure a bit of randomness

        var state = [
          whatsOverHere(status, directions[ways[0]]),
          whatsOverHere(status, directions[ways[1]]),
          whatsOverHere(status, directions[ways[2]]),
          whatsOverHere(status, directions[ways[3]])
        ];

        // Move toward pills, 80% of the time. (100% might get you stuck in the middle)
        var board = BOARD.map(function (row) {
          var array = row.map(function (element) {
            if (element !== null) {
              return element.id;
            }
          });
          return array.filter(function (element) {
            return element !== undefined;
          })
        });
        var diff = AGENT.beenTo.forEach(function (element, index, array) {
          // TODO continue here.
        });

        // Decide which way to go based on surroundings and priorities (go toward pills, stay away from ghosts).
        var direction;
        if (state.indexOf('pill') !== -1) {
          direction = ways[state.indexOf('pill')];
        } else if (state.indexOf('free parking') !== -1) {
          direction = ways[state.indexOf('free parking')];
        } else if (state.indexOf('ghost') !== -1) {
          direction = ways[state.indexOf('ghost')];
        } else {
          console.log('What just happened?');
        }

        AGENT.direct(direction); // Move.
        AGENT.status.goingTo = BOARD[directions[direction][0]][directions[direction][1]]; // Take note of where you're headed so the game update function runs properly.

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
        if ( (Math.abs(ghost.position.x - x) <= 10 && Math.abs(ghost.position.y - y) <= 10) || (Math.abs(ghost.position.y - y) <= 20 && Math.abs(ghost.position.x - x) === 0) || (Math.abs(ghost.position.x - x) <= 20 && Math.abs(ghost.position.y - y) === 0) ) {
          // console.log(ghost.eatable);
          ghost.eatable !== null ? ahhGhost = false : ahhGhost = true;
        }
      });
      if (ahhGhost) { // Ahhh, ghost!
        return 'ghost'; // console.log('Ghost!');
      }
      // (3) Well, if there's no ghosts, then maybe you've been here?
      if (AGENT.beenTo.indexOf(place.toString()) !== -1) {
        return 'free parking'; // console.log('been here');
      // (4) Hmmm, ok, must be a pellet.
      } else {
        return 'pill'; // console.log('must be a pellet');
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

    // Suffle arrray
    function shuffle(array) {
      var currentIndex = array.length;
      var temporaryValue;
      var randomIndex;
      // While there remain elements to shuffle...
      while (0 !== currentIndex) {
        // Pick a remaining element...
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;

        // And swap it with the current element.
        temporaryValue = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = temporaryValue;
      }
      return array;
    }

    // Just hit spacebar to log some info.
    document.addEventListener('keydown', function (event) {
      if (event.keyCode === 32) {
        console.log("Logging game status: ", AGENT);
      }
    }, false);

  }, false);
}());
