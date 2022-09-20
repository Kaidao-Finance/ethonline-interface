export const displayAccount = (account: string) => {
  return account.substring(0, 6) + "..." + account.substring(38, 42);
};
