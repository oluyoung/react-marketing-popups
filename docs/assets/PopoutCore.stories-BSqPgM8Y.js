import{j as e}from"./jsx-runtime-u17CrQMm.js";import{R as a}from"./iframe-BzEvXL70.js";import{P as i,a as l}from"./Center-C24X_Doz.js";import{a as m,s as n}from"./TriggerVIew.module-CYY0_GhO.js";import"./preload-helper-PPVm8Dsz.js";const u=["open","onOpenChange","onClose","children","elemProps","triggerProps","trigger","isOk"],P={title:"Components/Popout/Core",component:i,args:{duration:300,animation:"zoom",closeOnOverlay:!0},argTypes:{duration:{control:{type:"range",min:300,max:1e4,step:100}},animation:{control:"radio",options:["zoom","fade","bounce"]},...m(u)}},o={render:t=>{const[p,s]=a.useState(!1),[c,r]=a.useState(!1);return e.jsxs("div",{className:n.container,children:[e.jsx("div",{className:n.centerContent,children:e.jsx("button",{onClick:()=>{r(!1),s(!0)},className:n.showMeBtn,children:"Show Me"})}),e.jsx(i,{...t,id:`popout-${t.animation}`,open:p,onOpenChange:s,isOk:c,closeOnOk:!0,children:e.jsx(l,{onOk:()=>r(!0)})})]})}};o.parameters={...o.parameters,docs:{...o.parameters?.docs,source:{originalSource:`{
  render: args => {
    const [open, setOpen] = React.useState(false);
    const [ok, setOk] = React.useState(false);
    return <div className={styles.container}>\r
        <div className={styles.centerContent}>\r
          <button onClick={() => {
          setOk(false);
          setOpen(true);
        }} className={styles.showMeBtn}>Show Me</button>\r
        </div>\r
\r
        <Popout {...args} id={\`popout-\${args.animation}\`} open={open} onOpenChange={setOpen} isOk={ok} closeOnOk>\r
          <PopoutCenter onOk={() => setOk(true)} />\r
        </Popout>\r
      </div>;
  }
}`,...o.parameters?.docs?.source}}};const f=["PopoutCore"];export{o as PopoutCore,f as __namedExportsOrder,P as default};
