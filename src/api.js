const username = "Kylealanjeffrey";
const accessToken = process.env.REACT_APP_GITHUB_API_KEY;

export async function getRepos() {
  if (!accessToken) {
    console.error("No GitHub access token found.");
    return;
  }
  try {
    const response = await fetch(
      `https://api.github.com/users/${username}/repos`,
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      }
    );
    const data = await response.json();
    return data;
  } catch (error) {
    console.error(`Error fetching repos: ${error}`);
    return;
  }
}
export async function getAllCommits() {
  const all_commits = [];
  const repos = await getRepos();

  console.log(`found ${repos.length} repos`);
  // Get all commits for each repo
  await Promise.all(
    repos.map(async (repo) => {
      try {
        const response = await fetch(
          `https://api.github.com/repos/${username}/${repo.name}/commits`,
          {
            headers: {
              Authorization: `Bearer ${accessToken}`,
            },
          }
        );
        const data = await response.json();
        all_commits.push(...data);
      } catch (error) {
        console.error(`Error fetching commits for ${repo.name}: ${error}`);
        return;
      }
    })
  );

  //   sort by time
  all_commits.sort((a, b) => {
    return new Date(b.commit.author.date) - new Date(a.commit.author.date);
  });
  console.log(`found ${all_commits.length} commits in total`);
  return Promise.resolve(all_commits);
}
