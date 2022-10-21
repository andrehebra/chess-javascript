const playGrid = document.getElementById("playGrid");


for (let i = 1; i < 65; i++) {
    if (i % 2 === 0) {
        const whiteSquare = document.createElement("div");
        whiteSquare.className = "whiteSquare";
        whiteSquare.classList.add("square");
        whiteSquare.classList.add("number-" + i);

        playGrid.appendChild(whiteSquare);

    } else {
        const blackSquare = document.createElement("div");
        blackSquare.className = "blackSquare";
        blackSquare.classList.add("square");
        blackSquare.classList.add("number-" + i);

        playGrid.appendChild(blackSquare);
    }
}