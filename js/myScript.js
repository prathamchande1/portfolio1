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
    var ctx = document.getElementById( 'assetAllocationChart' ).getContext( '2d' );
    var assetAllocationChart = new Chart( ctx, {
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



    //end here
} );


