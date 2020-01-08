const { addAssigneesToIssue } = require('../../lib/github');
const { isIssueValid } = require('../../lib/utils');

const components = {
  Affix: 'zombieJ',
  Alert: 'zombieJ',
  Anchor: 'zombieJ',
  AutoComplete: 'zombieJ',
  Avatar: 'zombieJ',
  BackTop: 'zombieJ',
  Badge: 'zombieJ',
  Breadcrumb: 'zombieJ',
  Button: 'zombieJ',
  Calendar: 'zombieJ',
  Card: 'zombieJ',
  Carousel: 'zombieJ',
  Cascader: 'zombieJ',
  Checkbox: 'zombieJ',
  Collapse: 'zombieJ',
  Comment: 'ilanus',
  ConfigProvider: 'zombieJ',
  DatePicker: 'zombieJ',
  Divider: 'zombieJ',
  Dropdown: 'zombieJ',
  Drawer: 'zombieJ',
  Descriptions: 'chenshuai2144',
  Empty: 'zombieJ',
  Form: 'zombieJ',
  Grid: 'zombieJ',
  Icon: 'zombieJ',
  Input: 'zombieJ',
  InputNumber: 'zombieJ',
  Layout: 'zombieJ',
  List: 'zombieJ',
  Mentions: 'zombieJ',
  Menu: 'zombieJ',
  Message: 'zombieJ',
  Modal: 'zombieJ',
  Notification: 'zombieJ',
  Pagination: 'zombieJ',
  Popconfirm: 'zombieJ',
  Popover: 'zombieJ',
  Progress: 'zombieJ',
  Radio: 'zombieJ',
  Rate: 'zombieJ',
  Result: 'chenshuai2144',
  Select: 'zombieJ',
  Slider: 'zombieJ',
  Spin: 'zombieJ',
  Steps: 'zombieJ',
  Switch: 'zombieJ',
  Skeleton: 'zombieJ',
  Table: 'zombieJ',
  Tabs: 'zombieJ',
  Tag: 'zombieJ',
  TimePicker: 'zombieJ',
  Timeline: 'zombieJ',
  Tooltip: 'zombieJ',
  Transfer: 'zombieJ',
  Tree: 'zombieJ',
  TreeSelect: 'zombieJ',
  Typography: 'zombieJ',
  Upload: 'zombieJ',
};

function assignOwner(on) {
  const handler = ({ payload }) => {
    const { issue } = payload;
    if (issue && !isIssueValid(issue)) {
      return;
    }
    const matches = payload.label.name.match(/Component: (.+)/);
    if (!matches) {
      return;
    }
    const component = matches[1];
    const owner = components[component];
    addAssigneesToIssue({
      owner: payload.repository.owner.login,
      repo: payload.repository.name,
      number: issue ? issue.number : payload.pull_request.number,
      assignees: [owner],
    });
  };
  on('issues.labeled', handler);
  on('pull.request.labeled', handler);
}

module.exports = assignOwner;
