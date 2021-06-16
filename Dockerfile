#FROM node:14
FROM node:14.16.0

# Create app directory
WORKDIR /backend_zag

# Install app dependencies
# A wildcard is used to ensure both package.json AND package-lock.json are copied
# where available (npm@5+)
COPY package*.json ./

RUN npm install
# If you are building your code for production
# RUN npm ci --only=production

# Bundle app source
COPY . /backend_zag

EXPOSE 3000
CMD [ "npm", "start" ]
