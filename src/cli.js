const arg = require('arg');

const methods = require('./methods');
const { checkProps } = require('./utils');

// parse process.argv into JSON
const parseArgs = rawArgs => {
  const args = arg(
    {
      '--method': String,
      '--host': String,
      '--user': String,
      '--password': String,
      '--cwd': String,
      '--destination': String,
      '--local-path': String,
      '--name': String,
      '--npm-i': Boolean,
      '--git-user': String,
      '--git-password': String,
    },
    { argv: rawArgs.slice(2) }
  );

  checkProps(args, ['--method', '--name', '--host']);

  return {
    method: args['--method'],
    host: args['--host'],
    user: args['--user'],
    password: args['--password'],
    cwd: args['--cwd'],
    destination: args['--destination'],
    localPath: args['--local-path'],
    name: args['--name'],
    npmInstall: args['--npm-i'],
    gitUser: args['--git-user'],
    gitPassword: args['--git-password'],
  };
};

const cli = args => {
  const { method, name, ...options } = parseArgs(args);

  console.log('\n' + name);
  console.log('=====================>');

  if (method === 'upload') {
    methods.upload.run(options);
  } else if (method === 'pm2') {
    methods.pm2.run(options);
  }
};

module.exports = { cli };
