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
        
        game.aiMove();

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

game.aiMove();

fenDisplay(game.exportFEN());


