FROM node:14.17.2-alpine

# Create app directory
WORKDIR /usr/app/

# RUN npm install i npm@latest -g 

# Install app dependencies
# A wildcard is used to ensure both package.json AND package-lock.json are copied
# where available (npm@5+)
# COPY package.json package-lock*.json ./
COPY ./package*.json ./


# If you are building your code for production
# RUN npm ci --only=production
#RUN npm ci -qy
RUN yarn  
# RUN npm install && npm run resolve && npm audit

# Bundle app source
COPY . .
# COPY backend/ ./backend


# Expose Port 3000
EXPOSE 3001

CMD ["yarn", "run", "start"]
# CMD ["npm", "run", "backend/index.js"]
# CMD ["node", "backend/index.js"]