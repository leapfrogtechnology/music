Leapfrog Music
==
Ever wondered what Leapfroggers are listening to or just wanted a steady stream of weird and whacky music while you're trying to be productive? Leapfrog music is hosted at: https://dev.music.lftechnology.com

## How it works?
Post youtube links of songs you are listening to the channel **Music @ LFT**. It will in turn create a playlist of the latest songs posted at the channel which you can listen to at https://dev.music.lftechnology.com.

## Setup
First clone this repository

```bash
$ git clone git@github.com:leapfrogtechnology/music.git
```

Install dependencies. Make sure you already have `nodejs`, `npm` and `yarn` installed in your system.

```bash
$ cd music/api
$ yarn
```

Create a `.env` file for environment variables.
```bash
$ cp .env.example .env
```

Run migrations
```bash
$ yarn migrate
```

[Install ngrok](https://ngrok.com/download) and expose the port stated at `config.json` file.
```bash
$ ./ngrok http <your-port-number>
```
Add your ngrok link to `config.json`

Running locally
```bash
$ yarn start
```

## Adding the integration to your hipchat room
Visit the ngrok link your api is hosted on and click on `Add to hipchat` and follow the instructions from there.

## Running the app
Create a `config.js` file.
```bash
$ cd app
$ cp config.example.js config.js
```
Serve the app using [http-server](https://www.npmjs.com/package/http-server) or a similar package
```bash
$ http-server -p <your-port-number>
```
Now you can post youtube songs to your Hipchat room and listen to them through the app.
