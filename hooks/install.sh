#!/bin/bash

source /home/centos/.bashrc

cd /home/centos/repos/kniveout-discord-bot
nvm use v11.5.0
/home/centos/.yarn/bin/yarn install
/home/centos/.yarn/bin/yarn build

sudo cp ./hooks/kniveout-discord-bot.service /etc/systemd/system/
sudo /usr/bin/systemctl enable kniveout-discord-bot