# Email Service
An `Email Service` written in Node.js (Express.js) that abstracts multiple email service providers to avoid downtime and failures while sending emails.

Supports 4 email providers by default:
1. [Mailgun](https://www.mailgun.com/)
2. [Mailjet](https://www.mailjet.com/)
3. [SendGrid](https://www.sendgrid.com/)
4. [SendInBlue](https://www.sendinblue.com/)

## # Add new email providers
1. Install package - `yarn add <provider-package>`
2. Add credentials in config ([see - config.js](https://github.com/naderskhan/email-service/blob/master/src/config.js))
3. Create a new file under `/src/services/` ([see - examples](https://github.com/naderskhan/email-service/blob/master/src/services)):
    - File name must match provider's name in config
    - File must export a `send()` function

## # Run service locally
1. Export credentials in terminal:
```
// mailgun
export MAILGUN_FROM=<sender-email>
export MAILGUN_API_KEY=<api-key>
export MAILGUN_DOMAIN=<domain>

// mailjet
export MAILJET_FROM=<sender-email>
export MAILJET_API_KEY_PUBLIC=<public-api-key>
export MAILJET_API_KEY_PRIVATE=<private-api-key>

// sendgrid
export SENDGRID_FROM=<sender-email>
export SENDGRID_API_KEY=<api-key>

// sendinblue
export SENDINBLUE_FROM=<sender-email>
export SENDINBLUE_API_KEY=<api-key>
```

2. Run app:
```
$ git clone https://github.com/naderskhan/email-service.git
$ cd email-service
$ yarn install
$ yarn start // or `yarn start:dev`(nodemon)
# Hit http://localhost:3030/
```

3. Send request:

*Replace `to`, `cc` and `bcc` with comma-separated emails*
```
curl --location --request POST 'http://localhost:3030/email' \
--header 'Content-Type: application/x-www-form-urlencoded' \
--data-urlencode 'to=test@test.com' \
--data-urlencode 'subject=Hello' \
--data-urlencode 'text=How is it going?' \
--data-urlencode 'cc=test1@test.com' \
--data-urlencode 'bcc=test2@test.com'
```

4. Email sent! 🚀


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
