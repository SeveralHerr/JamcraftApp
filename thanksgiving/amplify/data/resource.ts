import { a, defineData, type ClientSchema } from '@aws-amplify/backend';

// Guests sign up without accounts, so the only auth mode is a public API key.
// Courses and event details live in the frontend config (src/signup/data);
// only the dishes people bring are stored.
const schema = a.schema({
  Dish: a
    .model({
      courseId: a.string().required(),
      dish: a.string().required(),
      name: a.string().required(),
      note: a.string(),
      clientId: a.string(),
    })
    .authorization((allow) => [allow.publicApiKey()]),
});

export type Schema = ClientSchema<typeof schema>;

export const data = defineData({
  schema,
  authorizationModes: {
    defaultAuthorizationMode: 'apiKey',
    apiKeyAuthorizationMode: { expiresInDays: 90 },
  },
});
