import { expect } from 'chai';
import { validateData } from '../src/utils';

describe('# validateData()', () => {
  it('should return false for missing data', () => {
    const result = validateData({
      to: 'test@test.com',
      subject: '',
      text: 'body',
    });
    expect(result).to.equal(false);
  });

  it('should return false for invalid email structure', () => {
    const result = validateData({
      to: 'i@am@test.com',
      subject: 'subject',
      text: 'body',
    });
    expect(result).to.equal(false);
  });

  it('should remove duplicate emails', () => {
    const result = validateData({
      to: 'a@test.com,b@test.com',
      subject: 'subject',
      text: 'body',
      cc: 'c@test.com,b@test.com',
      bcc: 'c@test.com',
    });
    expect(result).to.deep.equal({
      to: 'a@test.com,b@test.com',
      subject: 'subject',
      text: 'body',
      cc: 'c@test.com',
    });
  });
});
