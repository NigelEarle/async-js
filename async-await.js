const fetch = require('node-fetch');
const username = process.argv[2];

const {
  fetchUser,
  fetchRepos,
  fetchGists,
} = require('./gh-requests');

async function getCombined() {
  const userRes =  await fetchUser(username);
  const user = await userRes.json();
  if (user.message === 'Not Found') throw new Error(user.message); 

  const reposRes = await fetchRepos(username);
  const repos = await reposRes.json();

  const gistsRes = await fetchGists(username);
  const gists = await gistsRes.json();

  return [
    user,
    repos,
    gists
  ];
};

(async () => {
  try {
    const combined = await getCombined();
    console.log(combined)
  }
  catch(error) {
    console.log(error);
  }
  
})();

