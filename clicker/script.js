let linesOfCode = 0;

let clickPower = 1;
let doublePower = 2;
let upgradeCost = 50;
let factoryCost = 300;

let interns = 0;
let internCost = 100;

let chef = 0;
let chefCost = 1000;

function writeCode()
{
    linesOfCode = linesOfCode + clickPower;
    updateScreen();
}
function buyKeyboard()
{
    if(linesOfCode >= upgradeCost)
    {
        linesOfCode = linesOfCode - upgradeCost;
        clickPower = clickPower +1;
        upgradeCost = upgradeCost * 1.5;
        updateScreen();
    }
}

function buyFactory()
{
    if(linesOfCode >= factoryCost)
    {linesOfCode = linesOfCode + doublePower;
    doublePowr = doublePower +1;
    upgradeCost = upgradeCost *1.5;
    updateScreen();
    }
}





function buyIntern()
{
    if(linesOfCode >= internCost)
    {
        linesOfCode = linesOfCode - internCost;
        interns = interns + 1;
        internCost = internCost * 1.5;
        updateScreen()
    }
}

function updateScreen()
{
    document.getElementById("score-display").innerText = linesOfCode + " cookies";

    document.getElementById("power-display").innerText = clickPower;
    document.getElementById("cost-display").innerText = upgradeCost;

    document.getElementById("buy-factory").innerText = factoryCost;



    document.getElementById("intern-display").innerText = interns;
    document.getElementById("cost-intern-display").innerText = internCost;
}

setInterval(function() {
    if(interns > 0)
    {
        linesOfCode = linesOfCode + interns;
        updateScreen();
    }
},
1000
);

function saveLevel() {
    localStorage.setItem("savedCookies", linesOfCode);
    alert("Cookies saved!");
}

function loadLevel() {
    let retrievedData = localStorage.getItem("savedCookies");

    if (retrievedData !== null) 
    {
        linesOfCode = Number(retrievedData);
        updateScreen();
    } else {
        alert("No saved cookies found.");
    }
}