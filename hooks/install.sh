#!/bin/bash

cd /home/centos/repos/kniveout-discord-bot

sudo ./hooks/set-environment.sh
sudo cp ./hooks/kniveout-discord-bot.service /etc/systemd/system/
sudo /usr/bin/systemctl enable kniveout-discord-bot