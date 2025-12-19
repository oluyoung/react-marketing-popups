import{a as m,j as n,s}from"./TriggerVIew.module-B2sM_Qo6.js";import{r}from"./iframe-D8Hhf93p.js";import{B as c,a as u,b as O,c as k,d as h}from"./Right-CmXe0d1I.js";import"./preload-helper-PPVm8Dsz.js";import"./useInactivityTrigger-tBqKm5Lj.js";const f=["open","onOpenChange","onClose","children","elemProps","triggerProps","trigger","isOk"],j={title:"Components/Banner/Core",component:c,args:{open:!1,position:"bottom",duration:300,animation:"slide"},argTypes:{position:{control:"radio",options:["top","bottom","left","right"]},duration:{control:{type:"range",min:300,max:1e4,step:100}},animation:{control:"radio",options:["slide","fade","bounce"]},...m(f)}},o={render:e=>{const[p,a]=r.useState(!1),[l,i]=r.useState(!1),t=()=>i(!0),d=r.useMemo(()=>{switch(e.position){case"top":return n.jsx(h,{onOk:t});case"right":return n.jsx(k,{onOk:t});case"left":return n.jsx(O,{onOk:t});default:return n.jsx(u,{onOk:t})}},[e.position]);return n.jsxs("div",{className:s.container,children:[n.jsx("div",{className:s.centerContent,children:n.jsx("button",{onClick:()=>{i(!1),a(!0)},className:s.showMeBtn,children:"Show Me"})}),n.jsx(c,{...e,id:`banner-${e.position}-${e.animation}`,open:p,onOpenChange:a,isOk:l,closeOnOk:!0,children:d})]})}};o.parameters={...o.parameters,docs:{...o.parameters?.docs,source:{originalSource:`{
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
}`,...o.parameters?.docs?.source}}};const S=["BannerCore"];export{o as BannerCore,S as __namedExportsOrder,j as default};
