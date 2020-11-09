import React, { Component } from 'react'
import { withRouter } from 'react-router-dom'
import EventContainer from './EventContainer'

class ExploreContainer extends Component {



    render() {
        return (
            <div className="main-feed">
                <h1>Explore Container</h1>
                <EventContainer user={this.props.user} refresh={this.props.refresh} profileEventHandler={this.profileEventHandler}/>
            </div>
        )
    }
}

export default withRouter(ExploreContainer)