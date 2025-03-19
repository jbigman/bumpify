# Bumpify

[![GitHub Super-Linter](https://github.com/actions/typescript-action/actions/workflows/linter.yml/badge.svg)](https://github.com/super-linter/super-linter)
![CI](https://github.com/actions/typescript-action/actions/workflows/ci.yml/badge.svg)
[![Check dist/](https://github.com/actions/typescript-action/actions/workflows/check-dist.yml/badge.svg)](https://github.com/actions/typescript-action/actions/workflows/check-dist.yml)
[![CodeQL](https://github.com/actions/typescript-action/actions/workflows/codeql-analysis.yml/badge.svg)](https://github.com/actions/typescript-action/actions/workflows/codeql-analysis.yml)
[![Coverage](./badges/coverage.svg)](./badges/coverage.svg)﻿

## Purpose

This action updates the dependencies in `package.json` and creates a pull request targeting your main branch. It leverages [npm-check-updates](https://github.com/raineorshine/npm-check-updates) to modify the `package.json` file and [create-pull-request](https://github.com/peter-evans/create-pull-request) to open the pull request.

## Usage

~~~ yaml
name: Bump Dependencies
on:
  schedule:
    - cron: "0 0 * * *" # Runs daily at midnight
  workflow_dispatch:    # Manual triggering allowed

jobs:
  bump-dependencies:
    runs-on: ubuntu-latest
    steps:
      - name: Run Dependency Bump Action
        uses: jbigman/bumpify@v1
        with:
          token: ${{ secrets.PAT_FOR_PULL_REQUEST }}
          
~~~

Full example [here](https://github.com/jbigman/bumpify-example)

## Action inputs

| Name | Description | Default |
| --- | --- | --- |
| `ncu-options` | Any string that could fit with [raineorshine/npm-check-updates](https://github.com/raineorshine/npm-check-updates?tab=readme-ov-file#options) cli.<br> If you want only a bump on minor or patch, set : `-u -t minor` or `-u -t patch` | `-u` |
| `token` | The token that the action will use to checkout branch and create pull request. See [peter-evans/create-pull-request](https://github.com/peter-evans/create-pull-request?tab=readme-ov-file#token) | |

> [!IMPORTANT]  
> Check out personal access token constraints described here: [peter-evans/create-pull-request/#token](https://github.com/peter-evans/create-pull-request?tab=readme-ov-file#token)

Let me know if you need more inputs from [peter-evans/create-pull-request](https://github.com/peter-evans/create-pull-request) 



