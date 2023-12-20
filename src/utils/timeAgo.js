export const timeAgo = (timestamp) => {
  const now = Date.now();
  const secondsAgo = Math.floor((now - timestamp) / 1000);

  if (secondsAgo < 60) {
    return `${secondsAgo}s ago`;
  } else if (secondsAgo < 3600) {
    return `${Math.floor(secondsAgo / 60)}m ago`;
  } else if (secondsAgo < 86400) {
    return `${Math.floor(secondsAgo / 3600)}h ago`;
  } else if (secondsAgo < 604800) {
    return `${Math.floor(secondsAgo / 86400)}d ago`;
  } else {
    const weeksAgo = Math.floor(secondsAgo / 604800);
    return `${weeksAgo}w ago`;
  }
};
