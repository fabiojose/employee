# Employee Manager

**API** written in vanilla javascript using **node 8.9+**

**UI** written using html5 + vue 2.0.0, based on [this](https://codepen.io/mystrader/pen/YOdepy) amazing template.

Credentials to access the app:

```txt
username: admin
password: adm1n
```

## Starting Using Docker

## Starting Without Docker

> make sure you have the port `3000` free to use at your pc

- install node
- run `npm install` to download the dependencies
- run `npm start` to start the app
- open `http://localhost:3000` at your browser

## Notes About the Database

We are using the [pouchdb](https://pouchdb.com/), which is based on
[leveldb](https://github.com/google/leveldb). If your are starting this app
using Docker, please, take care about the `/data` volume mapping, that concern
will guarantee the persistent data if you remove the container.

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
