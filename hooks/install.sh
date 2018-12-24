#!/bin/bash

source /home/centos/.bashrc

cd /home/centos/repos/kniveout-discord-bot

sudo cp ./hooks/kniveout-discord-bot.service /etc/systemd/system/
sudo /usr/bin/systemctl enable kniveout-discord-bot