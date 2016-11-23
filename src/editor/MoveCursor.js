import React, {PropTypes} from 'react';
import ReactDOMServer from 'react-dom/server';
import EditorOperation from './EditorOperation';

class MoveCursor extends EditorOperation {

    static propTypes = {
        codeMirror: PropTypes.object,
        line: PropTypes.number,
        ch: PropTypes.number
    }

    doOperation(props) {
        let {line, ch} = props;
        this.getDoc().setCursor(line, ch);
    }
}

export default MoveCursor;