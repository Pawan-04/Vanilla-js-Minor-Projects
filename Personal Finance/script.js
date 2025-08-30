let title = document.querySelector('#title')
let form = document.querySelector('form')
let amount = document.querySelector('#amount')
let note = document.querySelector('#note')
let category = document.querySelector('#category')
let date = document.querySelector('#date');
let expense = document.querySelector('#radio-group') 
let btn = document.querySelector('button')
let search = document.querySelector('.search-box')
let table = document.querySelector('table');

//------------Dashboard------------
let b = document.querySelector('.b');
let i = document.querySelector('.i');
let e = document.querySelector('.e');

let myChart;
let totalCha;
let transaction = [];
// Load from localStorage or start with an empty array
transaction = JSON.parse(localStorage.getItem('transaction')) || [];

function updateUI(){

    details();
    dashboard();
    charts();

}
updateUI()





class Transaction{
    constructor(title,amount,note,category,date,type){
        this.title = title;
        this.amount = amount;
        this.note = note;
        this.category = category;
        this.date = date;
        this.type = type;
        // console.log(this)
    }


}

btn.addEventListener('click',function(e){
    e.preventDefault()
    let type = document.querySelector('input[name="type"]:checked')
    let obj = new Transaction(title.value,amount.value,note.value,category.value,date.value,type.value) 
    transaction.push(obj)
    
    saveToLocalStorage();

 
    details();
    dashboard();
    charts();
    // totalChart();

})

function details(){
    let x = `<tr>
                <th>Date</th>
                <th>Title</th>
                <th>Note</th>
                <th>Amount</th>
                <th>Type</th>
            </tr>`
    //let storedTransaction =  localStorage.getItem('transactions')
    //transaction = JSON.parse(storedTransaction)
    transaction.forEach(function(elem){
        x += `<tr>
                <td>${elem.date}</td>
                <td>${elem.title}</td>
                <td>${elem.note}</td>
                <td>${elem.amount}</td>
                <td style="color:${elem.type === 'Expense' ? 'red' : 'green'}">${elem.type}</td>

            </tr>`
    })
    table.innerHTML = x
}

function dashboard(){

    let expen = 0;
expen = parseInt(expen)
let inc = 0;
inc = parseInt(inc)
let balance = 0;
balance = parseInt(balance)
    
    transaction.forEach(function(elem){

        if(elem.type === 'Income'){
            inc += parseInt(elem.amount)
        }
        else{
            expen += parseInt(elem.amount)
        }

        balance = inc - expen;

    })

    i.innerHTML = parseInt(inc);
    e.innerHTML = parseInt(expen);
    b.innerHTML = parseInt(balance);

    totalChart([inc,expen,balance])

}



function charts(){

    let expenseTotal = {
        Kathi: 0,
        Sothern: 0,
        Tuckshop:0,
        Friends:0,
        Hotspot:0,
    }

    transaction.forEach(function(obj){
        if(obj.type === "Expense" && expenseTotal.hasOwnProperty(obj.category)){
            expenseTotal[obj.category] += parseInt(obj.amount);
        }
    })
    
    const labels = Object.keys(expenseTotal)
    const data = Object.values(expenseTotal)


    // 2. Get the canvas element from your HTML
    const ctx = document.getElementById('myExpenseChart').getContext('2d');

    if(myChart){
        myChart.destroy();
    }

    // 3. Create a new chart object
    myChart = new Chart(ctx, {
        type: 'pie',
        data: {
            // FIX 2: Pass the 'labels' variable you created above
            labels: labels,
            datasets: [{
                label: 'Expenses',
                data: data,
backgroundColor: [
    '#003f5c', // Deep Slate Blue
    '#444e86', // Muted Purple
    '#955196', // Dusty Magenta
    '#dd5182', // Rich Coral
    '#ff6e54', // Bright Terracotta
    '#ffa600'  // Golden Amber
],
                hoverOffset: 4
            }]
        }
    });


}



function totalChart(total) {
    let summary = {
        Income: total[0],
        Expense: total[1],
        Balance: total[2]
    };

    const labels = Object.keys(summary);
    const data = Object.values(summary);
    const ctx = document.getElementById('TotalSummary').getContext('2d');

    if (totalCha) {
        totalCha.destroy();
    }

    totalCha = new Chart(ctx, {
        type: 'bar',
        data: {
            labels: labels,
            datasets: [{
                label: 'Total Summary (₹)',
                data: data,
                backgroundColor: ['#4BC0C0', '#FF6384', '#36A2EB'],
                borderWidth: 1
            }]
        },
        // --- PASTE THE NEW OPTIONS BLOCK HERE ---
        options: {
            responsive: true,
            maintainAspectRatio: false,
            scales: {
                y: {
                    beginAtZero: false,
                    grid: {
                        color: function(context) {
                            if (context.tick.value === 0) {
                                return '#343a40';
                            }
                            return 'rgba(0, 0, 0, 0.1)';
                        },
                        lineWidth: function(context) {
                            if (context.tick.value === 0) {
                                return 2;
                            }
                            return 1;
                        }
                    }
                }
            },
            plugins: {
                legend: {
                    display: false
                }
            }
        }
    });
}


/** Saves the current transactions array to local storage. */
function saveToLocalStorage() {
    // Convert the array of objects to a JSON string
    const transactionsJson = JSON.stringify(transaction);
    
    // Save the string in localStorage with a key named 'transactions'
    localStorage.setItem('transaction', transactionsJson);
}


