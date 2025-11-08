import type { Meta, StoryObj } from '@storybook/react-vite'

import { Popout } from './';

const reset = () => {
  localStorage.clear();
}

const meta = {
  title: 'Components/Popout',
  component: Popout,
  parameters: {
    layout: 'centered',
  },
  decorators: (Story) => (
    <div style={{ height: '300px', width: '100vw' }}>
      {/* 👇 Decorators in Storybook also accept a function. Replace <Story/> with Story() to enable it  */}
      <Story />
    </div>
  ),
  tags: ['autodocs'],
  args: {
    open: true,
    onOpenChange: (open: boolean) => {
      console.log({open})
    },
    ariaLabel: 'react-marketing-popup',
    closeOnOverlay: true,
    // lockScroll: false,
    children: <h1>This is popup content.</h1>,
    id: '1',
  },
} satisfies Meta<typeof Popout>

export default meta
type Story = StoryObj<typeof meta>

export const PopoutByTimer: Story = {
  decorators: (Story) => (
    <div style={{ height: '300px', width: '100vw' }}>
      {/* 👇 Decorators in Storybook also accept a function. Replace <Story/> with Story() to enable it  */}
      <p>Wait for 3 seconds and the popout will open</p>
      <button onClick={reset}>RESET</button>
      <Story />
    </div>
  ),
  args: {
    // lockScroll: true,
    trigger: 'timer',
    triggerProps: 3000
  },
}

export const PopoutByExit: Story = {
  decorators: (Story) => (
    <div style={{ height: '300px', width: '100vw' }}>
      {/* 👇 Decorators in Storybook also accept a function. Replace <Story/> with Story() to enable it  */}
      <p>Move the cursor up and the popout will open</p>
      <button onClick={reset}>RESET</button>
      <Story />
    </div>
  ),
  args: {
    // lockScroll: true,
    trigger: 'exit',
    triggerProps: {}
  },
}

export const PopoutByInactivity: Story = {
  decorators: (Story) => (
    <div style={{ height: '300px', width: '100vw' }}>
      {/* 👇 Decorators in Storybook also accept a function. Replace <Story/> with Story() to enable it  */}
      <p>Stay still for 3 seconds and the popout will open</p>
      <button onClick={reset}>RESET</button>
      <Story />
    </div>
  ),
  args: {
    // lockScroll: true,
    trigger: 'exit',
    triggerProps: 3000
  },
}

export const PopoutByScroll: Story = {
  decorators: (Story) => (
    <div style={{ height: '300px', width: '100vw' }}>
      {/* 👇 Decorators in Storybook also accept a function. Replace <Story/> with Story() to enable it  */}
      <p>Scroll down and the popout will open</p>
      <button onClick={reset}>RESET</button>
      <br />
      <hr />
      <br />
      <div style={{ maxWidth: 240 }}>
        <p>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Reiciendis pariatur sit optio voluptate iure deleniti rem debitis expedita a sapiente dignissimos quia nobis quidem fugiat, ipsum nostrum hic nesciunt molestias.</p>
        <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Autem, dignissimos quis! Ipsum autem nesciunt error ullam ut animi sunt, odit facere fuga dolorum, rerum consequuntur quae pariatur eos soluta deleniti.</p>
        <p>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Cum, fugiat et. Molestiae animi ratione nemo a, possimus unde, deleniti maiores, eveniet ut sunt fugiat at qui aspernatur illum quae officia.</p>
        <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Earum harum ad voluptates qui non pariatur eos ut numquam deleniti asperiores officiis sapiente cum aliquam impedit, suscipit distinctio veritatis recusandae. Qui.</p>
        <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Quam temporibus doloremque, fugiat quod quo assumenda necessitatibus sapiente ducimus modi cupiditate! Enim, expedita? Maiores nulla dolorum omnis illum, eius ab suscipit.</p>
      </div>

      <Story />
    </div>
  ),
  args: {
    // lockScroll: true,
    trigger: 'scroll',
    triggerProps: 30
  },
}

export const CloseOnOverlay: Story = {
  args: {
    closeOnOverlay: false,
  },
}
