import React from 'react';
import Typography from '@material-ui/core/Typography';

import Plot from './Plot';

import alerts from '../data';

export default function SummaryByObject({ query }) {
  let title = query.object || 'Summary by Object';
  return (
    <Typography component="p" variant="h4">{title}</Typography>

  );
}
