import React from 'react'

const higherOrderComponent = (WrappedComponent: any) => {
    class HOC extends React.Component {
        render() {
            return <WrappedComponent />
        }
    }
    return HOC
}