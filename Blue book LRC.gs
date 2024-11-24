function makeAvailable()
{
  var ui = SpreadsheetApp.getUi();
  var sheet = SpreadsheetApp.getActive().getSheetByName("DATA");
  ui.showModalDialog(HtmlService.createHtmlOutputFromFile("Blue Book LRC HTML").setWidth(300).setHeight(300), "LMS");
}
function makeAvailable_main(r)
{
  var run = true;
  var prev = "";
  // while (run)
  // {
  var ui = SpreadsheetApp.getUi();
  var sheet = SpreadsheetApp.getActive().getSheetByName("DATA");
  row = binSearch(parseInt(r.replace("~", "")));
  if (row < 0)
  {
    SpreadsheetApp.getActive().toast("Book does not exist");
    SpreadsheetApp.getActive().getSheetByName("Nonexistent Books").appendRow([row * -1, new Date()])
    return "NOTFOUND";
        

    return;
    //return;
  }
  if (row == "ERROR")
  {
    run = false;
    //ui.alert("Invalid Entry");
    SpreadsheetApp.getActive().toast("Invalid Entry");
    return "INVALID"
    return;
  }
  if (row > 0)
  {
    var r = sheet.getRange(row, 1, row, 6)
    var txt = "'" + r.getCell(1, 2).getValue() + "'\nShelfmark: " + r.getCell(1,1).getValue().toString().replace("|", ",");
    if (r.getCell(1,1).getValue() == "")
    {
      txt += "Unknown Shelfmark";
    }
    r.getCell(1, 4).setValue("Available");
    prev = txt;
    SpreadsheetApp.getActive().toast(txt);
    return(txt)
  }

  
  try
  {
    //put code here when done
  }
  catch
  {
    ui.alert("Something Went Wrong")
  }
  // }
  





}
