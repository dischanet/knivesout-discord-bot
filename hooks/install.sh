#!/bin/bash

cd /home/centos/repos/knivesout-discord-bot

sudo ./hooks/set-environment.sh
sudo cp ./hooks/knivesout-discord-bot.service /etc/systemd/system/
sudo /usr/bin/systemctl enable knivesout-discord-bot