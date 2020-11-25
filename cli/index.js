#!/usr/bin/env node

const { program } = require('commander');
const proj        = require('./lib/fn-project');

const tplhome     = 'https://raw.githubusercontent.com/gsjurseth/svrl8s/main/templates';

function createProject(name,args) {
  let prefix = (args.prefix != null) ? args.prefix : `/${name}`;
  let myProj = new proj({
    "name": name, 
    "projDir": `${args.destination}/${name}`, 
    "type": args.type,
    "prefix": prefix,
    "tplhome": args.templateHome});

  myProj.create();
}

program
  .version('0.1.0')
  .command('create [name]')
  .description('create a new svrl8s foonction')
  .option('-d, --destination <dest>', 'Destination directory to create the new foonction','.')
  .option('-t, --type <type>', 'Type of foonction: defaults to nodejs','nodejs')
  .option('-p, --prefix <prefix>','Url prefix for ingress routing')
  .option('-T, --template-home <tplhome>', 'Home of the templates for our updates', tplhome)
  .action(createProject);
/*
  .action( (x,y) => {
    console.log( "this is the name: ", x );
    console.log( "this is the args: ", y.type );
  });
  */


program.parse(process.argv);

