let accountBalance = 1000;
const depositAmount = 15;
const withdrawalAmount = 15;

function deposit() {
    accountBalance = accountBalance + depositAmount;

    const healthText = document.getElementById("checking-display");
    const statusText = document.getElementById("status-message");

    if(accountBalance > 0)
    {
        balanceText.innerText = depositAmount;
        statusText.innerText = "Succesfully Deposited $15";
    }

} 
function withdraw() {
    accountBalance = accountBalance - withdrawalAmount;
    const healthText = document.getElementById("checking-display");
    const statusText = document.getElementById("status-message");
    
    if(accountBalance > 14)
    {
        balanceText.innerText = withdrawAmount;
        statusText.innerText = "Succesfully Withdrew $15"
    }
    else
    {
        balanceText.innerText = "0";
        statusText.innerText = "Cannot Overdraft";
        statusText.style.color = "#f14a7d";
        statusText.style.fontWeight = "bold";

        document.body.style.backgroundColor = "#5a1a1a";

        document.querySelector("button").disabled = false;
        document.querySelector("button").innerText = "Withdrawal Failed";
    }
}