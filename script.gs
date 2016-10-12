var TO_EMAIL_ID = 'xxxxxx@gmail.com';
var TEST_MODE = 0; // please change to 1 for testing
var TEST_EMAIL = 'xxxxxx@gmail.com';

function responseToUser(e) {  

  try{
  
  var range = e.range; 
  var sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
  if(range && sheet) {
   
        Logger.log(range.getRow());
        
        var header = sheet.getRange(1, 2, 1, sheet.getLastColumn()).getValues()[0];
        var values = sheet.getRange(range.getRow() ,2 ,1 , sheet.getLastColumn()).getValues()[0]; 
        Logger.log(values)
        
        var to_email = TO_EMAIL_ID;
        if(TEST_MODE==1) {
           to_email = TEST_EMAIL;
        }
        var mail_body = 'B"H'+"<br/>"+'Hi .'+"<br/>"+'Here is a job request.'+"<br/><br/>";
        var subject = 'Job #'+  Utilities.formatString('%d', range.getRow());
        values[1] = Utilities.formatDate(values[1],  SpreadsheetApp.getActiveSpreadsheet().getSpreadsheetTimeZone(), "h:mm a");
        values[2] = Utilities.formatDate(values[2],  SpreadsheetApp.getActiveSpreadsheet().getSpreadsheetTimeZone(), "h:mm a");
        for(var i=0;i<header.length;i++) {
          Logger.log(header[i] + ':'+values[i]);
          if(header[i]!='') {
           mail_body += '<b>'+header[i] + '</b> '+values[i]+"<br/>";
          }
        }
        mail_body+="<br/>"+"If you are interested, please contact the parent and reply HERE informing everyone that the job is taken."+"<br/><br/>";
        mail_body+="Thank you,"+"<br/>";
     
       // MailApp.sendEmail(to_email, subject, mail_body);
        MailApp.sendEmail({   to: to_email,  subject: subject, htmlBody: mail_body })
        
      }
  }
  catch(err) {
    var body = 'Parameters:'+e+"\n";
    body = 'Error:'+err+"\n"; 
    body = 'Log:'+Logger.getLog()+"\n"; 
	MailApp.sendEmail(TEST_EMAIL, 'Response Failure!', body)
  }
}
