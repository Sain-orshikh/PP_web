import React from 'react'

const TestPage = () => {
  const content = '<p>ASSSSn asdasda    askkdksdksdka   asjdaljsdlkajsdlkad     asjdalsdaskdadsa    <strong>  asdadsad</strong></p>';
  return (
    <>
    <div>TestPage</div>
    <div dangerouslySetInnerHTML={{ __html: content }} />
    </>
  )
}

export default TestPage;