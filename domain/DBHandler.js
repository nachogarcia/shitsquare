var Factory = require('./src/Factory.js');
var Migrator = require('./src/infrastructure/Migrator.js');

let factory = new Factory();
let migrator = factory.createMigrator();

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
