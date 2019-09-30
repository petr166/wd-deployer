# wd-deployer

Node command line app, deploy your service with one command.

## Usage

Run the script with arguments

`pm2` example

```bash
wd-deployer-path --name="some-api(staging)" --method="pm2" --host="app.domain.com" --user="user" --password='password' --cwd="/home/api/public_html/some-api" --git-user="john.cena@gmail.com" --git-password="password2" --npm-i
```

`upload` example

```bash
wd-deployer-path --name="some-web(staging)" --method="upload" --host="domain.com" --user="web" --password="password" --cwd="/home/web/public_html" --destination="dist" --local-path="/Users/john/Development/Wiredelta/some-web/dist"
```

## Arguments

|     Name     |        Type         |                          Description                          |
| :----------: | :-----------------: | :-----------------------------------------------------------: |
|     name     |       string        |                        Deployment name                        |
|    method    | `'pm2' \| 'upload'` | Deployment type; e.g. `upload` uploads the build through sftp |
|     host     |       string        |                      Server hostname/ip                       |
|     user     |       string        |                          Server user                          |
|   password   |       string        |                        Server password                        |
|  local-path  |       string        |              Local source path used in `upload`               |
| destination  |       string        |                    Server destination path                    |
|     cwd      |       string        |                     Server work directory                     |
|   git-user   |       string        |              GitHub/Lab user used for `git pull`              |
| git-password |       string        |            GitHub/Lab password used for `git pull`            |
|    npm-i     |       boolean       |                          Do `npm i`                           |
