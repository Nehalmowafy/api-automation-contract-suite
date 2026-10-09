const { test, expect } = require('@playwright/test');

test.describe('SOAP Web Service XML Envelope Suite', () => {
  const SOAP_ENDPOINT = 'https://www.dataaccess.com/webservicesserver/NumberConversion.wso';

  test('TC-SOAP-01: NumberToWords parses XML envelope and returns word representation', async ({ request }) => {
    // Construct valid SOAP 1.2 XML request envelope
    const soapEnvelope = `<?xml version="1.0" encoding="utf-8"?>
<soap12:Envelope xmlns:soap12="http://www.w3.org/2003/05/soap-envelope">
  <soap12:Body>
    <NumberToWords xmlns="http://www.dataaccess.com/webservicesserver/">
      <ubiNum>500</ubiNum>
    </NumberToWords>
  </soap12:Body>
</soap12:Envelope>`;

    const response = await request.post(SOAP_ENDPOINT, {
      headers: {
        'Content-Type': 'application/soap+xml; charset=utf-8',
      },
      data: soapEnvelope,
    });

    // Assert transport status
    expect(response.status()).toBe(200);

    // Assert XML response content
    const responseXml = await response.text();
    expect(responseXml).toContain('<m:NumberToWordsResult>five hundred </m:NumberToWordsResult>');
  });

  test('TC-SOAP-02: NumberToDollars parses fractional currency conversion XML envelope', async ({ request }) => {
    const soapEnvelope = `<?xml version="1.0" encoding="utf-8"?>
<soap12:Envelope xmlns:soap12="http://www.w3.org/2003/05/soap-envelope">
  <soap12:Body>
    <NumberToDollars xmlns="http://www.dataaccess.com/webservicesserver/">
      <dNum>125.75</dNum>
    </NumberToDollars>
  </soap12:Body>
</soap12:Envelope>`;

    const response = await request.post(SOAP_ENDPOINT, {
      headers: {
        'Content-Type': 'application/soap+xml; charset=utf-8',
      },
      data: soapEnvelope,
    });

    expect(response.status()).toBe(200);
    const responseXml = await response.text();
    expect(responseXml).toContain('one hundred and twenty five dollars and seventy five cents');
  });
});