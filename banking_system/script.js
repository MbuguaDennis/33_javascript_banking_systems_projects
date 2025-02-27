// selecting elements
const loginBtn = document.getElementById("login-btn");
const usernameInput = document.getElementById("username");
const dashboard = document.getElementById("dashboard");
const userNameDisplay = document.getElementById("user-name");
const balanceDisplay = document.getElementById("balance");
const depositBtn = document.getElementById("deposit-btn");
const withdrawBtn = document.getElementById("withdraw-btn");
const depositAmount = document.getElementById("deposit-amount");
const withdrawAmount = document.getElementById("withdraw-amount");
const transactionHistory = document.getElementById("transaction-history");
const logoutButton = document.querySelector('.logout')

// check if user is logged in
let user = JSON.parse(localStorage.getItem("user")) || null;
if (user){
    showDashboard();
}

// login function
loginBtn.addEventListener('click',()=>{
    const username = usernameInput.value.trim();
    if(username){
        user = {
            name: username, balance:0,
            transactions: []
        }
        localStorage.setItem('user',JSON.stringify(user));
        showDashboard();
    }
});

// show Dashboard

function showDashboard(){
    userNameDisplay.textContent = user.name;
    balanceDisplay.textContent = user.balance;
    transactionHistory.textContent = user.transactions
    dashboard.hidden = false;
}


// deposit function
depositBtn.addEventListener('click',()=>{
    const amount = Number(depositAmount.value)
    // verify amount is not zero
    if(amount >0){
        user.balance += amount;
        user.transactions.push(`Deposited: $${amount}`);
        updateData();
    }
});
// Withdraw money 
withdrawBtn.addEventListener('click',()=>{
    const amount = Number(withdrawAmount.value);
    if(amount >0 && amount<=user.balance){
        user.balance -=amount;
        user.transactions.push(`Withdrew: $${amount}`);
        updateData()
    }
    else{
        alert("Insufficient balance or invalid amount");
    }
})

// update ui and save data
function updateData() {
    localStorage.setItem("user", JSON.stringify(user));
    balanceDisplay.textContent = user.balance;
    transactionHistory.innerHTML = user.transactions.map(tx => `<li>${tx}</li>`).join("");
}

logoutButton.addEventListener('click', ()=>{
    localStorage.removeItem("user");
    window.location.href= "./index.html";

})
