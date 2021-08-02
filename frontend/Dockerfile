FROM node:14.17.2-alpine

# Create app directory
WORKDIR /src

# Install app dependencies
# A wildcard is used to ensure both package.json AND package-lock.json are copied
# where available (npm@5+)
COPY ./package*.json ./

# If you are building your code for production
# RUN npm ci --only=production
#RUN npm ci -qy
RUN npm ci

# Bundle app source
COPY . .

# Expose Port 3000
EXPOSE 3000



CMD ["npm", "start"]

