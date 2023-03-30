import React from 'react';
import QuickActions from './QuickActions';
import { Grid } from '@mui/material';

export default function Home({ authorized, setAuthorized }) {
  return (
    <Grid container>
      <Grid item>
        <QuickActions />
      </Grid>
    </Grid>
  );
}
