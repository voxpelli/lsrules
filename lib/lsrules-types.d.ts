export interface LSRules {
  name: string
  description: string
  rules: LSRule[]
}

export interface BaseLSRule {
  /**
   * The process executable path to match. Use "any" to match any process, or provide the full path to the executable.
   * For apps, this is the path to the app’s executable, not the app wrapper.
   * Example: "/Applications/Safari.app/Contents/MacOS/Safari"
   */
  process: string;

  /**
   * Optional. If set, the rule only matches if the executable uses a specific helper tool (by its path).
   * Example: You could match "Terminal via ping" by setting process to Terminal’s path and via to ping’s path.
   * Note: A rule for Terminal with no "via" will also match connections of "Terminal via ping".
   */
  via?: string;

  /**
   * Optional. The connection direction. "incoming" or "outgoing". Defaults to "outgoing".
   */
  direction?: 'incoming' | 'outgoing';

  /**
   * Optional. The rule action. "allow", "deny", or "ask". Defaults to "ask".
   */
  action?: 'allow' | 'deny' | 'ask';

  /**
   * Optional. The rule priority. "regular" or "high". Defaults to "regular".
   */
  priority?: 'regular' | 'high';

  /**
   * Optional. Whether or not the rule is disabled by default. Defaults to false.
   */
  disabled?: boolean;

  /**
   * Optional. The ports the rule matches. Can be "any" (default), a single port (e.g. "443"), or a range (e.g. "123-456").
   */
  ports?: string;

  /**
   * Optional. The protocol the rule matches. Can be a numeric value as defined in /etc/protocols (e.g. "6" for TCP), or the protocol name (e.g. "tcp"). Defaults to any protocol.
   */
  protocol?: string;

  /**
   * Optional. Notes for the rule.
   */
  notes?: string;
}

export interface LSRuleAddresses extends BaseLSRule {
  'remote-addresses': string
}

export interface LSRuleDomains extends BaseLSRule {
  'remote-domains': string[] | string
}

export interface LSRuleHosts extends BaseLSRule {
  'remote-hosts': string[] | string
}

export interface LSRuleType extends BaseLSRule {
  remote: 'any' | 'local-net' | 'multicast' | 'broadcast' | 'bonjour' | 'dns-servers' | 'bpf'
}
export type LSRule =
  LSRuleAddresses |
  LSRuleDomains |
  LSRuleHosts |
  LSRuleType;
