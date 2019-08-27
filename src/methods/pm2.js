const { Client } = require('ssh2');

const { checkProps } = require('../utils');

const run = async options => {
  checkProps(options, ['host', 'user', 'password', 'cwd']);

  const {
    host,
    user,
    password,
    cwd,
    gitUser,
    gitPassword,
    npmInstall,
  } = options;

  const conn = new Client();
  const commandList = [
    `cd ${cwd}`,
    'sudo git checkout .',
    'sudo git pull',
    ...(npmInstall ? ['sudo npm i', 'sudo git checkout .'] : []),
    `pm2 restart all`,
  ];

  conn.on('ready', () => {
    console.log('ssh connected');
    console.log('⏳ updating...');

    conn.exec(commandList.join(' && '), { pty: true }, function(err, stream) {
      if (err) throw err;

      let failed = false;

      stream
        .on('close', function() {
          if (!failed) {
            console.log('🚀 Done!');
          }

          conn.end();
        })
        .on('data', function(rawData) {
          failed = false;
          const data = String(rawData);
          // console.log('STDOUT:\n' + data);

          if (data.startsWith('Username for')) {
            stream.write(gitUser + '\n');
          } else if (data.startsWith('Password for')) {
            stream.write(gitPassword + '\n');
          }
        });

      stream.stderr.on('data', function(data) {
        failed = true;
        console.log('🚨 ' + data);
      });
    });
  });

  conn.connect({ host, username: user, password });
};

module.exports = { run };
