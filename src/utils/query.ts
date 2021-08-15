const queryString = require("qs");

export function parseString(search: string): any {
  if (!search) {
    return {};
  }
  const string = search.indexOf("?") === 0 ? search.split("?")[1] : search;
  return queryString.parse(string);
}

export function toQueryString(obj: any): string {
  if (obj === undefined) {
    return "";
  }

  return queryString.stringify(obj);
}

// json字符串转义特殊字符串
export function decodeSpecialString(str: string) {
  str = str.replace(/\\/g, "\\\\");
  str = str.replace(/\n/g, "\\n");
  str = str.replace(/\r/g, "\\r");
  str = str.replace(/\t/g, "\\t");
  str = str.replace(/("")+/g, '""');
  str = str.replace(/\'/g, "&#39;");
  str = str.replace(/ /g, "&nbsp;");
  str = str.replace(/</g, "&lt;");
  str = str.replace(/>/g, "&gt;");
  return str;
}