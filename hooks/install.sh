#!/bin/bash

cd /home/centos/repos/knivesout-discord-bot

sudo ./hooks/set-environment.sh
sudo cp ./hooks/knivesout-discord-bot.service /etc/systemd/system/knivesout-discord-bot.service
sudo /usr/bin/systemctl enable knivesout-discord-bot