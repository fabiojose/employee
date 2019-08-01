FROM node:8.9.0

ENV WORKDIR=/var/app

WORKDIR $WORKDIR

RUN mkdir -p $WORKDIR

COPY . $WORKDIR

RUN npm install

VOLUME ["/var/app/employeedb"]

EXPOSE 3000

CMD ["npm", "start"]
