import React, { Component } from 'react';
import { Card, CardText } from 'material-ui/Card';
import UTIL from '../../lib/utils.js';
import { Container } from 'react-grid-system'

class Settings extends Component {
    constructor(props) {
        super(props);
        this.state = {
            user: {}
        }
    }
    handleSubmit = (values) => {
        let attrs = {};
        if (!UTIL.objIsEmpty(values) && values.hasOwnProperty("ServicePath")) {
            attrs.servicePath = values.ServicePath;
        }
        if (!UTIL.objIsEmpty(values) && values.hasOwnProperty("Phone")) {
            attrs.phone = values.Phone;
        }
        if (!UTIL.objIsEmpty(values) && values.hasOwnProperty("Facebook")) {
            attrs.facebook = values.Facebook;
        }
        if (!UTIL.objIsEmpty(values) && values.hasOwnProperty("Twitter")) {
            attrs.twitter = values.Twitter;
        }
        console.log(values);
        this.props.updateUser(this.props.user, attrs)
    }
    componentWillReceiveProps(nextProps) {
        if (nextProps.currentUser) {
            this.setState({ user: nextProps.currentUser });
        }
    }
    componentWillMount() {
        console.log(this.props.user);
    }
    render() {

        return (
            <div>
                <h1 className="page-title">Settings</h1>
                <Container>
                    <Card>
                        <CardText>
                            <SettingsForm onSubmit={this.handleSubmit} />
                        </CardText>
                    </Card>
                </Container>
            </div>
        );
    }
}

export default Settings;

