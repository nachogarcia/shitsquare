var Factory = require('./src/Factory.js');
var Migrator = require('./src/infrastructure/Migrator.js');

let factory = new Factory();
let migrator = factory.createMigrator();

switch(process.argv[2]){
  case 'reset':
    migrator.resetDB().then(result => {
      migrator.close();
    });
    break;

  case 'init':
    migrator.createTables().then(result => {
      migrator.close();
    });
    break;

  case 'fake':
    migrator.poblateFake().then(result => {
      migrator.close();
    });
    break;
}
