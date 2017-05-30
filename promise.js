const username = process.argv[2];
const {
  fetchUser,
  fetchRepos,
  fetchGists,
} = require('./gh-requests');

let result = [];
fetchUser(username)
.then(userRes => userRes.json())
.then((user) => {
  if (user.message === 'Not Found') throw new Error('User Not Found');
  result = result.concat(user);
  return fetchRepos(username);
})
.then(reposRes => reposRes.json())
.then((repos) => {
  result = result.concat(repos);
  return fetchGists(username);
})
.then(gistsRes => gistsRes.json())
.then((gists) => {
  result = result.concat(gists);
  return result;
})
.then(combinedResult => console.log(combinedResult))
.catch(error => console.log(error))


// nested promises *bad*

fetchUser(username)
.then(userRes => userRes.json())
.then((user) => {
  if (user.message === 'Not Found') throw new Error(user.message);
  return fetchRepos(username)
  .then(reposRes => reposRes.json())
  .then(repos => {
    return fetchGists(username)
    .then(gistsRes => gistsRes.json())
    .then((gists) => {
      return [
          user,
          repos,
          gists,
      ];
    })
  })
})
.then(combindedResult => console.log(combindedResult))
.catch(error => console.log(error))





