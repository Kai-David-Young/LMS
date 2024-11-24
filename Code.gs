/**
* @OnlyCurrentDoc
*/

//settings
const DAYS_TO_LOAN = 21;
const DAYS_TO_RENEW = 21;
const SL_USERNAME = "";
const SL_PASSWORD = "";
const SPREADSHEET_ID = ""
//Code

function doGet(e)
{
  //JSON.stringify(e.parameter.item)
  var htmlOriginal =  HtmlService.createTemplateFromFile("index");
  
  var html = htmlOriginal.evaluate()
  //return HtmlService.createHtmlOutput(JSON.stringify(e.parameter.page))
  if (JSON.stringify(e.parameter.page) == "\"1\"" && false)
  {
    htmlOriginal =  HtmlService.createTemplateFromFile("book");
    htmlOriginal.bookdat = binSearch( parseInt(e.parameter.page))
    html = htmlOriginal.evaluate()

    return HtmlService.createHtmlOutput(html);
  }
  return html.setSandboxMode(HtmlService.SandboxMode.IFRAME);
}
function makeAvailable_trigger(e)
{
  return makeAvailable_main(e);

}
function makeAvailable_triggerVI(e)
{
  return makeAvailable_mainVI(e);

}

function VerifyUser()
{
  var ui = SpreadsheetApp.getUi();
  ui.createMenu("Library")
    .addItem("Login", "loginone")
    .addToUi()
  var LoginRequest = SpreadsheetApp.getUi().alert("Welcome to LMS on Google Sheets | Press Ok to Login or Cancel to Cancel login request.", SpreadsheetApp.getUi().ButtonSet.OK_CANCEL);
  if(LoginRequest === SpreadsheetApp.getUi().Button.OK) {
    loginone()
    SpreadsheetApp.getActive().toast("Preparing to login");
  } else {
    SpreadsheetApp.getActive().toast("Login Cancelled | Access limited to Searching by barcode only until User Logs in");
  }

}


function loginone()
{

  var ui = SpreadsheetApp.getUi();
  var user = Session.getActiveUser()
  Logger.log(user)
  if (user == "d.mullett@parmiters.herts.sch.uk")
  {
    Logger.log("Authorised: D Mullet")
    ui.alert("Authorized D Mullet");
    //SpreadsheetApp.getUi().alert("You have permission to use this.")
    setup()
  }
  else if (user == "m.faisal@parmiters.herts.sch.uk")
  {
    Logger.log("Authorised: M Faisal")
    ui.alert("Authorized M Faisal");
    //SpreadsheetApp.getUi().alert("You have permission to use this.")
    setup()
  }
  else if (user == "15lim@parmiters.herts.sch.uk")
  {
    Logger.log("Authorised: Hannah Lim")
    ui.alert("Authorized Hannah Lim");
    //SpreadsheetApp.getUi().alert("You have permission to use this.")
    setup()
  }

  else if (user == "18young@parmiters.herts.sch.uk")
  {
    Logger.log("Authorised: Kai Young")
    ui.alert("Authorized Kai Young");
    //SpreadsheetApp.getUi().alert("You have permission to use this.")
    setup()
  }
  else if (user == "19taylor@parmiters.herts.sch.uk")
  {
    Logger.log("Authorised: William Taylor")
    ui.alert("Authorized William Taylor");
    //SpreadsheetApp.getUi().alert("You have permission to use this.")
    setup()
  }
  else if (user == "19yarasani@parmiters.herts.sch.uk")
  {
    Logger.log("Authorised: Samuel Yarasani")
    ui.alert("Authorized Samuel Yarasani");
    //SpreadsheetApp.getUi().alert("You have permission to use this.")
    setup()
  }
  else
  {
    var SLUSR = ui.prompt("Enter Student Librarian Username").getResponseText()
    var SLPSSWD = ui.prompt("Enter Student Librarian Password").getResponseText()
    if (SLUSR == SL_USERNAME & SLPSSWD == SL_PASSWORD )
    {
      ui.alert("Authorized Student Librarian");
      setup()
    }
    else
    {
      ui.alert("Incorrect Username / Password");
    }

  }
}



function setup()
{
  var ui = SpreadsheetApp.getUi();
  ui.createMenu("Library")
  .addItem("Logout", "VerifyUser")
  .addSubMenu(ui.createMenu("Circulation Menu")
    .addItem("Issue", "loanBook")
    .addItem("Return book", "returnBook")
    .addItem("Renew book", "renewBook")
    .addItem("LRC BlueBook", "makeAvailable")
    //.addItem("LRC BlueBook (fast)", "makeAvailable2")
    .addItem("VI  BlueBook", "makeAvailableVI")

  )
  .addSubMenu(ui.createMenu("Report Menu")
    .addItem("Completed Scan Total", "Bluebookdata")
    .addItem("Data Issues", "Dataissues")
    //.addItem("Scan in books (VI form)", "makeAvailableVI")
  )
  // .addSubMenu(ui.createMenu("Report Menu")
  //   .addItem("Search by barcode", "searchB")
  //   .addItem("Print Overview Report", "TReport")
  //   .addItem("Print Loans & Overdues Report", "TLoansOverdues")
  //   .addItem("Print Status Summary Report", "TDatabase")
  // )
  .addSubMenu(ui.createMenu("Search")
    .addItem("Search by barcode", "searchB")
  )
  .addToUi()

}



function binSearch(id= null, txt="")
{
 
  
  
  var sheet;
  hasID = false;
  if (id == null)
  {
    sheet = SpreadsheetApp.getActive().getSheetByName("DATA");
    var ui = SpreadsheetApp.getUi();
    // ui.showDialog(HtmlService.createHtmlOutput("TEST"))
    // Utilities.sleep(1000)
    var id = ui.prompt(txt + "\nEnter Barcode Number\nIt may take a few moments to find your book").getResponseText().replace("~", "")
  }
  else
  {
    hasID = true;
    sheet = SpreadsheetApp.getActive().getSheetByName("DATA");
    
    
  }
  var r = sheet.getRange("E:E")
  var match = false
  var currentMin = 1
  var currentMax = r.getNumRows()
  var row = -1;
  if (isNaN(parseInt(id)))
  {
    return "ERROR";
  }
  
  while (!match)
  {
    
    var c = r.getCell(((currentMin + currentMax) / 2), 1); //WHO AT GOOGLE DECIDED TO USE (Y, X)?!?
    Logger.log(c.getValue() + "_" + currentMax + "_" + currentMin + "-" + parseInt(id))
    if (parseInt(c.getValue()) == parseInt(id))
    {
      row = c.getRow();
      match = true;
      break;
    }

    if (parseInt(id) > parseInt(c.getValue()))
    {
      currentMin = parseInt(c.getRow())
      
    }
    else if (parseInt(id) < parseInt(c.getValue()))
    {
      currentMax = parseInt(c.getRow())
    }

    if (currentMin == currentMax)
    {
      Logger.log("COULDN'T FIND VALUE")
      break
      
    }
    else if (currentMin + 1 == currentMax)
    {
      Logger.log("COULDN'T FIND VALUE")
      break
    }
  }
  if (row == -1 && hasID)
  {
    row = id * -1
  }
  return row;
}
function searchB()
{

  var ui = SpreadsheetApp.getUi();
  var sheet = SpreadsheetApp.getActive().getSheetByName("DATA");
  row = binSearch();
  if (row == -1)
  {
    ui.alert("Book not found");
    return;
  }
  if (row == "ERROR")
  {
    ui.alert("Invalid Entry");
    return;
  }
  if (row != -1)
  {
    var r = sheet.getRange(row, 1, row, 6)
    var txt = "'" + r.getCell(1, 2).getValue() + "'\nShelfmark: " + r.getCell(1,1).getValue().toString().replace("|", ",")
    if (r.getCell(1,1).getValue() == "")
    {
      txt += "Unknown Author";
    }
    if (r.getCell(1, 4).getValue() == "Issued")
    {
      txt += "\nThis book is on loan"
    }
    else if (r.getCell(1, 4).getValue() == "System Unknown")
    {
      txt += "\nThis book's status is UNKNOWN"
    }
    else if (r.getCell(1, 4).getValue() == "Available")
    {
      txt += "\nThis book can be loaned (Available)"
    }
    txt += "\nThis book is in " + r.getCell(1,3).getValue();
    txt += "\nThis book's accession number is " + r.getCell(1, 5).getValue();
    ui.alert(txt);
  }

  
  try
  {
    //put code here when done
  }
  catch
  {
    ui.alert("Something Went Wrong")
  }




}







function TReport() // Total Report
{


  //grab Summarry sheet and put whole Sheet into a Pop up message
}

function TDatabase() // Total number of books + how many are available + how many unknown
{
  //grab Summarry sheet and put Books section into a Pop up message
}

function TLoansOverdues() // Total plus seperate of Loans and Overdues 
{
  //grab Summarry sheet and put Loans and Overdues into a Pop up message
} 

