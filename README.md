# Email Service
An `Email Service` written in Node.js (Express.js) that abstracts multiple email service providers to avoid downtime and failures while sending emails.

Supports 2 email service providers by default:
1. Mailgun (https://www.mailgun.com/)
2. SendGrid (https://sendgrid.com/)


## # Add new service providers
1. Install package - `yarn add <package-name>`
2. Add credentials in config ([see - config.js](https://github.com/naderskhan/email-service/blob/master/src/config.js))
3. Create new file under `/src/services/` - make sure file name matches config, and it exports a `send()` function ([see - config.js](https://github.com/naderskhan/email-service/blob/master/src/services))

## # Run locally
1. Export credentials in terminal:
```
export MAILGUN_API_KEY=<mailgun-api-key>
export MAILGUN_DOMAIN=<mailgun-domain>
export SENDGRID_API_KEY=<sendgrid-api-key>
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
- Add a data storage to maintain a record of email statuses (a queue based approached can be used as well)
- Ranking of service providers to sort by ones with higher success rates
- A config for `maxAttempts` to trigger/retry with different service providers
- Specific validation errors instead of `Invalid email data` - such as: Invalid email structure, Missing subject,..
- Integration tests
- Separate configs for test, dev and prod environments
- A proper logger (like `Winston`) for added advantage - such as formatting, levels, stack trace,..
- Dockerizing, deployment pipeline (CICD) and hosting


