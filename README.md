# Email Service
An `Email Service` written in Node.js (Express.js) that abstracts multiple email service providers to avoid downtime and failures while sending emails.

Supports 2 email providers by default:
1. [Mailgun](https://www.mailgun.com/)
2. [SendGrid](https://www.sendgrid.com/)

## # Add new email providers
1. Add credentials in config ([see - config.js](https://github.com/naderskhan/email-service/blob/master/config/development.js))
2. Create a new implementation file under `/src/services/` ([see - examples](https://github.com/naderskhan/email-service/blob/master/src/services)):
    - File name must match provider's name in config
    - File must export a `send()` function

*Note: [superagent](https://www.npmjs.com/package/superagent) request library is used for implementation instead of specific client libraries from email providers*

## # Run locally
1. Export credentials in terminal:
```
// mailgun
export MAILGUN_DOMAIN=<domain>
export MAILGUN_API_KEY=<api-key>
export MAILGUN_FROM=<sender-email>

// sendgrid
export SENDGRID_DOMAIN=<domain>
export SENDGRID_API_KEY=<api-key>
export SENDGRID_FROM=<sender-email>
```

2. Run app:
```
$ git clone https://github.com/naderskhan/email-service.git
$ cd email-service
$ yarn install
$ yarn start // or `yarn start:dev`(nodemon)
# Hit http://localhost:3000/
```

3. Send request:

*To send multiple emails - replace `to`, `cc` and `bcc` with comma-separated emails as necessary*
```
curl --location --request POST 'http://localhost:3000/email' \
--header 'Content-Type: application/x-www-form-urlencoded' \
--data-urlencode 'to=test@test.com' \
--data-urlencode 'subject=Hello' \
--data-urlencode 'text=How is it going?' \
--data-urlencode 'cc=test1@test.com' \
--data-urlencode 'bcc=test2@test.com'
```

4. Email sent! 🚀


## # Run with Docker
```
$ yarn build
$ docker build --tag=email-service .
$ docker run -p 80:3000 email-service
# Hit http://localhost/
```

## # Lint & Test
```
$ yarn lint
$ yarn test
```


## # TODO
- Add a data storage to maintain a record of email statuses (a queue based approach can be an option)
- Ranking of email providers to sort and attempt by ones with higher success rates
- A config for `maxAttempts` to trigger/retry with different email providers
- Specific validation errors instead of `Invalid email data` - such as: Invalid email structure, Missing subject,..
- Unit tests coverage and integration tests
- A proper logger (like `Winston`) for added advantage - such as formatting, levels, stack trace,..
- Deployment pipeline (CICD) and hosting
- Structure utils into a folder of related utility files
