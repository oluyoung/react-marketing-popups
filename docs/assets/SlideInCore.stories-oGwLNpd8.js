import{j as e}from"./jsx-runtime-u17CrQMm.js";import{R as i,r as m}from"./iframe-EIzCRcNg.js";import{S as l,a as u,b as O}from"./Right-CpipLChm.js";import{a as h,s}from"./TriggerVIew.module-Ct7lohfI.js";import"./preload-helper-PPVm8Dsz.js";const k=["open","onOpenChange","onClose","children","elemProps","triggerProps","trigger","isOk"],I={title:"Components/SlideIn/Core",component:l,args:{open:!1,position:"right",duration:300,animation:"slide"},argTypes:{open:{control:"boolean"},position:{control:"radio",options:["left","right"]},duration:{control:{type:"range",min:300,max:1e4,step:100}},animation:{control:"radio",options:["slide","fade","bounce"]},...h(k)}},n={render:t=>{const[c,o]=i.useState(!1),[d,r]=i.useState(!1),a=()=>r(!0),p=m.useMemo(()=>t.position==="right"?e.jsx(O,{onOk:a}):e.jsx(u,{onOk:a}),[t.position]);return e.jsxs("div",{className:s.container,children:[e.jsx("div",{className:s.centerContent,children:e.jsx("button",{onClick:()=>{r(!1),o(!0)},className:s.showMeBtn,children:"Show Me"})}),e.jsx(l,{...t,open:c,onOpenChange:o,isOk:d,closeOnOk:!0,children:p})]})}};n.parameters={...n.parameters,docs:{...n.parameters?.docs,source:{originalSource:`{
  render: args => {
    const [open, setOpen] = React.useState(false);
    const [ok, setOk] = React.useState(false);
    const handleOk = () => setOk(true);
    const Content = useMemo(() => {
      switch (args.position) {
        case 'right':
          return <SlideInLeft onOk={handleOk} />;
        case 'left':
        default:
          return <SlideInRight onOk={handleOk} />;
      }
    }, [args.position]);
    return <div className={styles.container}>\r
        <div className={styles.centerContent}>\r
          <button onClick={() => {
          setOk(false);
          setOpen(true);
        }} className={styles.showMeBtn}>Show Me</button>\r
        </div>\r
\r
        <SlideIn {...args} open={open} onOpenChange={setOpen} isOk={ok} closeOnOk>\r
          {Content}\r
        </SlideIn>\r
      </div>;
  }
}`,...n.parameters?.docs?.source}}};const b=["SlideInCore"];export{n as SlideInCore,b as __namedExportsOrder,I as default};
