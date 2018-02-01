export function isIssueValid(issue) {
  const mark = 'ant-design-issue-helper';
  return issue.body.includes(mark);
}
