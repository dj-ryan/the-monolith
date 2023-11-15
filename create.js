// ==UserScript==
// @name         createICQA
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  try to take over the world!
// @author       You
// @match        http://rcs01:8080/home/system/totes
// @icon         https://www.google.com/s2/favicons?sz=64&domain=undefined.rcs01
// @grant        none
// ==/UserScript==

( function () {



    let ICQAlist = [ "no values, please parse file" ];



    const searchDelay = 2000; // in milliseconds between searchs and selects, this value has to be greater then 1500
    const selectDelay = 1000;

function parseCSV(filePath) {

  fetch(filePath)
    .then(response => {
      if (!response.ok) {
        throw new Error('Network response was not ok.');
      }
      return response.text();
    })
    .then(csvText => {
      const lines = csvText.split('\n'); // Split the content into lines

      const dataArray = [];
      lines.forEach(line => {
        const values = line.split(','); // Assuming CSV values are separated by commas
        dataArray.push(values);
      });

      console.log(dataArray); // This will display the parsed CSV data as an array
    })
    .catch(error => console.error('Error:', error));
}





    function searchForTote(searchId) {
        const searchInput = document.getElementById("aqaTotesInputSearchId");
        if (searchInput) {
            searchInput.focus(); // Place the cursor in the input field
            searchInput.value = searchId;
            // Trigger a search event after a short delay
            setTimeout(function() {
                //searchInput.dispatchEvent(new Event('input', { bubbles: true }));
                searchInput.dispatchEvent(new KeyboardEvent('keyup', { 'key': 'Enter' }));
            }, 100); // Adjust the delay as needed
        }
    }
    // Function to change the checkbox to 'true'
    function changeCheckbox(toteId) {
        let quary = "#aqaTotesCheckboxT03000" + toteId + "Id > div > div.p-checkbox-box.p-component";
        console.log(quary);

        let checkbox = document.querySelector(quary);
        if (checkbox) {
            console.log("Check: " + toteId);
            checkbox.dispatchEvent(new Event('click', { bubbles: true }));

        } else {
            console.log("DID NOT CHECK TOTE: ", + toteId);
        }
    }

    function searchAll(toteList) {
        toteList.forEach((element, index) => {
            setTimeout(() => {
                console.log("Element: " + element);
                searchForTote(element);
            }, index * searchDelay);
            setTimeout(() => {
                changeCheckbox(element);
            }, (index * searchDelay) + selectDelay);
        });
    }

    // automaticly start
    // window.addEventListener("load", function () {
    //    setTimeout(function () {
    //        searchAll(ICQAlist);
    //    }, 3000);
    //});


    function parceICQA(fileName) {


    }



    function createICQA() {
        console.log("Starting Report...");


        //parseCSV('/home/commteam/Downloads/Other Flags-data-2023-11-11 21_41_05_2.csv');

        setTimeout(function () {
            searchAll(ICQAlist);
        }, 3000);
    }


    window.createICQA = createICQA;


})();
