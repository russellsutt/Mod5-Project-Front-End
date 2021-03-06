import React, { Component } from 'react'
import { withRouter } from 'react-router-dom'
import { Form, Container } from 'react-bootstrap'

// const BASE_API = "https://euraudax-app-api.herokuapp.com/"
const BASE_API = "http://localhost:3000/"
const STRAVA_CLIENT_ID = process.env.REACT_APP_STRAVA_CLIENT_ID

class AccountSettingsContainer extends Component {

    state = {
        firstname: '',
        lastname: '',
        bio: '',
        city: 'New York City',
        state: 'New York',
        pic: '',
    }

    componentDidMount() {
        this.setState({
            firstname: this.props.user.firstname,
            lastname: this.props.user.lastname,
            bio: this.props.user.bio,
            pic: this.props.user.pic,
        })
    }

    changeHandler = (e) => {
        this.setState({ [e.target.name]: e.target.value})
    }

    submitHandler = (e) => {
        const token = localStorage.getItem("token")
        fetch(BASE_API + `users/${this.props.user.id}`, {
            method: 'PATCH',
            headers: {
                Authorization: `Bearer ${token}`,
                'content-type': 'application/json',
                'accepts': 'application/json'
            },
            body: JSON.stringify({
                firstname: this.state.firstname,
                lastname: this.state.lastname,
                bio: this.state.bio,
                pic: this.state.pic
            })
        })
        .then(resp => resp.json())
        .catch(err => console.log(err))
    }

    backToProfile = () => {
        this.props.history.push('/home')
    }

    importStrava = () => {
        window.location.replace(`http://www.strava.com/oauth/authorize?client_id=${STRAVA_CLIENT_ID}&response_type=code&redirect_uri=http://localhost:3001/home/exchange_token&approval_prompt=force&scope=read_all`)
    }

    render() {
        return (
            <div className="main-feed">
                <div className="main-feed-card-container">
                    <Container fluid>
                        <br/>
                        <h1 style={{ textDecoration: 'underline', letterSpacing: '.15em', textTransform: 'uppercase' }}>Update Account</h1>
                        <Form className='form-container' type="submit" onSubmit={() => this.submitHandler()}> 
                            <Form.Group>
                                <Form.Label>First Name</Form.Label>
                                <Form.Control type="text" placeholder="First Name" name='firstname' value={this.state.firstname} onChange={this.changeHandler}/>
                            </Form.Group>
                            <Form.Group>
                                <Form.Label>Last Name</Form.Label>
                                <Form.Control type="text" placeholder="Last Name" name='lastname' value={this.state.lastname} onChange={this.changeHandler}/>
                            </Form.Group>
                            <Form.Group>
                                <Form.Label>About You</Form.Label>
                                <Form.Control type="textarea" placeholder="Tell us about your self..." name='bio' value={this.state.bio} onChange={this.changeHandler}/>
                            </Form.Group>
                            <Form.Group>
                                <Form.Label>City</Form.Label>
                                <Form.Control type="text" disabled={true} value={this.state.city} onChange={this.changeHandler}/>
                                <Form.Label>State</Form.Label>
                                <Form.Control type="text" disabled={true} value={this.state.state} onChange={this.changeHandler} />
                                <Form.Text className="text-muted"> Currently only servicing New York City, NY.</Form.Text>
                            </Form.Group>
                            <Form.Group>
                                <Form.Label>Profile Picture</Form.Label>
                                <Form.Control type="text" name='pic' value={this.state.pic} onChange={this.changeHandler}/>
                            </Form.Group>
                            <br/>
                            <button type="submit">Save Settings</button>
                        </Form>
                    </Container>                         
                </div>
                <br/>
                <button onClick={() => { this.importStrava() }}>Import Strava Account</button>
                <br/><br/>
                <button onClick={this.backToProfile}>Cancel</button>
            </div>
        )
    }
}

export default withRouter(AccountSettingsContainer)