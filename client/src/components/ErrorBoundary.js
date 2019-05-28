import React from 'react';
import PropTypes from 'prop-types';

class ErrorBoundary extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            error: null,
        };
    }

    static getDerivedStateFromError(error) {
        // Update state so the next render will show the fallback UI.
        return { error };
    }

    componentDidCatch(error, errorInfo) {
        // You can log error messages to an error reporting service here
    }

    render() {
        if (this.state.error) {
            // Error path
            return (
                <div>
                    <h2>Something went wrong.</h2>
                    {this.state.error && this.state.error.toString()}
                </div>
            );
        }
        // Normally, just render children
        return this.props.children;
    }
}

ErrorBoundary.propTypes = {
    children: PropTypes.node.isRequired,
}

export default ErrorBoundary;
