import React, {PropTypes} from 'react';

class EditorOperation extends React.Component {

    doOperation(props) {}
    undoOperation(prevProps) {}

    constructor(props) {
        super(props);
        this.onEditorUpdated = this.onEditorUpdated.bind(this);
    }

    componentDidMount() {
        this.doOperation(this.props);
       // this.codeMirror.on("update", this.onEditorUpdated);
    }

    onEditorUpdated() {
        this.doOperation(this.props);
    }

    componentDidUpdate(prevProps) {
        this.undoOperation(prevProps);
        this.doOperation(this.props);
    }

    componentWillUnmount() {
       // this.codeMirror.off("update", this.onEditorUpdated);
        if (this.props.codeMirror) {
            this.undoOperation(this.props);
        }
       // this.codeMirror.off("update", this.onEditorUpdated);
    }

    getDoc() {
        return this.props.codeMirror.getDoc();
    }

    render() {
        return null;
    }
}

export default EditorOperation;