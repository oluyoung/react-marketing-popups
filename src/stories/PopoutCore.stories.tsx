/* eslint-disable react-hooks/rules-of-hooks */
import type { Meta, StoryObj } from '@storybook/react';
import React from 'react';
import { Popout } from '../components/Popout/Popout';
import { addDisableToProps } from './utils/add-disabled-to-props';
import { PopoutCenter } from '../templates/popout/Center';
import styles from './TriggerVIew.module.css';

const disabledProps = ['open', 'onOpenChange', 'onClose', 'children', 'elemProps', 'triggerProps', 'trigger', 'isOk'];

const meta: Meta<typeof Popout> = {
  title: 'Components/Popout/Core',
  component: Popout,
  args: {
    duration: 300,
    animation: 'zoom',
    closeOnOverlay: true,
  },
  argTypes: {
    duration: {
      control: { type: 'range', min: 300, max: 10000, step: 100 }
    },
    animation: {
      control: 'radio',
      options: ['zoom', 'fade', 'bounce']
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
      <div className={styles.container}>
        <div className={styles.centerContent}>
          <button onClick={() => { setOk(false); setOpen(true); }} className={styles.showMeBtn}>Show Me</button>
        </div>

        <Popout
          {...args}
          id={`popout-${args.animation}`}
          open={open}
          onOpenChange={setOpen}
          isOk={ok}
          closeOnOk
        >
          <PopoutCenter onOk={() => setOk(true)} />
        </Popout>
      </div>
    );
  },
};
