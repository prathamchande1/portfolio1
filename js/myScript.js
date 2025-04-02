document.addEventListener( "DOMContentLoaded", function () {
    const themeSwitch = document.getElementById( "themeSwitch" );
    const body = document.body;


    // ==================== Date Display ===================
    const today = new Date();

    // Format the date as 'MMM DD' (e.g., Sep 25)
    const options = { month: 'short', day: 'numeric' };
    const formattedDate = today.toLocaleDateString( 'en-US', options );

    // Insert the date into the span
    document.getElementById( "todayDate" ).textContent = formattedDate;

    // ==================== Dark Mode Toggle ===================
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
        renderChart(); // Re-render the chart with the updated theme
        renderChart2(); // Re-render the chart with the updated theme

    } );


    //=================== Alert Box ===================

    function showAlert( message ) {
        const alertBox = document.getElementById( "alertBox" );
        const alertMessage = document.getElementById( "alertMessage" );
        const closeAlert = document.getElementById( "closeAlert" );

        alertMessage.innerText = message;
        alertBox.style.display = "flex";

        closeAlert.addEventListener( "click", function () {
            alertBox.style.display = "none";
        } );
    }

    // // ==================== fundAccountBtn ===================
    document.getElementById( "fundAccountBtn" ).addEventListener( "click", function () {
        showAlert( "Funding feature coming soon!" );
    } );



    // ==================== Search Functionality ===================
    document.getElementById( "searchButton" ).addEventListener( "click", function () {
        const searchQuery = document.getElementById( "searchInput" ).value.trim();
        if ( searchQuery ) {
            showAlert( `Searching for: ${searchQuery}` );

            // Clear the input field after the search
            document.getElementById( "searchInput" ).value = '';
        }
    } );




    // ==================== welcome ===================

    // // Example Usage
    // document.getElementById( "fundAccountBtn" ).addEventListener( "click", function () {
    //     showAlert( "Funding feature coming soon!" );
    // } );

    // Function to get and display current date and time
    function displayDateTime() {
        const currentDate = new Date();
        const formattedDate = currentDate.toLocaleDateString( 'en-US', {
            weekday: 'long',
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        } );
        const formattedTime = currentDate.toLocaleTimeString( 'en-US' );
        document.getElementById( "currentDateTime" ).querySelector( "span" ).textContent = `${formattedDate}, ${formattedTime}`;
    }

    // Function to get and display last login time
    function displayLastLogin() {
        // Example: You could save the last login in localStorage or fetch from the server
        const lastLogin = localStorage.getItem( 'lastLogin' );
        if ( lastLogin ) {
            document.getElementById( "lastLogin" ).querySelector( "span" ).textContent = lastLogin;
        } else {
            document.getElementById( "lastLogin" ).querySelector( "span" ).textContent = "First time login";
        }
    }


    displayDateTime();
    displayLastLogin();
    localStorage.setItem( 'lastLogin', new Date().toLocaleString() );

    // ==================== Net Income Comparison ===================

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




    // ==================== Tab Functionality ===================
    document.querySelectorAll( ".tab" ).forEach( tab => {
        tab.addEventListener( "click", function () {
            // Remove activeTab class from all tabs
            document.querySelectorAll( ".tab" ).forEach( t => t.classList.remove( "activeTab" ) );

            // Add activeTab class to the clicked tab
            this.classList.add( "activeTab" );

            // Get the corresponding content ID
            const tabId = this.id.replace( "tab", "" ); // Extract number from tab ID
            const contentId = ["accounts_main", "cards_main", "dashboard_main", "settings_main", "profile_main"];

            // Hide all content sections
            contentId.forEach( id => document.getElementById( id ).style.display = "none" );

            // Show the corresponding section
            document.getElementById( contentId[tabId - 1] ).style.display = "block";
        } );
    } );


    // ==================== Side Tab Functionality ===================

    document.querySelectorAll( ".sideTab" ).forEach( tab => {
        tab.addEventListener( "click", function () {
            // Remove activeTab class from all tabs
            document.querySelectorAll( ".sideTab" ).forEach( t => t.classList.remove( "activeX" ) );

            // Add activeTab class to the clicked tab
            this.classList.add( "activeX" );

            // Get the corresponding content ID
            const tabId = this.id.replace( "sideTab", "" ); // Extract number from tab ID
            const contentId = ["accounts_main", "cards_main", "dashboard_main", "settings_main", "profile_main"];

            // Hide all content sections
            contentId.forEach( id => document.getElementById( id ).style.display = "none" );

            // Show the corresponding section
            document.getElementById( contentId[tabId - 1] ).style.display = "block";
        } );
    } );


    //=====================  risk profile  ===================
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
        showAlert( profile );
    }

    // Trigger the profile determination when the user clicks submit
    document.getElementById( 'submitBtn' ).addEventListener( 'click', determineProfile );


    // ==================== Filter Expenses and  Stock Performance ===================
    document.getElementById( "filterButton" ).addEventListener( "click", function () {
        const startDate = document.getElementById( "startDate" ).value;
        const endDate = document.getElementById( "endDate" ).value;

        if ( startDate && endDate ) {
            // Parse the start and end dates
            const start = new Date( startDate );
            const end = new Date( endDate );
            const today = new Date();

            if ( start > end ) {
                showAlert( "Start date cannot be later than end date." )
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
            showAlert( "Please select both start and end dates." )
        }
    } );

    function showFuturePrediction() {
        // Display the "Future Predictions" heading
        const predictionHeading = document.getElementById( "predictionHeading" );
        predictionHeading.innerText = "Showing Future Predictions"; // Set heading for future predictions

        // Display dummy prediction data for each category
        document.getElementById( "profitLossData" ).innerText = "₹ " + generateFuturePrediction( "profitLoss" );
        document.getElementById( "expensesMoneyData" ).innerText = "₹ " + generateFuturePrediction( "expenses" );
        document.getElementById( "incomeMoneyData" ).innerText = "₹ " + generateFuturePrediction( "income" );
        document.getElementById( "stockData" ).innerText = generateFuturePrediction( "stock" ) + "%";
        document.getElementById( "totalAssetsData" ).innerText = "₹ " + generateFuturePrediction( "assets" );

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
        document.getElementById( "profitLossData" ).innerText = `₹ ${filteredProfitLoss}`;
        styleProfitLoss( filteredProfitLoss );

        // Expenses data
        const filteredExpensesMoney = getFilteredExpensesMoney( startDate, endDate );
        document.getElementById( "expensesMoneyData" ).innerText = `₹ ${filteredExpensesMoney}`;

        // Income data
        const filteredIncomeMoney = getFilteredIncomeMoney( startDate, endDate );
        document.getElementById( "incomeMoneyData" ).innerText = `₹ ${filteredIncomeMoney}`;

        // Stock performance data
        const filteredStock = getFilteredStockData( startDate, endDate );
        document.getElementById( "stockData" ).innerText = `${filteredStock}%`;

        // Total Assets data
        const totalAssets = getTotalAssets( filteredExpensesMoney, filteredIncomeMoney, filteredProfitLoss, filteredStock );
        document.getElementById( "totalAssetsData" ).innerText = `₹ ${totalAssets}`;
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




    //===================== Stock  card ===================

    const progressElements = document.querySelectorAll( ".stock-progress" );

    progressElements.forEach( ( element ) => {
        let progressValue = parseInt( element.getAttribute( "data-value" ) );
        let circle = document.createElement( "div" );

        circle.style.width = "100%";
        circle.style.height = "100%";
        circle.style.borderRadius = "50%";
        circle.style.border = "3px solid white";
        circle.style.position = "absolute";
        circle.style.clipPath = `polygon(50% 50%, 100% 0, 100% 100%, 50% 50%)`;
        circle.style.transform = `rotate(${( progressValue / 100 ) * 360}deg)`;

        element.appendChild( circle );
        element.innerHTML += `<span>${progressValue}%</span>`;
    } );









    // ==================== ROI Calculation ===================

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




    //===================== Tax Calculation ===================
    document.getElementById( 'calculateTaxButton' ).addEventListener( 'click', function () {
        const grossIncome = parseFloat( document.getElementById( 'grossIncome' ).value );
        const deductions = parseFloat( document.getElementById( 'deductions' ).value );

        if ( isNaN( grossIncome ) || isNaN( deductions ) ) {
            showAlert( "Please enter valid income and deductions values." );
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















    //====================== Top Performing Assets ===================
    // Example Data for Top Performing Assets
    const assetsData = [
        { name: "Tesla", category: "Stock", returnPercent: 120.5, value: 150000 },
        { name: "Bitcoin", category: "Cryptocurrency", returnPercent: 300.3, value: 500000 },
        { name: "Apple", category: "Stock", returnPercent: 45.2, value: 250000 },
        { name: "Bharat Petroleum", category: "Stock", returnPercent: 60.7, value: 180000 },

        { name: "Amazon", category: "Stock", returnPercent: 60.7, value: 180000 },
        { name: "SBI", category: "Stock", returnPercent: 10.8, value: 200000 },
        { name: "HDFC", category: "Stock", returnPercent: 10.8, value: 200000 },
        { name: "KOTAK", category: "Stock", returnPercent: 10.8, value: 200000 },
        { name: "CIPLA", category: "Stock", returnPercent: 10.8, value: 200000 },
        { name: "Hinduja", category: "Stock", returnPercent: 10.8, value: 200000 },
        { name: "Jio Fincance", category: "Stock", returnPercent: 10.8, value: 200000 },

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
            valueCell.textContent = `₹ ${asset.value.toLocaleString()}`;
            row.appendChild( valueCell );

            tableBody.appendChild( row );
        } );
    }

    // Call the function to populate the table
    populateAssetsTable();















    //======================== Assets allocation ==============================
    function explodePie( e ) {
        if ( typeof ( e.dataSeries.dataPoints[e.dataPointIndex].exploded ) === "undefined" || !e.dataSeries.dataPoints[e.dataPointIndex].exploded ) {
            e.dataSeries.dataPoints[e.dataPointIndex].exploded = true;
        } else {
            e.dataSeries.dataPoints[e.dataPointIndex].exploded = false;
        }
        e.chart.render();
    }
    function renderChart() {
        // Check if dark mode is enabled
        const isDarkMode = localStorage.getItem( "dark-mode" ) === "enabled"; // Example: Using localStorage
        const bgColor = isDarkMode ? "#0a101f" : "#ffffff"; // Dark mode (Gray) / Light mode (White)
        const textColor = isDarkMode ? "#ffffff" : "#000000"; // Text color (White/Black)

        var chart = new CanvasJS.Chart( "chartContainer", {
            backgroundColor: bgColor, // Dynamic background color
            theme: isDarkMode ? "dark1" : "light1", // Change chart theme
            exportFileName: "Asset Allocation",
            exportEnabled: true,
            animationEnabled: true,
            title: {
                text: "Asset Allocation",
                fontColor: textColor // Dynamic text color
            },
            legend: {
                cursor: "pointer",
                itemclick: explodePie,
                fontColor: textColor // Dynamic legend color
            },
            data: [{
                type: "doughnut",
                innerRadius: 90,
                showInLegend: true,
                toolTipContent: "<b>{name}</b>: {y}%",
                indexLabel: "{name} - {y}%",
                indexLabelFontColor: textColor, // Labels inside chart color
                dataPoints: [
                    { y: 40, name: "Stocks", color: "#DF4C25" },      // Green
                    { y: 20, name: "Bonds", color: "#002060" },       // Orange
                    { y: 15, name: "Real Estate", color: "#EF9337" }, // Blue
                    { y: 10, name: "Gold", color: "#3C8DE0" },        // Yellow
                    { y: 15, name: "Mutual Funds", color: "#3b2774" } // Purple
                ]
            }]
        } );
        chart.render();
    }
    renderChart();

    function renderChart2() {
        // Check if dark mode is enabled
        const isDarkMode = localStorage.getItem( "dark-mode" ) === "enabled"; // Example: Using localStorage

        const bgColor = isDarkMode ? "#0a101f" : "#ffffff";
        const textColor = isDarkMode ? "#ffffff" : "#000000";

        var chart = new CanvasJS.Chart( "chartContainer2", {
            backgroundColor: bgColor,
            exportEnabled: true,
            animationEnabled: true,
            theme: isDarkMode ? "dark1" : "light1",
            title: {
                text: "Monthly Expense Breakdown",
                fontColor: textColor
            },
            legend: {
                cursor: "pointer",
                itemclick: explodePie,
                fontColor: textColor
            },
            data: [{
                type: "pie",
                showInLegend: true,
                toolTipContent: "{name}: <strong>{y}%</strong>",
                indexLabel: "{name} - {y}%",
                indexLabelFontColor: textColor,
                dataPoints: [
                    { y: 20, name: "Rent", exploded: true, color: "#FF5733" },
                    { y: 15, name: "Groceries", color: "#33FF57" },
                    { y: 10, name: "Transportation", color: "#5733FF" },
                    { y: 10, name: "Dining Out", color: "#FF33A8" },
                    { y: 10, name: "Entertainment", color: "#FFD700" },
                    { y: 10, name: "Healthcare", color: "#00CED1" },
                    { y: 5, name: "Education", color: "#FF4500" },
                    { y: 5, name: "Subscriptions", color: "#9370DB" },
                    { y: 5, name: "Shopping", color: "#20B2AA" },
                    { y: 10, name: "Savings", color: "#708090" }
                ]
            }]
        } );
        chart.render();
    }
    renderChart2();











    // Check if dark mode is enabled from localStorage
    const isDarkMode = localStorage.getItem( "dark-mode" ) === "enabled";

    // Set background and text colors dynamically
    const bgColor = isDarkMode ? "#0a101f" : "#ffffff";
    const textColor = isDarkMode ? "#ffffff" : "#000000";

    am5.ready( function () {

        // Check if dark mode is enabled from localStorage
        const isDarkMode = localStorage.getItem( "dark-mode" ) === "enabled";

        // Set background and text colors dynamically
        const bgColor = isDarkMode ? "#0a101f" : "#ffffff";
        const textColor = isDarkMode ? "#ffffff" : "#000000";

        // Create root element
        var root = am5.Root.new( "chartdiv" );

        // Set chart background color
        root.interfaceColors.set( "background", am5.color( bgColor ) );
        root.interfaceColors.set( "text", am5.color( textColor ) );

        // Set themes
        root.setThemes( [
            am5themes_Animated.new( root )
        ] );

        // Create chart
        // https://www.amcharts.com/docs/v5/charts/xy-chart/
        var chart = root.container.children.push( am5xy.XYChart.new( root, {
            panX: true,
            panY: true,
            wheelX: "panX",
            wheelY: "zoomX",
            pinchZoomX: true,
            paddingLeft: 0,
            paddingRight: 1
        } ) );

        // Add cursor
        // https://www.amcharts.com/docs/v5/charts/xy-chart/cursor/
        var cursor = chart.set( "cursor", am5xy.XYCursor.new( root, {} ) );
        cursor.lineY.set( "visible", false );


        // Create axes
        // https://www.amcharts.com/docs/v5/charts/xy-chart/axes/
        var xRenderer = am5xy.AxisRendererX.new( root, {
            minGridDistance: 30,
            minorGridEnabled: true
        } );

        xRenderer.labels.template.setAll( {
            rotation: -90,
            centerY: am5.p50,
            centerX: am5.p100,
            paddingRight: 15
        } );

        xRenderer.grid.template.setAll( {
            location: 1
        } )

        var xAxis = chart.xAxes.push( am5xy.CategoryAxis.new( root, {
            maxDeviation: 0.3,
            categoryField: "country",
            renderer: xRenderer,
            tooltip: am5.Tooltip.new( root, {} )
        } ) );

        var yRenderer = am5xy.AxisRendererY.new( root, {
            strokeOpacity: 0.1
        } )

        var yAxis = chart.yAxes.push( am5xy.ValueAxis.new( root, {
            maxDeviation: 0.3,
            renderer: yRenderer
        } ) );

        // Create series
        // https://www.amcharts.com/docs/v5/charts/xy-chart/series/
        var series = chart.series.push( am5xy.ColumnSeries.new( root, {
            name: "Series 1",
            xAxis: xAxis,
            yAxis: yAxis,
            valueYField: "value",
            sequencedInterpolation: true,
            categoryXField: "country",
            tooltip: am5.Tooltip.new( root, {
                labelText: "{valueY}"
            } )
        } ) );

        series.columns.template.setAll( { cornerRadiusTL: 5, cornerRadiusTR: 5, strokeOpacity: 0 } );
        series.columns.template.adapters.add( "fill", function ( fill, target ) {
            return chart.get( "colors" ).getIndex( series.columns.indexOf( target ) );
        } );

        series.columns.template.adapters.add( "stroke", function ( stroke, target ) {
            return chart.get( "colors" ).getIndex( series.columns.indexOf( target ) );
        } );


        // Set data
        var data = [{
            country: "Tesla",
            value: 2025
        }, {
            country: "Bitcoin",
            value: 1882
        }, {
            country: "Apple",
            value: 1809
        }, {
            country: "Bharat Petroleum",
            value: 1322
        }, {
            country: "Amazon",
            value: 1122
        }, {
            country: "SBI",
            value: 1114
        }, {
            country: "HDFC",
            value: 984
        }, {
            country: "KOTAK",
            value: 1711
        }, {
            country: "CIPLA",
            value: 665
        }, {
            country: "Hinduja",
            value: 4143
        }, {
            country: "Jio Fincance",
            value: 441
        }];

        xAxis.data.setAll( data );
        series.data.setAll( data );


        // Make stuff animate on load
        // https://www.amcharts.com/docs/v5/concepts/animations/
        series.appear( 1000 );
        chart.appear( 1000, 100 );

    } ); //



    //end here
} );











