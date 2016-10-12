import React, {PropTypes} from 'react';
import ReactDOM from 'react-dom';
import CodeEditor from '../CodeEditor';
import 'codemirror/mode/javascript/javascript';

class JavascriptCodeEditor extends CodeEditor {

    createOptions(options) {
        console.error("create options");
        return {...options, mode: 'javascript'};
    }
}

export default JavascriptCodeEditor
