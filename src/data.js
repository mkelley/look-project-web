import * as moment from 'moment';

// Standard Normal variate using Box-Muller transform.
function randn() {
  var u = 0, v = 0;
  while (u === 0) u = Math.random(); //Converting [0,1) to (0,1)
  while (v === 0) v = Math.random();
  return Math.sqrt(-2.0 * Math.log(u)) * Math.cos(2.0 * Math.PI * v);
}

// Generate fake alerts
function createAlert() {
  let magpsf = Math.random() * 6 + 14;
  let dm_outburst = randn() * 0.01 * (1 + (Math.random() > 0.9) * Math.abs(randn()) * 10);
  let unc = Math.random() * 0.05 + 0.02;
  let ostat = dm_outburst / unc;

  let magap = magpsf + (Math.random() * 0.25 - 0.1);
  let estat = (magap - magpsf) / Math.sqrt(2 * unc ** 2)

  return {
    object: Math.floor(Math.random() * 100000),
    fid: 2,  // Filter ID (1=g; 2=r; 3=i)
    magpsf,
    sigmapdf: unc,
    magap,
    sigmagap: unc,
    ostat,
    estat
  };
}

function filterInliers(alerts, sigma) {
  return alerts.filter(
    alert => (alert.estat >= sigma || alert.ostat >= sigma)
  );
}

let now = moment();
let today = now.format('YYYY-MM-DD');
let lastWeek = Array.from(Array(7), (x, i) => {
  return now.clone().subtract(6 - i, 'days').format('YYYY-MM-DD');
});
const lastWeekAlerts = new Map(
  Array.from(lastWeek, (d) => {
    let n = Math.floor(randn() * 100 + 1000) * (Math.random() > 0.1);
    return [d, Array.from(Array(n), createAlert)]
  })
);
const recentAlerts = lastWeekAlerts.get(today);

export { lastWeekAlerts, recentAlerts, filterInliers };