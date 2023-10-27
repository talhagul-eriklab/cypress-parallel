const { exec } = require('child_process');

const specs = ['cypress/e2e/features/google.feature','cypress/e2e/features/login.feature','cypress/e2e/features/tags.feature'];

const testProcesses = [];

specs.forEach((spec) => {
  const child = exec(`npx cypress run --spec ${spec} --browser chrome --env allure=true`);
  testProcesses.push(child);
});

testProcesses.forEach((child) => {
  child.on('exit', (code) => {
    console.log(`Child process exited with code ${code}`);
  });
});



