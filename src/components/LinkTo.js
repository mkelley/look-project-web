import React from 'react';
import Link from '@material-ui/core/Link';
import moment from 'moment';

function LinkToObject({ object }) {
  let query = '?object=' + object;
  let hash = '#summary-by-object' + query;
  return (
    <Link href={hash}>{object}</Link>
  );
}

/* date may be string or moment */
function LinkToDate({ date, format }) {
  let m = moment(date);
  let query = '?date=' + m.format('YYYY-MM-DD');
  let hash = '#summary-by-date' + query;
  return (
    <Link href={hash}>{m.format(format || 'YYYY-MM-DD')}</Link>
  );
}
export { LinkToObject, LinkToDate };