let playfieldGrid = [[],[],[],[],[],[],[]];
let playFieldData = new Array(6); //JS doesn't like 2D arrays, so this is the only way I found to properly initialise one..
for (let index = 0; index < 6; index++) {
    playFieldData[index] = new Array ("Free","Free","Free","Free","Free","Free", "Free");
}

let currentPlayer = "red";
const hoverColor = "blue";

const p1Field = document.getElementById("yName");
const p2Field = document.getElementById("rName");
const button = document.getElementById("startButton");
const consoleTextfield = document.getElementById("console");
button.addEventListener("click", () => {
    if(p1Field.value !== ""){
        consoleTextfield.children[0].innerHTML = "Good luck! Red starts!";
        Init();
    }else{
        consoleTextfield.children[0].innerHTML = "Please enter 2 names!";
    }
})

function Init(){
    for(i = 0; i < 7; i++){
        const columnNumber = "column" + i;
        const childs = document.getElementById(columnNumber).children;
        const cells = [].slice.call(childs);
    
        for(j = 0; j < 6; j++){
            playfieldGrid[i][j] = cells[j];
            const cell = playfieldGrid[i][j];
            const numberI = i;
            const numberJ = j;
            playfieldGrid[i][j].addEventListener("click", () => {ClickEvent(cells, numberI, numberJ)});
            playfieldGrid[i][j].addEventListener("mouseover", () => {OnHover(cells, numberI, numberJ)});
            playfieldGrid[i][j].addEventListener("mouseout", () => {OnExitHover(cells, numberI)});
        }
    }
} 

function EndGame(){
    for(i = 0; i < 7; i++){
        const columnNumber = "column" + i;
        const childs = document.getElementById(columnNumber).children;
        const cells = [].slice.call(childs);
    
        for(j = 0; j < 6; j++){
            playfieldGrid[i][j] = cells[j];
            const numberI = i;
            const numberJ = j;
            playfieldGrid[i][j].removeEventListener("click", ClickEvent, true);
            playfieldGrid[i][j].removeEventListener("mouseover", () => {OnHover(cells, numberI, numberJ)});
            playfieldGrid[i][j].removeEventListener("mouseout", () => {OnExitHover(cells, numberI)});
        }
    }
}

function ClickEvent(cells, column, row){
    for(j = 5; j >= 0; j--){
        if(playFieldData[j][column] === "Free"){
            playFieldData[j][column] = currentPlayer;
            cells[j].style.backgroundColor = currentPlayer;
            CheckIfPlayerWon();
            SwitchPlayer();
            OnHover(cells, column, row);
            return;
        }
    }
}

function SwitchPlayer(){
    if(currentPlayer === "red"){
        currentPlayer = "yellow";
    }else{
        currentPlayer = "red";
    }
}

function OnHover(columnArr, column, row){

    columnArr.forEach((cell, index) => {
        if(playFieldData[index][column] === "Free"){
            if(index === row){
                cell.style.backgroundColor = currentPlayer;
            }else{
                cell.style.backgroundColor = hoverColor;
            }
            
    }

});

}

function OnExitHover(columnArr, column){

    columnArr.forEach((cell, index) => {
        if(playFieldData[index][column] === "Free"){
            cell.style.backgroundColor = "white";
        }
    });
    
}

function CheckIfPlayerWon(){
    if(CheckHorizontal() == true || CheckVertical() == true || CheckDiagonal() == true){
        EndGame();
    }
}

function CheckHorizontal(){
    playFieldData.forEach(arr => {
        let counter = 1;
        let lastEntry = "Free";
        arr.forEach(entry => {
            if(entry !== "Free" && entry === lastEntry){
                counter++;
            }else{
                counter = 1;
            }
            lastEntry = entry;

            if(counter >= 4){

                consoleTextfield.children[0].innerHTML = ("Player " + currentPlayer + " has won the game!");
                return true;
            }
        })

    })
}

function CheckVertical(){
    for(let j = 0; j < 7; j++){
        let counter = 1;
        let lastEntry = "Free";
        for(let i = 0; i < playFieldData.length; i++){
             
            if(playFieldData[i][j] !== "Free" && playFieldData[i][j] === lastEntry){
                counter++;
            }else{
                counter = 1;
            }
            lastEntry = playFieldData[i][j];

            if(counter >= 4){

                consoleTextfield.children[0].innerHTML = ("Player " + currentPlayer + " has won the game!");
                return true;
            }
        }

    }
    
}

function CheckDiagonal(){
    //Check left to right
    let LTRStartPositions = [[0, 2], [0,1 ], [0,0], [1,0], [2,0], [3,0]];

    //For each of the positions we see if any of the squares are filled with the same color
    LTRStartPositions.forEach(position => {
        let y = position[1];
        let counter = 1;
        let lastEntry = "Free";

        //For loop goes up on the X axis
        for (let x = position[0]; x < 7; x++) {
            if(playFieldData[y][x] !== "Free" && playFieldData[y][x] === lastEntry){
                counter++;
            }else{
                counter = 1;
            }
            lastEntry = playFieldData[y][x];

            if(counter >= 4){

                consoleTextfield.children[0].innerHTML = ("Player " + currentPlayer + " has won the game!");
                return;
            }

            y++; //Add to the Y axis.
            if(y > 5){
                break;
            }
        }
    })

        //Check right to left
        let RTLStartPositions = [[6, 2], [6,1 ], [6,0], [5,0], [4,0], [3,0]];

        //For each of the positions we see if any of the squares are filled with the same color
        RTLStartPositions.forEach(position => {
            let y = position[1];
            let counter = 1;
            let lastEntry = "Free";
    
            //For loop goes down on the X axis
            for (let x = position[0]; x >= 0; x--) {
                if(y === 5 && x === 0){
                }
                if(playFieldData[y][x] !== "Free" && playFieldData[y][x] === lastEntry){
                    counter++;
                }else{
                    counter = 1;
                }
                lastEntry = playFieldData[y][x];
                if(counter >= 4){
    
                    consoleTextfield.children[0].innerHTML = ("Player " + currentPlayer + " has won the game!");
                    return true;
                }

                y++; //Add to the Y axis.
                if(y > 5){
                    break;
                }
            }
        })

}