
var update;

;(function () {
  "use strict";
  window.addEventListener('load', function (event) {


    PACMAN.start(); // Start on your own.


    // The gameboard, which consists of locations and possible moves.
    var BOARD = [
      [ // Row 0
        { x:10, y:10, go: [{x:10, y:20, dir:'down'}, {x:20, y:10, dir:'right'}] },
        { x:20, y:10, go: [{x:10, y:10, dir:'left'}, {x:30, y:10, dir:'right'}] },
        { x:30, y:10, go: [{x:20, y:10, dir:'left'}, {x:40, y:10, dir:'right'}] },
        { x:40, y:10, go: [{x:30, y:10, dir:'left'}, {x:40, y:20, dir:'down'}, {x:50, y:10, dir:'right'}] },
        { x:50, y:10, go: [{x:40, y:10, dir:'left'}, {x:60, y:10, dir:'right'}] },
        { x:60, y:10, go: [{x:50, y:10, dir:'left'}, {x:70, y:10, dir:'right'}] },
        { x:70, y:10, go: [{x:60, y:10, dir:'left'}, {x:80, y:10, dir:'right'}] },
        { x:80, y:10, go: [{x:70, y:10, dir:'left'}, {x:80, y:20, dir:'down'}] },
        null,
        { x:100, y:10, go: [{x:100, y:20, dir:'down'}, {x:110, y:10, dir:'right'}] },
        { x:110, y:10, go: [{x:100, y:10, dir:'left'}, {x:120, y:10, dir:'right'}] },
        { x:120, y:10, go: [{x:110, y:10, dir:'left'}, {x:130, y:10, dir:'right'}] },
        { x:130, y:10, go: [{x:120, y:10, dir:'left'}, {x:140, y:10, dir:'right'}] },
        { x:140, y:10, go: [{x:130, y:10, dir:'left'}, {x:140, y:20, dir:'down'}, {x:150, y:10, dir:'right'}] },
        { x:150, y:10, go: [{x:140, y:10, dir:'left'}, {x:160, y:10, dir:'right'}] },
        { x:160, y:10, go: [{x:150, y:10, dir:'left'}, {x:170, y:10, dir:'right'}] },
        { x:170, y:10, go: [{x:160, y:10, dir:'left'}, {x:170, y:20, dir:'down'}] }
      ],
      [ // Row 1
        { x:10, y:20, go: [{x:10, y:10, dir:'up'}, {x:10, y:30, dir:'down'}] },
        null,
        null,
        { x:40, y:20, go: [{x:40, y:10, dir:'up'}, {x:40, y:30, dir:'down'}] },
        null,
        null,
        null,
        { x:80, y:20, go: [{x:80, y:10, dir:'up'}, {x:80, y:30, dir:'down'}] },
        null,
        { x:100, y:20, go: [{x:100, y:10, dir:'up'}, {x:100, y:30, dir:'down'}] },
        null,
        null,
        null,
        { x:140, y:20, go: [{x:140, y:10, dir:'up'}, {x:140, y:30, dir:'down'}] },
        null,
        null,
        { x:170, y:20, go: [{x:170, y:10, dir:'up'}, {x:170, y:30, dir:'down'}] }
      ],
      [ // Row 2
        { x:10, y:30, go: [{x:10, y:20, dir:'up'}, {x:10, y:40, dir:'down'}] },
        null,
        null,
        { x:40, y:30, go: [{x:40, y:20, dir:'up'}, {x:40, y:40, dir:'down'}] },
        null,
        null,
        null,
        { x:80, y:30, go: [{x:80, y:20, dir:'up'}, {x:80, y:40, dir:'down'}] },
        null,
        { x:100, y:30, go: [{x:100, y:20, dir:'up'}, {x:100, y:40, dir:'down'}] },
        null,
        null,
        null,
        { x:140, y:30, go: [{x:140, y:20, dir:'up'}, {x:140, y:40, dir:'down'}] },
        null,
        null,
        { x:170, y:30, go: [{x:170, y:20, dir:'up'}, {x:170, y:40, dir:'down'}] }
      ],
      [ // Row 3
        { x:10, y:40, go: [{x:10, y:50, dir:'down'}, {x:20, y:40, dir:'right'}] },
        { x:20, y:40, go: [{x:10, y:40, dir:'left'}, {x:30, y:40, dir:'right'}] },
        { x:30, y:40, go: [{x:20, y:40, dir:'left'}, {x:40, y:40, dir:'right'}] },
        { x:40, y:40, go: [{x:30, y:40, dir:'left'}, {x:40, y:30, dir:'up'}, {x:40, y:50, dir:'down'}, {x:50, y:40, dir:'right'}] },
        { x:50, y:40, go: [{x:40, y:40, dir:'left'}, {x:60, y:40, dir:'right'}] },
        { x:60, y:40, go: [{x:50, y:40, dir:'left'}, {x:60, y:50, dir:'down'}, {x:70, y:40, dir:'right'}] },
        { x:70, y:40, go: [{x:60, y:40, dir:'left'}, {x:80, y:40, dir:'right'}] },
        { x:80, y:40, go: [{x:70, y:40, dir:'left'}, {x:80, y:30, dir:'up'}, {x:90, y:40, dir:'right'}] },
        { x:90, y:40, go: [{x:80, y:40, dir:'left'}, {x:100, y:40, dir:'right'}] },
        { x:100, y:40, go: [{x:90, y:40, dir:'left'}, {x:100, y:30, dir:'up'}, {x:110, y:40, dir:'right'}] },
        { x:110, y:40, go: [{x:100, y:40, dir:'left'}, {x:120, y:40, dir:'right'}] },
        { x:120, y:40, go: [{x:110, y:40, dir:'left'}, {x:120, y:50, dir:'down'}, {x:130, y:40, dir:'right'}] },
        { x:130, y:40, go: [{x:120, y:40, dir:'left'}, {x:140, y:40, dir:'right'}] },
        { x:140, y:40, go: [{x:130, y:40, dir:'left'}, {x:140, y:30, dir:'up'}, {x:140, y:50, dir:'down'}, {x:150, y:40, dir:'right'}] },
        { x:150, y:40, go: [{x:140, y:40, dir:'left'}, {x:160, y:40, dir:'right'}] },
        { x:160, y:40, go: [{x:150, y:40, dir:'left'}, {x:170, y:40, dir:'right'}] },
        { x:170, y:40, go: [{x:160, y:40, dir:'left'}, {x:170, y:50, dir:'down'}] }
      ],
      [
        { x:10, y:50, go: [{x:10, y:40, dir:'up'}, {x:10, y:60, dir:'down'}] },
        null,
        null,
        { x:40, y:50, go: [{x:40, y:40, dir:'up'}, {x:40, y:60, dir:'down'}] },
        null,
        { x:60, y:50, go: [{x:60, y:40, dir:'up'}, {x:60, y:60, dir:'down'}] },
        null,
        null,
        null,
        null,
        null,
        { x:120, y:50, go: [{x:120, y:40, dir:'up'}, {x:120, y:60, dir:'down'}] },
        null,
        { x:140, y:50, go: [{x:140, y:40, dir:'up'}, {x:140, y:60, dir:'down'}] },
        null,
        null,
        { x:170, y:50, go: [{x:170, y:40, dir:'up'}, {x:170, y:60, dir:'down'}] }
      ],
      [ // Row 5
        { x:10, y:60, go: [{x:10, y:50, dir:'up'}, {x:20, y:60, dir:'right'}] },
        { x:20, y:60, go: [{x:10, y:60, dir:'left'}, {x:30, y:60, dir:'right'}] },
        { x:30, y:60, go: [{x:20, y:60, dir:'left'}, {x:40, y:60, dir:'right'}] },
        { x:40, y:60, go: [{x:30, y:60, dir:'left'}, {x:40, y:50, dir:'up'}, {x:40, y:70, dir:'down'}] },
        null,
        { x:60, y:60, go: [{x:60, y:50, dir:'up'}, {x:70, y:60, dir:'right'}] },
        { x:70, y:60, go: [{x:60, y:60, dir:'left'}, {x:80, y:60, dir:'right'}] },
        { x:80, y:60, go: [{x:70, y:60, dir:'left'}, {x:80, y:70, dir:'down'}] },
        null,
        { x:100, y:60, go: [{x:100, y:70, dir:'down'}, {x:110, y:60, dir:'right'}] },
        { x:110, y:60, go: [{x:100, y:60, dir:'left'}, {x:120, y:60, dir:'right'}] },
        null,
        { x:140, y:60, go: [{x:140, y:70, dir:'down'}, {x:140, y:50, dir:'up'}, {x:150, y:60, dir:'right'}] },
        { x:150, y:60, go: [{x:140, y:60, dir:'left'}, {x:160, y:60, dir:'right'}] },
        { x:160, y:60, go: [{x:150, y:60, dir:'left'}, {x:170, y:60, dir:'right'}] },
        { x:170, y:60, go: [{x:160, y:60, dir:'left'}, {x:170, y:50, dir:'up'}] }
      ],
      [ // Row 6
        null,
        null,
        null,
        { x:40, y:70, go: [{x:40, y:60, dir:'up'}, {x:40, y:80, dir:'down'}] },
        null,
        null,
        null,
        { x:80, y:70, go: [{x:80, y:60, dir:'up'}, {x:80, y:80, dir:'down'}] },
        null,
        { x:100, y:70, go: [{x:100, y:60, dir:'up'}, {x:100, y:80, dir:'down'}] },
        null,
        null,
        null,
        { x:140, y:70, go: [{x:140, y:60, dir:'up'}, {x:140, y:80, dir:'down'}] },
        null,
        null,
        null
      ],
      [ // Row 7
        null,
        null,
        null,
        { x:40, y:80, go: [{x:40, y:70, dir:'up'}, {x:40, y:90, dir:'down'}] },
        null,
        { x:60, y:80, go: [{x:60, y:90, dir:'down'}, {x:70, y:80, dir:'right'}] },
        { x:70, y:80, go: [{x:60, y:80, dir:'left'}, {x:80, y:80, dir:'right'}] },
        { x:80, y:80, go: [{x:80, y:70, dir:'up'}, {x:70, y:80, dir:'left'}, {x:90, y:80, dir:'right'}] },
        { x:90, y:80, go: [{x:80, y:80, dir:'left'}, {x:100, y:80, dir:'right'}] },
        { x:100, y:80, go: [{x:100, y:70, dir:'up'}, {x:90, y:80, dir:'left'}, {x:110, y:80, dir:'right'}] },
        { x:110, y:80, go: [{x:100, y:80, dir:'left'}, {x:120, y:80, dir:'right'}] },
        { x:120, y:80, go: [{x:110, y:80, dir:'left'}, {x:120, y:90, dir:'down'}] },
        null,
        { x:140, y:80, go: [{x:140, y:70, dir:'up'}, {x:140, y:90, dir:'down'}] },
        null,
        null,
        null
      ],
      [ // Row 8
        null,
        null,
        null,
        { x:40, y:90, go: [{x:40, y:80, dir:'up'}, {x:40, y:100, dir:'down'}] },
        null,
        { x:60, y:90, go: [{x:60, y:80, dir:'up'}, {x:60, y:100, dir:'down'}] },
        null,
        null,
        null,
        null,
        null,
        { x:120, y:90, go: [{x:120, y:80, dir:'up'}, {x:120, y:100, dir:'down'}] },
        null,
        { x:140, y:90, go: [{x:140, y:80, dir:'up'}, {x:140, y:100, dir:'down'}] },
        null,
        null,
        null
      ],
      [ // Row 9
        { x:10, y:100, go: [{x:170, y:100, dir:'left'}, {x:20, y:100, dir:'right'}] },
        { x:20, y:100, go: [{x:10, y:100, dir:'left'}, {x:30, y:100, dir:'right'}] },
        { x:30, y:100, go: [{x:20, y:100, dir:'left'}, {x:40, y:100, dir:'right'}] },
        { x:40, y:100, go: [{x:30, y:100, dir:'left'}, {x:50, y:100, dir:'right'}, {x:40, y:90, dir:'up'}, {x:40, y:110, dir:'down'}] },
        { x:50, y:100, go: [{x:40, y:100, dir:'left'}, {x:60, y:100, dir:'right'}] },
        { x:60, y:100, go: [{x:50, y:100, dir:'left'}, {x:60, y:90, dir:'up'}, {x:60, y:110, dir:'down'}] },
        null,
        null,
        null,
        null,
        null,
        { x:120, y:100, go: [{x:120, y:90, dir:'up'}, {x:120, y:110, dir:'down'}] },
        { x:130, y:100, go: [{x:120, y:100, dir:'left'}, {x:140, y:100, dir:'right'}] },
        { x:140, y:100, go: [{x:130, y:100, dir:'left'}, {x:150, y:100, dir:'right'}, {x:140, y:90, dir:'up'}, {x:140, y:110, dir:'down'}] },
        { x:150, y:100, go: [{x:140, y:100, dir:'left'}, {x:160, y:100, dir:'right'}] },
        { x:160, y:100, go: [{x:150, y:100, dir:'left'}, {x:170, y:100, dir:'right'}] },
        { x:170, y:100, go: [{x:160, y:100, dir:'left'}, {x:10, y:100, dir:'right'}] }
      ],
      [ // Row 10
        null,
        null,
        null,
        { x:40, y:110, go: [{x:40, y:100, dir:'up'}, {x:40, y:120, dir:'down'}] },
        null,
        { x:60, y:110, go: [{x:60, y:100, dir:'up'}, {x:60, y:120, dir:'down'}] },
        null,
        null,
        null,
        null,
        null,
        { x:120, y:110, go: [{x:120, y:100, dir:'up'}, {x:120, y:120, dir:'down'}] },
        null,
        { x:140, y:110, go: [{x:140, y:100, dir:'up'}, {x:140, y:120, dir:'down'}] },
        null,
        null,
        null
      ],
      [ // Row 11
        null,
        null,
        null,
        { x:40, y:120, go: [{x:40, y:110, dir:'up'}, {x:40, y:130, dir:'down'}] },
        null,
        { x:60, y:120, go: [{x:70, y:120, dir:'right'}, {x:60, y:110, dir:'up'}, {x:60, y:130, dir:'down'}] },
        { x:70, y:120, go: [{x:60, y:120, dir:'left'}, {x:80, y:120, dir:'right'}] },
        { x:80, y:120, go: [{x:70, y:120, dir:'left'}, {x:90, y:120, dir:'right'}] },
        { x:90, y:120, go: [{x:80, y:120, dir:'left'}, {x:100, y:120, dir:'right'}] },
        { x:100, y:120, go: [{x:90, y:120, dir:'left'}, {x:110, y:120, dir:'right'}] },
        { x:110, y:120, go: [{x:100, y:120, dir:'left'}, {x:120, y:120, dir:'right'}] },
        { x:120, y:120, go: [{x:110, y:120, dir:'left'}, {x:120, y:110, dir:'up'}, {x:120, y:130, dir:'down'}] },
        null,
        { x:140, y:120, go: [{x:140, y:110, dir:'up'}, {x:140, y:130, dir:'down'}] },
        null,
        null,
        null
      ],
      [ // Row 12
        null,
        null,
        null,
        { x:40, y:130, go: [{x:40, y:120, dir:'up'}, {x:40, y:140, dir:'down'}] },
        null,
        { x:60, y:130, go: [{x:60, y:120, dir:'up'}, {x:60, y:140, dir:'down'}] },
        null,
        null,
        null,
        null,
        null,
        { x:120, y:130, go: [{x:120, y:120, dir:'up'}, {x:120, y:140, dir:'down'}] },
        null,
        { x:140, y:130, go: [{x:140, y:120, dir:'up'}, {x:140, y:140, dir:'down'}] },
        null,
        null,
        null
      ],
      [ // Row 13
        { x:10, y:140, go: [{x:10, y:150, dir:'down'}, {x:20, y:140, dir:'right'}] },
        { x:20, y:140, go: [{x:10, y:140, dir:'left'}, {x:30, y:140, dir:'right'}] },
        { x:30, y:140, go: [{x:20, y:140, dir:'left'}, {x:40, y:140, dir:'right'}] },
        { x:40, y:140, go: [{x:30, y:140, dir:'left'}, {x:40, y:150, dir:'down'}, {x:40, y:130, dir:'up'}, {x:50, y:140, dir:'right'}] },
        { x:50, y:140, go: [{x:40, y:140, dir:'left'}, {x:60, y:140, dir:'right'}] },
        { x:60, y:140, go: [{x:50, y:140, dir:'left'}, {x:70, y:140, dir:'right'}] },
        { x:70, y:140, go: [{x:60, y:140, dir:'left'}, {x:80, y:140, dir:'right'}] },
        { x:80, y:140, go: [{x:70, y:10, dir:'left'}, {x:80, y:150, dir:'down'}] },
        null,
        { x:100, y:140, go: [{x:100, y:150, dir:'down'}, {x:110, y:140, dir:'right'}] },
        { x:110, y:140, go: [{x:100, y:140, dir:'left'}, {x:120, y:140, dir:'right'}] },
        { x:120, y:140, go: [{x:110, y:140, dir:'left'}, {x:130, y:140, dir:'right'}] },
        { x:130, y:140, go: [{x:120, y:140, dir:'left'}, {x:140, y:140, dir:'right'}] },
        { x:140, y:140, go: [{x:130, y:140, dir:'left'}, {x:140, y:150, dir:'down'}, {x:140, y:130, dir:'up'}, {x:150, y:140, dir:'right'}] },
        { x:150, y:140, go: [{x:140, y:140, dir:'left'}, {x:160, y:140, dir:'right'}] },
        { x:160, y:140, go: [{x:150, y:140, dir:'down'}, {x:170, y:140, dir:'right'}] },
        { x:170, y:140, go: [{x:160, y:140, dir:'left'}, {x:170, y:150, dir:'down'}] }
      ],
      [ // Row 14
        { x:10, y:150, go: [{x:10, y:140, dir:'up'}, {x:10, y:160, dir:'down'}] },
        null,
        null,
        { x:40, y:150, go: [{x:40, y:140, dir:'up'}, {x:40, y:160, dir:'down'}] },
        null,
        null,
        null,
        { x:80, y:150, go: [{x:80, y:140, dir:'up'}, {x:80, y:160, dir:'down'}] },
        null,
        { x:100, y:150, go: [{x:100, y:140, dir:'up'}, {x:100, y:160, dir:'down'}] },
        null,
        null,
        null,
        { x:140, y:150, go: [{x:140, y:140, dir:'up'}, {x:140, y:160, dir:'down'}] },
        null,
        null,
        { x:170, y:150, go: [{x:170, y:140, dir:'up'}, {x:170, y:160, dir:'down'}] }
      ],
      [ // Row 15
        { x:10, y:160, go: [{x:10, y:150, dir:'up'}, {x:20, y:160, dir:'right'}] },
        { x:20, y:160, go: [{x:20, y:170, dir:'down'}, {x:10, y:160, dir:'left'}] },
        null,
        { x:40, y:160, go: [{x:40, y:150, dir:'up'}, {x:40, y:170, dir:'down'}, {x:50, y:160, dir:'right'}] },
        { x:50, y:160, go: [{x:40, y:160, dir:'left'}, {x:60, y:160, dir:'right'}] },
        { x:60, y:160, go: [{x:50, y:160, dir:'left'}, {x:60, y:170, dir:'down'}, {x:70, y:160, dir:'right'}] },
        { x:70, y:160, go: [{x:60, y:160, dir:'left'}, {x:80, y:160, dir:'right'}] },
        { x:80, y:160, go: [{x:70, y:160, dir:'left'}, {x:90, y:160, dir:'right'}] },
        { x:90, y:160, go: [{x:80, y:160, dir:'left'}, {x:100, y:160, dir:'right'}] },
        { x:100, y:160, go: [{x:90, y:160, dir:'left'}, {x:110, y:160, dir:'right'}] },
        { x:110, y:160, go: [{x:100, y:160, dir:'left'}, {x:120, y:160, dir:'right'}] },
        { x:120, y:160, go: [{x:110, y:160, dir:'left'}, {x:120, y:170, dir:'down'}, {x:130, y:160, dir:'right'}] },
        { x:130, y:160, go: [{x:120, y:160, dir:'left'}, {x:140, y:160, dir:'right'}] },
        { x:140, y:160, go: [{x:140, y:150, dir:'up'}, {x:140, y:170, dir:'down'}, {x:130, y:160, dir:'left'}] },
        null,
        { x:160, y:160, go: [{x:160, y:170, dir:'down'}, {x:170, y:160, dir:'right'}] },
        { x:170, y:160, go: [{x:170, y:150, dir:'up'}, {x:160, y:160, dir:'left'}] },
        null,
      ],
      [ // Row 16
        null,
        { x:20, y:170, go: [{x:20, y:160, dir:'up'}, {x:20, y:180, dir:'down'}] },
        null,
        { x:40, y:170, go: [{x:40, y:160, dir:'up'}, {x:40, y:180, dir:'down'}] },
        null,
        { x:60, y:170, go: [{x:60, y:160, dir:'up'}, {x:60, y:180, dir:'down'}] },
        null,
        null,
        null,
        null,
        null,
        { x:120, y:170, go: [{x:120, y:160, dir:'up'}, {x:120, y:180, dir:'down'}] },
        null,
        { x:140, y:170, go: [{x:140, y:160, dir:'up'}, {x:140, y:180, dir:'down'}] },
        null,
        { x:160, y:170, go: [{x:160, y:160, dir:'up'}, {x:160, y:180, dir:'down'}] },
        null
      ],
      [ // Row 17
        { x:10, y:180, go: [{x:10, y:190, dir:'down'}, {x:20, y:180, dir:'right'}] },
        { x:20, y:180, go: [{x:10, y:170, dir:'up'}, {x:10, y:180, dir:'left'}, {x:30, y:180, dir:'right'}] },
        { x:30, y:180, go: [{x:20, y:180, dir:'left'}, {x:40, y:180, dir:'right'}] },
        { x:40, y:180, go: [{x:40, y:170, dir:'up'}, {x:30, y:180, dir:'left'}] },
        null,
        { x:60, y:180, go: [{x:60, y:170, dir:'up'}, {x:70, y:180, dir:'right'}] },
        { x:70, y:180, go: [{x:60, y:180, dir:'left'}, {x:80, y:180, dir:'right'}] },
        { x:80, y:180, go: [{x:80, y:190, dir:'down'}, {x:70, y:180, dir:'left'}] },
        null,
        { x:100, y:180, go: [{x:100, y:190, dir:'down'}, {x:110, y:180, dir:'right'}] },
        { x:110, y:180, go: [{x:100, y:180, dir:'left'}, {x:120, y:180, dir:'right'}] },
        { x:120, y:180, go: [{x:120, y:170, dir:'up'}, {x:110, y:180, dir:'left'}] },
        null,
        { x:140, y:180, go: [{x:140, y:170, dir:'up'}, {x:150, y:180, dir:'right'}] },
        { x:150, y:180, go: [{x:140, y:180, dir:'left'}, {x:160, y:180, dir:'right'}] },
        { x:160, y:180, go: [{x:160, y:170, dir:'up'}, {x:150, y:180, dir:'left'}, {x:170, y:180, dir:'right'}] },
        { x:170, y:180, go: [{x:170, y:190, dir:'down'}, {x:160, y:180, dir:'left'}] }
      ]
    ];


    // The agent that will play pacman; hopefully well.
    var AGENT = {
      state: {
        currentPosition: BOARD[11][8],
        eaten: PACMAN.getUserState().eaten,
        lives: PACMAN.getUserState().lives,
        score: PACMAN.getUserState().score,
        ghosts: PACMAN.getGhosts()
      },
      decideNextMove: function (state, options) {
        // Do stuff.
      },
      move: function (direction) { // Moves pacman in whatever direction you'd like.
        if (direction === 'up') { PACMAN.up() }
        if (direction === 'down') { PACMAN.down() }
        if (direction === 'right') { PACMAN.right() }
        if (direction === 'left') { PACMAN.left() }
      },
      update: function (user, ghosts) { // Runs on every repaint. Checks to see if new board position is reached.
        BOARD.forEach(function (row) {
          row.forEach(function (element) {
            if (element !== null) {
              var match = element.x === AGENT.state.currentPosition.x && element.y === AGENT.state.currentPosition.y;
              if (!match && user.position.x === element.x && user.position.y === element.y) {
                var userState = PACMAN.getUserState();
                AGENT.state.currentPosition = element;
                AGENT.state.eaten = userState.eaten;
                AGENT.state.lives = userState.lives;
                AGENT.state.score = userState.score;
                AGENT.state.ghosts = PACMAN.getGhosts();
                console.log(AGENT.state);
                AGENT.decideNextMove();
              }
            }
          });
        });
      }
    };

    update = AGENT.update;

    /*
     * Some Helper Functions:
     */

    // Just hit spacebar to log some info.
    document.addEventListener('keydown', function (event) {
      console.log("LOGGING: ", AGENT.state);
    }, false);

  }, false);
}());
