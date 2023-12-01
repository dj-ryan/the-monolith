// ==UserScript==
// @name         theCommentSection
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  a small library of ACS boost functions submited by the users
// @author       You
// @match        http://rcs01:8080/home/system/bots
// @icon         https://www.google.com/s2/favicons?sz=64&domain=undefined.rcs01
// @grant        none
// ==/UserScript==



//#pr_id_5-table > tbody

//#pr_id_2-table

//#pr_id_2-table > tbody

// #pr_id_2-table > tbody

//#pr_id_2-table > tbody


(function() {
    'use strict';

    // Wait for the page to be fully loaded

    // Your comment text

    function commentSection(){

        var colGroup = document.querySelector('#pr_id_2-table > colgroup');

        //<col _ngcontent-cwu-c130="" id="aqaBotsColumnGroupCommentId" class="ng-star-inserted">
        var colGroupElement = document.createElement('col');
        colGroupElement.setAttribute('_ngcontent-cwu-c130','');
        colGroupElement.setAttribute('id', 'aqaBotsColumnGroupCommentId');
        colGroupElement.setAttribute('class', 'ng-star-inserted');


        var header = document.querySelector('#pr_id_2-table > thead');
        colGroup.insertBefore(colGroupElement, colGroup.childNodes[2]);



        //_ngcontent-cwu-c130="" presizablecolumn=""
        //        class="p-element p-sortable-column p-resizable-column ng-star-inserted"
        //        id="aqaBotsColumnHeaderControlId" tabindex="0" role="columnheader" aria-sort="none"
        var commentHeaderColumn = document.createElement('th');
        commentHeaderColumn.setAttribute('_ngcontent-cwu-c130', '');
        commentHeaderColumn.setAttribute('presizablecolumn', '');
        commentHeaderColumn.setAttribute('class', 'p-element p-sortable-column p-resizable-column ng-star-inserted');
        commentHeaderColumn.setAttribute('id', 'aqaBotsColumnHeaderControlId');
        commentHeaderColumn.setAttribute('tabindex', '0');
        commentHeaderColumn.setAttribute('role', 'columnheader');
        commentHeaderColumn.setAttribute('aria-sort', 'none');
        commentHeaderColumn.innerHTML = "Comment";

        header.insertBefore(commentHeaderColumn, header.childNodes[2]);

//#aqaBots\[object\ Object\]\,\[object\ Object\]\,\[object\ Object\]\,\[object\ Object\]\,\[object\ Object\]\,\[object\ Object\]\,\[object\ Object\]\,\[object\ Object\]\,\[object\ Object\]\,\[object\ Object\]\,\[object\ Object\]\,\[object\ Object\]\,\[object\ Object\]TableRowHeaderId

        var subHeader = document.querySelector('#aqaBots\[object\ Object\]\,\[object\ Object\]\,\[object\ Object\]\,\[object\ Object\]\,\[object\ Object\]\,\[object\ Object\]\,\[object\ Object\]\,\[object\ Object\]\,\[object\ Object\]\,\[object\ Object\]\,\[object\ Object\]\,\[object\ Object\]\,\[object\ Object\]TableRowHeaderId');
        subHeader.setAttribute('id', 'aqaBots[object Object],[object Object],[object Object],[object Object],[object Object],[object Object],[object Object],[object Object],[object Object],[object Object],[object Object],[object Object],[object Object],[object Object],[object Object]TableRowHeaderId');


        // Get all rows of the table
        var rows = document.querySelector('#pr_id_2-table > tbody');
        //var rows = table.children;

        if(rows){
            Array.from(rows.children).forEach(function(row, index) {
                // Create a new cell for the comment
                //var commentCell = document.createElement('td');
                //commentCell.setAttribute('class', 'ng-star-inserted');
                //commentCell.innerHTML = commentText;

                // Insert the new comment cell as the third cell in each row (adjust index if needed)
                //row.insertBefore(commentCell, row.childNodes[2]);

                console.log(row, index);


                //var rowBotID = 10;

                var commentElement = document.createElement('td')

                commentElement.setAttribute('_ngcontent-cwu-c130', ``);
                //commentElement.setAttribute('aqaBotsComment` + rowBotID +`Id`);
                commentElement.setAttribute('class', 'ng-star-inserted');
                commentElement.setAttribute('style', 'width: 5rem; max-width: 5rem');

                //<input _ngcontent-yxa-c127="" type="text" pinputtext="" placeholder="Search" class="p-inputtext p-component p-element" id="aqaBotsInputSearchId">
                var commentInput = document.createElement('input')
                commentInput.setAttribute('_ngcontent-yxa-c127', '');
                commentInput.setAttribute('type','text');
                commentInput.setAttribute('pinputtext', '');
                commentInput.setAttribute('placeHolder', 'Case ID');
                commentInput.setAttribute('class', 'p-inputtext p-component p-element');
                commentInput.setAttribute('id', 'aqaBotsInputSearchId');


                //commentInput.placeholder = 'Eneter your comment';

                commentElement.appendChild(commentInput);

                //commentElement.textContent = `comment: ` + index;
                row.insertBefore(commentElement, row.childNodes[2]);
            });
        }
    }

    window.commentSection = commentSection;

})();
