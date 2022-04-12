echo "===========disabling firewall=============";
sudo ufw disable
echo "===========firewall disabled==============";

echo "============Node js version setup ===========";
nvm use v17.8.0
node -v
echo "============Chromium dependeancy installing============"
sudo apt-get update
sudo apt-get install gconf-service libasound2 libatk1.0-0 libc6 libcairo2 libcups2 libdbus-1-3 libexpat1 libfontconfig1 libgcc1 libgconf-2-4 libgdk-pixbuf2.0-0 libglib2.0-0 libgtk-3-0 libnspr4 libpango-1.0-0 libpangocairo-1.0-0 libstdc++6 libx11-6 libx11-xcb1 libxcb1 libxcomposite1 libxcursor1 libxdamage1 libxext6 libxfixes3 libxi6 libxrandr2 libxrender1 libxss1 libxtst6 ca-certificates fonts-liberation libappindicator1 libnss3 lsb-release xdg-utils wget
sudo apt-get install -y libgbm-dev
sudo apt-get install libglib2.0-0

echo "============installing Pm2============"
npm install pm2 -g


echo "============Chaning direactory to node Project /home/NodeJS-API/============"
cd /home/NodeJS-API/

echo "npm installing node Modules"
npm install

echo "============starting project============"
pm2 start googleBingScraper.js -i max --watch

echo "============re-starting project============"
pm2 restart googleBingScraper.js -i max --watch

echo "============setting up Nodejs server restart after reboot============"
pm2 startup
pm2 save
















