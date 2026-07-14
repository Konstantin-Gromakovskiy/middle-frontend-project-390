# разработка фронта
dev:
	cd code && npm run dev

build:
	cd code && npm run build

start:
	npx frontend-flight-booking-server start -s ./code/out

install:
	npm ci && cd code && npm ci

test:
	cd code && npm run test

lint:
	cd code && npm run lint

mock-server:
	npm run mock

backend:
	npx frontend-flight-booking-server start


