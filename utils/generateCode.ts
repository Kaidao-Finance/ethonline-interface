export const generateCode = () => {
  var code = "";
  var characters =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  var charactersLength = characters.length;
  for (var i = 0; i < 8; i++) {
    code += characters.charAt(Math.floor(Math.random() * charactersLength));
  }
  return code;
};
