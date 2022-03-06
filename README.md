# GMapScraperAPI


Download Api File to the server
```sh
cd /home/
git clone https://github.com/shubhamchugh/NodeJS-API.git
cd /home/NodeJS-API/
```


```sh
sudo apt update
sudo apt install npm
```



```sh
npm install
```

```sh
npm install -g express
npm i puppeteer
```


```sh
sudo apt-get update
sudo apt-get install gconf-service libasound2 libatk1.0-0 libc6 libcairo2 libcups2 libdbus-1-3 libexpat1 libfontconfig1 libgcc1 libgconf-2-4 libgdk-pixbuf2.0-0 libglib2.0-0 libgtk-3-0 libnspr4 libpango-1.0-0 libpangocairo-1.0-0 libstdc++6 libx11-6 libx11-xcb1 libxcb1 libxcomposite1 libxcursor1 libxdamage1 libxext6 libxfixes3 libxi6 libxrandr2 libxrender1 libxss1 libxtst6 ca-certificates fonts-liberation libappindicator1 libnss3 lsb-release xdg-utils wget

sudo apt-get install -y libgbm-dev
sudo apt-get install libglib2.0-0
```



```sh
npm install pm2 -g
```


Start/stop/restart Nodejs Server with apllication
Please check dir before exicute the comand

```sh
cd /home/NodeJS-API/
pm2 start myAppName.js -i max
pm2 stop myAppName.js -i max
pm2 restart myAppName.js -i max
```

if not start Node js Server Try with Force
```sh
pm2 start myAppName.js -i max -f
pm2 stop myAppName.js -i max -f 
pm2 restart myAppName.js -i max -f
```


server run after reboot also
```sh
pm2 save
```



troubleshoot for node server

```sh
pm2 list
pm2 restart all
pm2 stop all
pm2 delete all

```


For Monitor NodeJs Server
```sh 
pm2 monit
```
for check List all processes:
```sh
pm2 list
```

action
```sh
pm2 stop
pm2 restart
pm2 delete
```

