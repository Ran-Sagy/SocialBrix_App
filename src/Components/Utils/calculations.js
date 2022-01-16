export const getGrowthByPersentage = (
  last_followers_count,
  currentFollowersCount
) => {
  if (last_followers_count && currentFollowersCount) {
    console.log("running...", last_followers_count, currentFollowersCount);
    const diff = Number(currentFollowersCount) - Number(last_followers_count);
    const diffToPercentage = (diff / last_followers_count) * 100;
    return Number(diffToPercentage).toFixed(2);
  } else return Number(0.0);
};
