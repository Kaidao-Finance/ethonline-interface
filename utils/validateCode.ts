export const validateCode = (code: string) => {
  var characters =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789-";
  if (code.length === 8) {
    for (var i = 0; i < code.length; i++) {
      if (!characters.includes(code[i])) {
        return false;
      }
    }
    return true;
  }
};
