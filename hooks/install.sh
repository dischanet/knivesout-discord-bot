#!/bin/bash

cd /home/ec2-user/repos/knivesout-discord-bot
npm install --production
npm build

REGION=$(curl -s 169.254.169.254/latest/meta-data/local-hostname | cut -d '.' -f2)
PARAMETER_NAME=KNIVESOUT_DISCORD_BOT_SECRET
echo "DISCORD_BOT_TOKEN=$(/usr/bin/aws --region ${REGION} ssm get-parameter --name ${PARAMETER_NAME} --query "Parameter.Value" --output text)" > environment

sudo cp ./hooks/knivesout-discord-bot.service /etc/systemd/system/knivesout-discord-bot.service
sudo /usr/bin/systemctl enable knivesout-discord-bot