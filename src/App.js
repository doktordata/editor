import React, { useState } from "react"
import styled, { createGlobalStyle } from "styled-components"
import { Editor } from "slate-react"
import { Value } from "slate"
import initialValue from "./model/value.json"

const GlobalStyle = createGlobalStyle`
  body {
    margin: 0;
    padding: 0;
    font-family: sans-serif;
  }

  * {
    box-sizing: border-box;
  }
`

const Container = styled.div`
  padding: 24px;
`

const StyledEditor = styled(Editor)`
  width: 100%;
  height: 100vh;
`

const CodeNode = props => (
  <pre {...props.attributes}>
    <code>{props.children}</code>
  </pre>
)
const ParagraphNode = props => <p {...props.attributes}>{props.children}</p>
const BoldMark = props => <strong>{props.children}</strong>

function App() {
  const [value, setValue] = useState(Value.fromJSON(initialValue))

  const onChange = ({ value }) => {
    setValue(value)
  }

  const onKeyDown = (event, editor, next) => {
    if (!event.ctrlKey) return next()

    switch (event.key) {
      case "b": {
        event.preventDefault()
        editor.toggleMark("bold")
        break
      }
      case "'": {
        const isCode = editor.value.blocks.some(block => block.type === "code")
        event.preventDefault()
        editor.setBlocks(isCode ? "paragraph" : "code")
        break
      }
      default: {
        return next()
      }
    }
  }

  const renderBlock = (props, editor, next) => {
    switch (props.node.type) {
      case "code":
        return <CodeNode {...props} />
      case "paragraph":
        return <ParagraphNode {...props} />
      default:
        return next()
    }
  }

  const renderMark = (props, editor, next) => {
    switch (props.mark.type) {
      case "bold":
        return <BoldMark {...props} />
      default:
        return next()
    }
  }

  return (
    <>
      <GlobalStyle />
      <Container>
        <StyledEditor
          value={value}
          onChange={onChange}
          onKeyDown={onKeyDown}
          renderBlock={renderBlock}
          renderMark={renderMark}
          autoFocus
        />
      </Container>
    </>
  )
}

export default App
