var Factory = require('./src/Factory.js');
var Migrator = require('./src/infrastructure/Migrator.js');

let factory = new Factory();
let migrator = new Migrator(factory);

switch(process.argv[2]){
  case 'reset':
    migrator.resetDB();
    break;
  case 'init':
    migrator.createTables();
    break;
  case 'fake':
    migrator.poblateFake();
    break;
}
process.exit(0);
