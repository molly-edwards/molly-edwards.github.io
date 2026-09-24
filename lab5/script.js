let playerHealth = 100;
const damageAmount = 30;

function deposit() {
    accountBalance = accountBalance + withdrawalAmount;

    const healthText = document.getElementById("checking-display");
    const statusText = document.getElementById("status-message");

    if(accountBalance > 0)
    {
        balanceText.innerText = depositAmount;
        statusText.innerText = "Succesfully Deposited"
    }
    else
    {
        healthText.innerText = 0;
        statusText.innerText = "Game Over!";
        statusText.style.color = "#f14a7d";
        statusText.style.fontWeight = "bold";

        document.body.style.backgroundColor = "#5a1a1a";

        document.querySelector("button").disabled = true;
        document.querySelector("button").innerText = "Dead";
    }

}