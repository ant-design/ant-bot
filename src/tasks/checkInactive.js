#!/usr/bin/env node

require('dotenv').config();
const { getIssues, addLabels, removeLabel } = require('../github');
const Duration = require("duration-js");

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
  } else if (age.days() < 3) {
    const labels = issue.labels.map(l => l.name);
    if (labels.includes(INACTIVE_LABEL)) {
      removeLabel({
        owner: process.env.GITHUB_OWNER,
        repo,
        number: issue.number,
        name: INACTIVE_LABEL,
      })
    }
  }
}

getIssues(repo)
  .then(({ data: issues }) => {
    issues.forEach(checkActive);
  });


