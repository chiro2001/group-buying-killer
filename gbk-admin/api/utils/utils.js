

// 密码要求：不短于8位，含数字和字符
function checkPassword(passwd) {
  const makeResult = (state, message) => { return { state: state, message: message }; };
  if (!passwd) return makeResult(false, '密码为空');
  passwd = '' + passwd;
  if (passwd.length < 8) return makeResult(false, '密码不能短于8位');
  if (passwd.length > 64) return makeResult(false, '密码不能长于64位');
  let has_numbers = false, has_letters = false, has_symbols;
  const numbers = "0123456789";
  const letters = "qwertyuiopasdfghjklzxcvbnmQWERTYUIOPASDFGHJKLZXCVBNM";
  const symbols = "~!@#$%^&*()_+-={}|[]\;':\",./<>?\`";
  for (const p of passwd) {
    if (!has_letters && letters.includes(p)) has_letters = true;
    if (!has_numbers && numbers.includes(p)) has_numbers = true;
    if (!has_symbols && symbols.includes(p)) has_symbols = true;
  }
  if (!has_numbers) return makeResult(false, "密码必须包含数字");
  if (!has_letters) return makeResult(false, "密码必须包含字母");
  return makeResult(true);
}

module.exports = { checkPassword };