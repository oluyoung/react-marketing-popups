/* eslint-disable react-hooks/rules-of-hooks */
import type { Meta, StoryObj } from '@storybook/react';
import React, { useMemo } from 'react';
import { SlideIn } from '../components/SlideIn/SlideIn';
import { addDisableToProps } from './utils/add-disabled-to-props';
import { SlideInLeft } from '../templates/slideIn/Left';
import { SlideInRight } from '../templates/slideIn/Right';

const disabledProps = ['open', 'onOpenChange', 'onClose', 'children', 'elemProps', 'triggerProps', 'trigger', 'isOk'];

const meta: Meta<typeof SlideIn> = {
  title: 'Components/SlideIn/Core',
  component: SlideIn,
  args: {
    open: false,
    position: 'right',
    duration: 300,
    animation: 'slide',
  },
  argTypes: {
    open: { control: 'boolean' },
    position: {
      control: 'radio',
      options: ['left', 'right']
    },
    duration: {
      control: { type: 'range', min: 300, max: 10000, step: 100 }
    },
    animation: {
      control: 'radio',
      options: ['slide', 'fade', 'bounce']
    },
    ...addDisableToProps(disabledProps)
  },
};
export default meta;

type Story = StoryObj<typeof meta>;

export const SlideInCore: Story = {
  render: (args) => {
    const [open, setOpen] = React.useState(false);
    const [ok, setOk] = React.useState(false);

    const handleOk = () => setOk(true);

    const Content = useMemo(() => {
      switch (args.position) {
        case 'right':
          return <SlideInLeft onOk={handleOk} />
        case 'left':
        default:
          return <SlideInRight onOk={handleOk} />;
      }
    }, [args.position]);

    return (
      <div style={{ width: '90vw', height: 400 }}>
        <button onClick={() => { setOk(false); setOpen(true); }}>Show Me</button>

        <SlideIn
          {...args}
          open={open}
          onOpenChange={setOpen}
          isOk={ok}
        >
          {Content}
        </SlideIn>
      </div>
    );
  },
};
