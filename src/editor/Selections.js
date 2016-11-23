import React, {PropTypes} from 'react';

class Selections extends React.Component {

    static propTypes = {
        codeMirror: PropTypes.object,
        selectionsArray: PropTypes.arrayOf(PropTypes.object)
    }

    constructor(props) {
        super(props);
        this.selectionChanged = this.beforeSelectionChange.bind(this);
    }

    componentDidMount() {
        this.props.codeMirror.on('beforeSelectionChange', this.selectionChanged);
        this.renderSelections();
    }

    componentDidUpdate(prevProps) {
        this.renderSelections();
    }

    componentWillUnmount() {
        if (this.props.codeMirror) {
            this.props.codeMirror.off('beforeSelectionChange', this.selectionChanged);
            this.props.codeMirror.getDoc().setSelections([{anchor: {line: 0, ch: 0}, head: {line: 0, ch:0 }}]);
        }
    }

    beforeSelectionChange(codeMirror, event) {
        event.update(this.props.selectionsArray);
    }

    renderSelections() {
        if (this.props.codeMirror) {
            this.props.codeMirror.getDoc().setSelections(this.props.selectionsArray);
        }
    }

    render() {
        return null;
    }
}

export default Selections;