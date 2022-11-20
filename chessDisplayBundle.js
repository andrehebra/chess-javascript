(function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){
// shim for using process in browser
var process = module.exports = {};

// cached from whatever global is present so that test runners that stub it
// don't break things.  But we need to wrap it in a try catch in case it is
// wrapped in strict mode code which doesn't define any globals.  It's inside a
// function because try/catches deoptimize in certain engines.

var cachedSetTimeout;
var cachedClearTimeout;

function defaultSetTimout() {
    throw new Error('setTimeout has not been defined');
}
function defaultClearTimeout () {
    throw new Error('clearTimeout has not been defined');
}
(function () {
    try {
        if (typeof setTimeout === 'function') {
            cachedSetTimeout = setTimeout;
        } else {
            cachedSetTimeout = defaultSetTimout;
        }
    } catch (e) {
        cachedSetTimeout = defaultSetTimout;
    }
    try {
        if (typeof clearTimeout === 'function') {
            cachedClearTimeout = clearTimeout;
        } else {
            cachedClearTimeout = defaultClearTimeout;
        }
    } catch (e) {
        cachedClearTimeout = defaultClearTimeout;
    }
} ())
function runTimeout(fun) {
    if (cachedSetTimeout === setTimeout) {
        //normal enviroments in sane situations
        return setTimeout(fun, 0);
    }
    // if setTimeout wasn't available but was latter defined
    if ((cachedSetTimeout === defaultSetTimout || !cachedSetTimeout) && setTimeout) {
        cachedSetTimeout = setTimeout;
        return setTimeout(fun, 0);
    }
    try {
        // when when somebody has screwed with setTimeout but no I.E. maddness
        return cachedSetTimeout(fun, 0);
    } catch(e){
        try {
            // When we are in I.E. but the script has been evaled so I.E. doesn't trust the global object when called normally
            return cachedSetTimeout.call(null, fun, 0);
        } catch(e){
            // same as above but when it's a version of I.E. that must have the global object for 'this', hopfully our context correct otherwise it will throw a global error
            return cachedSetTimeout.call(this, fun, 0);
        }
    }


}
function runClearTimeout(marker) {
    if (cachedClearTimeout === clearTimeout) {
        //normal enviroments in sane situations
        return clearTimeout(marker);
    }
    // if clearTimeout wasn't available but was latter defined
    if ((cachedClearTimeout === defaultClearTimeout || !cachedClearTimeout) && clearTimeout) {
        cachedClearTimeout = clearTimeout;
        return clearTimeout(marker);
    }
    try {
        // when when somebody has screwed with setTimeout but no I.E. maddness
        return cachedClearTimeout(marker);
    } catch (e){
        try {
            // When we are in I.E. but the script has been evaled so I.E. doesn't  trust the global object when called normally
            return cachedClearTimeout.call(null, marker);
        } catch (e){
            // same as above but when it's a version of I.E. that must have the global object for 'this', hopfully our context correct otherwise it will throw a global error.
            // Some versions of I.E. have different rules for clearTimeout vs setTimeout
            return cachedClearTimeout.call(this, marker);
        }
    }



}
var queue = [];
var draining = false;
var currentQueue;
var queueIndex = -1;

function cleanUpNextTick() {
    if (!draining || !currentQueue) {
        return;
    }
    draining = false;
    if (currentQueue.length) {
        queue = currentQueue.concat(queue);
    } else {
        queueIndex = -1;
    }
    if (queue.length) {
        drainQueue();
    }
}

function drainQueue() {
    if (draining) {
        return;
    }
    var timeout = runTimeout(cleanUpNextTick);
    draining = true;

    var len = queue.length;
    while(len) {
        currentQueue = queue;
        queue = [];
        while (++queueIndex < len) {
            if (currentQueue) {
                currentQueue[queueIndex].run();
            }
        }
        queueIndex = -1;
        len = queue.length;
    }
    currentQueue = null;
    draining = false;
    runClearTimeout(timeout);
}

process.nextTick = function (fun) {
    var args = new Array(arguments.length - 1);
    if (arguments.length > 1) {
        for (var i = 1; i < arguments.length; i++) {
            args[i - 1] = arguments[i];
        }
    }
    queue.push(new Item(fun, args));
    if (queue.length === 1 && !draining) {
        runTimeout(drainQueue);
    }
};

// v8 likes predictible objects
function Item(fun, array) {
    this.fun = fun;
    this.array = array;
}
Item.prototype.run = function () {
    this.fun.apply(null, this.array);
};
process.title = 'browser';
process.browser = true;
process.env = {};
process.argv = [];
process.version = ''; // empty string to avoid regexp issues
process.versions = {};

function noop() {}

process.on = noop;
process.addListener = noop;
process.once = noop;
process.off = noop;
process.removeListener = noop;
process.removeAllListeners = noop;
process.emit = noop;
process.prependListener = noop;
process.prependOnceListener = noop;

process.listeners = function (name) { return [] }

process.binding = function (name) {
    throw new Error('process.binding is not supported');
};

process.cwd = function () { return '/' };
process.chdir = function (dir) {
    throw new Error('process.chdir is not supported');
};
process.umask = function() { return 0; };

},{}],2:[function(require,module,exports){
const playGrid = document.getElementById("playGrid");


const letterPosition = ["A", "B", "C", "D", "E", "F", "G", "H"]
let startingColor = "whiteSquare";




function standardGame() {

    //add light pawns
    for (let i = 0; i <= 7; i++){
        const position = letterPosition[i] + 2;
        addPiece(position, "pl");
    }

    //add dark pawns
    for (let i = 0; i <= 7; i++){
        const position = letterPosition[i] + 7;
        addPiece(position, "pd");
    }

    //add rooks
    addPiece("a1", "rl");
    addPiece("h1", "rl");
    addPiece("a8", "rd");
    addPiece("h8", "rd");

    //add nights
    addPiece("b1", "nl");
    addPiece("g1", "nl");
    addPiece("b8", "nd");
    addPiece("g8", "nd");

    //add bishops
    addPiece("c1", "bl");
    addPiece("f1", "bl");
    addPiece("c8", "bd");
    addPiece("f8", "bd");

    //add Queens
    addPiece("d8", "qd");
    addPiece("d1", "ql");

    //add Kings 
    addPiece("e8", "kd");
    addPiece("e1", "kl");
    
    
}

function addPiece(position, piece, type) {
    const pieceImage = document.createElement("img");
    pieceImage.src = "./pieces/" + piece + ".svg";
    pieceImage.className = type;

    const location = document.getElementById(position);
    location.classList.add(piece);
    location.appendChild(pieceImage);
    
}


//standardGame();


function fenDisplay(input) {
    let currentRow = 8;
    let currentColumn = 1;

    for (let i = 0; i < input.length; i++) {
        switch (input[i]) {
            case '1':
                currentColumn += 1;
                break;
            case '2':
                currentColumn += 2;
                break;
            case '3':
                currentColumn += 3;
                break;
            case '4':
                currentColumn += 4;
                break;
            case '5':
                currentColumn += 5;
                break;
            case '6':
                currentColumn += 6;
                break;
            case '7':
                currentColumn += 7;
                break;
            case '8':
                currentColumn += 8;
                break;
            case 'p':
                addPiece(letterPosition[currentColumn-1] + currentRow, "pd", 'piece');
                currentColumn++;
                break;
            case 'r':
                addPiece(letterPosition[currentColumn-1] + currentRow, "rd", 'piece');
                currentColumn++;
                break;
            case 'b':
                addPiece(letterPosition[currentColumn-1] + currentRow, "bd", 'piece');
                currentColumn++;
                break;
            case 'n':
                addPiece(letterPosition[currentColumn-1] + currentRow, "nd", 'piece');
                currentColumn++;
                break;
            case 'k':
                addPiece(letterPosition[currentColumn-1] + currentRow, "kd", 'piece');
                currentColumn++;
                break;
            case 'q':
                addPiece(letterPosition[currentColumn-1] + currentRow, "qd", 'piece');
                currentColumn++;
                break;
            case 'P':
                addPiece(letterPosition[currentColumn-1] + currentRow, "pl", 'piece');
                currentColumn++;
                break;
            case 'R':
                addPiece(letterPosition[currentColumn-1] + currentRow, "rl", 'piece');
                currentColumn++;
                break;
            case 'B':
                addPiece(letterPosition[currentColumn-1] + currentRow, "bl", 'piece');
                currentColumn++;
                break;
            case 'N':
                addPiece(letterPosition[currentColumn-1] + currentRow, "nl", 'piece');
                currentColumn++;
                break;
            case 'K':
                addPiece(letterPosition[currentColumn-1] + currentRow, "kl", 'piece');
                currentColumn++;
                break;
            case 'Q':
                addPiece(letterPosition[currentColumn-1] + currentRow, "ql", 'piece');
                currentColumn++;
                break;
        }
        

        if (input[i] == '/') {
            currentRow--;
            currentColumn = 1;
        }

        if (currentColumn == 9 && currentRow == 1) {
            break;
        }
                
    }
}

function clearBoard() {

    const deleteChildren = document.getElementById('playGrid');
    deleteChildren.innerHTML = '';

    for (let i = 8; i >= 1; i--) {

        //const row = document.createElement("div");
        //row.classList.add("row");
    
        if (i % 2 == 0) {
            startingColor = "whiteSquare";
        } else {
            startingColor = "blackSquare";
        }
    
        for (let j = 0; j <= 7; j++) {
            const square = document.createElement("div");
    
            square.className = startingColor;
    
            if (startingColor == "whiteSquare") {
                startingColor = "blackSquare";
            } else {
                startingColor = "whiteSquare";
            }
    
            square.classList.add(letterPosition[j]);
            square.classList.add(i);
            square.classList.add("square");
            


            square.id = letterPosition[j] + i
            square.onclick = function() {clickSquare(square.id)};
    
            playGrid.appendChild(square);
    
        }
        //playGrid.appendChild(row);
    }
}

function addCircles(square) {
    console.log(square);
    
    const location = document.getElementById(square);
    location.classList.add("darken");

}

let lastClick = '';

function clickSquare(id) {
    console.log(id);
    console.log(game.moves(id))

    clearBoard();
    fenDisplay(game.exportFEN());

    game.moves(id).forEach(addCircles);
    
    try {
        game.move(lastClick, id);
        clearBoard();
        fenDisplay(game.exportFEN());
    }
    catch (err) {

    }

    
    
    lastClick = id;
}

clearBoard();
//possible numbers: 1,2,3,4,5,6,7
//possible pieces: p,n,r,b,q,k,P,N,R,B,Q,K

//fenDisplay("rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR");

const chessGame = require('js-chess-engine');

const game = new chessGame.Game();

console.log(game);
console.log(game.exportFEN())

fenDisplay(game.exportFEN());




},{"js-chess-engine":3}],3:[function(require,module,exports){
(function (process){(function (){
!function(t,e){"object"==typeof exports&&"object"==typeof module?module.exports=e():"function"==typeof define&&define.amd?define("js-chess-engine",[],e):"object"==typeof exports?exports["js-chess-engine"]=e():t["js-chess-engine"]=e()}(this,(function(){return function(t){var e={};function i(n){if(e[n])return e[n].exports;var o=e[n]={i:n,l:!1,exports:{}};return t[n].call(o.exports,o,o.exports,i),o.l=!0,o.exports}return i.m=t,i.c=e,i.d=function(t,e,n){i.o(t,e)||Object.defineProperty(t,e,{enumerable:!0,get:n})},i.r=function(t){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(t,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(t,"__esModule",{value:!0})},i.t=function(t,e){if(1&e&&(t=i(t)),8&e)return t;if(4&e&&"object"==typeof t&&t&&t.__esModule)return t;var n=Object.create(null);if(i.r(n),Object.defineProperty(n,"default",{enumerable:!0,value:t}),2&e&&"string"!=typeof t)for(var o in t)i.d(n,o,function(e){return t[e]}.bind(null,o));return n},i.n=function(t){var e=t&&t.__esModule?function(){return t.default}:function(){return t};return i.d(e,"a",e),e},i.o=function(t,e){return Object.prototype.hasOwnProperty.call(t,e)},i.p="",i(i.s=0)}([function(t,e,i){"use strict";i.r(e),i.d(e,"Game",(function(){return $})),i.d(e,"moves",(function(){return J})),i.d(e,"status",(function(){return V})),i.d(e,"getFen",(function(){return Y})),i.d(e,"move",(function(){return z})),i.d(e,"aiMove",(function(){return X}));const n=["A","B","C","D","E","F","G","H"],o=["1","2","3","4","5","6","7","8"],s={KING_W:"K",QUEEN_W:"Q",ROOK_W:"R",BISHOP_W:"B",KNIGHT_W:"N",PAWN_W:"P",KING_B:"k",QUEEN_B:"q",ROOK_B:"r",BISHOP_B:"b",KNIGHT_B:"n",PAWN_B:"p"},r="black",c="white",l=[0,1,2,3,4],a={0:1,1:2,2:2,3:3,4:3,5:4},u={0:2,1:2,2:4,3:4,4:5,5:5},h={fullMove:1,halfMove:0,enPassant:null,isFinished:!1,checkMate:!1,check:!1,turn:c},g=Object.assign({pieces:{E1:"K",D1:"Q",A1:"R",H1:"R",C1:"B",F1:"B",B1:"N",G1:"N",A2:"P",B2:"P",C2:"P",D2:"P",E2:"P",F2:"P",G2:"P",H2:"P",E8:"k",D8:"q",A8:"r",H8:"r",C8:"b",F8:"b",B8:"n",G8:"n",A7:"p",B7:"p",C7:"p",D7:"p",E7:"p",F7:"p",G7:"p",H7:"p"},castling:{whiteShort:!0,blackShort:!0,whiteLong:!0,blackLong:!0}},h),f={UP:{A1:"A2",A2:"A3",A3:"A4",A4:"A5",A5:"A6",A6:"A7",A7:"A8",A8:null,B1:"B2",B2:"B3",B3:"B4",B4:"B5",B5:"B6",B6:"B7",B7:"B8",B8:null,C1:"C2",C2:"C3",C3:"C4",C4:"C5",C5:"C6",C6:"C7",C7:"C8",C8:null,D1:"D2",D2:"D3",D3:"D4",D4:"D5",D5:"D6",D6:"D7",D7:"D8",D8:null,E1:"E2",E2:"E3",E3:"E4",E4:"E5",E5:"E6",E6:"E7",E7:"E8",E8:null,F1:"F2",F2:"F3",F3:"F4",F4:"F5",F5:"F6",F6:"F7",F7:"F8",F8:null,G1:"G2",G2:"G3",G3:"G4",G4:"G5",G5:"G6",G6:"G7",G7:"G8",G8:null,H1:"H2",H2:"H3",H3:"H4",H4:"H5",H5:"H6",H6:"H7",H7:"H8",H8:null},DOWN:{A1:null,A2:"A1",A3:"A2",A4:"A3",A5:"A4",A6:"A5",A7:"A6",A8:"A7",B1:null,B2:"B1",B3:"B2",B4:"B3",B5:"B4",B6:"B5",B7:"B6",B8:"B7",C1:null,C2:"C1",C3:"C2",C4:"C3",C5:"C4",C6:"C5",C7:"C6",C8:"C7",D1:null,D2:"D1",D3:"D2",D4:"D3",D5:"D4",D6:"D5",D7:"D6",D8:"D7",E1:null,E2:"E1",E3:"E2",E4:"E3",E5:"E4",E6:"E5",E7:"E6",E8:"E7",F1:null,F2:"F1",F3:"F2",F4:"F3",F5:"F4",F6:"F5",F7:"F6",F8:"F7",G1:null,G2:"G1",G3:"G2",G4:"G3",G5:"G4",G6:"G5",G7:"G6",G8:"G7",H1:null,H2:"H1",H3:"H2",H4:"H3",H5:"H4",H6:"H5",H7:"H6",H8:"H7"},LEFT:{A1:null,A2:null,A3:null,A4:null,A5:null,A6:null,A7:null,A8:null,B1:"A1",B2:"A2",B3:"A3",B4:"A4",B5:"A5",B6:"A6",B7:"A7",B8:"A8",C1:"B1",C2:"B2",C3:"B3",C4:"B4",C5:"B5",C6:"B6",C7:"B7",C8:"B8",D1:"C1",D2:"C2",D3:"C3",D4:"C4",D5:"C5",D6:"C6",D7:"C7",D8:"C8",E1:"D1",E2:"D2",E3:"D3",E4:"D4",E5:"D5",E6:"D6",E7:"D7",E8:"D8",F1:"E1",F2:"E2",F3:"E3",F4:"E4",F5:"E5",F6:"E6",F7:"E7",F8:"E8",G1:"F1",G2:"F2",G3:"F3",G4:"F4",G5:"F5",G6:"F6",G7:"F7",G8:"F8",H1:"G1",H2:"G2",H3:"G3",H4:"G4",H5:"G5",H6:"G6",H7:"G7",H8:"G8"},RIGHT:{A1:"B1",A2:"B2",A3:"B3",A4:"B4",A5:"B5",A6:"B6",A7:"B7",A8:"B8",B1:"C1",B2:"C2",B3:"C3",B4:"C4",B5:"C5",B6:"C6",B7:"C7",B8:"C8",C1:"D1",C2:"D2",C3:"D3",C4:"D4",C5:"D5",C6:"D6",C7:"D7",C8:"D8",D1:"E1",D2:"E2",D3:"E3",D4:"E4",D5:"E5",D6:"E6",D7:"E7",D8:"E8",E1:"F1",E2:"F2",E3:"F3",E4:"F4",E5:"F5",E6:"F6",E7:"F7",E8:"F8",F1:"G1",F2:"G2",F3:"G3",F4:"G4",F5:"G5",F6:"G6",F7:"G7",F8:"G8",G1:"H1",G2:"H2",G3:"H3",G4:"H4",G5:"H5",G6:"H6",G7:"H7",G8:"H8",H1:null,H2:null,H3:null,H4:null,H5:null,H6:null,H7:null,H8:null},UP_LEFT:{A1:null,A2:null,A3:null,A4:null,A5:null,A6:null,A7:null,A8:null,B1:"A2",B2:"A3",B3:"A4",B4:"A5",B5:"A6",B6:"A7",B7:"A8",B8:null,C1:"B2",C2:"B3",C3:"B4",C4:"B5",C5:"B6",C6:"B7",C7:"B8",C8:null,D1:"C2",D2:"C3",D3:"C4",D4:"C5",D5:"C6",D6:"C7",D7:"C8",D8:null,E1:"D2",E2:"D3",E3:"D4",E4:"D5",E5:"D6",E6:"D7",E7:"D8",E8:null,F1:"E2",F2:"E3",F3:"E4",F4:"E5",F5:"E6",F6:"E7",F7:"E8",F8:null,G1:"F2",G2:"F3",G3:"F4",G4:"F5",G5:"F6",G6:"F7",G7:"F8",G8:null,H1:"G2",H2:"G3",H3:"G4",H4:"G5",H5:"G6",H6:"G7",H7:"G8",H8:null},DOWN_RIGHT:{A1:null,A2:"B1",A3:"B2",A4:"B3",A5:"B4",A6:"B5",A7:"B6",A8:"B7",B1:null,B2:"C1",B3:"C2",B4:"C3",B5:"C4",B6:"C5",B7:"C6",B8:"C7",C1:null,C2:"D1",C3:"D2",C4:"D3",C5:"D4",C6:"D5",C7:"D6",C8:"D7",D1:null,D2:"E1",D3:"E2",D4:"E3",D5:"E4",D6:"E5",D7:"E6",D8:"E7",E1:null,E2:"F1",E3:"F2",E4:"F3",E5:"F4",E6:"F5",E7:"F6",E8:"F7",F1:null,F2:"G1",F3:"G2",F4:"G3",F5:"G4",F6:"G5",F7:"G6",F8:"G7",G1:null,G2:"H1",G3:"H2",G4:"H3",G5:"H4",G6:"H5",G7:"H6",G8:"H7",H1:null,H2:null,H3:null,H4:null,H5:null,H6:null,H7:null,H8:null},UP_RIGHT:{A1:"B2",A2:"B3",A3:"B4",A4:"B5",A5:"B6",A6:"B7",A7:"B8",A8:null,B1:"C2",B2:"C3",B3:"C4",B4:"C5",B5:"C6",B6:"C7",B7:"C8",B8:null,C1:"D2",C2:"D3",C3:"D4",C4:"D5",C5:"D6",C6:"D7",C7:"D8",C8:null,D1:"E2",D2:"E3",D3:"E4",D4:"E5",D5:"E6",D6:"E7",D7:"E8",D8:null,E1:"F2",E2:"F3",E3:"F4",E4:"F5",E5:"F6",E6:"F7",E7:"F8",E8:null,F1:"G2",F2:"G3",F3:"G4",F4:"G5",F5:"G6",F6:"G7",F7:"G8",F8:null,G1:"H2",G2:"H3",G3:"H4",G4:"H5",G5:"H6",G6:"H7",G7:"H8",G8:null,H1:null,H2:null,H3:null,H4:null,H5:null,H6:null,H7:null,H8:null},DOWN_LEFT:{A1:null,A2:null,A3:null,A4:null,A5:null,A6:null,A7:null,A8:null,B1:null,B2:"A1",B3:"A2",B4:"A3",B5:"A4",B6:"A5",B7:"A6",B8:"A7",C1:null,C2:"B1",C3:"B2",C4:"B3",C5:"B4",C6:"B5",C7:"B6",C8:"B7",D1:null,D2:"C1",D3:"C2",D4:"C3",D5:"C4",D6:"C5",D7:"C6",D8:"C7",E1:null,E2:"D1",E3:"D2",E4:"D3",E5:"D4",E6:"D5",E7:"D6",E8:"D7",F1:null,F2:"E1",F3:"E2",F4:"E3",F5:"E4",F6:"E5",F7:"E6",F8:"E7",G1:null,G2:"F1",G3:"F2",G4:"F3",G5:"F4",G6:"F5",G7:"F6",G8:"F7",H1:null,H2:"G1",H3:"G2",H4:"G3",H5:"G4",H6:"G5",H7:"G6",H8:"G7"}},C=[[0,0,0,0,0,0,0,0],[5,5,5,5,5,5,5,5],[1,1,2,3,3,2,1,1],[.5,.5,1,2.5,2.5,1,.5,.5],[0,0,0,2,2,0,0,0],[.5,0,1,0,0,1,0,.5],[.5,0,0,-2,-2,0,0,.5],[0,0,0,0,0,0,0,0]],P=[[-4,-3,-2,-2,-2,-2,-3,-4],[-3,-2,0,0,0,0,-2,-3],[-2,0,1,1.5,1.5,1,0,-2],[-2,.5,1.5,2,2,1.5,.5,-2],[-2,0,1.5,2,2,1.5,0,-2],[-2,.5,1,1.5,1.5,1,.5,-2],[-3,-2,0,.5,.5,0,-2,-3],[-4,-3,-2,-2,-2,-2,-3,-4]],p=[[-2,-1,-1,-1,-1,-1,-1,-2],[-1,0,0,0,0,0,0,-1],[-1,0,.5,1,1,.5,0,-1],[-1,.5,.5,1,1,.5,.5,-1],[-1,0,1,1,1,1,0,-1],[-1,1,1,1,1,1,1,-1],[-1,.5,0,0,0,0,.5,-1],[-2,-1,-1,-1,-1,-1,-1,-2]],E=[[0,0,0,0,0,0,0,0],[.5,1,1,1,1,1,1,.5],[-.5,0,0,0,0,0,0,-.5],[-.5,0,0,0,0,0,0,-.5],[-.5,0,0,0,0,0,0,-.5],[-.5,0,0,0,0,0,0,-.5],[-.5,0,0,0,0,0,0,-.5],[0,0,0,.5,.5,0,0,0]],B=[[-3,-4,-4,-5,-5,-4,-4,-3],[-3,-4,-4,-5,-5,-4,-4,-3],[-3,-4,-4,-5,-5,-4,-4,-3],[-3,-4,-4,-5,-5,-4,-4,-3],[-2,-3,-3,-4,-4,-3,-3,-2],[-1,-2,-2,-2,-2,-2,-2,-1],[2,2,0,0,0,0,2,2],[2,3,1,0,0,1,3,2]],F=[[-2,-1,-1,-.5,-.5,-1,-1,-2],[-1,0,0,0,0,0,0,-1],[-1,0,.5,.5,.5,.5,0,-1],[-.5,0,.5,.5,.5,.5,0,-.5],[0,0,.5,.5,.5,.5,0,-.5],[-1,.5,.5,.5,.5,.5,0,-1],[-1,0,.5,0,0,0,0,-1],[-2,-1,-1,-.5,-.5,-1,-1,-2]],G={P:C.slice().reverse(),p:C,N:P.slice().reverse(),n:P,B:p.slice().reverse(),b:p,R:E.slice().reverse(),r:E,K:B.slice().reverse(),k:B,Q:F.slice().reverse(),q:F};function D(t){return f.UP[t]}function A(t){return f.DOWN[t]}function H(t){return f.LEFT[t]}function b(t){return f.RIGHT[t]}function d(t){return f.UP_LEFT[t]}function v(t){return f.UP_RIGHT[t]}function k(t){return f.DOWN_LEFT[t]}function y(t){return f.DOWN_RIGHT[t]}function w(t){const e=d(t);return e?D(e):null}function O(t){const e=d(t);return e?H(e):null}function L(t){const e=v(t);return e?D(e):null}function m(t){const e=v(t);return e?b(e):null}function M(t){const e=k(t);return e?A(e):null}function K(t){const e=k(t);return e?H(e):null}function N(t){const e=y(t);return e?A(e):null}function S(t){const e=y(t);return e?b(e):null}function j(t,e){return e===c?f.UP[t]:f.DOWN[t]}function _(t,e){return e===c?f.UP_LEFT[t]:f.DOWN_RIGHT[t]}function W(t,e){return e===c?f.UP_RIGHT[t]:f.DOWN_LEFT[t]}function U(t,e){return e===c?f.DOWN_LEFT[t]:f.UP_RIGHT[t]}function R(t,e){return e===c?f.DOWN_RIGHT[t]:f.UP_LEFT[t]}function T(t){return{k:10,q:9,r:5,b:3,n:3,p:1}[t.toLowerCase()]||0}function I(t){return"string"==typeof t&&t.match("^[a-hA-H]{1}[1-8]{1}$")}const x=-1e3,Q=1e3;class q{constructor(t=JSON.parse(JSON.stringify(g))){if("object"==typeof t)this.configuration=Object.assign({},h,t);else{if("string"!=typeof t)throw new Error(`Unknown configuration type ${typeof config}.`);this.configuration=Object.assign({},h,function(t=""){const[e,i,s,l,a,u]=t.split(" "),h={pieces:Object.fromEntries(e.split("/").flatMap((t,e)=>{let i=0;return t.split("").reduce((t,s)=>{const r=s.match(/k|b|q|n|p|r/i);r&&(t.push([`${n[i]}${o[7-e]}`,r[0]]),i+=1);const c=s.match(/[1-8]/);return c&&(i+=Number(c)),t},[])}))};return h.turn="b"===i?r:c,h.castling={whiteLong:!1,whiteShort:!1,blackLong:!1,blackShort:!1},s.includes("K")&&(h.castling.whiteShort=!0),s.includes("k")&&(h.castling.blackShort=!0),s.includes("Q")&&(h.castling.whiteLong=!0),s.includes("q")&&(h.castling.blackLong=!0),I(l)&&(h.enPassant=l.toUpperCase()),h.halfMove=parseInt(a),h.fullMove=parseInt(u),h}(t))}this.configuration.castling||(this.configuration.castling={whiteShort:!0,blackShort:!0,whiteLong:!0,blackLong:!0}),this.history=[]}getAttackingFields(t=this.getPlayingColor()){let e=[];for(const i in this.configuration.pieces){const n=this.getPiece(i);this.getPieceColor(n)===t&&(e=[...e,...this.getPieceMoves(n,i)])}return e}isAttackingKing(t=this.getPlayingColor()){let e=null;for(const i in this.configuration.pieces){const n=this.getPiece(i);if(this.isKing(n)&&this.getPieceColor(n)!==t){e=i;break}}return this.isPieceUnderAttack(e)}isPieceUnderAttack(t){const e=this.getPieceOnLocationColor(t),i=this.getEnemyColor(e);let n=!1,o=t,s=0;for(;D(o)&&!n;){o=D(o),s++;const t=this.getPiece(o);if(t&&this.getPieceColor(t)===i&&(this.isRook(t)||this.isQueen(t)||this.isKing(t)&&1===s)&&(n=!0),t)break}for(o=t,s=0;A(o)&&!n;){o=A(o),s++;const t=this.getPiece(o);if(t&&this.getPieceColor(t)===i&&(this.isRook(t)||this.isQueen(t)||this.isKing(t)&&1===s)&&(n=!0),t)break}for(o=t,s=0;H(o)&&!n;){o=H(o),s++;const t=this.getPiece(o);if(t&&this.getPieceColor(t)===i&&(this.isRook(t)||this.isQueen(t)||this.isKing(t)&&1===s)&&(n=!0),t)break}for(o=t,s=0;b(o)&&!n;){o=b(o),s++;const t=this.getPiece(o);if(t&&this.getPieceColor(t)===i&&(this.isRook(t)||this.isQueen(t)||this.isKing(t)&&1===s)&&(n=!0),t)break}for(o=t,s=0;W(o,e)&&!n;){o=W(o,e),s++;const t=this.getPiece(o);if(t&&this.getPieceColor(t)===i&&(this.isBishop(t)||this.isQueen(t)||1===s&&(this.isKing(t)||this.isPawn(t)))&&(n=!0),t)break}for(o=t,s=0;_(o,e)&&!n;){o=_(o,e),s++;const t=this.getPiece(o);if(t&&this.getPieceColor(t)===i&&(this.isBishop(t)||this.isQueen(t)||1===s&&(this.isKing(t)||this.isPawn(t)))&&(n=!0),t)break}for(o=t,s=0;R(o,e)&&!n;){o=R(o,e),s++;const t=this.getPiece(o);if(t&&this.getPieceColor(t)===i&&(this.isBishop(t)||this.isQueen(t)||this.isKing(t)&&1===s)&&(n=!0),t)break}for(o=t,s=0;U(o,e)&&!n;){o=U(o,e),s++;const t=this.getPiece(o);if(t&&this.getPieceColor(t)===i&&(this.isBishop(t)||this.isQueen(t)||this.isKing(t)&&1===s)&&(n=!0),t)break}o=L(t);let r=this.getPiece(o);return r&&this.getPieceColor(r)===i&&this.isKnight(r)&&(n=!0),o=m(t),r=this.getPiece(o),r&&this.getPieceColor(r)===i&&this.isKnight(r)&&(n=!0),o=O(t),r=this.getPiece(o),r&&this.getPieceColor(r)===i&&this.isKnight(r)&&(n=!0),o=w(t),r=this.getPiece(o),r&&this.getPieceColor(r)===i&&this.isKnight(r)&&(n=!0),o=M(t),r=this.getPiece(o),r&&this.getPieceColor(r)===i&&this.isKnight(r)&&(n=!0),o=K(t),r=this.getPiece(o),r&&this.getPieceColor(r)===i&&this.isKnight(r)&&(n=!0),o=N(t),r=this.getPiece(o),r&&this.getPieceColor(r)===i&&this.isKnight(r)&&(n=!0),o=S(t),r=this.getPiece(o),r&&this.getPieceColor(r)===i&&this.isKnight(r)&&(n=!0),n}hasPlayingPlayerCheck(){return this.isAttackingKing(this.getNonPlayingColor())}hasNonPlayingPlayerCheck(){return this.isAttackingKing(this.getPlayingColor())}getLowestValuePieceAttackingLocation(t,e=this.getPlayingColor()){let i=null;for(const n in this.configuration.pieces){const o=this.getPiece(n);this.getPieceColor(o)===e&&this.getPieceMoves(o,n).map(e=>{e===t&&(null===i||T(o)<i)&&(i=T(o))})}return i}getMoves(t=this.getPlayingColor(),e=null){const i={};let n=0;for(const e in this.configuration.pieces){const o=this.getPiece(e);if(this.getPieceColor(o)===t){const t=this.getPieceMoves(o,e);t.length&&n++,Object.assign(i,{[e]:t})}}const o=this.getAttackingFields(this.getNonPlayingColor());if(this.isLeftCastlingPossible(o)&&(this.isPlayingWhite()&&i.E1.push("C1"),this.isPlayingBlack()&&i.E8.push("C8")),this.isRightCastlingPossible(o)&&(this.isPlayingWhite()&&i.E1.push("G1"),this.isPlayingBlack()&&i.E8.push("G8")),e&&n>e)return i;const s={};for(const t in i)i[t].map(e=>{const i={pieces:Object.assign({},this.configuration.pieces),castling:Object.assign({},this.configuration.castling)},n=new q(i);n.move(t,e),(this.isPlayingWhite()&&!n.isAttackingKing(r)||this.isPlayingBlack()&&!n.isAttackingKing(c))&&(s[t]||(s[t]=[]),s[t].push(e))});return Object.keys(s).length||(this.configuration.isFinished=!0,this.hasPlayingPlayerCheck()&&(this.configuration.checkMate=!0)),s}isLeftCastlingPossible(t){if(this.isPlayingWhite()&&!this.configuration.castling.whiteLong)return!1;if(this.isPlayingBlack()&&!this.configuration.castling.blackLong)return!1;let e=null;if(this.isPlayingWhite()&&"K"===this.getPiece("E1")&&"R"===this.getPiece("A1")&&!t.includes("E1")?e="E1":this.isPlayingBlack()&&"k"===this.getPiece("E8")&&"r"===this.getPiece("A8")&&!t.includes("E8")&&(e="E8"),!e)return!1;let i=H(e);return!this.getPiece(i)&&!t.includes(i)&&(i=H(i),!this.getPiece(i)&&!t.includes(i)&&(i=H(i),!this.getPiece(i)))}isRightCastlingPossible(t){if(this.isPlayingWhite()&&!this.configuration.castling.whiteShort)return!1;if(this.isPlayingBlack()&&!this.configuration.castling.blackShort)return!1;let e=null;if(this.isPlayingWhite()&&"K"===this.getPiece("E1")&&"R"===this.getPiece("H1")&&!t.includes("E1")?e="E1":this.isPlayingBlack()&&"k"===this.getPiece("E8")&&"r"===this.getPiece("H8")&&!t.includes("E8")&&(e="E8"),!e)return!1;let i=b(e);return!this.getPiece(i)&&!t.includes(i)&&(i=b(i),!this.getPiece(i)&&!t.includes(i))}getPieceMoves(t,e){return this.isPawn(t)?this.getPawnMoves(t,e):this.isKnight(t)?this.getKnightMoves(t,e):this.isRook(t)?this.getRookMoves(t,e):this.isBishop(t)?this.getBishopMoves(t,e):this.isQueen(t)?this.getQueenMoves(t,e):this.isKing(t)?this.getKingMoves(t,e):[]}isPawn(t){return"P"===t.toUpperCase()}isKnight(t){return"N"===t.toUpperCase()}isRook(t){return"R"===t.toUpperCase()}isBishop(t){return"B"===t.toUpperCase()}isQueen(t){return"Q"===t.toUpperCase()}isKing(t){return"K"===t.toUpperCase()}getPawnMoves(t,e){const i=[],n=this.getPieceColor(t);let o=j(e,n);return o&&!this.getPiece(o)&&(i.push(o),o=j(o,n),function(t,e){if(t===c&&"2"===e[1])return!0;if(t===r&&"7"===e[1])return!0;return!1}(n,e)&&o&&!this.getPiece(o)&&i.push(o)),o=_(e,n),o&&(this.getPiece(o)&&this.getPieceOnLocationColor(o)!==n||o===this.configuration.enPassant)&&i.push(o),o=W(e,n),o&&(this.getPiece(o)&&this.getPieceOnLocationColor(o)!==n||o===this.configuration.enPassant)&&i.push(o),i}getKnightMoves(t,e){const i=[],n=this.getPieceColor(t);let o=L(e);return o&&this.getPieceOnLocationColor(o)!==n&&i.push(o),o=m(e),o&&this.getPieceOnLocationColor(o)!==n&&i.push(o),o=w(e),o&&this.getPieceOnLocationColor(o)!==n&&i.push(o),o=O(e),o&&this.getPieceOnLocationColor(o)!==n&&i.push(o),o=K(e),o&&this.getPieceOnLocationColor(o)!==n&&i.push(o),o=M(e),o&&this.getPieceOnLocationColor(o)!==n&&i.push(o),o=S(e),o&&this.getPieceOnLocationColor(o)!==n&&i.push(o),o=N(e),o&&this.getPieceOnLocationColor(o)!==n&&i.push(o),i}getRookMoves(t,e){const i=[],n=this.getPieceColor(t);let o=e;for(;D(o);){o=D(o);const t=this.getPieceOnLocationColor(o);if(this.getPieceOnLocationColor(o)!==n&&i.push(o),t)break}for(o=e;A(o);){o=A(o);const t=this.getPieceOnLocationColor(o);if(this.getPieceOnLocationColor(o)!==n&&i.push(o),t)break}for(o=e;b(o);){o=b(o);const t=this.getPieceOnLocationColor(o);if(this.getPieceOnLocationColor(o)!==n&&i.push(o),t)break}for(o=e;H(o);){o=H(o);const t=this.getPieceOnLocationColor(o);if(this.getPieceOnLocationColor(o)!==n&&i.push(o),t)break}return i}getBishopMoves(t,e){const i=[],n=this.getPieceColor(t);let o=e;for(;d(o);){o=d(o);const t=this.getPieceOnLocationColor(o);if(this.getPieceOnLocationColor(o)!==n&&i.push(o),t)break}for(o=e;v(o);){o=v(o);const t=this.getPieceOnLocationColor(o);if(this.getPieceOnLocationColor(o)!==n&&i.push(o),t)break}for(o=e;k(o);){o=k(o);const t=this.getPieceOnLocationColor(o);if(this.getPieceOnLocationColor(o)!==n&&i.push(o),t)break}for(o=e;y(o);){o=y(o);const t=this.getPieceOnLocationColor(o);if(this.getPieceOnLocationColor(o)!==n&&i.push(o),t)break}return i}getQueenMoves(t,e){return[...this.getRookMoves(t,e),...this.getBishopMoves(t,e)]}getKingMoves(t,e){const i=[],n=this.getPieceColor(t);let o=e;return o=D(o),o&&this.getPieceOnLocationColor(o)!==n&&i.push(o),o=e,o=b(o),o&&this.getPieceOnLocationColor(o)!==n&&i.push(o),o=e,o=A(o),o&&this.getPieceOnLocationColor(o)!==n&&i.push(o),o=e,o=H(o),o&&this.getPieceOnLocationColor(o)!==n&&i.push(o),o=e,o=d(o),o&&this.getPieceOnLocationColor(o)!==n&&i.push(o),o=e,o=v(o),o&&this.getPieceOnLocationColor(o)!==n&&i.push(o),o=e,o=k(o),o&&this.getPieceOnLocationColor(o)!==n&&i.push(o),o=e,o=y(o),o&&this.getPieceOnLocationColor(o)!==n&&i.push(o),i}getPieceColor(t){return t.toUpperCase()===t?c:r}getPieceOnLocationColor(t){const e=this.getPiece(t);return e?e.toUpperCase()===e?c:r:null}getPiece(t){return this.configuration.pieces[t]}setPiece(t,e){if(!function(t){return Object.values(s).includes(t)}(e))throw new Error("Invalid piece "+e);if(!I(t))throw new Error("Invalid location "+t);this.configuration.pieces[t.toUpperCase()]=e}removePiece(t){if(!I(t))throw new Error("Invalid location "+t);delete this.configuration.pieces[t.toUpperCase()]}isEmpty(t){if(!I(t))throw new Error("Invalid location "+t);return!this.configuration.pieces[t.toUpperCase()]}getEnemyColor(t){return t===c?r:c}getPlayingColor(){return this.configuration.turn}getNonPlayingColor(){return this.isPlayingWhite()?r:c}isPlayingWhite(){return this.configuration.turn===c}isPlayingBlack(){return this.configuration.turn===r}addMoveToHistory(t,e){this.history.push({from:t,to:e,configuration:JSON.parse(JSON.stringify(this.configuration))})}move(t,e){const i=this.getPiece(t),n=this.getPiece(e);if(!i)throw new Error("There is no piece at "+t);var o,s;if(Object.assign(this.configuration.pieces,{[e]:i}),delete this.configuration.pieces[t],this.isPlayingWhite()&&this.isPawn(i)&&"8"===e[1]&&Object.assign(this.configuration.pieces,{[e]:"Q"}),this.isPlayingBlack()&&this.isPawn(i)&&"1"===e[1]&&Object.assign(this.configuration.pieces,{[e]:"q"}),this.isPawn(i)&&e===this.configuration.enPassant&&delete this.configuration.pieces[(o=e,s=this.getPlayingColor(),s===c?f.DOWN[o]:f.UP[o])],this.isPawn(i)&&this.isPlayingWhite()&&"2"===t[1]&&"4"===e[1]?this.configuration.enPassant=t[0]+"3":this.isPawn(i)&&this.isPlayingBlack()&&"7"===t[1]&&"5"===e[1]?this.configuration.enPassant=t[0]+"6":this.configuration.enPassant=null,"E1"===t&&Object.assign(this.configuration.castling,{whiteLong:!1,whiteShort:!1}),"E8"===t&&Object.assign(this.configuration.castling,{blackLong:!1,blackShort:!1}),"A1"===t&&Object.assign(this.configuration.castling,{whiteLong:!1}),"H1"===t&&Object.assign(this.configuration.castling,{whiteShort:!1}),"A8"===t&&Object.assign(this.configuration.castling,{blackLong:!1}),"H8"===t&&Object.assign(this.configuration.castling,{blackShort:!1}),this.isKing(i)){if("E1"===t&&"C1"===e)return this.move("A1","D1");if("E8"===t&&"C8"===e)return this.move("A8","D8");if("E1"===t&&"G1"===e)return this.move("H1","F1");if("E8"===t&&"G8"===e)return this.move("H8","F8")}this.configuration.turn=this.isPlayingWhite()?r:c,this.isPlayingWhite()&&this.configuration.fullMove++,this.configuration.halfMove++,(n||this.isPawn(i))&&(this.configuration.halfMove=0)}exportJson(){return{moves:this.getMoves(),pieces:this.configuration.pieces,turn:this.configuration.turn,isFinished:this.configuration.isFinished,check:this.hasPlayingPlayerCheck(),checkMate:this.configuration.checkMate,castling:this.configuration.castling,enPassant:this.configuration.enPassant,halfMove:this.configuration.halfMove,fullMove:this.configuration.fullMove}}calculateAiMove(t){return this.calculateAiMoves(t)[0]}calculateAiMoves(t){if(t=parseInt(t),!l.includes(t))throw new Error(`Invalid level ${t}. You can choose ${l.join(",")}`);this.shouldIncreaseLevel()&&t++;const e=[],i=this.calculateScore(this.getPlayingColor()),n=this.getMoves();for(const o in n)n[o].map(n=>{const s=this.getTestBoard(),r=Boolean(s.getPiece(n));s.move(o,n),e.push({from:o,to:n,score:s.testMoveScores(this.getPlayingColor(),t,r,r?s.calculateScore(this.getPlayingColor()):i,n).score+s.calculateScoreByPiecesLocation(this.getPlayingColor())+Math.floor(Math.random()*(this.configuration.halfMove>10?this.configuration.halfMove-10:1)*10)/10})});return e.sort((t,e)=>t.score<e.score?1:t.score>e.score?-1:0),e}shouldIncreaseLevel(){return this.getIngamePiecesValue()<50}getIngamePiecesValue(){let t=0;for(const e in this.configuration.pieces){t+=T(this.getPiece(e))}return t}getTestBoard(){const t={pieces:Object.assign({},this.configuration.pieces),castling:Object.assign({},this.configuration.castling),turn:this.configuration.turn,enPassant:this.configuration.enPassant};return new q(t)}testMoveScores(t,e,i,n,o,s=1){let r=null;if(s<u[e]&&this.hasPlayingPlayerCheck()?r=this.getMoves(this.getPlayingColor()):(s<a[e]||i&&s<u[e])&&(r=this.getMoves(this.getPlayingColor(),5)),this.configuration.isFinished)return{score:this.calculateScore(t)+(this.getPlayingColor()===t?s:-s),max:!0};if(!r){if(null!==n)return{score:n,max:!1};return{score:this.calculateScore(t),max:!1}}let c=this.getPlayingColor()===t?x:Q,l=!1;for(const i in r)l||r[i].map(o=>{if(l)return;const r=this.getTestBoard(),a=Boolean(r.getPiece(o));if(r.move(i,o),r.hasNonPlayingPlayerCheck())return;const u=r.testMoveScores(t,e,a,a?r.calculateScore(t):n,o,s+1);u.max&&(l=!0),c=this.getPlayingColor()===t?Math.max(c,u.score):Math.min(c,u.score)});return{score:c,max:!1}}calculateScoreByPiecesLocation(t=this.getPlayingColor()){const e={A:0,B:1,C:2,D:3,E:4,F:5,G:6,H:7};let i=0;for(const n in this.configuration.pieces){const o=this.getPiece(n);if(G[o]){const s=G[o][n[1]-1][e[n[0]]];i+=.5*(this.getPieceColor(o)===t?s:-s)}}return i}calculateScore(t=this.getPlayingColor()){let e=0;if(this.configuration.checkMate)return this.getPlayingColor()===t?x:Q;if(this.configuration.isFinished)return this.getPlayingColor()===t?Q:x;for(const i in this.configuration.pieces){const n=this.getPiece(i);this.getPieceColor(n)===t?e+=10*T(n):e-=10*T(n)}return e}}class ${constructor(t){this.board=new q(t)}move(t,e){t=t.toUpperCase(),e=e.toUpperCase();const i=this.board.getMoves();if(!i[t]||!i[t].includes(e))throw new Error(`Invalid move from ${t} to ${e} for ${this.board.getPlayingColor()}`);return this.board.addMoveToHistory(t,e),this.board.move(t,e),{[t]:e}}moves(t=null){return(t?this.board.getMoves()[t.toUpperCase()]:this.board.getMoves())||[]}setPiece(t,e){this.board.setPiece(t,e)}removePiece(t){this.board.removePiece(t)}aiMove(t=2){const e=this.board.calculateAiMove(t);return this.move(e.from,e.to)}getHistory(t=!1){return t?this.board.history.reverse():this.board.history}printToConsole(){!function(t){process.stdout.write("\n");let e=c;Object.assign([],o).reverse().map(i=>{process.stdout.write(""+i),n.map(n=>{switch(t.pieces[`${n}${i}`]){case"K":process.stdout.write("♚");break;case"Q":process.stdout.write("♛");break;case"R":process.stdout.write("♜");break;case"B":process.stdout.write("♝");break;case"N":process.stdout.write("♞");break;case"P":process.stdout.write("♟");break;case"k":process.stdout.write("♔");break;case"q":process.stdout.write("♕");break;case"r":process.stdout.write("♖");break;case"b":process.stdout.write("♗");break;case"n":process.stdout.write("♘");break;case"p":process.stdout.write("♙");break;default:process.stdout.write(e===c?"█":"░")}e=e===c?r:c}),e=e===c?r:c,process.stdout.write("\n")}),process.stdout.write(" "),n.map(t=>{process.stdout.write(""+t)}),process.stdout.write("\n")}(this.board.configuration)}exportJson(){return this.board.exportJson()}exportFEN(){return function(t){let e="";Object.assign([],o).reverse().map(i=>{let o=0;i<8&&(e+="/"),n.map(n=>{const s=t.pieces[`${n}${i}`];s?(o&&(e+=o.toString(),o=0),e+=s):o++}),e+=""+(o||"")}),e+=t.turn===c?" w ":" b ";const{whiteShort:i,whiteLong:s,blackLong:r,blackShort:l}=t.castling;return s||i||r||l?(i&&(e+="K"),s&&(e+="Q"),l&&(e+="k"),r&&(e+="q")):e+="-",e+=" "+(t.enPassant?t.enPassant.toLowerCase():"-"),e+=" "+t.halfMove,e+=" "+t.fullMove,e}(this.board.configuration)}}function J(t){if(!t)throw new Error("Configuration param required.");return new $(t).moves()}function V(t){if(!t)throw new Error("Configuration param required.");return new $(t).exportJson()}function Y(t){if(!t)throw new Error("Configuration param required.");return new $(t).exportFEN()}function z(t,e,i){if(!t)throw new Error("Configuration param required.");const n=new $(t);return n.move(e,i),"object"==typeof t?n.exportJson():n.exportFEN()}function X(t,e=2){if(!t)throw new Error("Configuration param required.");const i=new $(t).board.calculateAiMove(e);return{[i.from]:i.to}}}])}));
}).call(this)}).call(this,require('_process'))
},{"_process":1}]},{},[2]);
