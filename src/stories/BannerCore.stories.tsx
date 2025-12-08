import type { Meta, StoryObj } from '@storybook/react';
import React from 'react';
import { Banner } from '../components/Banner';
import { addDisableToProps } from './utils/add-disabled-to-props';

const disabledProps = ['open', 'onOpenChange', 'onClose', 'children', 'elemProps', 'triggerProps', 'trigger', 'isOk'];

const meta: Meta<typeof Banner> = {
  title: 'Components/Banner/Core',
  component: Banner,
  args: {
    id: 'demo-banner',
    open: false,
    position: 'bottom',
    duration: 300,
    animation: 'slide',
    children: <h2>Banner content</h2>,
  },
  argTypes: {
    position: { 
      control: 'select',
      options: ['top', 'bottom', 'left', 'right']
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

export const BannerCore: Story = {
  render: (args) => {
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const [open, setOpen] = React.useState(false);

    return (
      <div style={{ width: '100%', height: 300, position: 'relative' }}>
        <div style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)' }}>
          <button onClick={() => setOpen(true)} style={{ backgroundColor: 'black', border: '2px solid black', color: 'white', padding: '8px 14px', fontSize: '20px' }}>Show Me</button>
        </div>

        <Banner
          {...args}
          id="demo-banner"
          open={open}
          onOpenChange={setOpen}
        />
      </div>
    );
  },
};
