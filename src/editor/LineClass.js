import React, {PropTypes} from 'react';

class LineClass extends React.Component {

    static propTypes = {
        propTypes: PropTypes.object,
        lineNumbers: PropTypes.arrayOf(PropTypes.number),
        linesClassName: PropTypes.string,
        where: PropTypes.string
    }

    componentDidMount() {
        this.renderLinesClass();
    }

    shouldComponentUpdate(props) {
        let {lineNumbers=[], lineClassName="", where} = props,
            {prevLineNumbers=[], prevClassName="", prevWhere} = this.props;

        if (lineNumbers.length != prevLineNumbers.length) {
            return true;
        }

        for (var i=0; i<lineNumbers.length; ++i) {
            if (lineNumbers[i] != prevLineNumbers[i]){
                return true;
            }
        }

        if (lineClassName != prevClassName) {
            return true;
        }

        if (where != prevWhere) {
            return true;
        }

        return false;
    }

    componentDidUpdate(prevProps) {
        this.clearLinesClass(prevProps);
        this.renderLinesClass();
    }

    componentWillUnmount() {
        this.clearLinesClass();
    }

    clearLinesClass(props) {
        if (this.props.codeMirror) {
            let doc = this.props.codeMirror.getDoc(),
                workingProps = props || this.props;
            workingProps.lineNumbers.forEach(ln => {
                doc.removeLineClass(ln, workingProps.where, workingProps.linesClassName)
            });
        }
    }

    renderLinesClass() {
        if (this.props.codeMirror) {
            let doc = this.props.codeMirror.getDoc();
            this.props.lineNumbers.forEach(ln => {
                doc.addLineClass(ln, this.props.where, this.props.linesClassName)
            });
        }
    }

    render() {
        return null;
    }
}

LineClass.defaultProps = {
    where: 'wrap'
}

export default LineClass;