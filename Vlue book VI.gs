function makeAvailableVI()
{
  var ui = SpreadsheetApp.getUi();
  var sheet = SpreadsheetApp.getActive().getSheetByName("DATA");
  ui.showModalDialog(HtmlService.createHtmlOutputFromFile("Blue Book VI HTML").setWidth(300).setHeight(300), "LMS");
}
function makeAvailable_mainVI(r)
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
    var rVI = sheet.getRange(row, 1, row, 6)
    var txt = "'" + rVI.getCell(1, 2).getValue() + "'\nShelfmark: " + rVI.getCell(1,1).getValue().toString().replace("|", ",") ;
    if (rVI.getCell(1,1).getValue() == "")
    {
      txt += "Unknown Shelfmark";
    }
    rVI.getCell(1, 3).setValue("VI LRC");
    rVI.getCell(1, 4).setValue("Available");

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



function doGet(eVI)
{
  //JSON.stringify(eVI.parameter.item)
  var htmlOriginal =  HtmlService.createTemplateFromFile("index");
  
  var html = htmlOriginal.evaluate()
  //return HtmlService.createHtmlOutput(JSON.stringify(eVI.parameter.page))
  if (JSON.stringify(eVI.parameter.page) == "\"1\"" && false)
  {
    htmlOriginal =  HtmlService.createTemplateFromFile("book");
    htmlOriginal.bookdat = binSearch( parseInt(eVI.parameter.page))
    html = htmlOriginal.evaluate()

    return HtmlService.createHtmlOutput(html);
  }
  return html.setSandboxMode(HtmlService.SandboxMode.IFRAME);
}
function makeAvailable_trigger(eVI)
{
  return makeAvailable_main(eVI);

}
