FROM node:18.16.0

 

# Create app directory
#WORKDIR /app

 

# Install wget and gconf-service

 


# Install Chrome
# Install necessary dependencies 
#RUN apt-get update &&    apt-get install -y wget gnupg ca-certificates &&     rm -rf /var/lib/apt/lists/*
#RUN wget -q -O - https://dl.google.com/linux/linux_signing_key.pub | apt-key add - &&      echo "deb [arch=amd64] http://dl.google.com/linux/chrome/deb/ stable main" >> /etc/apt/sources.list.d/google-chrome.list &&      apt-get update &&     apt-get install -y google-chrome-stable &&     rm -rf /var/lib/apt/lists/*

 

#RUN apt-get install -y wget
#RUN wget -q -O - https://dl.google.com/linux/linux_signing_key.pub | apt-key add -
#RUN echo "deb [arch=amd64] http://dl.google.com/linux/chrome/deb/ stable main" >> /etc/apt/sources.list.d/google-chrome.list
#RUN apt-get update 
#RUN apt-get -y install google-chrome-stable
#RUN google-chrome --version
#ENV PUPPETEER_EXECUTABLE_PATH=/usr/bin/google-chrome-stable
#RUN echo "$PUPPETEER_EXECUTABLE_PATH"
# Set Chrome as the Puppeteer executable path 
#RUN echo 'export PUPPETEER_EXECUTABLE_PATH=/usr/bin/google-chrome-stable' >> /etc/profile
#ENV PATH PUPPETEER_EXECUTABLE_PATH:$PATH
#RUN source ~/.bashrc
#RUN cat ~/.bashrc
#RUN  echo $PUPPETEER_EXECUTABLE_PATH
#RUN wget https://dl.google.com/linux/direct/google-chrome-stable_current_amd64.deb
#RUN apt install -y ./google-chrome-stable_current_amd64.deb || apt-get --fix-broken install -y

 

# Create app directory
WORKDIR /

 

RUN apt-get install -y wget
RUN wget -q -O - https://dl.google.com/linux/linux_signing_key.pub | apt-key add -
RUN echo "deb [arch=amd64] http://dl.google.com/linux/chrome/deb/ stable main" >> /etc/apt/sources.list.d/google-chrome.list
RUN apt-get update
RUN apt-get -y install google-chrome-stable
RUN google-chrome --version
ENV PUPPETEER_EXECUTABLE_PATH=/usr/bin/google-chrome-stable
RUN echo "$PUPPETEER_EXECUTABLE_PATH"
RUN google-chrome --version

 

# copy dependency files
COPY  package.json ./

 

#RUN yarn cache clean
RUN npm cache clean --force
# Required if not done in postinstall
# RUN npx prisma generate

 

COPY . .

 

RUN npm install

 

 

EXPOSE 8000
CMD [ "node", "server.js" ]
