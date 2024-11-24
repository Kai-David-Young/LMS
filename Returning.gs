function returnBook()
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
  if (r.getCell(1, 4).getValue().toString().toLowerCase() != "available")
  {
    var confirm = ui.alert("Is the book " + about + "?", ui.ButtonSet.YES_NO)
    if (confirm == "YES")
    {
      if (r.getCell(1, 6).getValue() == true)
      {
        ui.alert("Sorry, someone else is trying to Issue or is Returning this book. Please try again later.");
        return
      }
      r.getCell(1, 6).setValue(true);
      r.getCell(1, 4).setValue("Available");
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
            formRange.getCell(index, 6).setValue(true);
            var returns = SpreadsheetApp.getActive().getSheetByName("Returns");
            var x = form.getRange(index, 1, 1, 6);
            var name = data.getCell(1,1).getValue();
            
            returns.appendRow(x.getValues()[0]);
            form.deleteRow(index);
            ui.alert(name + "'s book has been successfully returned");
            break
          }
        }
        if (index >= form.getLastRow())
        {
          
          ui.alert("Book hasn't been issued, but has now been returned");
          var returns = SpreadsheetApp.getActive().getSheetByName("Returns");
          returns.appendRow([
            ui.prompt("Enter name: ").getResponseText(),
            r.getCell(1, 5).getValue(),
            r.getCell(1, 2).getValue(),
            
            "UNKNOWN",
            "UNKNOWN",
            true,
            "Was not issued with this system",
          ])
          break;
        }
        index++;

      }
      var range = form.getRange(1, 1, form.getLastRow(), 6);
      Logger.log(new Date(Date.now()));

    }
    r.getCell(1, 6).setValue(false);
  }
  else
  {
    ui.alert("This book is not issued!")
  }
}
