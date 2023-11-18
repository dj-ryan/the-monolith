// ==UserScript==
// @name         selectICQA
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  try to take over the world!
// @author       You
// @match        http://rcs01:8080/home/system/totes
// @icon         https://www.google.com/s2/favicons?sz=64&domain=undefined.rcs01
// @grant        none
// ==/UserScript==

( function () {


    /*
    INSTRUCTIONS:

    -Load the home/system/totes or ACS and refresh the page.
    -Scroll to the bottom of the page and select choose file (located in the far bottom left of the page, very small)
    -Load a CSV file with the list of totes, no extra columns and no header row (can be full ID or 4 digit end code i.e. T03-00-1234 or 1234)
    -Press 'CTRL + SHIFT + I' to open the developer tools and select the console tab
    -Type 'selectICQA()' to run the function

    */



    let ICQAlist = [ ]; // global ICQA list



    const searchDelay = 2000; // in milliseconds between searchs and selects
    const selectDelay = 1500; // This value has to be less then search Delay


    // Function to read a CSV file and process its content
    function readCSVFile(file) {
        // Create a new FileReader object
        const reader = new FileReader();

        // Define the onload event handler for when the file is successfully loaded
        reader.onload = function(e) {
            // Extract the CSV content from the loaded file
            const csvContent = e.target.result;

            // Parse the CSV content into a structured data format
            const parsedData = parseCSV(csvContent);

            // Flatten the parsed data and remove any carriage return characters
            const flattenedData = parsedData.flat().map(value => value.replace(/\r/g, ''));

            // Add the flattened data to the ICQAlist array
            ICQAlist.push(...flattenedData);

            // Remove the last element if the ICQAlist is not empty
            if (ICQAlist.length > 0) {
                ICQAlist.pop();
            }

            // Log the resulting ICQAlist to the console
            console.log("CSV values:", ICQAlist);
        };

        // Read the content of the specified file as text
        reader.readAsText(file);
    }


    // Function to parse CSV content into a 2D array
    function parseCSV(csvContent) {
        // Split the CSV content into an array of rows using newline character as a delimiter
        const rows = csvContent.split('\n');

        // Map each row into an array by splitting it using a comma as a delimiter
        const parsedData = rows.map(row => row.split(','));

        // Return the resulting 2D array representing the parsed CSV data
        return parsedData;
    }


    // Function to handle the change event of a file input element
    function handleFileInputChange(event) {
        // Get the file input element from the event
        const fileInput = event.target;

        // Get the selected files from the file input
        const files = fileInput.files;

        // Check if at least one file is selected
        if (files.length > 0) {
            // Get the first selected file
            const selectedFile = files[0];

            // Call the readCSVFile function to read and process the selected file
            readCSVFile(selectedFile);
        }
    }



    // Function to search for a tote by triggering a search action
    function searchForTote(searchId) {
        // Get the search input element with the specified ID
        const searchInput = document.getElementById("aqaTotesInputSearchId");

        // Check if the search input element exists
        if (searchInput) {
            // Set focus on the search input
            searchInput.focus();

            // Set the value of the search input to the specified searchId
            searchInput.value = searchId;

            // Trigger a 'keyup' event on the search input after a delay of 100 milliseconds
            setTimeout(function() {
                // Create and dispatch a new KeyboardEvent with 'Enter' key to simulate pressing Enter
                searchInput.dispatchEvent(new KeyboardEvent('keyup', { 'key': 'Enter' }));
            }, 100);
        }
    }


    // Function to change the state of a checkbox associated with a specific toteId
    function changeCheckbox(toteId) {
        // Construct the CSS selector for the checkbox based on the provided toteId
        let quary = "#aqaTotesCheckboxT03000" + toteId + "Id > div > div.p-checkbox-box.p-component";

        // Find the checkbox element using the constructed selector
        let checkbox = document.querySelector(quary);

        // Check if the checkbox element is found
        if (checkbox) {
            // If the checkbox is found, log a success message with the toteId
            console.log("✔️ " + toteId);

            // Simulate a click event on the checkbox to change its state
            checkbox.dispatchEvent(new Event('click', { bubbles: true }));
        } else {
            // If the checkbox is not found, log a message indicating that the tote was not checked
            console.log("DID NOT CHECK TOTE: ", + toteId);
        }
    }


    // Function to search for each element in the toteList
    function searchAll(toteList) {
        // Iterate through each element in the toteList using forEach
        toteList.forEach((element, index) => {
            // Use setTimeout to introduce delays between searches based on the index
            setTimeout(() => {
                // Log a message indicating that the search for the current element is starting
                console.log("[" + index + "/" + ICQAlist.length + "] Searching " + element + "...");

                // Call the searchForTote function to perform the actual search for the current element
                searchForTote(element);
            }, index * searchDelay); // The delay is proportional to the index multiplied by searchDelay

            // Use another setTimeout to introduce delays for checkbox changes after searching
            setTimeout(() => {
                // Call the changeCheckbox function to change the checkbox status for the current element
                changeCheckbox(element);
            }, (index * searchDelay) + selectDelay); // The delay is adjusted by adding selectDelay
        });
    }



    // Function to initiate the selection process for ICQA data
    function selectICQA() {
        // Log a message indicating the start of the function
        console.log("Starting...");
        let eta = (ICQAlist.length * searchDelay) / 1000;
        console.log("ETA: " + eta + "sec");

        // Set a timeout to delay the execution of the searchAll function by 2000 milliseconds (2 seconds)
        setTimeout(function () {
            // Call the searchAll function with the ICQAlist as the argument after the delay
            searchAll(ICQAlist);
        }, 2000);
    }




    // Create a new input element of type 'file'
    const fileInput = document.createElement('input');

    // Set the type attribute of the input element to 'file'
    fileInput.type = 'file';

    // Add an event listener to the input element to detect changes (file selection)
    fileInput.addEventListener('change', function (event) {
        // Extract the selected file from the event object
        const selectedFile = event.target.files[0];

        // Call the readCSVFile function with the selected file as an argument
        readCSVFile(selectedFile);
    });


    // Append the dynamically created fileInput element to the body of the HTML document
    document.body.appendChild(fileInput);

    // Expose the selectICQA function to the global scope, making it accessible from other parts of the code
    window.selectICQA = selectICQA;



})();
