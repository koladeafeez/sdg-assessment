/* eslint-disable linebreak-style */
/* eslint-disable no-unused-vars */
/* eslint-disable linebreak-style */


const covid19ImpactEstimator = (data) => {
  const input = data;
  const impactCurrentlyInfected = input.reportedCases * 10;
  const severeCurrentlyInfected = input.reportedCases * 50;
  const impactInfectionsByRequestedTime = impactCurrentlyInfected * (2 ** 9);
  const severeInfectionsByRequestedTime = severeCurrentlyInfected * (2 ** 9);
  return {
    data: input, // the input data you got
    impact: {
      currentlyInfected: impactCurrentlyInfected,
      infectionsByRequestedTime: impactInfectionsByRequestedTime
    }, // your best case estimation
    severeImpact: {
      currentlyInfected: severeCurrentlyInfected,
      infectionsByRequestedTime: severeInfectionsByRequestedTime
    } // your severe case estimation
  };
};
export default covid19ImpactEstimator;
