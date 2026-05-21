let balance = 0;
let income = 0;
let expenses = 0;

let chart;

window.onload = function(){

    loadData();

    createChart();
};

function addExpense(){

    let name = document.getElementById("expense-name").value;

    let amount = Number(document.getElementById("expense-amount").value);

    let type = document.getElementById("type").value;

    let category = document.getElementById("category").value;

    if(name === "" || amount === 0){

        alert("Please fill all fields");

        return;
    }

    let transaction = {

        name:name,

        amount:amount,

        type:type,

        category:category
    };

    let transactions =
        JSON.parse(localStorage.getItem("transactions")) || [];

    transactions.push(transaction);

    localStorage.setItem(
        "transactions",
        JSON.stringify(transactions)
    );

    updateUI(transaction);

    updateChart();

    document.getElementById("expense-name").value = "";

    document.getElementById("expense-amount").value = "";
}

function updateUI(transaction){

    if(transaction.type === "income"){

        income += transaction.amount;

        balance += transaction.amount;
    }

    else{

        expenses += transaction.amount;

        balance -= transaction.amount;
    }

    document.getElementById("balance").innerText =
        "₹" + balance;

    document.getElementById("income-display").innerText =
        "₹" + income;

    document.getElementById("expense-display").innerText =
        "₹" + expenses;

    let expenseList =
        document.getElementById("expense-list");

    let expenseItem =
        document.createElement("div");

    expenseItem.classList.add("expense-item");

    expenseItem.innerHTML = `
        <span>
            ${transaction.category} - ${transaction.name}
        </span>

        <div>
            <span>
                ${transaction.type === "income" ? "+" : "-"}
                ₹${transaction.amount}
            </span>

            <button
                class="delete-btn"
                onclick="deleteTransaction(this)">
                X
            </button>
        </div>
    `;

    expenseList.appendChild(expenseItem);
}

function loadData(){

    let transactions =
        JSON.parse(localStorage.getItem("transactions")) || [];

    transactions.forEach(transaction => {

        updateUI(transaction);
    });

    updateChart();
}

function deleteTransaction(button){

    let item =
        button.parentElement.parentElement;

    item.remove();
}

function createChart(){

    let ctx =
        document.getElementById('myChart')
        .getContext('2d');

    chart = new Chart(ctx, {

        type:'pie',

        data:{

            labels:['Income','Expenses'],

            datasets:[{

                data:[income,expenses],

                backgroundColor:[
                    '#22c55e',
                    '#ef4444'
                ]
            }]
        }
    });
}

function updateChart(){

    chart.data.datasets[0].data =
        [income,expenses];

    chart.update();
}