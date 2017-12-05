#!/usr/bin/env node

require('dotenv').config();
const Duration = require('duration-js');
const { getIssues, addLabels, removeLabel, closeIssue, commentIssue } = require('../lib/github');

const repo = process.argv[2];

if (!repo) {
  process.exit(1);
}

const commnet = `
  This issue is closed because it has been marked as \`Need Reproduce\`, but has not had recent activity.
  If you can provide a reproduce, feel free to ping anyone of our maintainers to reopen this issue.
  Thank you for your contributions.
`;

function checkActive(issue) {
  const INACTIVE_LABEL = 'Inactive';
  const NEED_REPRODUCE_LABEL = 'Need Reproduce';
  const MAX_AGE_DAYS = 30;
  const NEED_REPRODUCE_MAX_AGE_DAYS = 7;
  const age = new Duration(new Date() - new Date(issue.updated_at));
  if (age.days() > MAX_AGE_DAYS) {
    addLabels({
      owner: process.env.GITHUB_OWNER,
      repo,
      number: issue.number,
      labels: [INACTIVE_LABEL],
    });
  }
  const labels = issue.labels.map(l => l.name);
  if (labels.includes(NEED_REPRODUCE_LABEL) && age.days() > NEED_REPRODUCE_MAX_AGE_DAYS) {
    commentIssue({
      owner: process.env.GITHUB_OWNER,
      repo,
      number: issue.number,
      body: commnet,
    });

    closeIssue({
      owner: process.env.GITHUB_OWNER,
      repo,
      number: issue.number,
    });
  }
}

getIssues(repo).then(({ data: issues }) => {
  issues.forEach(checkActive);
});
