import React, {PropTypes} from 'react';
import ReactDOM from 'react-dom';
import CodeEditor from '../CodeEditor';
import 'codemirror/mode/javascript/javascript';

class JavascriptCodeEditor extends React.Component {

    render() {
        let {options} = this.props,
            optionsWithMode = {...options, mode: 'javascript'};

        return (
            <CodeEditor {...this.props} options={optionsWithMode}/>
        )
    }
}

export default JavascriptCodeEditor
