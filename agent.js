
var update;

;(function () {
  "use strict";
  window.addEventListener('load', function (event) {


    PACMAN.start(); // Start on your own.

    // The agent that will play pacman; hopefully well.
    var AGENT = {
      state: {
        currentPosition: BOARD[11][8],
        goingTo: BOARD[11][7],
        eaten: PACMAN.getUserState().eaten,
        lives: PACMAN.getUserState().lives,
        score: PACMAN.getUserState().score,
        ghosts: PACMAN.getGhosts()
      },
      snapshots: [
      ],
      decideNextMove: function (state, options) {
        var random = Math.round(Math.random() * (options.length - 1) );
        AGENT.move(options[random].dir);
        var position = options[random].id.split(',');
        AGENT.state.goingTo = BOARD[position[0]][position[1]];
      },
      move: function (direction) { // Moves pacman in whatever direction you'd like.
        if (direction === 'up') { PACMAN.up() }
        if (direction === 'down') { PACMAN.down() }
        if (direction === 'right') { PACMAN.right() }
        if (direction === 'left') { PACMAN.left() }
      },
      update: function (user, ghosts) { // Runs on every repaint. Checks to see if new board position is reached.
        if (user.lives !== AGENT.state.lives) {
          AGENT.state.goingTo = BOARD[11][7];
          AGENT.state.lives -= 1;
        }
        if (user.position.x === AGENT.state.goingTo.x && user.position.y === AGENT.state.goingTo.y) {
          var userState = PACMAN.getUserState();
          AGENT.state.currentPosition = AGENT.state.goingTo;
          AGENT.state.eaten = userState.eaten;
          AGENT.state.lives = userState.lives;
          AGENT.state.score = userState.score;
          AGENT.state.ghosts = PACMAN.getGhosts();
          AGENT.decideNextMove(AGENT.state, AGENT.state.goingTo.go);
        }
      }
    };

    update = AGENT.update;

    /*
     * Some Helper Functions:
     */

    // Just hit spacebar to log some info.
    document.addEventListener('keydown', function (event) {
      if (event.keyCode === 32) {
        console.log("Logging game state: ", AGENT.state);
      }
    }, false);

  }, false);
}());
