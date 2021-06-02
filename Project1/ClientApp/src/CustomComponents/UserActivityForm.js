import React from 'react';

class UserActivityForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = { userId: '', dateRegistration: '', dateLastActivity: '' };

        this.onSubmit = this.onSubmit.bind(this);
        this.onUserIdChange = this.onUserIdChange.bind(this);
        this.onDateRegistrationChange = this.onDateRegistrationChange.bind(this);
        this.onDateLastActivityChange = this.onDateLastActivityChange.bind(this);
    }
    onUserIdChange(e) {
        this.setState({ userId: e.target.value });
    }
    onDateRegistrationChange(e) {
        this.setState({ dateRegistration: e.target.value });
    }
    onDateLastActivityChange(e) {
        this.setState({ dateLastActivity: e.target.value });
    }
    onSubmit(e) {
        e.preventDefault();
        var id = this.state.userId;
        var userDateRegistration = this.state.dateRegistration;
        var userDateLastActivity = this.state.dateLastActivity;
        if (!userDateRegistration || !userDateLastActivity || !id) {
            return;
        }
        this.props.onUserActivitySubmit({ userId: id, dateRegistration: userDateRegistration, dateLastActivity: userDateLastActivity });
        this.setState({ userId: '', dateRegistration: '', dateLastActivity: '' });
    }
    render() {
        return (
            <form onSubmit={this.onSubmit}>
                <p>
                    <input type="text"
                        placeholder="UserId"
                        value={this.state.userId}
                        onChange={this.onUserIdChange} />
                </p>
                <p>
                    <input type="date"
                        placeholder="Registration date"
                        value={this.state.dateRegistration}
                        onChange={this.onDateRegistrationChange} />
                </p>
                <p>
                    <input type="date"
                        placeholder="Last activity date"
                        value={this.state.dateLastActivity}
                        onChange={this.onDateLastActivityChange} />
                </p>
                <input type="submit" value="Add" />
            </form>
        );
    }
}

export default UserActivityForm;