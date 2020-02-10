const removeDuplicates = (fromArray, toRemove) => fromArray.filter((e) => !toRemove.includes(e));

const areEmailsValid = (emails) => {
  for (const email of emails.split(',')) {
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) { // test for _@_._
      return false;
    }
  }
  return true;
};

export const validateData = (data) => {
  const {
    to,
    subject,
    text,
    cc,
    bcc,
  } = data;

  if (!to
    || !subject
    || !text
    || !areEmailsValid(to)
    || (cc && !areEmailsValid(cc))
    || (bcc && !areEmailsValid(bcc))) {
    return false;
  }

  // remove duplicate emails so no email services fail
  const filteredTo = [...new Set(to.split(','))];
  const filteredCc = cc ? removeDuplicates(cc.split(','), filteredTo) : [];
  const filteredBcc = bcc ? removeDuplicates(bcc.split(','), [...filteredTo, ...filteredCc]) : [];

  return {
    to: filteredTo.toString(),
    subject,
    text,
    ...(filteredCc.length && { cc: filteredCc.toString() }),
    ...(filteredBcc.length && { bcc: filteredBcc.toString() }),
  };
};
