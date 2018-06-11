module.exports = function applyAction(context, action) {
  if (action.label) {
    const label = context.issue({ labels: [action.label] });
    context.github.issues.addLabels(label);
  }

  if (action.comment) {
    const comment = context.issue({ body: action.comment });
    context.github.issues.createComment(comment);
  }

  if (action.close) {
    const issue = context.issue({ state: 'closed' });
    context.github.issues.edit(issue);
  }
}
