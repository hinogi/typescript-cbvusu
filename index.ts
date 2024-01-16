import { Schema } from '@effect/schema';
import { formatError } from '@effect/schema/TreeFormatter';
import { Either } from 'effect';

import * as fc from 'fast-check';
// Import stylesheets
import './style.css';

// Write TypeScript code!
const appDiv: HTMLElement = document.getElementById('app');
appDiv.innerHTML = `<h1>TypeScript Starter</h1>`;

interface Location extends Schema.Schema.To<typeof Location> {}
interface Weather extends Schema.Schema.To<typeof Weather> {}
interface Subscription extends Schema.Schema.To<typeof Subscription> {}
interface Asset extends Schema.Schema.To<typeof Asset> {}

const Location = Schema.struct({
  expirationDate: Schema.string,
  providerName: Schema.string,
  providerReference: Schema.string,
});

const Weather = Schema.struct({
  expirationDate: Schema.string,
  providerName: Schema.string,
});

const Subscription = Schema.struct({
  //   ^?
  location: Location,
  weather: Schema.optional(Weather),
});

export const Asset = Schema.struct({
  //       ^?
  id: Schema.number,
  name: Schema.string,
  subscriptions: Schema.optional(Subscription),
});

const sampleData1 = {
  id: 1,
  name: 'test',
  subscriptions: {
    location: {
      expirationDate: '2025-01-01T00:00:00.000Z',
      providerName: 'test1',
      providerReference: '1111',
    },
    weather: {
      expirationDate: '2023-01-01T00:00:00.000Z',
      providerName: 'test2',
    },
  },
};

const parseAsset = Schema.parseEither(Asset);

const result1 = parseAsset(sampleData1);
//     ^?

if (Either.isLeft(result1)) {
  console.log(formatError(result1.left));
} else {
  console.log(result1.right);
}

const encoded1 = Schema.encodeEither(Asset)(sampleData1);

console.log(encoded1);
