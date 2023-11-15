function insertNewRowAndPopulate() {
  var destinationSheetName = "Recovery"; // Replace with the name of the destination sheet
  var sourceSheetName = "Add Bot"; // Replace with the name of the source sheet

  var ss = SpreadsheetApp.getActiveSpreadsheet();
  var destinationSheet = ss.getSheetByName(destinationSheetName);
  var sourceSheet = ss.getSheetByName(sourceSheetName);

  if (destinationSheet && sourceSheet) {
    var newRow = destinationSheet.insertRowBefore(4); // Insert a new row before row 2 (you can change the row number as needed)

    // Retrieve data from specific cells in the source sheet
    //getRange(row, column, numRows, numColumns) https://developers.google.com/apps-script/reference/spreadsheet/sheet#getrangerow,-column,-numrows,-numcolumns

    sourceSheet.getRange(2, 1).copyTo(destinationSheet.getRange(4, 1), SpreadsheetApp.CopyPasteType.PASTE_NO_BORDERS, true);
    sourceSheet.getRange(2, 2).copyTo(destinationSheet.getRange(4, 2), SpreadsheetApp.CopyPasteType.PASTE_NO_BORDERS, true);
    sourceSheet.getRange(2, 3).copyTo(destinationSheet.getRange(4, 3), SpreadsheetApp.CopyPasteType.PASTE_NO_BORDERS, true);
    sourceSheet.getRange(2, 4).copyTo(destinationSheet.getRange(4, 4), SpreadsheetApp.CopyPasteType.PASTE_NO_BORDERS, true);
    sourceSheet.getRange(2, 5).copyTo(destinationSheet.getRange(4, 5), SpreadsheetApp.CopyPasteType.PASTE_NO_BORDERS, true);
    sourceSheet.getRange(2, 6).copyTo(destinationSheet.getRange(4, 6), SpreadsheetApp.CopyPasteType.PASTE_NO_BORDERS, true);
    
    // clear the cells
    var myClearRange = SpreadsheetApp
               .getActive()
               .getSheetByName(sourceSheetName)
               .getRange(2,1,1,6);
    myClearRange.clearContent();
    
    var sortRange = destinationSheet.getRange("A3:F1000");

    sortRange.sort({column: 4, ascending: true});



  } else {
    Logger.log("One of the sheets was not found");
  }
}



function archiveRecoveredBots() {

  //var sheet = ss.getSheets()[0];  
  //var range = sheet.getRange("A1:C7");

  var criterion = "Case Updated"
  var ss = SpreadsheetApp.getActiveSpreadsheet();

  var sourceSheet = ss.getSheetByName("Recovery");
  var destinationSheet = ss.getSheetByName("Archive");

  var dataRange = sourceSheet.getDataRange();
  var values = dataRange.getValues();

  for (var i = values.length - 1; i >= 0; i--){
    //Logger.log(i);
    if (values[i][4] === criterion) {
      //Logger.log("hit");
      values[i].push(new Date());
      destinationSheet.appendRow(values[i]);
      sourceSheet.deleteRow(i+1);

    }
  }
}



