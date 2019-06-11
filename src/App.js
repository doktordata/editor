import React, { useState } from "react";
import styled, { createGlobalStyle } from "styled-components";
import { Editor } from "slate-react";
import { Value } from "slate";
import { MarkHotKey } from "./plugins";
import { ParagraphNode, CodeNode } from "./blocks";
import { BoldMark } from "./marks";
import initialValue from "./model/value.json";

const GlobalStyle = createGlobalStyle`
  body {
    margin: 0;
    font-family: 'IBM Plex Sans', sans-serif;
    font-size: 1.125rem;
    line-height: 1.5;
  }

  * {
    box-sizing: border-box;
  }
`;

const Container = styled.div`
  margin: auto;
  max-width: 70ch;
`;

const StyledEditor = styled(Editor)`
  width: 100%;
  height: 100vh;
  padding: 1.5rem;
`;

const plugins = [MarkHotKey({ key: "b", type: "bold" })];

function App() {
  const [value, setValue] = useState(Value.fromJSON(initialValue));

  const onChange = ({ value }) => {
    setValue(value);
  };

  const renderBlock = (props, editor, next) => {
    switch (props.node.type) {
      case "code":
        return <CodeNode {...props} />;
      case "paragraph":
        return <ParagraphNode {...props} />;
      default:
        return next();
    }
  };

  const renderMark = (props, editor, next) => {
    switch (props.mark.type) {
      case "bold":
        return <BoldMark {...props} />;
      default:
        return next();
    }
  };

  return (
    <>
      <GlobalStyle />
      <Container>
        <StyledEditor
          plugins={plugins}
          value={value}
          onChange={onChange}
          renderBlock={renderBlock}
          renderMark={renderMark}
          autoFocus
        />
      </Container>
    </>
  );
}

export default App;
