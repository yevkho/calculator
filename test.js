
const container = document.querySelector("#container");

const btn = document.querySelector("#button");
btn.addEventListener("click", resetGrid);

let gridSize = 16;
setGrid();
setHoverEffect();

function setGrid () {
    for (let i = 0; i < gridSize; i++) {
    const divSection = document.createElement("div");
    divSection.setAttribute("id", "section");
    container.appendChild(divSection);

        for (let j = 0; j < gridSize; j++) {
        const divSquare = document.createElement("div");
        divSquare.setAttribute("class", "square");
        divSquare.style.backgroundColor = `rgb(${randomColor ()}, ${randomColor ()}, ${randomColor ()}`;
        divSection.appendChild(divSquare);
        }
    }
}

function setHoverEffect () {
    const divSquares = document.querySelectorAll(".square");
    divSquares.forEach((div) => {
        div.addEventListener("mouseover", (e) => {         
            let currentOpacity = window.getComputedStyle(div).opacity; //any other way to get the baseline opacity value?
            console.log(currentOpacity);
            if (currentOpacity > 0) {
                div.style.opacity = currentOpacity - 0.1;
            }
        });
    });
}

function randomColor () {
    return Math.floor(Math.random() * 255);
}

function resetGrid () {
    let x = Number(prompt("Type: Grid Size up to 100"));
    if (x <= 100) {
        gridSize = x;
    } else { //or a better way to set this up without referring to the same function
        alert("Wrong input!")
        resetGrid();
    }

    const divSections = document.querySelectorAll("#section");
    divSections.forEach((div) => {
        div.remove();
    })
    
    setGrid();
    setHoverEffect();
}