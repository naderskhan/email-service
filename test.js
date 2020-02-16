const mailjet = require ('node-mailjet')
.connect('b01a4bdb63900ef87f2fa289f1049b73', '8fe76c42d72e76c721c5935315b41b3d')
const request = mailjet
.post("send", {'version': 'v3.1'})
.request({
  "Messages":[
    {
      "From": {
        "Email": "info.codzer@gmail.com",
        "Name": "Nader"
      },
      "To": [
        {
          "Email": "naderskhan@yahoo.com",
          "Name": "Nader"
        }
      ],
      "Subject": "Greetings from Mailjet.",
      "TextPart": "My first Mailjet email",
      "HTMLPart": "<h3>Dear passenger 1, welcome to <a href='https://www.mailjet.com/'>Mailjet</a>!</h3><br />May the delivery force be with you!",
      "CustomID": "AppGettingStartedTest"
    }
  ]
})
request
  .then((result) => {
    console.log(result.body)
  })
  .catch((err) => {
    console.log(err.statusCode)
  })
