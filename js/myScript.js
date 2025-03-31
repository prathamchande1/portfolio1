document.addEventListener( "DOMContentLoaded", function () {
    const themeSwitch = document.getElementById( "themeSwitch" );
    const body = document.body;

    // Load theme from local storage and apply it
    function applyTheme( theme ) {
        if ( theme === "enabled" ) {
            body.classList.add( "dark-mode" );
        } else {
            body.classList.remove( "dark-mode" );
        }
    }

    const savedTheme = localStorage.getItem( "dark-mode" ) || "disabled";
    applyTheme( savedTheme );
    themeSwitch.checked = savedTheme === "enabled";

    // Toggle dark mode and save preference
    themeSwitch.addEventListener( "change", function () {
        const newTheme = themeSwitch.checked ? "enabled" : "disabled";
        localStorage.setItem( "dark-mode", newTheme );
        applyTheme( newTheme );
    } );

    // Chart.js balance chart
    const balanceCanvas = document.getElementById( "balanceChart" );
    if ( balanceCanvas ) {
        const ctx = balanceCanvas.getContext( "2d" );
        new Chart( ctx, {
            type: "line",
            data: {
                labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun"],
                datasets: [{
                    label: "Balance",
                    data: [5000, 7000, 6500, 8000, 9000, 9500],
                    borderColor: "#df4c26",
                    backgroundColor: "rgba(223, 76, 38, 0.2)",
                    borderWidth: 2,
                    fill: true
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                scales: {
                    x: {
                        grid: { display: false }
                    },
                    y: {
                        beginAtZero: true
                    }
                }
            }
        } );
    } else {
        console.error( "Canvas element 'balanceChart' not found!" );
    }

    // Generate Recent Transactions Table
    const transactions = [
        { date: "Sep 26", merchant: "Victoria's Treats", amount: "$52.14" },
        { date: "Sep 24", merchant: "Morgan Seis, LLC", amount: "$428.47" }
    ];

    const transactionsTable = document.querySelector( ".transactions table" );
    if ( transactionsTable ) {
        transactions.forEach( txn => {
            const row = document.createElement( "tr" );
            row.innerHTML = `<td>${txn.date}</td><td>${txn.merchant}</td><td>${txn.amount}</td>`;
            transactionsTable.appendChild( row );
        } );
    } else {
        console.error( "Transactions table not found!" );
    }
} );