/* eslint-disable linebreak-style */
/* eslint-disable no-useless-concat */
/* eslint-disable quotes */
/* eslint-disable space-infix-ops */
/* eslint-disable eqeqeq */
/* eslint-disable consistent-return */
/* eslint-disable no-unused-vars */
/* eslint-disable no-alert */
/* eslint-disable no-restricted-globals */
/* eslint-disable import/extensions */
/* eslint-disable max-len */
import { getData, submit } from './data.js';
import covid19ImpactEstimator from '../src/estimator.js';

const form = document.querySelector('form');
const main = document.querySelector('main');
const article = document.querySelector('#data');
const reset = document.createElement('button');
let data;

reset.setAttribute('name', 'reset');
reset.textContent = 'RESET';
reset.addEventListener('click', (evt) => {
  history.go(0);
});

submit.addEventListener('click', (evt) => {
  const x = form.avgDailyIncomeInUSD.value == '';
  if (x === true) {
    alert('All Fields must be filled out');
    return false;
  }
  evt.preventDefault();
  data = getData();

  const estimator = covid19ImpactEstimator(data);

  main.style.display = 'none';

  const currentlyInfected = `* currently Infected People is ${estimator.impact.currentlyInfected}`;
  const infectionsByRequestedTime = `* Infected People For ${estimator.data.timeToElapse}${estimator.data.periodType} is ${estimator.impact.infectionsByRequestedTime}`;
  const severeCasesByRequestedTime = `* Severe Cases of Infected People For ${estimator.data.timeToElapse}${estimator.data.periodType} is ${estimator.impact.severeCasesByRequestedTime}`;
  const hospitalBedsByRequestedTime = `* Hospital Beds for Covid19 patients For ${estimator.data.timeToElapse}${estimator.data.periodType} is ${estimator.impact.hospitalBedsByRequestedTime}`;
  const casesForICUByRequestedTime = `* Severe Covid19 Cases That Need ICU is ${estimator.impact.casesForICUByRequestedTime} patients `;
  const casesForVentilatorsByRequestedTime = `* Severe Covid19 Cases That Need Ventilator is ${estimator.impact.casesForVentilatorsByRequestedTime} patients `;
  const dollarsInFlight = `${'* Impact on Economy ' + ' $ '}${estimator.impact.dollarsInFlight}`;

  const div = document.createElement('div');
  const h2 = document.createElement('h2');
  const first = document.createElement('li');
  const second = document.createElement('li');
  const third = document.createElement('li');
  const fourth = document.createElement('li');
  const fifth = document.createElement('li');
  const sixth = document.createElement('li');
  const seven = document.createElement('li');

  const firstText = document.createTextNode(currentlyInfected);
  const secondText = document.createTextNode(infectionsByRequestedTime);
  const thirdText = document.createTextNode(severeCasesByRequestedTime);
  const fourthText = document.createTextNode(hospitalBedsByRequestedTime);
  const fifthText = document.createTextNode(casesForICUByRequestedTime);
  const sixthText = document.createTextNode(casesForVentilatorsByRequestedTime);
  const seventhText = document.createTextNode(dollarsInFlight);

  h2.textContent = 'Estimated Impact';
  first.appendChild(firstText);
  second.appendChild(secondText);
  third.appendChild(thirdText);
  fourth.appendChild(fourthText);
  fifth.appendChild(fifthText);
  sixth.appendChild(sixthText);
  seven.appendChild(seventhText);

  div.appendChild(h2);
  div.appendChild(first);
  div.appendChild(second);
  div.appendChild(third);
  div.appendChild(fourth);
  div.appendChild(fifth);
  div.appendChild(sixth);
  div.appendChild(seven);


  div.setAttribute('name', 'hide');

  const currentlyInfected2 = `* currently Infected People is ${estimator.severeImpact.currentlyInfected}`;
  const infectionsByRequestedTime2 = `* Infected People For ${estimator.data.timeToElapse}${estimator.data.periodType} is ${estimator.severeImpact.infectionsByRequestedTime}`;
  const severeCasesByRequestedTime2 = `* Severe Cases of Infected People For ${estimator.data.timeToElapse}${estimator.data.periodType} is ${estimator.severeImpact.severeCasesByRequestedTime}`;
  const hospitalBedsByRequestedTime2 = `* Hospital Beds for Covid19 patients For ${estimator.data.timeToElapse}${estimator.data.periodType} is ${estimator.severeImpact.hospitalBedsByRequestedTime}`;
  const casesForICUByRequestedTime2 = `* Severe Covid19 Cases That Need ICU is ${estimator.severeImpact.casesForICUByRequestedTime} patients `;
  const casesForVentilatorsByRequestedTime2 = `* Severe Covid19 Cases That Need Ventilator is ${estimator.impact.casesForVentilatorsByRequestedTime} patients `;
  const dollarsInFlight2 = `${`* Impact on Economy  $ `}${estimator.severeImpact.dollarsInFlight}`;


  const div2 = document.createElement('div');
  const h22 = document.createElement('h2');
  const first2 = document.createElement('li');
  const second2 = document.createElement('li');
  const third2 = document.createElement('li');
  const fourth2 = document.createElement('li');
  const fifth2 = document.createElement('li');
  const sixth2 = document.createElement('li');
  const seven2 = document.createElement('li');

  const firstText2 = document.createTextNode(currentlyInfected2);
  const secondText2 = document.createTextNode(infectionsByRequestedTime2);
  const thirdText2 = document.createTextNode(severeCasesByRequestedTime2);
  const fourthText2 = document.createTextNode(hospitalBedsByRequestedTime2);
  const fifthText2 = document.createTextNode(casesForICUByRequestedTime2);
  const sixthText2 = document.createTextNode(casesForVentilatorsByRequestedTime2);
  const seventhText2 = document.createTextNode(dollarsInFlight2);

  h22.textContent = 'Estimated Severe Impact';
  first2.appendChild(firstText2);
  second2.appendChild(secondText2);
  third2.appendChild(thirdText2);
  fourth2.appendChild(fourthText2);
  fifth2.appendChild(fifthText2);
  sixth2.appendChild(sixthText2);
  seven2.appendChild(seventhText2);

  div2.appendChild(h22);
  div2.appendChild(first2);
  div2.appendChild(second2);
  div2.appendChild(third2);
  div2.appendChild(fourth2);
  div2.appendChild(fifth2);
  div2.appendChild(sixth2);
  div2.appendChild(seven2);

  div2.setAttribute('name', 'hide2');

  article.prepend(reset);
  article.prepend(div2);
  article.prepend(div);
});
