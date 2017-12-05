require('dotenv').config();
const Raven = require('raven');

if (process.env.NODE_ENV === 'production') {
  Raven.config(`https://${process.env.SENTRY_KEY}@sentry.io/254752`).install();
}
