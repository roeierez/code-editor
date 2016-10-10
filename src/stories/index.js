import React from 'react';
import { storiesOf, action, linkTo } from '@kadira/storybook';
import Selections from '../editor/Selections';
import LineClass from '../editor/LineClass';
import 'codemirror/theme/material.css';
import './editor-styles.css';
import JavascriptCodeEditor from '../editor/javascript';
import CLikeCodeEditor from '../editor/clike';

storiesOf('CodeEditor', module)
  .add('simple', () => (
    <JavascriptCodeEditor value="function test(){ return true;}"/>
  ))
    .add('read-only', () => (
        <JavascriptCodeEditor value="function test(){ return true;}" options={{readOnly: true}} />
    ))
    .add('with dark theme', () => (
        <JavascriptCodeEditor value="function test(){ return true;}" options={{lineNumbers: true, readOnly: true, theme: 'material'}} />
    ))
    .add('with one selection', () => (
        <JavascriptCodeEditor value="function test(){ return true;}" options={{readOnly: 'nocursor'}}>
          <Selections key="1" selectionsArray={[ {anchor: {line: 0, ch: 0}, head: {line: 0, ch: 8} } ]} />
        </JavascriptCodeEditor>
    ))
    .add('with line class', () => (
        <CLikeCodeEditor value={'int x = 5; \n printf("%i test", 5);'} options={{lineNumbers: true, mode: 'javascript', readOnly: 'nocursor'}}>
          <LineClass lineNumbers={[1]} linesClassName="lineClass1"  />
        </CLikeCodeEditor>
    ))
