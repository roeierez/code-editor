import React, {PropTypes} from 'react';
import ReactDOMServer from 'react-dom/server';
import EditorOperation from './EditorOperation';

class Marker extends EditorOperation {

    static propTypes = {
        codeMirror: PropTypes.object,
        lineNumber: PropTypes.number,
        gutterID: PropTypes.string,
        gutterComponent: PropTypes.element
    }

    shouldComponentUpdate(props) {
        return this.props.lineNumber != props.lineNumber || this.props.gutterID != props.gutterID;
    }

    undoOperation(props) {
        if (props.codeMirror) {
            let doc = props.codeMirror;//.getDoc(),
            doc.setGutterMarker(props.lineNumber, props.gutterID, null);
        }
    }

    doOperation(props) {
        if (props.codeMirror) {
            var div = document.createElement('div');
            div.innerHTML = ReactDOMServer.renderToString(props.gutterComponent);
            var node = div.firstChild;
            let doc = props.codeMirror;//.getDoc();
            doc.setGutterMarker(props.lineNumber, props.gutterID, node);
        }
    }
}

export default Marker;