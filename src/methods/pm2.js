const node_ssh = require('node-ssh');

const { checkProps } = require('../utils');

const run = async options => {
  checkProps(options, [
    'host',
    'user',
    'password',
    'cwd',
    'destination',
    'localPath',
  ]);

  const { host, user, password, cwd, destination, localPath } = options;
  const ssh = new node_ssh();

  // establish ssh connection
  await ssh.connect({ host, username: user, password });
  console.log('ssh connected');

  // create destination directory, if existent will just go through
  await ssh.execCommand(`mkdir ${destination}`, { cwd });
  console.log('⏳ uploading...');

  // put files recursively, keep track of errors
  const failedList = [];
  const success = await ssh.putDirectory(localPath, `${cwd}/${destination}`, {
    recursive: true,
    concurrency: 20,
    // send all files, including .bla format
    validate: () => true,
    // check for error, add to list
    tick: (path, rp, error) => {
      if (error) {
        failedList.push({ path, error });
      }
    },
  });

  // close ssh connection
  ssh.dispose();

  if (!success) {
    console.log('🚨 Failed! Errors:');
    console.log(failedList);
  } else {
    console.log('🚀 Done!');
  }
};

module.exports = { run };
