import React from 'react'
import ReactDOM from 'react-dom'
import ReactMarkdown from 'react-markdown'
 
const mock_content = "Hello.\n\n * This is markdown.\n * It is fun\n * Love it or leave it."
export class MdEditorComponent extends React.Component {

  render() {
    return (      
        <ReactMarkdown source={mock_content} /> 
    )
  }
}