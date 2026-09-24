let accountBalance = 100;
const depositAmount = 15;
const withdrawalAmount = 15;

function deposit() {
    accountBalance = accountBalance + depositAmount;

    const balanceText = document.getElementById("balance-display");
    const statusText = document.getElementById("status-message");

    if(accountBalance > 0)
    {
        balanceText.innerText = accountBalance;
        statusText.innerText = "Succesfully Deposited $15";
    }

} 
function withdraw() {
    accountBalance = accountBalance - withdrawalAmount;
    const balanceText = document.getElementById("balance-display");
    const statusText = document.getElementById("status-message");
    
    if(accountBalance > 14)
    {
        balanceText.innerText = accountBalance;
        statusText.innerText = "Succesfully Withdrew $15"
    }
    else
    {
        balanceText.innerText = "0";
        statusText.innerText = "Cannot Overdraft";
        statusText.style.color = "#f14a7d";
        statusText.style.fontWeight = "bold";

        document.body.style.backgroundColor = "#5a1a1a";

        const balanceText = document.getElementById("withdrawalerror");
        document.querySelector("button").disabled = false;
        document.querySelector("button").innerText = "Withdrawal Failed";
    }
}