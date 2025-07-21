/**
 * @param {string} md
 * @param {string} startAtHeader
 * @returns {Map<string, string>}
 */
export function extractHostnamesWithNotes (md, startAtHeader) {
  const lines = md.split('\n');
  const start = lines.findIndex(line => line.startsWith(startAtHeader));

  if (start === -1) {
    return new Map();
  }

  /** @type {Map<string, string>} */
  const hosts = new Map();

  let foundList = false;

  for (const line of lines.slice(start)) {
    const match = line.match(/^\* `([^`]+)` - (.+)$/);

    if (match && match[1] && match[2]) {
      foundList = true;
      hosts.set(match[1], match[2]);
    } else if (foundList) {
      break;
    }
  }

  return hosts;
}
