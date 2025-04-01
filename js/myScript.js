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



    //welocome

    function showAlert( message ) {
        const alertBox = document.getElementById( "alertBox" );
        const alertMessage = document.getElementById( "alertMessage" );
        const closeAlert = document.getElementById( "closeAlert" );

        alertMessage.innerText = message;
        alertBox.style.display = "block";

        closeAlert.addEventListener( "click", function () {
            alertBox.style.display = "none";
        } );
    }

    // Example Usage
    document.getElementById( "fundAccountBtn" ).addEventListener( "click", function () {
        showAlert( "Funding feature coming soon!" );
    } );



    //search bar
    document.getElementById( "searchButton" ).addEventListener( "click", function () {
        const searchQuery = document.getElementById( "searchInput" ).value.trim();
        if ( searchQuery ) {
            showAlert( `Searching for: ${searchQuery}` );
            // You can replace this alert with the actual search function

            // Clear the input field after the search
            document.getElementById( "searchInput" ).value = '';
        }
    } );


    // Asset Allocation Data
    var ctxp = document.getElementById( 'assetAllocationChartp' ).getContext( '2d' );
    var assetAllocationChartp = new Chart( ctxp, {
        type: 'bar',  // Change the type to 'bar'
        data: {
            labels: ['Stocks', 'Bonds', 'Real Estate', 'Gold', 'Mutual Funds'],
            datasets: [{
                label: 'Asset Allocation',
                data: [40, 20, 15, 10, 15],  // Data for each category
                backgroundColor: [
                    '#DF4C25',      // Stocks
                    '#ED5920',      // Bonds
                    '#004F99',      // Real Estate
                    '#EF9337',      // Gold
                    '#3C8DE0'       // Mutual Funds
                ],
                borderColor: [
                    '#DF4C25',      // Stocks
                    '#ED5920',      // Bonds
                    '#004F99',      // Real Estate
                    '#EF9337',      // Gold
                    '#3C8DE0'       // Mutual Funds
                ],
                borderWidth: 1
            }]
        },
        options: {
            responsive: true,
            scales: {
                y: {
                    beginAtZero: true
                }
            },
            plugins: {
                legend: {
                    display: false
                }
            }
        }
    } );


    var ctx = document.getElementById( 'assetAllocationChart' ).getContext( '2d' );
    const assetAllocationChart = new Chart( ctx, {
        type: 'bar',
        data: {
            labels: ['Stocks', 'Bonds', 'Real Estate', 'Gold', 'Mutual Funds'],
            datasets: [{
                label: 'Asset Allocation',
                data: [40, 20, 15, 10, 15],
                backgroundColor: '#FF5733',
                borderColor: '#fff',
                borderWidth: 2
            }]
        },
        options: {
            responsive: true,
            scales: {
                x: { // Use this for histogram binning
                    type: 'category',
                    labels: ['Stocks', 'Bonds', 'Real Estate', 'Gold', 'Mutual Funds']
                },
                y: {
                    beginAtZero: true
                }
            }
        }
    } );




    // Sample data for Net Income for different periods
    const netIncomeData = {
        current: 10000,          // Current month's net income (e.g., April 2025)
        previousMonth: 9500,     // Net income from the previous month
        previousYear: 120000,    // Net income from the previous year
    };

    // Function to update the Net Income and Comparison based on selected period
    function updateNetIncome() {
        const comparisonPeriod = document.getElementById( 'comparisonPeriod' ).value;
        const currentNetIncome = netIncomeData.current;
        const comparisonNetIncome = netIncomeData[comparisonPeriod];

        // Update Net Income value and date
        document.getElementById( 'netIncomeValue' ).textContent = '$' + currentNetIncome.toLocaleString();
        document.getElementById( 'netIncomeDate' ).textContent = 'April 2025';

        // Calculate the difference and percentage change
        const difference = currentNetIncome - comparisonNetIncome;
        const percentageChange = ( ( difference / comparisonNetIncome ) * 100 ).toFixed( 2 );

        // Display the comparison result
        let comparisonText = `+ $${difference.toLocaleString()} (${percentageChange}%)`;
        if ( difference < 0 ) {
            comparisonText = `- $${Math.abs( difference ).toLocaleString()} (${Math.abs( percentageChange )}%)`;
        }
        document.getElementById( 'comparisonResult' ).textContent = comparisonText;
    }

    // Call updateNetIncome() to initialize with the default selection
    document.getElementById( 'comparisonPeriod' ).addEventListener( 'change', updateNetIncome );
    updateNetIncome(); // Initialize with default value (Previous Month)







    // Function to determine the user's risk profile based on their answers
    function determineProfile() {
        // Collecting values from the checkboxes
        const shortTerm = document.getElementById( 'shortTerm' ).checked;
        const mediumTerm = document.getElementById( 'mediumTerm' ).checked;
        const longTerm = document.getElementById( 'longTerm' ).checked;

        const lowRisk = document.getElementById( 'lowRisk' ).checked;
        const mediumRisk = document.getElementById( 'mediumRisk' ).checked;
        const highRisk = document.getElementById( 'highRisk' ).checked;

        const lowReturn = document.getElementById( 'lowReturn' ).checked;
        const mediumReturn = document.getElementById( 'mediumReturn' ).checked;
        const highReturn = document.getElementById( 'highReturn' ).checked;

        // Defining default profile
        let profile = "Please answer the questions to get your profile.";

        // Complex profile logic based on all possibilities
        if ( highRisk && highReturn ) {
            profile = "You are a High-Risk Profiler with high return expectations.";
        } else if ( highRisk && mediumReturn ) {
            profile = "You are a High-Risk Profiler with medium return expectations.";
        } else if ( highRisk && lowReturn ) {
            profile = "You are a High-Risk Profiler with low return expectations.";
        } else if ( mediumRisk && highReturn ) {
            profile = "You are a Medium-Risk Profiler with high return expectations.";
        } else if ( mediumRisk && mediumReturn ) {
            profile = "You are a Medium-Risk Profiler with medium return expectations.";
        } else if ( mediumRisk && lowReturn ) {
            profile = "You are a Medium-Risk Profiler with low return expectations.";
        } else if ( lowRisk && highReturn ) {
            profile = "You are a Low-Risk Profiler with high return expectations.";
        } else if ( lowRisk && mediumReturn ) {
            profile = "You are a Low-Risk Profiler with medium return expectations.";
        } else if ( lowRisk && lowReturn ) {
            profile = "You are a Low-Risk Profiler with low return expectations.";
        } else if ( shortTerm ) {
            profile = "You have a short-term investment horizon.";
        } else if ( mediumTerm ) {
            profile = "You have a medium-term investment horizon.";
        } else if ( longTerm ) {
            profile = "You have a long-term investment horizon.";
        } else {
            profile = "Please review your answers and make selections.";
        }


        // Updating the profile result section
        document.getElementById( 'profileHeading' ).innerText = profile;
        // Show the alert with the profile message
        showAlert( profile );
    }

    // // Adding event listeners to checkboxes
    // const checkboxes = document.querySelectorAll( 'input[type="checkbox"]' );
    // checkboxes.forEach( checkbox => {
    //     checkbox.addEventListener( 'change', determineProfile );  // Trigger determineProfile on each checkbox change
    // } );

    // Trigger the profile determination when the user clicks submit
    document.getElementById( 'submitBtn' ).addEventListener( 'click', determineProfile );

    document.getElementById( "filterButton" ).addEventListener( "click", function () {
        const startDate = document.getElementById( "startDate" ).value;
        const endDate = document.getElementById( "endDate" ).value;

        if ( startDate && endDate ) {
            // Parse the start and end dates
            const start = new Date( startDate );
            const end = new Date( endDate );
            const today = new Date();

            if ( start > end ) {
                alert( "Start date cannot be later than end date." );
            } else {
                if ( end > today ) {
                    // If end date is in the future, show predicted values
                    showFuturePrediction();
                } else {
                    // Otherwise, show filtered data
                    filterData( start, end );
                }
            }
        } else {
            alert( "Please select both start and end dates." );
        }
    } );

    function showFuturePrediction() {
        // Display the "Future Predictions" heading
        const predictionHeading = document.getElementById( "predictionHeading" );
        predictionHeading.innerText = "Showing Future Predictions"; // Set heading for future predictions

        // Display dummy prediction data for each category
        document.getElementById( "profitLossData" ).innerText = "Rs " + generateFuturePrediction( "profitLoss" );
        document.getElementById( "expensesMoneyData" ).innerText = "Rs " + generateFuturePrediction( "expenses" );
        document.getElementById( "incomeMoneyData" ).innerText = "Rs " + generateFuturePrediction( "income" );
        document.getElementById( "stockData" ).innerText = generateFuturePrediction( "stock" ) + "%";
        document.getElementById( "totalAssetsData" ).innerText = "Rs " + generateFuturePrediction( "assets" );

        // Optionally, apply styling for future predictions
        stylePrediction();
    }

    function generateFuturePrediction( type ) {
        // Generate future prediction data (dummy values for now)
        switch ( type ) {
            case "profitLoss":
                return ( Math.floor( Math.random() * 5000 ) + 1000 ); // Example: future prediction for profit/loss
            case "expenses":
                return Math.floor( Math.random() * 2000 ) + 100; // Example: future prediction for expenses
            case "income":
                return Math.floor( Math.random() * 5000 ) + 2000; // Example: future prediction for income
            case "stock":
                return ( Math.random() * 20 - 10 ).toFixed( 2 ); // Example: random future stock performance between -10% and +10%
            case "assets":
                return ( Math.floor( Math.random() * 10000 ) + 5000 ).toFixed( 2 ); // Example: future assets
            default:
                return 0;
        }
    }

    function stylePrediction() {
        const profitLossElement = document.getElementById( "profitLossData" );
        profitLossElement.style.color = "blue"; // Set color for future prediction to blue
    }

    // Function to filter data based on selected dates
    function filterData( startDate, endDate ) {
        // Example logic for filtering data based on selected dates
        // Replace with actual API calls or logic to filter profit/loss, expenses, income, and stock data

        // Profit or Loss data
        const filteredProfitLoss = getFilteredProfitLossData( startDate, endDate );
        document.getElementById( "profitLossData" ).innerText = `Rs ${filteredProfitLoss}`;
        styleProfitLoss( filteredProfitLoss );

        // Expenses data
        const filteredExpensesMoney = getFilteredExpensesMoney( startDate, endDate );
        document.getElementById( "expensesMoneyData" ).innerText = `Rs ${filteredExpensesMoney}`;

        // Income data
        const filteredIncomeMoney = getFilteredIncomeMoney( startDate, endDate );
        document.getElementById( "incomeMoneyData" ).innerText = `Rs ${filteredIncomeMoney}`;

        // Stock performance data
        const filteredStock = getFilteredStockData( startDate, endDate );
        document.getElementById( "stockData" ).innerText = `${filteredStock}%`;

        // Total Assets data
        const totalAssets = getTotalAssets( filteredExpensesMoney, filteredIncomeMoney, filteredProfitLoss, filteredStock );
        document.getElementById( "totalAssetsData" ).innerText = `Rs ${totalAssets}`;
    }

    // Dummy data for Profit or Loss (for demonstration purposes)
    function getFilteredProfitLossData( startDate, endDate ) {
        // Replace with actual logic to calculate profit or loss based on the date range
        const profitLoss = Math.floor( Math.random() * 5000 ) - 2000; // Example: random profit or loss between -2000 and +5000
        return profitLoss;
    }

    // Dummy data for Expenses (for demonstration purposes)
    function getFilteredExpensesMoney( startDate, endDate ) {
        // Replace with actual filtering logic based on date range
        const expenses = Math.floor( Math.random() * 3000 ) + 100; // Example: random expenses between 100 and 3000
        return expenses;
    }

    // Dummy data for Income (for demonstration purposes)
    function getFilteredIncomeMoney( startDate, endDate ) {
        // Replace with actual filtering logic based on date range
        const income = Math.floor( Math.random() * 5000 ) + 1000; // Example: random income between 1000 and 5000
        return income;
    }

    // Dummy data for Stock Performance (for demonstration purposes)
    function getFilteredStockData( startDate, endDate ) {
        // Replace with actual filtering logic based on date range
        const stockPerformance = ( Math.random() * 20 - 10 ).toFixed( 2 ); // Example: random stock performance between -10% and +10%
        return stockPerformance;
    }

    // Function to apply styling for Profit or Loss
    function styleProfitLoss( profitLoss ) {
        const profitLossElement = document.getElementById( "profitLossData" );

        if ( profitLoss >= 0 ) {
            // If profit or positive, set text color to green
            profitLossElement.style.color = "green";
        } else {
            // If loss or negative, set text color to red
            profitLossElement.style.color = "red";
        }
    }

    // Calculate Total Assets (example logic)
    function getTotalAssets( expenses, income, profitLoss, stockPerformance ) {
        // Example calculation for total assets
        const stockPerformanceFactor = ( parseFloat( stockPerformance ) / 100 ) * income; // Apply stock performance to income
        const totalAssets = income - expenses + profitLoss + stockPerformanceFactor; // Total assets formula
        return totalAssets.toFixed( 2 ) + "Lakh"; // Round to 2 decimal places
    }



    //end here
} );









// Sample data for ROI calculation over different time periods
const roiData = {
    ytd: { roi: 5, date: '2025-04-01' }, // Year-to-Date ROI
    "1y": { roi: 12, date: '2024-04-01' }, // 1-year ROI
    "5y": { roi: 50, date: '2020-04-01' }, // 5-year ROI
};

// Function to update ROI based on selected time period
function updateROI() {
    const timePeriod = document.getElementById( 'timePeriod' ).value;
    const roiInfo = roiData[timePeriod];

    // Ensure roiInfo exists before trying to update the UI
    if ( roiInfo ) {
        // Update ROI percentage and date on the page
        document.getElementById( 'roiValue' ).textContent = roiInfo.roi + '%';
        document.getElementById( 'roiDate' ).textContent = roiInfo.date;

        // Update the progress bar width based on ROI percentage
        const progressBar = document.getElementById( 'roiProgress' );
        progressBar.style.width = roiInfo.roi + '%';
    }
}

// Call updateROI() to display the initial value (YTD)
document.getElementById( 'timePeriod' ).addEventListener( 'change', updateROI );
updateROI(); // Initialize with default value





document.getElementById( 'calculateTaxButton' ).addEventListener( 'click', function () {
    const grossIncome = parseFloat( document.getElementById( 'grossIncome' ).value );
    const deductions = parseFloat( document.getElementById( 'deductions' ).value );

    if ( isNaN( grossIncome ) || isNaN( deductions ) ) {
        alert( "Please enter valid income and deductions values." );
        return;
    }

    const taxableIncome = grossIncome - deductions;

    let taxLiability = 0;

    // Tax Slabs for FY 2025-26
    if ( taxableIncome <= 400000 ) {
        taxLiability = 0;
    } else if ( taxableIncome <= 800000 ) {
        taxLiability = ( taxableIncome - 400000 ) * 0.05;
    } else if ( taxableIncome <= 1200000 ) {
        taxLiability = 400000 * 0.05 + ( taxableIncome - 800000 ) * 0.1;
    } else if ( taxableIncome <= 1600000 ) {
        taxLiability = 400000 * 0.05 + 400000 * 0.1 + ( taxableIncome - 1200000 ) * 0.15;
    } else if ( taxableIncome <= 2000000 ) {
        taxLiability = 400000 * 0.05 + 400000 * 0.1 + 400000 * 0.15 + ( taxableIncome - 1600000 ) * 0.2;
    } else if ( taxableIncome <= 2400000 ) {
        taxLiability = 400000 * 0.05 + 400000 * 0.1 + 400000 * 0.15 + 400000 * 0.2 + ( taxableIncome - 2000000 ) * 0.25;
    } else {
        taxLiability = 400000 * 0.05 + 400000 * 0.1 + 400000 * 0.15 + 400000 * 0.2 + 400000 * 0.25 + ( taxableIncome - 2400000 ) * 0.3;
    }

    // Display results
    document.getElementById( 'taxableIncome' ).textContent = taxableIncome.toFixed( 2 );
    document.getElementById( 'taxLiability' ).textContent = taxLiability.toFixed( 2 );

    const taxSaved = grossIncome > 4000000 ? ( grossIncome - 4000000 ) * 0.1 : 0; // Example tax-saving scenario for income > ₹40 lakh
    document.getElementById( 'taxSaved' ).textContent = taxSaved.toFixed( 2 );

    // Show results
    document.getElementById( 'taxResult' ).style.display = 'block';
} );


// Expense Data for Categories
const expenseData = {
    labels: ["Operating Expenses", "Marketing Expenses", "Salaries", "R&D", "Miscellaneous"],
    datasets: [{
        label: "Expenses",
        data: [10000, 5000, 20000, 8000, 2000], // Expense values
        backgroundColor: [
            '#3498db', // Operating Expenses
            '#e74c3c', // Marketing Expenses
            '#f39c12', // Salaries
            '#2ecc71', // Research & Development
            '#9b59b6', // Miscellaneous
        ],
        borderColor: [
            '#2980b9', '#c0392b', '#f1c40f', '#27ae60', '#8e44ad'
        ],
        borderWidth: 1
    }]
};

// Create the Expense Breakdown Chart using Chart.js
const ctx = document.getElementById( 'expenseChart' ).getContext( '2d' );
const expenseChart = new Chart( ctx, {
    type: 'pie', // Pie chart type for the expense breakdown
    data: expenseData,
    options: {
        responsive: true,
        plugins: {
            legend: {
                position: 'top',
                labels: {
                    font: {
                        size: 14
                    }
                }
            },
            tooltip: {
                callbacks: {
                    label: function ( tooltipItem ) {
                        let dataset = tooltipItem.dataset;
                        let value = dataset.data[tooltipItem.dataIndex];
                        return `${tooltipItem.label}: $${value.toLocaleString()}`;
                    }
                }
            }
        },
        maintainAspectRatio: false
    }
} );

// Additional functionality for showing expense list and chart update
function updateExpenseChart() {
    // Add logic here if you want to update the chart dynamically based on new data.
}

// Initialize the chart
updateExpenseChart();

















// Example Data for Top Performing Assets
const assetsData = [
    { name: "Tesla", category: "Stock", returnPercent: 120.5, value: 150000 },
    { name: "Bitcoin", category: "Cryptocurrency", returnPercent: 300.3, value: 500000 },
    { name: "Apple", category: "Stock", returnPercent: 45.2, value: 250000 },
    { name: "Gold", category: "Commodity", returnPercent: 10.8, value: 200000 },
    { name: "Amazon", category: "Stock", returnPercent: 60.7, value: 180000 },
    { name: "S&P 500 ETF", category: "Index Fund", returnPercent: 18.5, value: 120000 },
    { name: "Real Estate - NYC Property", category: "Real Estate", returnPercent: 25.1, value: 700000 },
];

// Function to populate the table with the data
function populateAssetsTable() {
    const tableBody = document.querySelector( "#assetsTable tbody" );
    tableBody.innerHTML = ""; // Clear the table body before adding new rows

    assetsData.forEach( asset => {
        const row = document.createElement( "tr" );

        // Add Asset Name
        const nameCell = document.createElement( "td" );
        nameCell.textContent = asset.name;
        row.appendChild( nameCell );

        // Add Asset Category
        const categoryCell = document.createElement( "td" );
        categoryCell.textContent = asset.category;
        row.appendChild( categoryCell );

        // Add Return Percentage with color coding
        const returnCell = document.createElement( "td" );
        returnCell.textContent = `${asset.returnPercent}%`;
        returnCell.classList.add( asset.returnPercent > 0 ? "high-return" : "low-return" );
        row.appendChild( returnCell );

        // Add Asset Value
        const valueCell = document.createElement( "td" );
        valueCell.textContent = `Rs ${asset.value.toLocaleString()}`;
        row.appendChild( valueCell );

        tableBody.appendChild( row );
    } );
}

// Call the function to populate the table
populateAssetsTable();




















