## Getting Started

### 1. Clone the repository

### 2. Install dependencies

```bash
npm install
```

### 3. Run the server

```bash
npm start
```

The server will start on `http://localhost:5001`.

## API Endpoint

### GET `/whois`

Fetch Whois data for a given domain.

#### Query Parameters

- `domain`: The domain name to look up.
- `type`: The type of information to fetch (`domain` or `contact`).

#### Example Request

```bash
http://localhost:5001/whois?domain=amazon.com&type=domain
```

#### Example Response

```json
{
  "domain_name": "amazon.com",
  "registrar": "MarkMonitor Inc.",
  "registration_date": "1994-11-01T05:00:00Z",
  "expiration_date": "2029-11-01T04:00:00Z",
  "estimated_domain_age": "27 years",
  "hostnames": "ns1.p31.dynect.net, ns2.p31.dynect.net, ns3.p31.dynect.net, ..."
}
```
