source /home/centos/.bash_profile
source /home/centos/.bashrc

ZONE=$(curl 169.254.169.254/latest/meta-data/placement/availability-zone)
REGION=$(echo ${ZONE/%?/})
PARAMETER_NAME=KNIVESOUT_DISCORD_BOT_SECRET
echo "DISCORD_BOT_TOKEN=$(aws --region ${REGION} ssm get-parameters --name ${PARAMETER_NAME} --query "Parameters[0].Value" --output text)" > environment