// Make sure you have a <canvas id="myExpenseChart"></canvas> in your HTML file.

function charts() {
    let expenseTotal = {
        Kathi: 0,
        Sothern: 0,
        Tuckshop: 0,
        Friends: 0,
        Hotspot: 0,
    }

    // Assuming 'transaction' is your array of transaction objects
    transaction.forEach(function(obj) {
        // Note: Using a consistent variable name 'expenseTotal'
        if (obj.type === "Expense" && expenseTotal.hasOwnProperty(obj.category)) {
            // Using parseFloat is safer for money as it handles decimals
            expenseTotal[obj.category] += (parseFloat(obj.amount) || 0);
        }
    })

    // --- CORRECTIONS ARE BELOW ---

    // FIX 1: The correct method is Object.keys() to get the labels (category names)
    const labels = Object.keys(expenseTotal);
    const data = Object.values(expenseTotal);

    // Get the canvas element from your HTML
    const ctx = document.getElementById('myExpenseChart').getContext('2d');

    // Create a new chart object
    const myChart = new Chart(ctx, {
        type: 'pie',
        data: {
            // FIX 2: Pass the 'labels' variable you created above
            labels: labels,
            datasets: [{
                label: 'Expenses',
                data: data,
                backgroundColor: [ // Add some nice colors 🎨
                    '#FF6384',
                    '#36A2EB',
                    '#FFCE56',
                    '#4BC0C0',
                    '#9966FF'
                ],
                hoverOffset: 4
            }]
        }
    });
}