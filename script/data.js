/* eslint-disable linebreak-style */
/* eslint-disable import/prefer-default-export */
/* eslint-disable prefer-const */
// const form = document.querySelectorAll('input');
const select = document.querySelectorAll('select');
export const submit = document.querySelector('#estimate-data');


export function getData() {
  let data;
  const population = document.querySelector('input[data-population]').value;
  const avgIncome = document.querySelector('input[data-avg-income]').value;
  const avgIncomePopulation = document.querySelector('input[data-avg-population-income]').value;
  const elapseTime = document.querySelector('input[data-time-to-elapse]').value;
  const reportedCases = document.querySelector('input[data-reported-cases]').value;
  const totalBeds = document.querySelector('input[data-total-hospital-beds]').value;
  const region = select[0].value;
  const periodType = select[1].value;

  data = {
    region: {
      name: region,
      avgAge: 19.7,
      avgDailyIncomeInUSD: avgIncome,
      avgDailyIncomePopulation: avgIncomePopulation
    },
    periodType,
    timeToElapse: elapseTime,
    reportedCases,
    population,
    totalHospitalBeds: totalBeds
  };
  return data;
}
