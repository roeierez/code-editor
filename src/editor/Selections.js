import React, {PropTypes} from 'react';

class Selections extends React.Component {

    static proptTypes = {
        codeMirror: PropTypes.object,
        selectionsArray: PropTypes.arrayOf(PropTypes.object)
    }

    componentDidMount() {
        this.props.codeMirror.on('beforeSelectionChange', this.beforeSelectionChange.bind(this));
        this.renderSelections();
    }

    componentDidUpdate(prevProps) {
        this.renderSelections();
    }

    componentWillUnmount() {
        if (this.props.codeMirror) {
            this.props.codeMirror.getDoc().setSelections([{anchor: {line: 0, ch: 0}, head: {line: 0, ch:0 }}]);
            this.props.codeMirror.off('beforeSelectionChange', this.beforeSelectionChange.bind(this));
        }
    }

    beforeSelectionChange(codeMirror, event) {
        event.update(this.props.selectionsArray);
    }

    renderSelections() {
        console.error('renderSelections');
        if (this.props.codeMirror) {
            this.props.codeMirror.getDoc().setSelections(this.props.selectionsArray);
        }
    }

    render() {
        return null;
    }
}

export default Selections;