const express = require("express");
const path = require("path");
const nodemailer = require("nodemailer");
const { request, response } = require("express");

const app = express();

// body parser middleware
app.use(express.json());
app.use(express.urlencoded( { extended: false } )); // this is to handle URL encoded data
// end parser middleware

// custom middleware to log data access
const log = (request, response, next) => {
	console.log(`${new Date()}: ${request.protocol}://${request.get('host')}${request.originalUrl}`);
	console.log(request.body); // make sure JSON middleware is loaded before this line
	next();
}
app.use(log);
// end custom middleware

// enable static files pointing to the folder "public"
// this can be used to serve the index.html file
app.use(express.static(path.join(__dirname, "public")));

// HTTP POST
app.post("/contact", (request, response) => {
    // create reusable transporter object using the default SMTP transport
      const transporter = nodemailer.createTransport({
          host: "smtp.gmail.com",
          port: 465,
          secure: true,
          auth: {
              user: "contact.zdelar@gmail.com", // contact@zdelar.com
              pass: "YRxsAFd3n3BebVX"
          }
      });
  
      const textBody = `FROM: ${request.body.name} EMAIL: ${request.body.email} MESSAGE: ${request.body.message}`;

      const htmlBody = `<p><b>Name</b>: ${request.body.name}</p>
                        <p><b>Email</b>: ${request.body.email}</p>
                        <p><b>Message</b>: ${request.body.message}</p>`;

      const mail = {
          from: "contact.zdelar@gmail.com",
          to: "bojan@zdelar.com",
          subject: "Mail from your portfolio website", 
          text: textBody,
          html: htmlBody
      };
  
      // send mail with defined transport object
      transporter.sendMail(mail, (err, info) => {
          if(err) {
              console.log(err);
              response.json({ message: "Message not sent: an error occured!"});
          }
          else {
              window.alert("Message sent!");
              response.json({ message: "Message sent" });
          }
      });
  })


// set port from environment variable, or 8000
const PORT = process.env.PORT || 8000;

app.listen(PORT, () => console.log(`listening on port ${PORT}`));