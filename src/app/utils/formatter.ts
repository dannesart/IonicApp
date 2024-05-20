export const phoneFormatter = (
  phone: string,
  split?: Array<string>,
  domain: string = "+46"
) => {
  /**
   * Trim phone number
   */
  phone = phone.replace(/ /g, "");
  /**
   * Remove +46 if exist. Just so we can be garanteed that there is none
   * +46 before we add it to the begining.
   */
  phone = phone.replace(domain, "");
  /**
   * Remove first number if it's a zero.
   */
  phone = phone.startsWith("0") ? phone.replace("0", "") : phone;
  /**
   * Split it into parts. So it will end up like 7x xxxxxxx
   */
  split = [domain, phone.slice(0, 2), phone.slice(2)];
  /**
   * Complete
   */
  phone = split.join(" ").slice(0, 14);

  return phone;
};

export const isValidPhone = (phone: string) => {
  if (!phone) return false;
  //const re = /^[\+]\{1,4}\ \d{1,2}\ \d{7}$/;
  const re = /^[\+]?[(]?[0-9]{2,3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/im;
  const tested = re.test(phone.toLowerCase());
  return tested;
};
