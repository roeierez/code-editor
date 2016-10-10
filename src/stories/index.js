import React from 'react';
import { storiesOf, action, linkTo } from '@kadira/storybook';
import CodeEditor from '../index';
import Selections from '../editor/Selections';
import LineClass from '../editor/LineClass';
import 'codemirror/mode/javascript/javascript';
import 'codemirror/mode/clike/clike'
import 'codemirror/theme/material.css';
import './editor-styles.css';

storiesOf('CodeEditor', module)
  .add('simple', () => (
    <CodeEditor value="function test(){ return true;}"/>
  ))
    .add('read-only', () => (
        <CodeEditor value="function test(){ return true;}" options={{readOnly: true}} />
    ))
    .add('with dark theme', () => (
        <CodeEditor value="function test(){ return true;}" options={{lineNumbers: true, readOnly: true, theme: 'material'}} />
    ))
    .add('with one selection', () => (
        <CodeEditor value="function test(){ return true;}" options={{mode: 'javascript', readOnly: 'nocursor'}}>
          <Selections key="1" selectionsArray={[ {anchor: {line: 0, ch: 0}, head: {line: 0, ch: 8} } ]} />
        </CodeEditor>
    ))
    .add('with line class', () => (
        <CodeEditor value={'int x = 5; \n printf("%i test", 5);'} options={{lineNumbers: true, mode: 'javascript', readOnly: 'nocursor'}}>
          <LineClass lineNumbers={[1]} linesClassName="lineClass1"  />
        </CodeEditor>
    ))
