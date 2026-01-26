import React from 'react';

import Main from '@components/main';

const minimumDeleteSum = (a: string, b: string): number => {
  const dp: number[][] = Array.from({ length: a.length + 1 }, () =>
    Array(b.length + 1).fill(0)
  );
  for (let i = 1; i <= a.length; i++) {
    dp[i][0] = dp[i - 1][0] + a.charCodeAt(i - 1);
  }
  for (let j = 1; j <= b.length; j++) {
    dp[0][j] = dp[0][j - 1] + b.charCodeAt(j - 1);
  }
  for (let i = 1; i <= a.length; i++) {
    for (let j = 1; j <= b.length; j++) {
      if (a.charAt(i - 1) === b.charAt(j - 1)) {
        dp[i][j] = dp[i - 1][j - 1];
      } else {
        dp[i][j] = Math.min(
          dp[i - 1][j] + a.charCodeAt(i - 1),
          dp[i][j - 1] + b.charCodeAt(j - 1)
        );
      }
    }
  }

  return dp[a.length][b.length];
}

minimumDeleteSum('sea', 'eat');

const Page404 = () => (
  <Main>
    <h1>404</h1>
  </Main>
);

export default Page404;