# Little Snitch Rules

Generates rule groups that can be [subscribed to](https://help.obdev.at/littlesnitch5/lsc-rule-group-subscriptions) within [Little Snitch](https://www.obdev.at/products/littlesnitch/index.html) (the non-mini version)

Created because I wanted these myself and then i can just as well share it with others.

## Available rule groups

### VS Code

#### URL:

[`https://raw.githubusercontent.com/voxpelli/lsrules/refs/heads/main/rules/vscode.lsrules`](https://raw.githubusercontent.com/voxpelli/lsrules/refs/heads/main/rules/vscode.lsrules)

#### Source:

Generated from the [markdown source](https://github.com/microsoft/vscode-docs/blob/main/docs/setup/network.md) of the ["Network Connections in Visual Studio Code"](https://code.visualstudio.com/docs/setup/network#_common-hostnames) documentation page and includes the notes from that page for each rule it adds. Adds both domain name rules (the `*.` prefixed ones) and host name rules (all the others) and sets them all to `allow` for HTTPS traffic from the VSCode app.

## Similar projects

* [`jasuca/little-snitch-rules`](https://github.com/jasuca/little-snitch-rules) / [`ruimarinho/little-snitch-rules`](https://github.com/ruimarinho/little-snitch-rules) / [`voxpelli/little-snitch-rules`](https://github.com/voxpelli/little-snitch-rules) – manually maintained rule sets
