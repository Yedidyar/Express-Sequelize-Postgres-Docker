FROM  node

EXPOSE 7000

WORKDIR /app

RUN npm install i npm@latest -g

COPY package.json package-lock.json ./

RUN npm install

COPY . .

CMD [ "npm", "run" ,"dev" ]