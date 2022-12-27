FROM node:latest



# Create the bot's directory

RUN mkdir -p /usr/src/bot

WORKDIR /usr/src/bot



COPY package.json /usr/src/bot

RUN npm install



COPY . /usr/src/bot

# Install pm2
RUN npm install pm2 -g

# Start the bot.

CMD ["pm2-runtime", "start", "bot.js"]