const { isCRM } = require('./dist/services/IsCRM');

const value = process.argv.slice(2).join(' ');

console.log(isCRM(value));
