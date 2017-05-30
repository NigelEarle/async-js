const fetch = require('node-fetch');

const fetchUser = (username) => {
  return fetch(`https://api.github.com/users/${username}`);
};

const fetchRepos = (username) => {
  return fetch(`https://api.github.com/users/${username}/repos`);
};

const fetchGists = (username) => {
  return fetch(`https://api.github.com/users/${username}/gists`);
}

module.exports = {
  fetchUser,
  fetchRepos,
  fetchGists,
}