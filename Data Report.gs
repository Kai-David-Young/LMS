function Bluebookdata() {
  var ui = SpreadsheetApp.getUi();
  var Bluebookdatasheet = SpreadsheetApp.getActive().getSheetByName("Summary");
  var BluebookdatasheetRemaining = Bluebookdatasheet.getRange("B22").getValue();
  var BluebookdatasheetDigFound = Bluebookdatasheet.getRange("B23").getValue();
  var BluebookdatasheetPercentage = Bluebookdatasheet.getRange("B24").getValue();
  var BluebookdataOutput = ui.alert("\t Audit Completion \n \t\t\t"+ "\r\n Remaining: " + BluebookdatasheetRemaining + "\r\n Digitally found: " + BluebookdatasheetDigFound + "\r\n Percentage of found: " + (BluebookdatasheetPercentage*100 + "%")) 
 

}

function Dataissues() {
  var ui = SpreadsheetApp.getUi();
  var Bluebookdatasheet = SpreadsheetApp.getActive().getSheetByName("Summary");
  var DataTitles = Bluebookdatasheet.getRange("B14").getValue();
  var DataShlfmrks = Bluebookdatasheet.getRange("B15").getValue();
  var DatadACCNO = Bluebookdatasheet.getRange("B16").getValue();
  var Dataalert = ui.alert("\t Audit of Errors \n \t\t\t"+ "\r\n Missing Titles : " + DataTitles + "\r\n Missing Shelfmarks : " + DataShlfmrks + "\r\n Missing Accession numbers : " + DatadACCNO) 
 

}
 

