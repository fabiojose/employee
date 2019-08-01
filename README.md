# Employee Manager

**API** written in vanilla javascript using **node 8.9+**

**UI** written using html5 + vue 2.0.0, based on [this](https://codepen.io/mystrader/pen/YOdepy) amazing template.

Credentials to access the app:

```txt
username: admin
password: adm1n
```

:warning: **Warning** :warning:

>Do not use this app in production

**You may encounter security issues!**

This is just for fun! :smiley:

## Starting Using Docker

> make sure you have `docker` installed and the port `3000` free to use

Docker minimal version: `18.09.8`

**Build**

```bash
docker build . -t employee:1.0.0
```

**Run**

```bash
docker run -p 3000:3000 \
       -v employee_data:/var/app/employeedb \
       employee:1.0.0
```

## Starting Without Docker

> make sure you have `node` installed and the port `3000` free to use

- run `npm install` to download the dependencies
- run `npm start` to start the app
- open `http://localhost:3000` at your browser

## Notes About the Database

We are using the [pouchdb](https://pouchdb.com/), which is based on
[leveldb](https://github.com/google/leveldb). If your are starting this app
using Docker, please, take care about the `employee_data` volume mapping,
that concern will guarantee the persistent data if you remove the container.

But, if you are starting it without docker, do not delete the `employeedb`
directory, that will be created on the very first run.

## Why I choose node?

I answer with one word: **flexibility**

I have more than seven years on java, but for this kind of project, I like the
way that node allows me to write the stuff.

## To test

If you have node installed in your pc, run the following command:

```sh
npm test
```

And you will something like bellow:

```txt
Employee API
  POST /api/employee
    ✓ should response 201 when everything ok (64ms)
    ✓ should response 400 when try to post same id
    ✓ should response 201 when try to post another id
  GET /api/employee
    ✓ should return all documents
```
