import axios from 'axios';
import { WhoisResult } from '../models/whoisModel';

export const fetchWhoisData = async (domain: string, type: 'domain' | 'contact'): Promise<WhoisResult> => {
  try {
    const response = await axios.get<WhoisResult>(`http://localhost:5001/whois`, {
      params: { domain, type },
    });
    return response.data;
  } catch (error) {
    throw new Error('Failed to fetch data from Whois API');
  }
};
