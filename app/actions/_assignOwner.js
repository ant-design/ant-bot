const { addAssigneesToIssue } = require('../../lib/github');
const { isIssueValid } = require('../../lib/utils');

const components = {
  Affix: 'cipchk',
  Alert: 'vthinkxie',
  Anchor: 'cipchk',
  AutoComplete: 'HsuanXyz',
  Avatar: 'HsuanXyz',
  BackTop: 'cipchk',
  Badge: 'HsuanXyz',
  Breadcrumb: 'wendzhue',
  Button: 'vthinkxie',
  Calendar: 'wilsoncook',
  Card: 'vthinkxie',
  Carousel: 'vthinkxie',
  Cascader: 'wendzhue',
  Checkbox: 'vthinkxie',
  Collapse: 'vthinkxie',
  DatePicker: 'wilsoncook',
  Divider: 'vthinkxie',
  Dropdown: 'vthinkxie',
  Form: 'vthinkxie',
  Grid: 'vthinkxie',
  Icon: 'wendzhue',
  Input: 'vthinkxie',
  InputNumber: 'vthinkxie',
  Layout: 'vthinkxie',
  List: 'cipchk',
  Mention: 'HsuanXyz',
  Menu: 'vthinkxie',
  Message: 'wendzhue',
  Modal: 'HsuanXyz',
  Notification: 'wendzhue',
  Pagination: 'vthinkxie',
  Popconfirm: 'wendzhue',
  Popover: 'wendzhue',
  Progress: 'wendzhue',
  Radio: 'vthinkxie',
  Rate: 'wendzhue',
  Select: 'vthinkxie',
  Slider: 'wendzhue',
  Spin: 'vthinkxie',
  Steps: 'HsuanXyz',
  Switch: 'vthinkxie',
  Table: 'vthinkxie',
  Tabs: 'vthinkxie',
  Tag: 'HsuanXyz',
  TimePicker: 'wilsoncook',
  Timeline: 'wendzhue',
  Tooltip: 'wendzhue',
  Transfer: 'cipchk',
  Tree: 'simplejason',
  TreeSelect: 'HsuanXyz',
  Upload: 'cipchk',
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
