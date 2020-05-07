import React from 'react';
import { useTheme } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import Typography from '@material-ui/core/Typography';
import Plot from 'react-plotly.js';

// New Tableau 10 colors:
// blue: 4e79a7
// green: 59a14f
// brown: 9c755f
// orange: f28e2b
// yellow: edc948
// gray: bab0ac
// red: e15759
// purple: b07aa1
// cyan?: 76b7b2
// pink: ff9da7

// Standard Normal variate using Box-Muller transform.
function randn() {
  var u = 0, v = 0;
  while (u === 0) u = Math.random(); //Converting [0,1) to (0,1)
  while (v === 0) v = Math.random();
  return Math.sqrt(-2.0 * Math.log(u)) * Math.cos(2.0 * Math.PI * v);
}

// Generate fake data
function createAlert() {
  let magpsf = Math.random() * 6 + 14;
  let dm_outburst = randn() * 0.01 * (1 + (Math.random() > 0.9) * Math.abs(randn()) * 10);
  let unc = Math.random() * 0.05 + 0.02;
  let ostat = dm_outburst / unc;

  let magap = magpsf + (Math.random() * 0.25 - 0.1);

  return {
    object: Math.floor(Math.random() * 100000),
    fid: 2,  // Filter ID (1=g; 2=r; 3=i)
    magpsf,
    sigmapdf: unc,
    magap,
    sigmagap: unc,
    ostat: dm_outburst / unc,
    estat: (magap - magpsf) / Math.sqrt(2 * unc ** 2)
  };
}

const data = Array.from(Array(45), createAlert);

export default function RecentAlerts() {
  const theme = useTheme();

  return (
    <React.Fragment>
      {console.log(data)}
      <Typography component="h2" variant="h6" color="primary" gutterBottom>
        Recent Alerts
      </Typography>
      <Container>
        <Plot
          data={[{
            x: data.map(row => row.ostat),
            y: data.map(row => row.estat),
            mode: 'markers',
            type: 'scatter',
            marker: {
              color: '#edc948'
            },
            hovertext: data.map(row => row.object),
            hoverinfo: "text"
          }]}
          layout={{
            xaxis: {
              title: "outburst statistic"
            },
            yaxis: {
              title: "extendedness statistic"
            },
            autosize: true,
            automargin: true,
            margin: { t: 20 },
            height: 325,
          }}
          useResizeHandler
          style={{ width: '100%', height: '100%' }}
        />
      </Container>
    </React.Fragment>
  );
}
