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
    addPiece("d1", "ql");

    //add Kings 
    addPiece("e8", "kd");
    addPiece("e1", "kl");
    
    
}

function addPiece(position, piece) {
    const pieceImage = document.createElement("img");
    pieceImage.src = "./pieces/" + piece + ".svg";
    pieceImage.className = "piece";

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
                addPiece(letterPosition[currentColumn-1] + currentRow, "pd");
                currentColumn++;
                break;
            case 'r':
                addPiece(letterPosition[currentColumn-1] + currentRow, "rd");
                currentColumn++;
                break;
            case 'b':
                addPiece(letterPosition[currentColumn-1] + currentRow, "bd");
                currentColumn++;
                break;
            case 'n':
                addPiece(letterPosition[currentColumn-1] + currentRow, "nd");
                currentColumn++;
                break;
            case 'k':
                addPiece(letterPosition[currentColumn-1] + currentRow, "kd");
                currentColumn++;
                break;
            case 'q':
                addPiece(letterPosition[currentColumn-1] + currentRow, "qd");
                currentColumn++;
                break;
            case 'P':
                addPiece(letterPosition[currentColumn-1] + currentRow, "pl");
                currentColumn++;
                break;
            case 'R':
                addPiece(letterPosition[currentColumn-1] + currentRow, "rl");
                currentColumn++;
                break;
            case 'B':
                addPiece(letterPosition[currentColumn-1] + currentRow, "bl");
                currentColumn++;
                break;
            case 'N':
                addPiece(letterPosition[currentColumn-1] + currentRow, "nl");
                currentColumn++;
                break;
            case 'K':
                addPiece(letterPosition[currentColumn-1] + currentRow, "kl");
                currentColumn++;
                break;
            case 'Q':
                addPiece(letterPosition[currentColumn-1] + currentRow, "ql");
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

//possible numbers: 1,2,3,4,5,6,7
//possible pieces: p,n,r,b,q,k,P,N,R,B,Q,K

fenDisplay("4k2r/6r1/8/8/8/8/3R4/R3K3 w Qk")