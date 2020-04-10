/* eslint-disable linebreak-style */
/* eslint-disable max-len */
/* eslint-disable no-shadow */
/* eslint-disable linebreak-style */
/* eslint-disable no-unused-vars */
/* eslint-disable linebreak-style */


// const data = {
//   region: {
//     name: 'Africa',
//     avgAge: 19.7,
//     avgDailyIncomeInUSD: 5,
//     avgDailyIncomePopulation: 0.71
//   },
//   periodType: 'days',
//   timeToElapse: 58,
//   reportedCases: 674,
//   population: 66622705,
//   totalHospitalBeds: 1380614
// };

function covertToDays(timeFormat, timeToElapse) {
  let elapseTime;
  switch (timeFormat) {
    case 'weeks':
      elapseTime = timeToElapse * 7;
      break;
    case 'months':
      elapseTime = timeToElapse * 30;
      break;
    default:
      elapseTime = timeToElapse;
  }
  return elapseTime;
}

const covid19ImpactEstimator = (data) => {
  const input = data;
  const impactCurrentlyInfected = input.reportedCases * 10;
  const severeCurrentlyInfected = input.reportedCases * 50;
  const periodToDays = covertToDays(input.periodType, input.timeToElapse);
  const cycles = Math.floor(periodToDays / 3);
  const impactInfectionsByRequestedTime = impactCurrentlyInfected * (2 ** cycles);
  const severeInfectionsByRequestedTime = severeCurrentlyInfected * (2 ** cycles);
  const impactWorstCasesByRequestedTime = Math.floor(impactInfectionsByRequestedTime * (15 / 100));
  const severeWorstCasesByRequestedTime = Math.floor(severeInfectionsByRequestedTime * (15 / 100));
  const hospitalBedsForPatients = Math.ceil(input.totalHospitalBeds * (35 / 100));
  const hospitalBedsForPatientsImpact = hospitalBedsForPatients - impactWorstCasesByRequestedTime;
  const hospitalBedsForPatientsSevere = hospitalBedsForPatients - severeWorstCasesByRequestedTime;
  const impactICUCasesByRequestedTime = Math.floor(impactInfectionsByRequestedTime * (5 / 100));
  const severeICUCasesByRequestedTime = Math.floor(severeInfectionsByRequestedTime * (5 / 100));
  const impactVentilatorCasesByRequestedTime = Math.floor(impactWorstCasesByRequestedTime * (2 / 100));
  const severeVentilatorCasesByRequestedTime = Math.floor(severeWorstCasesByRequestedTime * (2 / 100));
  const impactDollarInFlight = impactWorstCasesByRequestedTime * input.region.avgDailyIncomeInUSD * input.region.avgDailyIncomePopulation * periodToDays;
  const severeDollarInFlight = severeWorstCasesByRequestedTime * input.region.avgDailyIncomeInUSD * input.region.avgDailyIncomePopulation * periodToDays;

  return {
    data: input, // the input data you got
    impact: {
      currentlyInfected: impactCurrentlyInfected,
      infectionsByRequestedTime: impactInfectionsByRequestedTime,
      severeCasesByRequestedTime: impactWorstCasesByRequestedTime,
      hospitalBedsByRequestedTime: hospitalBedsForPatientsImpact,
      casesForICUByRequestedTime: impactICUCasesByRequestedTime,
      casesForVentilatorsByRequestedTime: impactVentilatorCasesByRequestedTime,
      dollarsInFlight: impactDollarInFlight
    }, // your best case estimation
    severeImpact: {
      currentlyInfected: severeCurrentlyInfected,
      infectionsByRequestedTime: severeInfectionsByRequestedTime,
      severeCasesByRequestedTime: severeWorstCasesByRequestedTime,
      hospitalBedsByRequestedTime: hospitalBedsForPatientsSevere,
      casesForICUByRequestedTime: severeICUCasesByRequestedTime,
      casesForVentilatorsByRequestedTime: severeVentilatorCasesByRequestedTime,
      dollarsInFlight: severeDollarInFlight
    } // your severe case estimation
  };
};


export default covid19ImpactEstimator;
