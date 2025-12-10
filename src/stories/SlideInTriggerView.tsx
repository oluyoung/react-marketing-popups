import React, { useMemo } from 'react'
import { reset } from './utils/reset-persistence';
import { getInstruction } from './utils';
import cn from 'classnames';
import styles from './TriggerVIew.module.css';
import { SlideIn } from '../components/SlideIn';
import { SlideInLeft } from '../templates/slideIn/Left';
import { SlideInRight } from '../templates/slideIn/Right';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const SlideInTriggerView = (args: any) => {
  const [open, setOpen] = React.useState(false);
  const [ok, setOk] = React.useState(false);

  const instructions = useMemo(() => getInstruction(args.trigger, args.triggerProps, 'SlideIn'), [args.trigger, args.triggerProps])

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
    <div style={{ width: '90vw', height: '400px', position: 'relative', padding: '20px' }}>
      <div className={cn(styles.content, { [styles.scrolled]: args.trigger === 'scroll' })}>
        <div>
          <p>{instructions}</p>
          <button onClick={reset}>Reset Persistence</button>
          <p><em>Note: Resetting persistence will cause a refresh.</em></p>
        </div>
        {args.trigger === 'scroll' && (
          <div>
            <br />
            <hr />
            <br />
            <div style={{ maxWidth: 340 }}>
              <p>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Reiciendis pariatur sit optio voluptate iure deleniti rem debitis expedita a sapiente dignissimos quia nobis quidem fugiat, ipsum nostrum hic nesciunt molestias.</p>
              <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Autem, dignissimos quis! Ipsum autem nesciunt error ullam ut animi sunt, odit facere fuga dolorum, rerum consequuntur quae pariatur eos soluta deleniti.</p>
              <p>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Cum, fugiat et. Molestiae animi ratione nemo a, possimus unde, deleniti maiores, eveniet ut sunt fugiat at qui aspernatur illum quae officia.</p>
              <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Earum harum ad voluptates qui non pariatur eos ut numquam deleniti asperiores officiis sapiente cum aliquam impedit, suscipit distinctio veritatis recusandae. Qui.</p>
              <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Quam temporibus doloremque, fugiat quod quo assumenda necessitatibus sapiente ducimus modi cupiditate! Enim, expedita? Maiores nulla dolorum omnis illum, eius ab suscipit.</p>
              <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Quam temporibus doloremque, fugiat quod quo assumenda necessitatibus sapiente ducimus modi cupiditate! Enim, expedita? Maiores nulla dolorum omnis illum, eius ab suscipit.</p>
              <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Quam temporibus doloremque, fugiat quod quo assumenda necessitatibus sapiente ducimus modi cupiditate! Enim, expedita? Maiores nulla dolorum omnis illum, eius ab suscipit.</p>
            </div>
          </div>
        )}
      </div>

      <SlideIn
        {...args}
        id={`${args.trigger}-${args.position}-${args.animation}`}
        open={open}
        onOpenChange={(value) => {
          if (!value) setOk(false);
          setOpen(value);
        }}
        isOk={ok}
        closeOnOk
      >
        {Content}
      </SlideIn>
    </div>
  );
}

export default SlideInTriggerView