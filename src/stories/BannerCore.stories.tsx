/* eslint-disable react-hooks/rules-of-hooks */
/* eslint-disable react-hooks/exhaustive-deps */
import type { Meta, StoryObj } from '@storybook/react';
import { useMemo, useState } from 'react';
import { Banner } from '../components/Banner';
import { addDisableToProps } from './utils/add-disabled-to-props';
import { BannerBottom } from '../templates/banner/Bottom';
import { BannerLeft } from '../templates/banner/Left';
import { BannerTop } from '../templates/banner/Top';
import { BannerRight } from '../templates/banner/Right';
import styles from './TriggerVIew.module.css';

const disabledProps = ['open', 'onOpenChange', 'onClose', 'children', 'elemProps', 'triggerProps', 'trigger', 'isOk'];

const meta: Meta<typeof Banner> = {
  title: 'Components/Banner/Core',
  component: Banner,
  args: {
    open: false,
    position: 'bottom',
    duration: 300,
    animation: 'slide',
  },
  argTypes: {
    position: {
      control: 'radio',
      options: ['top', 'bottom', 'left', 'right']
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

export const BannerCore: Story = {
  render: (args) => {
    const [open, setOpen] = useState(false);
    const [ok, setOk] = useState(false);

    const handleOk = () => setOk(true);

    const Content = useMemo(() => {
      switch (args.position) {
        case 'top':
          return <BannerTop onOk={handleOk} />
        case 'right':
          return <BannerRight onOk={handleOk} />
        case 'left':
          return <BannerLeft onOk={handleOk} />
        case 'bottom':
        default:
          return <BannerBottom onOk={handleOk} />;
      }
    }, [args.position]);

    return (
      <div className={styles.container}>
        <div className={styles.centerContent}>
          <button onClick={() => { setOk(false); setOpen(true); }} className={styles.showMeBtn}>Show Me</button>
        </div>

        <Banner
          {...args}
          id={`banner-${args.position}-${args.animation}`}
          open={open}
          onOpenChange={setOpen}
          isOk={ok}
          closeOnOk
        >
          {Content}
        </Banner>
      </div>
    );
  },
};
