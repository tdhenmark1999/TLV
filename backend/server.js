const express = require('express');
const axios = require('axios');
const cors = require('cors');

const app = express();
const port = 5001;

app.use(cors());

app.get('/whois', async (req, res) => {
  const { domain, type } = req.query;
  const apiKey = 'at_XdMPhhjErf44YWXVLNfuDe1w4upbr';
  const url = `https://www.whoisxmlapi.com/whoisserver/WhoisService?apiKey=${apiKey}&domainName=${domain}&outputFormat=JSON`;

  try {
    const response = await axios.get(url);
    const data = response.data.WhoisRecord;

    let result;

    if (type === 'domain') {
      result = {
        domain_name: data.domainName,
        registrar: data.registrarName,
        registration_date: data.createdDate,
        expiration_date: data.expiresDate,
        estimated_domain_age: data.estimatedDomainAge,
        hostnames: data.nameServers.hostNames.join(', ').substring(0, 25) + (data.nameServers.hostNames.join(', ').length > 25 ? '...' : '')
      };
    } else if (type === 'contact') {
      result = {
        registrant_name: data.registrant.name,
        technical_contact_name: data.technicalContact.name,
        administrative_contact_name: data.administrativeContact.name,
        contact_email: data.contactEmail
      };
    } else {
      result = { error: 'Invalid type requested' };
    }

    res.json(result);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch data from Whois API' });
  }
});

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
