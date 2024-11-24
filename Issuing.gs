function loanBook()
{
  var ui = SpreadsheetApp.getUi();
  var sheet = SpreadsheetApp.getActive().getSheetByName("DATA");
  var row = binSearch()
  if (row == "ERROR")
  {
    ui.alert("Invalid Entry");
    return;
  }
  var r = sheet.getRange(row, 1, row, 6)
  var about = "'" + r.getCell(1, 2).getValue() + "' \nShelfmark: " + r.getCell(1,1).getValue().toString().replace("|", ",")
  if (r.getCell(1, 4).getValue() != "Issued")
  {
    var txt = "";
    if (r.getCell(1, 3).getValue() == "Staff Library")
    {
      txt = "This book is from the staff library.";
    }
    else if (r.getCell(1, 3).getValue() == "6th Form Library")
    {
      txt = "This book is from the 6th Form Library.";

    }
    else if (r.getCell(1, 3).getValue() == "Reserve Stock")
    {
      txt = "This book is from reserve stock.";

    }    
    var confirm = ui.alert("Is the book " + about + "?\n" + txt, ui.ButtonSet.YES_NO)
    if (confirm == "YES")
    {
      if (r.getCell(1, 6).getValue() == true)
      {
        ui.alert("Sorry, someone else is trying to Issue or is returning this book. Please try again later.");
        return
      }
      r.getCell(1, 6).setValue(true);
      r.getCell(1, 4).setValue("Issued");
      var name = ui.prompt("Please enter name of the person who is taking out this book").getResponseText();
      var form = SpreadsheetApp.getActive().getSheetByName("Circulation Form");
      form.appendRow([
      name,
      r.getCell(1, 5).getValue(),
      r.getCell(1, 2).getValue(),
      
      Utilities.formatDate(new Date(Date.now()), "GMT", "dd/MM/yyyy"),
      Utilities.formatDate(new Date(Date.now() + (24 * 60 * 60 * 1000) * DAYS_TO_LOAN), "GMT", "dd/MM/yyyy"),
      false,
      "",
      "=E:E - TODAY()"
      ]);
      var range = form.getRange(1, 1, form.getLastRow(), 6);
      Logger.log(new Date(Date.now()));
      ui.alert("Loaned " + about + " to " + name + "\nDue: " + Utilities.formatDate(new Date(Date.now() + (24 * 60 * 60 * 1000) * DAYS_TO_LOAN), "GMT", "dd/MM/yyyy") + "");

    }
    r.getCell(1, 6).setValue(false);
    
    
  }
  else
  {
    ui.alert("This book is not available: it's status is '" + r.getCell(1,4).getValue() + "'.")
  }

}
