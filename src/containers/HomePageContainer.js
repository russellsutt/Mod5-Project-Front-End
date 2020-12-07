import React, { Component } from 'react'
import { Switch, Route, withRouter } from 'react-router-dom'
import Weather from '../components/Weather'
import SideProfile from '../components/SideProfile'
import NavBar from '../components/NavBar'
import AccountSettingsContainer from './AccountSettingsContainer'
import ExploreContainer from './ExploreContainer'
import HomeFeedContainer from './HomeFeedContainer'
import CreateContainer from './CreateContainer'
import ProfileContainer from './ProfileContainer'
import Banner from '../components/Banner'
import EventShow from '../components/EventShow'

const BASE_API = "https://euraudax-app-api.herokuapp.com/"

class HomePageContainer extends Component {

    state = {
        user: this.props.user,
        hosting: this.props.user.events,
        attending: this.props.user.attendees,
        eventId: this.props.eventId
    }

    componentDidMount() {
        const token = localStorage.getItem("token")
        if (token) {
            fetch(`${BASE_API}/profile`, {
                method: "GET",
                headers: { Authorization: `Bearer ${token}` },
            })
                .then(r => r.json())
                .then(data => {
                    this.setState({ user: data.user, hosting: data.user.events, attending: data.user.attendees });
                })
                .catch(error => console.log(error))
        }
    }

    navBarHandler = (event) => {
        window.scrollTo(0, 0)
        this.props.history.push(event)
    }

    profileEventHandler = (incomingAttendeeObj) => {
        if (this.state.attending.find(attendee => attendee.id === incomingAttendeeObj.id )) {
            let updatedArray = this.state.user.attendees.filter(attendee => attendee.id !== incomingAttendeeObj.id)
            this.setState({ attending: updatedArray })
        } else {
            this.setState({ attending: [...this.state.attending, incomingAttendeeObj] })
        }
    }


    render() {
        return (
            <div className="grid-container">
                <Banner />
                <SideProfile renderEvent={this.props.renderEvent} logoutHandler={this.props.logoutHandler} user={this.state.user} host={this.state.host} attending={this.state.attending}/>
                <NavBar navBarHandler={this.navBarHandler} />
                    <Switch>
                    <Route exact path='/home' render={() => <HomeFeedContainer renderEvent={this.props.renderEvent} refresh={this.componentDidMount} user={this.state.user} profileEventHandler={this.profileEventHandler} />} />
                        <Route path='/home/create' render={() => <CreateContainer refresh={this.componentDidMount} user={this.state.user}/> }/>
                        <Route path='/home/explore' render={() => <ExploreContainer renderEvent={this.props.renderEvent} refresh={this.componentDidMount} user={this.state.user} profileEventHandler={this.profileEventHandler}/> }/>
                        <Route path='/home/profile' render={() => <ProfileContainer refresh={this.componentDidMount} user={this.state.user}/>}/>
                        <Route path='/home/accountsettings' render={() => <AccountSettingsContainer refresh={this.componentDidMount} user={this.state.user} />} />
                        <Route path='/home/event' render={() => <EventShow key={this.state.eventId} user={this.state.user} eventId={this.state.eventId} profileEventHandler={this.profileEventHandler}/>} />
                    </Switch>
                <Weather />
            </div>
        )
    }
}





export default withRouter(HomePageContainer)