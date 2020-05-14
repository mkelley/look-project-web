import * as moment from 'moment';

const halfMonths = 'ABCDEFGHJKLMNOPQRSTUVWXY';

// Standard Normal variate using Box-Muller transform.
function randn() {
  var u = 0, v = 0;
  while (u === 0) u = Math.random(); //Converting [0,1) to (0,1)
  while (v === 0) v = Math.random();
  return Math.sqrt(-2.0 * Math.log(u)) * Math.cos(2.0 * Math.PI * v);
}

function randomInt(max) {
  return Math.floor(Math.random() * (max + 1));
}

function fakeGeometry(rh0, dt) {
  const selong = 90; //Math.random() * 130 + 50;
  //const rh = Math.random() * 6.9 + 1.1;
  const rh = rh0 * (dt * 0.03 + 1);

  const a = 1;
  const b = -2 * Math.cos(selong * Math.PI / 180);
  const c = 1 - rh ** 2;
  const x = b / (2 * a);
  const y = Math.sqrt(x ** 2 - c / a);
  const delta = Math.max(x + y, x - y);

  const phase = Math.acos((rh ** 2 + delta ** 2 - 1) / (2 * rh * delta)) * 180 / Math.PI;

  return { rh, delta, phase, selong };
}

// Generate fake alerts
function createAlert(designation) {
  const rh0 = designation / 100000 * 4 + 1.3;
  const dt = Math.random() * 30;  // days
  const date = moment().subtract(dt * 24 * 60, 'minute');
  const { rh, delta, phase, selong } = fakeGeometry(rh0, dt);

  const mpsf = Math.random() * 6 + 14;
  const dm_outburst = randn() * 0.01 * (1 + (Math.random() > 0.9) * Math.abs(randn()) * 10);
  const unc = Math.random() * 0.05 + 0.02;
  const ostat = dm_outburst / unc;

  // ZTF alert stream magap = 7 pix radius, magapbig = 9 pix radius
  const magap = mpsf + (Math.random() * 0.25 - 0.1);
  const magapbig = magap + (Math.random() * 0.25 - 0.1);
  const estat = (magap - mpsf) / Math.sqrt(2 * unc ** 2)
  const fid = randomInt(2) + 1;  // Filter ID (1=g; 2=r; 3=i)

  return {
    designation,
    source: 'ZTF Alert',
    date,
    rh,
    delta,
    phase,
    fid,
    filter: ['g', 'r', 'i'][fid - 1],
    mpsf,
    merrpsf: unc,
    m7: magap,
    m9: magapbig,
    merr7: unc,
    merr9: unc,
    ostat,
    estat
  };
}

function randomComet() {
  return ('C/' + (2015 + randomInt(6)) + ' '
    + halfMonths.charAt(randomInt(24))
    + randomInt(5));
}

function estimateError(m) {
  let m5 = 20.5;  // 5 sigma detection limit
  let m1 = m5 + Math.log10(5);
  return Math.max(1.0857 * 10 ** (-0.4 * (m1 - m)), 0.02);
}

// Generate fake photometry
function createPhotometry(designation, M, rh0) {
  const dt = Math.random() * 30;  // days
  const date = moment().subtract(dt * 24 * 60, 'minute');

  const { rh, delta, phase, selong } = fakeGeometry(rh0, dt);

  const filter = 'gri'.charAt(randomInt(2));
  const rap = [3, 7, 9, 15, 10000, 20000];
  const m0 = M + 5 * Math.log10(rh ** 2 * delta) + 2;
  const m = Array.from(Array(rap.length), (x, i) => {
    let rap_arcsec = rap[i] > 1000 ? (rap[i] / 725 / delta) : rap[i];
    return (m0 + 2.5 * Math.log10(rap[0] / rap_arcsec) + randn() * 0.1);
  });
  const merr = m.map(x => estimateError(x));

  let testAp = 1;  // index of aperture for outburst testing
  let merrPredict = merr[testAp];
  let mPredict = m[testAp] + randn() * merrPredict;
  if (Math.random() < 0.1) {  // chance of outburst
    let fOutburst = 10 ** (-0.4 * (m[testAp] + Math.random() * 3));
    for (let i = 0; i <= testAp; i++) {
      m[i] = -2.5 * Math.log10(10 ** (-0.4 * m[i]) + fOutburst);
      merr[i] = estimateError(m[i]);
    }
  }

  const estat = (m[0] - m[1]) / Math.sqrt(merr[0] ** 2 + merr[1] ** 2);
  const ostat = (mPredict - m[testAp]) / Math.sqrt(merr[testAp] ** 2 + merrPredict ** 2);

  return {
    designation,
    source: 'LCO',
    date,
    rh,
    delta,
    phase,
    filter,
    m3: m[0],
    m7: m[1],
    m9: m[2],
    m15: m[3],
    m10000: m[4],
    m20000: m[5],
    merr3: merr[0],
    merr7: merr[1],
    merr9: merr[2],
    merr15: merr[3],
    merr10000: merr[4],
    merr20000: merr[5],
    estat,
    ostat
  };
}

function filterInliers(observations, sigma, parameters) {
  return observations.filter(
    obs => parameters.map(parameter => obs[parameter] > sigma).reduce(
      (current, accumlated) => current || accumlated
    )
  );
}

let now = moment();
let lastMonth = Array.from(Array(30), (x, i) => {
  return now.clone().subtract(29 - i, 'days').format('YYYY-MM-DD');
});
let lastWeek = lastMonth.slice(-7);
let lastNight = lastMonth[lastMonth.length - 1];

const alertsByNight = new Map(
  Array.from(lastMonth, (d) => {
    let n = (randomInt(100) + 1000) * (Math.random() > 0.1);
    return [d, Array.from(Array(n), (x, i) => createAlert(i + 1))];
  })
);

const comets = [
  ["C/2018 S2", 10, 5],
  ["C/2020 M3", 9, 8],
  ["C/2017 A3", 7, 4],
  ["C/2015 D4", 12, 1.4],
  ["C/2017 S4", 7, 6],
  ["C/2015 E5", 5, 5.5],
  ["C/2020 J2", 12, 2.2],
  ["C/2020 O5", 9, 2.6],
  ["C/2019 C4", 7, 6.6],
  ["C/2019 E1", 7, 4.3],
  ["C/2019 L3", 11, 3.9],
  ["C/2016 P4", 7, 3]
];
const phot = Array.from(Array(comets.length * 10), () =>
  createPhotometry(...comets[randomInt(comets.length - 1)])
);

const targets = Array(... new Set(
  Array.prototype.concat(phot, ...alertsByNight.values()).map(
    row => String(row.designation)
  )
));

const recentDate = moment().subtract(3, 'day');
const recentPhot = phot.filter(obs => (obs.date > recentDate));
export { targets, alertsByNight, lastMonth, lastWeek, lastNight, filterInliers, phot, recentPhot };