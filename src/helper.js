export function findLongestStreak(commits) {
  let longestStreak = 0;
  let currentStreak = 0;
  let lastDate = new Date();
  commits.forEach((commit) => {
    const commitDate = new Date(commit.commit.author.date);
    const diff = Math.abs(commitDate - lastDate);
    const diffDays = Math.ceil(diff / (1000 * 60 * 60 * 24));
    if (diffDays <= 1) {
      currentStreak++;
    } else {
      if (currentStreak > longestStreak) {
        longestStreak = currentStreak;
      }
      currentStreak = 0;
    }
    lastDate = commitDate;
  });
  return longestStreak;
}
export function findCurrentStreak(commits) {
  let currentStreak = 0;
  let lastDate = new Date();
  commits.forEach((commit) => {
    const commitDate = new Date(commit.commit.author.date);
    const diff = Math.abs(commitDate - lastDate);
    const diffDays = Math.ceil(diff / (1000 * 60 * 60 * 24));
    if (diffDays <= 1) {
      currentStreak++;
    } else {
      currentStreak = 0;
    }
    lastDate = commitDate;
  });
  return currentStreak;
}
