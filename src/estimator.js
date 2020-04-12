/* eslint-disable linebreak-style */
/* eslint-disable import/prefer-default-export */
/* eslint-disable max-len */
/* eslint-disable import/extensions */

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
  const impactVentilatorCasesByRequestedTime = Math.floor(impactInfectionsByRequestedTime * (2 / 100));
  const severeVentilatorCasesByRequestedTime = Math.floor(severeInfectionsByRequestedTime * (2 / 100));
  const value1 = (impactInfectionsByRequestedTime * input.region.avgDailyIncomeInUSD * input.region.avgDailyIncomePopulation) / periodToDays;
  const value2 = (severeInfectionsByRequestedTime * input.region.avgDailyIncomeInUSD * input.region.avgDailyIncomePopulation) / periodToDays;
  const impactDollarInFlight = Math.trunc(value1.toFixed(2));
  const severeDollarInFlight = Math.trunc(value2.toFixed(2));

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
