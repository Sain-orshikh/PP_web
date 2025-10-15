import React from 'react'

import { lineSpinner } from 'ldrs'

lineSpinner.register()

// Default values shown


const TestPage = () => {
  const content = '<p>ASSSSn asdasda    askkdksdksdka   asjdaljsdlkajsdlkad     asjdalsdaskdadsa    <strong>  asdadsad</strong></p>';
  return (
    <>
    <l-line-spinner
      size="40"
      stroke="3"
      speed="1" 
      color="black" 
    ></l-line-spinner>
    <div>TestPage</div>
    <div dangerouslySetInnerHTML={{ __html: content }} />
    </>
  )
}

export default TestPage;
