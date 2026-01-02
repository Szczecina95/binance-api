## Project setup

```bash
$ npm install
```
## Enviroment

```bash
$ cp .env.example .env
```

## Compile and run the project

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

```

## Run tests

```bash
# unit tests
$ npm run test

```

```bash
Usage 

# Endpoints 

Get klines list
http://localhost:3000/klines?symbol=BTCUSDT&interval=1m

Analyze klines
http://localhost:3000/klines/analyze?symbol=BTCUSDT&interval=1m

With start and end date 
http://localhost:3000/klines?symbol=BTCUSDT&interval=1m&startDate=1714358400000&endDate=1714358400000
http://localhost:3000/klines/analyze?symbol=BTCUSDT&interval=1m&startDate=1714358400000&endDate=1714358400000
```