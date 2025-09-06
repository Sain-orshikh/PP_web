import React from 'react'

import { lineSpinner } from 'ldrs'

import TransitionAnimation from '@/components/TransitionAnimation'

lineSpinner.register()

// Default values shown


const TestPage: React.FC = () => {

  const content = '<p>ASSSSn asdasda    askkdksdksdka   asjdaljsdlkajsdlkad     asjdalsdaskdadsa    <strong>  asdadsad</strong></p>';
  
  const [render, setRender] = React.useState(false);
  React.useEffect(() => {
    setTimeout(() => {
      setRender(true);
    }, 200);
  }, []);

  return (
    <>
    <TransitionAnimation>Test</TransitionAnimation>
    {render && (
    <>
    {React.createElement('l-line-spinner', {
      size: "40",
      stroke: "3",
      speed: "1", 
      color: "black" 
    })}
    <div>TestPage</div>
    <div dangerouslySetInnerHTML={{ __html: content }} />
    </>
    )}
    </>
  )
}

export default TestPage;
