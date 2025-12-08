/* eslint-disable react-hooks/rules-of-hooks */
import type { Meta, StoryObj } from '@storybook/react';
import React from 'react';
import { Popout } from '../components/Popout/Popout';
import { addDisableToProps } from './utils/add-disabled-to-props';

const disabledProps = ['open', 'onOpenChange', 'onClose', 'children', 'elemProps', 'triggerProps', 'trigger', 'isOk'];

const meta: Meta<typeof Popout> = {
  title: 'Components/Popout/Core',
  component: Popout,
  args: {
    duration: 300,
    animation: 'fade',
    closeOnOverlay: true,
  },
  argTypes: {
    duration: {
      control: { type: 'range', min: 300, max: 10000, step: 100 }
    },
    animation: {
      control: 'select',
      options: ['fade', 'slide', 'bounce']
    },
    ...addDisableToProps(disabledProps)
  },
};
export default meta;

type Story = StoryObj<typeof meta>;

export const PopoutCore: Story = {
  render: (args) => {
    const [open, setOpen] = React.useState(false);
    const [ok, setOk] = React.useState(false);

    return (
      <div style={{ width: '90vw', height: 400 }}>
        <button onClick={() => {setOpen(true); setOk(false); }}>Show Me</button>

        <Popout
          {...args}
          id={`popout-${args.animation}`}
          open={open}
          onOpenChange={setOpen}
          isOk={ok}
        >
          <div>
            <h4>This is popup content</h4>
            <button onClick={() => setOk(true)}>OK</button>
          </div>
        </Popout>
      </div>
    );
  },
};
