import React, {PropTypes} from 'react';
import ReactDOM from 'react-dom';
import CodeEditor from '../CodeEditor';
import 'codemirror/mode/clike/clike';

class CLikeCodeEditor extends React.Component {

    render() {
        let {options} = this.props,
            optionsWithMode = {...options, mode: 'clike'};

        return (
            <CodeEditor {...this.props} options={optionsWithMode}/>
        )
    }
}

export default CLikeCodeEditor;