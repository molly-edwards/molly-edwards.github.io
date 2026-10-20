let currentLevel = 1;

function levelUp()
{
    currentLevel++;
    document.getElementById("level").innerHTML= currentLevel;
    
}

function saveLevel()
{
    localStorage.setItem("savedLevel", currentLevel);
    alert("Level data saved!");
}

function loadLevel()
{
    let retrievedData = localStorage.getItem("savedLevel");

    if(retrievedData !== null)
    {
        currentLevel=retrievedData;
        document.getElementById("level").innerText = currentLevel;

    }
    else
    {
        alert("No saved data found...")
    }
}