#!/usr/bin/env node

require('dotenv').config();
const Duration = require("duration-js");
const { getIssues, addLabels, removeLabel, closeIssue } = require('../lib/github');

const repo = process.argv[2];

if (!repo) {
  process.exit(1);
}


function checkActive(issue) {
  const INACTIVE_LABEL = 'Inactive';
  const NEED_REPRODUCE_LABEL = 'Need Reproduce';
  const MAX_AGE_DAYS = 30;
  const NEED_REPRODUCE_MAX_AGE_DAYS = 7;
  const age = new Duration(new Date - new Date(issue.updated_at));
  if (age.days() > MAX_AGE_DAYS) {
    addLabels({
      owner: process.env.GITHUB_OWNER,
      repo,
      number: issue.number,
      labels: [INACTIVE_LABEL]
    });
  }
  const labels = issue.labels.map(l => l.name);
  if (labels.include(NEED_REPRODUCE_LABEL) && age.days() > NEED_REPRODUCE_MAX_AGE_DAYS) {
    closeIssue({
      owner: process.env.GITHUB_OWNER,
      repo,
      number: issue.number,
    });
  }
}

getIssues(repo)
  .then(({ data: issues }) => {
    issues.forEach(checkActive);
  });


