/* Parse window location hash for expected format.  Site navigation uses
   fragment identifier with buried query string:
    #dashboard
    #summary-by-date?date=2020-05-09
    #summary-by-object?object=C/2017 D4
*/
export default function parseHash() {
  let allowedSearchParams = ['object', 'date', 'period'];
  let url = new URL(window.location.href);
  let hash = url.hash || '';
  let page, search, query;

  const i = hash.indexOf('?');
  if (i === -1) {
    page = hash;
    search = new URLSearchParams();  // empty query
  } else {
    page = hash.substring(0, i);
    search = new URLSearchParams(hash.substring(i));
  }

  query = new Map();
  for (let p of allowedSearchParams) {
    query[p] = search.get(p);
  }

  return { page, query };
}