const fs = require('fs');
const readline = require('readline');
const format = require('date-fns/format');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

// these are all assumed to be sorted.
let updatesFile = JSON.parse(fs.readFileSync('src/data/updates/updates.json'));
let sexFile = JSON.parse(fs.readFileSync('src/data/sex/sex.json'));
let casesFile = JSON.parse(fs.readFileSync('src/data/cases/cases.json'));
let provincesFile = JSON.parse(fs.readFileSync('src/data/provinces/provinces.json'));

const run = async () => {
  console.log('Starting...');
  try {
    await workOnUpdates();
    //await workOnSex();
    await workOnCases();
    await workOnProvinces();

  } catch (e) {
    console.log(e);
  } finally {
    rl.close();
  }
};

const workOnUpdates = async () => {
  const updates = updatesFile.updates;
  const lastUpdate = updates[updates.length - 1];
  const lastDate = new Date(lastUpdate.date);
  const newDate = new Date(lastDate.valueOf() + 86400000);
  const newDateFormatted = format(newDate, 'yyyy/MM/dd');

  const lastNumber = parseInt(lastUpdate.title.substr(-3)); // Imagine having a thousand updates
  const newNumber = lastNumber + 1;

  console.log(`Last update was #${lastNumber} on ${lastUpdate.date}, continuing with #${newNumber} on ${newDateFormatted}`);
  const wouldBeUrl = `http://digepisalud.gob.do/docs/Vigilancia%20Epidemiologica/Alertas%20epidemiologicas/Coronavirus/Nacional/Boletin%20Especial%20COVID-19/Boletin%20especial%20${newNumber}%20-%20COVID-19.pdf`;

  const title = `Salud Pública publica boletín #${newNumber}`;
  const date = newDateFormatted;
  const link = await question(`URL? [${wouldBeUrl}]:`) || wouldBeUrl;

  const update = { title, date, link };
  updates.push(update);
  
  const newFile = JSON.stringify({ updates }, null, 2);
  fs.writeFileSync('src/data/updates/updates.json', newFile);
  updatesFile = JSON.parse(fs.readFileSync('src/data/updates/updates.json'));
};

const workOnSex = async () => {
  const sexes = sexFile.sex;
  const lastUpdate = sexes[sexes.length - 1];
  const lastDate = new Date(lastUpdate.date);
  const newDate = new Date(lastDate.valueOf() + 86400000);
  const newDateFormatted = format(newDate, 'yyyy/MM/dd');
  const lastPercentForMale = (lastUpdate.men * 100).toFixed(2);

  console.log(`Last update was on ${lastUpdate.date}, continuing with on ${newDateFormatted}`);

  const percentForMale = await question(`Insert percent for men [${lastPercentForMale}]: `) || lastPercentForMale;
  const men = parseFloat((percentForMale / 100).toFixed(4));
  const women = parseFloat((1 - men).toFixed(4));

  const sex = { date: newDateFormatted, men, women };

  sexes.push(sex);
  
  const newFile = JSON.stringify({ sex: sexes }, null, 2);

  fs.writeFileSync('src/data/sex/sex.json', newFile);
  sexFile = JSON.parse(fs.readFileSync('src/data/sex/sex.json'));
};

const workOnCases = async () => {
  const cases = casesFile.cases;
  const lastUpdate = cases[cases.length - 1];
  const lastDate = new Date(lastUpdate.date);
  const newDate = new Date(lastDate.valueOf() + 86400000);
  
  const total_cases = await question('Total cases: ');
  const new_cases = await question('New Cases: ');
  const total_deaths = await question('Total Deaths: ');
  const new_deaths = await question('New Deaths: ');
  const total_recovered = await question('Total Recovered: ');
  const total_discarded = await question('Total Discarded: ');
  const total_at_the_hospital = await question('Total at the hospital: ');
  const total_at_home = await question('Total at home: ');

  const allFull = (
    total_cases &&
    total_deaths &&
    new_cases &&
    new_deaths &&
    total_recovered &&
    total_discarded &&
    total_at_the_hospital &&
    total_at_home
  );

  if (! allFull) {
    console.log('Fill all');
    await workOnCases();
    return;
  }

  const date = format(newDate, 'yyyy/MM/dd');

  const update = {
    date,
    total_cases: parseInt(total_cases.replace(',', '')),
    total_deaths: parseInt(total_deaths.replace(',', '')),
    new_cases: parseInt(new_cases.replace(',', '')),
    new_deaths: parseInt(new_deaths.replace(',', '')),
    total_recovered: parseInt(total_recovered.replace(',', '')),
    total_discarded: parseInt(total_discarded.replace(',', '')),
    total_at_the_hospital: parseInt(total_at_the_hospital.replace(',', '')),
    total_at_home: parseInt(total_at_home.replace(',', '')), 
  };

  cases.push(update);
  
  const newFile = JSON.stringify({ cases }, null, 2);

  fs.writeFileSync('src/data/cases/cases.json', newFile);
  casesFile = JSON.parse(fs.readFileSync('src/data/cases/cases.json'));
};

const workOnProvinces = async () => {
  const provinces = provincesFile.provinces;

  for (let i = 0; i < provinces.length; i++) {
    const province = provinces[i];
    console.log(`\nFilling ${province.name} ... \n`);

    const lastUpdate = province.cases[province.cases.length - 1];
    const lastDate = new Date(lastUpdate.date);
    const newDate = new Date(lastDate.valueOf() + 86400000);

    const date = format(newDate, 'yyyy/MM/dd');
    const lastTotalTests = lastUpdate.total_tests;
    const lastTotalCases = lastUpdate.total_cases;
    const lastPositivity = lastUpdate.positivity;
    const lastTotalRecovered = lastUpdate.total_recovered;
    const lastTotalDeaths = lastUpdate.total_deaths;
    
    const totalTests = await question(`Total Tests [${lastTotalTests}]: `) || lastTotalTests;
    const totalCases = await question(`Total Cases [${lastTotalCases}]: `) || lastTotalCases;
    const totalPositivity = await question(`Positviity [${lastPositivity}]: `) || lastPositivity * 100;
    const totalRecovered = await question(`Total Recovered [${lastTotalRecovered}]: `) || lastTotalRecovered;
    const totalDeaths = await question(`Total Deaths [${lastTotalDeaths}]: `) || lastTotalDeaths;

    const allFull = (
      totalTests ||
      totalCases ||
      totalPositivity ||
      totalRecovered ||
      totalDeaths
    );

    if (! allFull) {
      i--;
      console.log('Fill all');
      return;
    }

    const total_tests = parseInt(totalTests);
    const total_cases = parseInt(totalCases);
    const positivity = parseFloat(parseFloat(totalPositivity / 100).toFixed(4));
    const total_recovered = parseInt(totalRecovered);
    const total_deaths = parseInt(totalDeaths);

    const day = {
      date,
      total_tests,
      total_cases,
      positivity,
      total_recovered,
      total_deaths,
    };

    provinces[i].cases.push(day);
  }

  const newFile = JSON.stringify({ provinces }, null, 2);

  fs.writeFileSync('src/data/provinces/provinces.json', newFile);
  provincesFile = JSON.parse(fs.readFileSync('src/data/provinces/provinces.json'));
};

const question = (title) => new Promise(resolve => rl.question(title, resolve));

run();
