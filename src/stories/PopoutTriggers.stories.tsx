/* eslint-disable react-hooks/rules-of-hooks */
import type { Meta, StoryObj } from '@storybook/react';
import { Popout } from '../components/Popout';
import { addDisableToProps } from './utils/add-disabled-to-props';
import PopoutTriggerView from './PopoutTriggerView';

const disabledProps = ['open', 'onOpenChange', 'onClose', 'children', 'elemProps', 'triggerProps', 'trigger', 'isOk'];

const meta: Meta<typeof Popout> = {
  title: 'Components/Popout/Triggers',
  component: Popout,
  parameters: { layout: 'centered' },
  args: {
    duration: 300,
    animation: 'fade'
  },
  argTypes: {
    ...addDisableToProps(disabledProps)
  },
};
export default meta;

type Story = StoryObj<typeof meta>;

export const Timer: Story = {
  args: {
    trigger: 'timer',
    triggerProps: { ms: 3000, enabled: true },
  },
  render: (args) => <PopoutTriggerView {...args} />
};

export const ExitIntent: Story = {
  args: {
    trigger: 'exit',
    triggerProps: {}
  },
  render: (args) => <PopoutTriggerView {...args} />
};

export const ScrollTrigger: Story = {
  args: {
    trigger: 'scroll',
    triggerProps: 30,
  },
  render: (args) => <PopoutTriggerView {...args} />
};

export const Inactivity: Story = {
  args: {
    trigger: 'inactivity',
    triggerProps: 3000,
  },
  render: (args) => <PopoutTriggerView {...args} />
};
