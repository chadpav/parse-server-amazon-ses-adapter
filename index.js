var AmazonSES = require("node-ses");

module.exports = function (options) {

   var sesClient = AmazonSES.createClient({
      key: options.accessKeyId,
      secret: options.secretAccessKey,
      amazon: options.awsEndpoint,
   });

   var sendMail = function (mail) {

      return new Promise(function (resolve, reject) {

         sesClient.sendEmail({
            to: [mail.to],
            from: options.from,
            subject: mail.subject,
            message: mail.text
         }, function (err, data) {
            if (err) {
               reject(err);
            } else {
               resolve(data);
            }
         });
      });
   };

   return {
      sendMail: sendMail
   }
};
