import React, {PropTypes} from 'react';
import ReactDOMServer from 'react-dom/server';

class Marker extends React.Component {

    static proptTypes = {
        codeMirror: PropTypes.object,
        lineNumber: PropTypes.number,
        gutterID: PropTypes.string,
        gutterComponent: PropTypes.element
    }

    componentDidMount() {
        debugger;
        this.renderMarker();
    }

    componentDidUpdate(prevProps) {
        this.clearMarker(prevProps);
        this.renderMarker();
    }

    componentWillUnmount() {
        this.clearMarker();
    }

    clearMarker(props) {
        if (this.props.codeMirror) {
            let doc = this.props.codeMirror,//.getDoc(),
                workingProps = props || this.props;
            doc.setGutterMarker(workingProps.lineNumber, workingProps.gutterID, null);
        }
    }

    renderMarker() {
        if (this.props.codeMirror) {
            var div = document.createElement('div');
            div.innerHTML = ReactDOMServer.renderToString(this.props.gutterComponent);
            console.error(div.innerHTML);
            var node = div.firstChild;
            let doc = this.props.codeMirror;//.getDoc();
            doc.setGutterMarker(this.props.lineNumber, this.props.gutterID, node);
        }
    }

    render() {
        return null;
    }
}

export default Marker;