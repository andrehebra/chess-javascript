const playGrid = document.getElementById("playGrid");


const letterPosition = ["a", "b", "c", "d", "e", "f", "g", "h"]
let startingColor = "whiteSquare";

for (let i = 8; i >= 1; i--) {

    const row = document.createElement("div");
    row.classList.add("row");

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

        row.appendChild(square);

    }
    playGrid.appendChild(row);
}


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
    addPiece("e1", "ql");

    //add Kings 
    addPiece("e8", "kd");
    addPiece("d1", "kl");
    
    
}

function addPiece(position, piece) {
    const pieceImage = document.createElement("img");
    pieceImage.src = "./pieces/" + piece + ".svg";
    pieceImage.className = "piece";

    const location = document.getElementById(position);
    location.classList.add(piece);
    location.appendChild(pieceImage);
    
}


standardGame();