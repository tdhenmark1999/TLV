import React from 'react';
import { WhoisResult } from '../models/whoisModel';
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Typography,
  Box,
} from '@mui/material';

interface WhoisTableProps {
  result: WhoisResult | null;
}

const WhoisTable: React.FC<WhoisTableProps> = ({ result }) => {
  if (!result) return null;

  return (
    <Box display="flex" justifyContent="center" alignItems="center" marginTop="16px">
      <TableContainer component={Paper} style={{ maxWidth: '100%' }}>
        <Table>
          <TableHead>
            <TableRow sx={{ backgroundColor: '#333', color: 'white' }}>
              {Object.keys(result).map((key) => (
                <TableCell key={key} sx={{ color: 'white' }}>
                  {key.replace('_', ' ').toUpperCase()}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            <TableRow>
              {Object.values(result).map((value, index) => (
                <TableCell key={index}>{value}</TableCell>
              ))}
            </TableRow>
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
};

export default WhoisTable;
