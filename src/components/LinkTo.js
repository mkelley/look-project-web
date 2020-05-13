import React from 'react';
import Link from '@material-ui/core/Link';
import moment from 'moment';

function LinkToTarget({ designation }) {
  let query = '?designation=' + designation;
  let hash = '#targets' + query;
  return (
    <Link href={hash}>{designation}</Link>
  );
}

/* date may be string or moment */
function LinkToNight({ date, format }) {
  let m = moment(date);
  let query = '?date=' + m.format('YYYY-MM-DD');
  let hash = '#nights' + query;
  return (
    <Link href={hash}>{m.format(format || 'YYYY-MM-DD')}</Link>
  );
}
export { LinkToTarget, LinkToNight };