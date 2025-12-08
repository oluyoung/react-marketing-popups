/* eslint-disable react-hooks/rules-of-hooks */
import type { Meta, StoryObj } from '@storybook/react';
import { SlideIn } from '../components/SlideIn';
import { addDisableToProps } from './utils/add-disabled-to-props';
import SlideInTriggerView from './SlideInTriggerView';

const disabledProps = ['open', 'onOpenChange', 'onClose', 'children', 'elemProps', 'triggerProps', 'trigger', 'isOk'];

const meta: Meta<typeof SlideIn> = {
  title: 'Components/SlideIn/Triggers',
  component: SlideIn,
  parameters: { layout: 'centered' },
  args: {
    position: 'left',
    duration: 300,
    animation: 'slide'
  },
  argTypes: {
    position: { 
      control: 'select',
      options: ['left', 'right']
    },
    duration: {
      control: { type: 'range', min: 300, max: 10000, step: 100 }
    },
    animation: {
      control: 'select',
      options: ['slide', 'fade', 'bounce']
    },
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
  render: (args) => <SlideInTriggerView {...args} />
};

export const ExitIntent: Story = {
  args: {
    trigger: 'exit',
    triggerProps: {}
  },
  render: (args) => <SlideInTriggerView {...args} />
};

export const ScrollTrigger: Story = {
  args: {
    trigger: 'scroll',
    triggerProps: { percent: 30 },
  },
  render: (args) => <SlideInTriggerView {...args} />
};

export const Inactivity: Story = {
  args: {
    trigger: 'inactivity',
    triggerProps: 3000,
  },
  render: (args) => <SlideInTriggerView {...args} />
};
