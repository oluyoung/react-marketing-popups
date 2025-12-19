import{j as e}from"./jsx-runtime-u17CrQMm.js";import{a as b,b as q,c as B,d as v,B as l}from"./Right-CMSO8mP0.js";import{c as O,s as u,a as T}from"./TriggerVIew.module-D1NKuh0z.js";import{R as d,r as p}from"./iframe-CTXKPV8n.js";import{g as P,r as k}from"./index-Dy4pRIVh.js";import"./useInactivityTrigger-C5WikrPV.js";import"./preload-helper-PPVm8Dsz.js";const r=i=>{const[g,x]=d.useState(!1),[h,c]=d.useState(!1),s=()=>c(!0),j=p.useMemo(()=>P(i.trigger,i.triggerProps,"Banner"),[i.trigger,i.triggerProps]),f=p.useMemo(()=>{switch(i.position){case"top":return e.jsx(v,{onOk:s});case"right":return e.jsx(B,{onOk:s});case"left":return e.jsx(q,{onOk:s});default:return e.jsx(b,{onOk:s})}},[i.position]);return e.jsxs("div",{style:{width:"90vw",height:"400px",position:"relative",padding:"20px"},children:[e.jsxs("div",{className:O(u.content,{[u.scrolled]:i.trigger==="scroll"}),children:[e.jsxs("div",{children:[e.jsx("p",{children:j}),e.jsx("button",{onClick:k,className:u.showMeBtn,children:"Reset Persistence"}),e.jsx("p",{children:e.jsx("em",{children:"Note: Resetting persistence will cause a refresh."})})]}),i.trigger==="scroll"&&e.jsxs("div",{children:[e.jsx("br",{}),e.jsx("hr",{}),e.jsx("br",{}),e.jsxs("div",{style:{maxWidth:340},children:[e.jsx("p",{children:"Lorem ipsum dolor, sit amet consectetur adipisicing elit. Reiciendis pariatur sit optio voluptate iure deleniti rem debitis expedita a sapiente dignissimos quia nobis quidem fugiat, ipsum nostrum hic nesciunt molestias."}),e.jsx("p",{children:"Lorem ipsum dolor sit amet consectetur adipisicing elit. Autem, dignissimos quis! Ipsum autem nesciunt error ullam ut animi sunt, odit facere fuga dolorum, rerum consequuntur quae pariatur eos soluta deleniti."}),e.jsx("p",{children:"Lorem ipsum dolor sit, amet consectetur adipisicing elit. Cum, fugiat et. Molestiae animi ratione nemo a, possimus unde, deleniti maiores, eveniet ut sunt fugiat at qui aspernatur illum quae officia."}),e.jsx("p",{children:"Lorem ipsum dolor sit amet consectetur adipisicing elit. Earum harum ad voluptates qui non pariatur eos ut numquam deleniti asperiores officiis sapiente cum aliquam impedit, suscipit distinctio veritatis recusandae. Qui."}),e.jsx("p",{children:"Lorem ipsum dolor sit amet consectetur adipisicing elit. Quam temporibus doloremque, fugiat quod quo assumenda necessitatibus sapiente ducimus modi cupiditate! Enim, expedita? Maiores nulla dolorum omnis illum, eius ab suscipit."}),e.jsx("p",{children:"Lorem ipsum dolor sit amet consectetur adipisicing elit. Quam temporibus doloremque, fugiat quod quo assumenda necessitatibus sapiente ducimus modi cupiditate! Enim, expedita? Maiores nulla dolorum omnis illum, eius ab suscipit."}),e.jsx("p",{children:"Lorem ipsum dolor sit amet consectetur adipisicing elit. Quam temporibus doloremque, fugiat quod quo assumenda necessitatibus sapiente ducimus modi cupiditate! Enim, expedita? Maiores nulla dolorum omnis illum, eius ab suscipit."})]})]})]}),e.jsx(l,{...i,id:`${i.trigger}-${i.position}-${i.animation}`,open:g,onOpenChange:m=>{m||c(!1),x(m)},isOk:h,closeOnOk:!0,children:f})]})};r.__docgenInfo={description:"",methods:[],displayName:"BannerTriggerView"};const w=["open","onOpenChange","onClose","children","elemProps","triggerProps","trigger","isOk"],R={title:"Components/Banner/Triggers",component:l,parameters:{layout:"centered"},args:{position:"bottom",duration:300,animation:"slide"},argTypes:{...T(w)}},t={args:{trigger:"timer",triggerProps:{ms:3e3,enabled:!0}},render:i=>e.jsx(r,{...i})},n={args:{trigger:"exit"},render:i=>e.jsx(r,{...i})},o={args:{trigger:"scroll",triggerProps:30},render:i=>e.jsx(r,{...i})},a={args:{trigger:"inactivity",triggerProps:3e3},render:i=>e.jsx(r,{...i})};t.parameters={...t.parameters,docs:{...t.parameters?.docs,source:{originalSource:`{
  args: {
    trigger: 'timer',
    triggerProps: {
      ms: 3000,
      enabled: true
    }
  },
  render: args => <BannerTriggerView {...args} />
}`,...t.parameters?.docs?.source}}};n.parameters={...n.parameters,docs:{...n.parameters?.docs,source:{originalSource:`{
  args: {
    trigger: 'exit'
  },
  render: args => <BannerTriggerView {...args} />
}`,...n.parameters?.docs?.source}}};o.parameters={...o.parameters,docs:{...o.parameters?.docs,source:{originalSource:`{
  args: {
    trigger: 'scroll',
    triggerProps: 30
  },
  render: args => <BannerTriggerView {...args} />
}`,...o.parameters?.docs?.source}}};a.parameters={...a.parameters,docs:{...a.parameters?.docs,source:{originalSource:`{
  args: {
    trigger: 'inactivity',
    triggerProps: 3000
  },
  render: args => <BannerTriggerView {...args} />
}`,...a.parameters?.docs?.source}}};const V=["Timer","ExitIntent","ScrollTrigger","Inactivity"];export{n as ExitIntent,a as Inactivity,o as ScrollTrigger,t as Timer,V as __namedExportsOrder,R as default};
