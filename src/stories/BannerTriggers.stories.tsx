/* eslint-disable react-hooks/rules-of-hooks */
import type { Meta, StoryObj } from '@storybook/react';
import { Banner } from '../components/Banner';
import { addDisableToProps } from './utils/add-disabled-to-props';
import BannerTriggerView from './BannerTriggerView';

const disabledProps = ['open', 'onOpenChange', 'onClose', 'children', 'elemProps', 'triggerProps', 'trigger', 'isOk'];

const meta: Meta<typeof Banner> = {
  title: 'Components/Banner/Triggers',
  component: Banner,
  parameters: { layout: 'centered' },
  args: {
    position: 'bottom',
    duration: 300,
    animation: 'slide'
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
  render: (args) => <BannerTriggerView {...args} />
};

export const ExitIntent: Story = {
  args: {
    trigger: 'exit',
  },
  render: (args) => <BannerTriggerView {...args} />
};

export const ScrollTrigger: Story = {
  args: {
    trigger: 'scroll',
    triggerProps: { percent: 30 },
  },
  render: (args) => <BannerTriggerView {...args} />
};

export const Inactivity: Story = {
  args: {
    trigger: 'inactivity',
    triggerProps: 3000,
  },
  render: (args) => <BannerTriggerView {...args} />
};
