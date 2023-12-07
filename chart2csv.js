// ==UserScript==
// @name         chart2csv
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  Extracts the data from any chart on D365 and exports it as a csv
// @author       David Ryan
// @match        https://operations-alertprd.crm.dynamics.com/main.aspx*
// @icon         https://www.google.com/s2/favicons?sz=64&domain=dynamics.com
// @grant        none
// ==/UserScript==

// Wrap the code in an IIFE (Immediately Invoked Function Expression) to create a private scope
(function() {
    'use strict';

    // Define the Highcharts selector pattern
    const highchartsSelector = '[id^="highcharts-"] > svg > g.highcharts-series-group > g.highcharts-series.highcharts-column-series.highcharts-color-0.highcharts-tracker';

    // Function to convert Highcharts chart data to CSV and trigger download
    function chart2csv() {
        // Select the Highcharts element
        const highchartsElement = document.querySelector(highchartsSelector);

        // Check if the Highcharts element is found
        if (highchartsElement) {
            // Map over the children of the Highcharts element and create a CSV string
            const csvContent = Array.from(highchartsElement.children).map((child, index) => {
                // Get the 'aria-label' attribute of each child element
                const labelAttribute = child.getAttribute('aria-label');
                // Replace all dots with commas in the 'aria-label' attribute
                const labelWithCommas = labelAttribute.replace(/\./g, ',');
                // Log the modified label attribute to the console
                console.log(`Child ${index + 1} label attribute:`, labelWithCommas);
                // Return the modified label for CSV content
                return `${labelWithCommas}`;
            }).join('\n');

            // Create a Blob with the CSV content
            const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8' });

            // Create a link element to prompt the user to download the CSV file
            const link = document.createElement('a');
            link.href = window.URL.createObjectURL(blob);
            const currentDate = new Date().toISOString().slice(0, 10); // Format: YYYY-MM-DD
            link.download = `labels_${currentDate}.csv`; // Dynamic file name with the current date
            document.body.appendChild(link);
            // Trigger a click event on the link to initiate the download
            link.click();
            // Remove the link element from the DOM
            document.body.removeChild(link);
        } else {
            // Log an error message if the Highcharts element is not found
            console.error('Highcharts element not found!');
        }
    }

    // Expose the chart2csv function to the global scope for external use
    window.chart2csv = chart2csv;
})();
