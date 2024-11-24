function renewBook()
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
  var about = "'" + r.getCell(1, 2).getValue() + "'\nShelfmark: " + r.getCell(1,1).getValue().toString().replace("|", ",")
  if (r.getCell(1, 4).getValue() != "Available")
  {
    var confirm = ui.alert("Is the book " + about + "?", ui.ButtonSet.YES_NO)
    if (confirm == "YES")
    {
      if (r.getCell(1, 6).getValue() == true)
      {
        ui.alert("Sorry, someone else is trying to Issue or is Returning this book. Please try again later.");
        return
      }
      var form = SpreadsheetApp.getActive().getSheetByName("Circulation Form");
      var correct = false;
      var index = 1;
      while (!correct)
      {
        var data = form.getRange(index, 1, index, 6)
        if (data.getCell(1, 2).getValue() == r.getCell(1, 5).getValue())
        {
          if (data.getCell(1, 6).getValue() == false)
          {
            var formRange = form.getRange(1,1,form.getLastRow(),form.getLastColumn());
            formRange.getCell(index, 5).setValue(Utilities.formatDate(new Date(Date.now() + (24 * 60 * 60 * 1000) * DAYS_TO_RENEW), "GMT", "dd/MM/yyyy"));
            ui.alert(data.getCell(1,1).getValue() + "'s book has been successfully renewed\nDue: " + Utilities.formatDate(new Date(Date.now() + (24 * 60 * 60 * 1000) * DAYS_TO_RENEW), "GMT", "dd/MM/yyyy"));
            break
          }
        }
        if (index >= form.getLastRow())
        {
          
          ui.alert("UNABLE TO FIND RECORD:\nPLEASE Issue  BOOK FIRST\nYou are seeing this because the data is incomplete");
          break;
        }
        index++;

      }

    }
    r.getCell(1, 6).setValue(false);
  }
  else
  {
    ui.alert("This book is not on loan")
  }

}
