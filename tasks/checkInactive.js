#!/usr/bin/env node

require('dotenv').config();
const Duration = require("duration-js");
const { getIssues, addLabels, removeLabel } = require('../lib/github');

const repo = process.argv[2];

if (!repo) {
  process.exit(1);
}


function checkActive(issue) {
  const INACTIVE_LABEL = 'Inactive';
  const MAX_AGE_DAYS = 30;
  const age = new Duration(new Date - new Date(issue.updated_at));
  if (age.days() > MAX_AGE_DAYS) {
    addLabels({
      owner: process.env.GITHUB_OWNER,
      repo,
      number: issue.number,
      labels: [INACTIVE_LABEL]
    });
  }
}

getIssues(repo)
  .then(({ data: issues }) => {
    issues.forEach(checkActive);
  });


