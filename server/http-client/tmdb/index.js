const axios = require('axios');
const limits = require('limits.js');

const MAX_REQUESTS = 40;
const TIME_FRAME = 10 * 1000; // 10 seconds
const SAFE_TIME_WINDOW = 200; // just to be safe
const rateLimiter = limits().within(
  TIME_FRAME + SAFE_TIME_WINDOW,
  MAX_REQUESTS
);

const tmdb = axios.create({
  baseURL: 'https://api.themoviedb.org/3',
  params: {
    api_key: process.env.TMDB_API_KEY
  }
});

tmdb.interceptors.request.use(
  config =>
    new Promise(resolve => {
      rateLimiter.push(() => resolve(config));
    })
);

async function get(endpoint, options = {}) {
  const res = await tmdb.get(endpoint, { params: options });
  return res.data;
}

module.exports = {
  get
};
