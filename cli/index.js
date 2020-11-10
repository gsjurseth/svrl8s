#!/usr/bin/env node
const { program } = require('commander');
const foonction = require('./foonction');

function foo(name) {
  let myFoo = new foonction(name);

  myFoo.snarf("One, two, three");

}

program
  .version('0.1.0')
  .command('create [name]')
  .description('create a new svrl8s foonction')
  .option('-t, --type <type>', 'Type of foonction: defaults to nodejs','node')
  .action(foo);
  //.command('search [query]', 'search with optional query')
//  .command('update', 'update installed packages', { executableFile: 'myUpdateSubCommand' })
  //.command('list', 'list packages installed', { isDefault: true });
 
program.parse(process.argv);
  console.log("Finally: %s", program.type);

