const { addLabels } = require('../../lib/github');

const components = [
  'Affix',
  'Alert',
  'Anchor',
  'AutoComplete',
  'Avatar',
  'BackTop',
  'Badge',
  'Breadcrumb',
  'Button',
  'Calendar',
  'Card',
  'Carousel',
  'Cascader',
  'Checkbox',
  'Collapse',
  'DatePicker',
  'Divider',
  'Dropdown',
  'Form',
  'Grid',
  'Icon',
  'Input',
  'InputNumber',
  'Layout',
  'List',
  'Mention',
  'Menu',
  'Message',
  'Modal',
  'Notification',
  'Pagination',
  'Popconfirm',
  'Popover',
  'Progress',
  'Radio',
  'Rate',
  'Select',
  'Slider',
  'Spin',
  'Steps',
  'Switch',
  'Table',
  'Tabs',
  'Tag',
  'TimePicker',
  'Timeline',
  'Tooltip',
  'Transfer',
  'Tree',
  'TreeSelect',
  'Upload',
];

function addComponentLabel(on) {
  on('issues_opened', ({ payload, repo }) => {
    if (repo !== 'ant-design') {
      return;
    }
    const { issue } = payload;
    let label;
    for (let i = 0; i < components.length; ++i) {
      const component = components[i];
      if (issue.title.includes(component) || issue.title.includes(component.toLowerCase())) {
        label = `Component: ${component}`;
        break;
      }
    }

    if (label) {
      addLabels({
        owner: payload.repository.owner.login,
        repo,
        number: issue.number,
        labels: [label],
      });
    }
  });
}

module.exports = addComponentLabel;
