import React from 'react';
import { storiesOf, action, linkTo } from '@kadira/storybook';
import JavascriptCodeEditor from '../editor/javascript';
import CLikeCodeEditor from '../editor/clike';
import Selections from '../editor/Selections';
import LineClass from '../editor/LineClass';
import Marker from '../editor/Marker';
import 'codemirror/theme/material.css';
import 'codemirror/theme/night.css';
import './editor-styles.css';

storiesOf('CodeEditor', module)
  .add('simple', () => (
    <JavascriptCodeEditor value="function test(){ return true;}" options={{theme: 'night'}}/>
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
    .add('with two lines class', () => (
        <CLikeCodeEditor value={'int x = 5; \n printf("%i test", 5);'} options={{lineNumbers: true, mode: 'javascript', readOnly: 'nocursor'}}>
            <LineClass lineNumbers={[1]} linesClassName="lineClass1"  />
            <LineClass lineNumbers={[0]} where="gutter" linesClassName="lineClass1"  />
        </CLikeCodeEditor>
    ))
    .add('with two markers', () => (
        <CLikeCodeEditor value={'int x = 5; \n printf("%i test", 5);'} options={{
                lineNumbers: true, mode: 'javascript', readOnly: 'nocursor',
                gutters: ["breakpoints"]
            }}
        >
            <Marker lineNumber={1} gutterID="breakpoints" gutterComponent={<div style={{color: "#822"}}>●</div>}  />
            <Marker lineNumber={0} gutterID="breakpoints" gutterComponent={<div style={{color: "black"}}>●</div>}  />
        </CLikeCodeEditor>
    ))
