import React from "react";

export const CodeNode = props => (
  <pre {...props.attributes}>
    <code>{props.children}</code>
  </pre>
);
export const ParagraphNode = props => (
  <p {...props.attributes}>{props.children}</p>
);
