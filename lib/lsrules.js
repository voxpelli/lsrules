/**
 * @param {Map<string, string>} hostnamesWithNotes
 * @param {{ name: string, process: string, description?: string }} options
 * @returns {import('./lsrules-types.d.ts').LSRules}
 */
export function generateLSRulesFromHostnames (hostnamesWithNotes, options) {
  const {
    description = '',
    name,
    process,
  } = options;

  /** @type {import('./lsrules-types.d.ts').LSRule[]} */
  const rules = [];

  for (const [hostname, notes] of hostnamesWithNotes) {
    /** @type {import('./lsrules-types.d.ts').BaseLSRule} */
    const baseRule = {
      action: 'allow',
      ports: '443',
      process,
      protocol: 'tcp',
      notes,
    };

    if (hostname.startsWith('*.')) {
      /** @type {import('./lsrules-types.d.ts').LSRuleDomains} */
      const rule = {
        ...baseRule,
        'remote-domains': hostname.slice(2),
      };

      rules.push(rule);
    } else {
      /** @type {import('./lsrules-types.d.ts').LSRuleHosts} */
      const rule = {
        ...baseRule,
        'remote-hosts': hostname,
      };

      rules.push(rule);
    }
  }

  return {
    name,
    description,
    rules,
  };
}
