import React, {PropTypes} from 'react';

class EditorOperation extends React.Component {

    doOperation(props) {}
    undoOperation(prevProps) {}

    componentDidMount() {
        this.doOperation(this.props);
    }

    componentDidUpdate(prevProps) {
        this.undoOperation(prevProps);
        this.doOperation(this.props);
    }

    componentWillUnmount() {
        if (this.props.codeMirror) {
            this.undoOperation(this.props);
        }
    }

    getDoc() {
        return this.props.codeMirror.getDoc();
    }

    render() {
        return null;
    }
}

export default EditorOperation;