import React, { useState } from 'react';
import { fetchWhoisData } from './services/whoisService';
import { WhoisResult } from './models/whoisModel';
import {
  Container,
  TextField,
  Select,
  MenuItem,
  Button,
  Typography,
  Alert,
  Box,
  FormControl,
  Grid,
  CircularProgress,
} from '@mui/material';
import WhoisTable from './components/WhoisTable';

function App() {
  const [domain, setDomain] = useState<string>('');
  const [infoType, setInfoType] = useState<'domain' | 'contact'>('domain');
  const [result, setResult] = useState<WhoisResult | null>(null);
  const [error, setError] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);

  const handleLookup = async () => {
    setLoading(true);
    setError('');
    setResult(null);

    try {
      const data = await fetchWhoisData(domain, infoType);
      setResult(data);
      setError('');
    } catch (err) {
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError('An unexpected error occurred');
      }
      setResult(null);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        height="100vh"
        flexDirection="column"
      >
        <Container maxWidth="sm">
          <Typography variant="h4" component="h1" gutterBottom align="center">
            Whois Lookup
          </Typography>
          <Grid container spacing={2} alignItems="center">
            <Grid item xs={5}>
              <TextField
                label="Domain Name"
                variant="outlined"
                fullWidth
                value={domain}
                onChange={(e) => setDomain(e.target.value)}
              />
            </Grid>
            <Grid item xs={5}>
              <FormControl variant="outlined" fullWidth>
                <Select
                  value={infoType}
                  onChange={(e) => setInfoType(e.target.value as 'domain' | 'contact')}
                  displayEmpty
                >
                  <MenuItem value="" disabled>
                    Select Information Type
                  </MenuItem>
                  <MenuItem value="domain">Domain Information</MenuItem>
                  <MenuItem value="contact">Contact Information</MenuItem>
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={2}>
              <Button
                variant="contained"
                color="primary"
                fullWidth
                onClick={handleLookup}
                disabled={loading}
              >
                {loading ? <CircularProgress size={24} color="inherit" /> : 'Lookup'}
              </Button>
            </Grid>
          </Grid>
         
          {error && <Alert severity="error" style={{ marginTop: '16px' }}>{error}</Alert>}
        </Container>
        <WhoisTable result={result} />
      </Box>
    </>
  );
}

export default App;
