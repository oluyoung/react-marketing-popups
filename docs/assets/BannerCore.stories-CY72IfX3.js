import{j as n}from"./jsx-runtime-u17CrQMm.js";import{r as s}from"./iframe-CTXKPV8n.js";import{B as c,a as m,b as u,c as O,d as k}from"./Right-CMSO8mP0.js";import{a as h,s as r}from"./TriggerVIew.module-D1NKuh0z.js";import"./preload-helper-PPVm8Dsz.js";import"./useInactivityTrigger-C5WikrPV.js";const f=["open","onOpenChange","onClose","children","elemProps","triggerProps","trigger","isOk"],S={title:"Components/Banner/Core",component:c,args:{open:!1,position:"bottom",duration:300,animation:"slide"},argTypes:{position:{control:"radio",options:["top","bottom","left","right"]},duration:{control:{type:"range",min:300,max:1e4,step:100}},animation:{control:"radio",options:["slide","fade","bounce"]},...h(f)}},o={render:e=>{const[p,a]=s.useState(!1),[l,i]=s.useState(!1),t=()=>i(!0),d=s.useMemo(()=>{switch(e.position){case"top":return n.jsx(k,{onOk:t});case"right":return n.jsx(O,{onOk:t});case"left":return n.jsx(u,{onOk:t});default:return n.jsx(m,{onOk:t})}},[e.position]);return n.jsxs("div",{className:r.container,children:[n.jsx("div",{className:r.centerContent,children:n.jsx("button",{onClick:()=>{i(!1),a(!0)},className:r.showMeBtn,children:"Show Me"})}),n.jsx(c,{...e,id:`banner-${e.position}-${e.animation}`,open:p,onOpenChange:a,isOk:l,closeOnOk:!0,children:d})]})}};o.parameters={...o.parameters,docs:{...o.parameters?.docs,source:{originalSource:`{
  render: args => {
    const [open, setOpen] = useState(false);
    const [ok, setOk] = useState(false);
    const handleOk = () => setOk(true);
    const Content = useMemo(() => {
      switch (args.position) {
        case 'top':
          return <BannerTop onOk={handleOk} />;
        case 'right':
          return <BannerRight onOk={handleOk} />;
        case 'left':
          return <BannerLeft onOk={handleOk} />;
        case 'bottom':
        default:
          return <BannerBottom onOk={handleOk} />;
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
        <Banner {...args} id={\`banner-\${args.position}-\${args.animation}\`} open={open} onOpenChange={setOpen} isOk={ok} closeOnOk>\r
          {Content}\r
        </Banner>\r
      </div>;
  }
}`,...o.parameters?.docs?.source}}};const v=["BannerCore"];export{o as BannerCore,v as __namedExportsOrder,S as default};
