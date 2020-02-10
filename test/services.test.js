import { expect } from 'chai';
import sinon from 'sinon';
import { sendEmail } from '../src/services';
import * as mailgun from '../src/services/mailgun';
import * as sendgrid from '../src/services/sendgrid';

const req = {
  body: {
    to: 'test1@test.com,test2@test.com',
    subject: 'subject',
    text: 'body',
    cc: 'a@test.com,b@test.com',
    bcc: 'c@test.com,d@test.com',
  },
};

describe('# sendEmail()', () => {
  let res;
  beforeEach(() => {
    res = {
      responseStatus: null,
      send: function () {},
      status: function (responseStatus) {
        this.responseStatus = responseStatus;
        return this;
      },
    };
  });

  afterEach(() => {
    mailgun.send.restore();
    sendgrid.send.restore();
  });

  it('should send email in first attempt', async () => {
    const stubMailgun = sinon.stub(mailgun, 'send').returns({ message: 'success' });
    const stubSendgrid = sinon.stub(sendgrid, 'send').returns({ message: 'success' });

    await sendEmail(req, res);
    expect(stubMailgun.calledOnce).to.equal(true);
    expect(stubSendgrid.calledOnce).to.equal(false);
    expect(res.responseStatus).to.equal(200);
  });

  it('should send email in second attempt when first service is down', async () => {
    const stubMailgun = sinon.stub(mailgun, 'send').throws(new Error('failed'));
    const stubSendgrid = sinon.stub(sendgrid, 'send').returns({ message: 'success' });

    await sendEmail(req, res);
    expect(stubMailgun.calledOnce).to.equal(true);
    expect(stubSendgrid.calledOnce).to.equal(true);
    expect(res.responseStatus).to.equal(200);
  });

  it('should fail to send email when both services are down', async () => {
    const stubMailgun = sinon.stub(mailgun, 'send').throws(new Error('failed'));
    const stubSendgrid = sinon.stub(sendgrid, 'send').throws(new Error('failed'));

    await sendEmail(req, res);
    expect(stubMailgun.calledOnce).to.equal(true);
    expect(stubSendgrid.calledOnce).to.equal(true);
    expect(res.responseStatus).to.equal(500);
  });

  it('should throw 400 for missing data', async () => {
    const stubMailgun = sinon.stub(mailgun, 'send').returns({ message: 'success' });
    const stubSendgrid = sinon.stub(sendgrid, 'send').returns({ message: 'success' });

    await sendEmail({
      body: {
        to: 'test@test.com',
        subject: '',
        text: '',
      },
    }, res);
    expect(stubMailgun.calledOnce).to.equal(false);
    expect(stubSendgrid.calledOnce).to.equal(false);
    expect(res.responseStatus).to.equal(400);
  });

  it('should throw 400 for invalid email structure', async () => {
    const stubMailgun = sinon.stub(mailgun, 'send').returns({ message: 'success' });
    const stubSendgrid = sinon.stub(sendgrid, 'send').returns({ message: 'success' });

    await sendEmail({
      body: {
        to: 'i@am@test.com',
        subject: 'subject',
        text: 'body',
      },
    }, res);
    expect(stubMailgun.calledOnce).to.equal(false);
    expect(stubSendgrid.calledOnce).to.equal(false);
    expect(res.responseStatus).to.equal(400);
  });
});
