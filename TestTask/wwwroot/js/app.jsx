class UserActivity extends React.Component {

    constructor(props) {
        super(props);
        this.state = { data: props.userActivity };
        this.onClick = this.onClick.bind(this);
    }
    onClick(e) {
        this.props.onRemove(this.state.data);
    }

    render() {
        return (
            <tr>
                <td>
                    {this.state.data.userId}
                </td>
                <td>
                    {this.state.data.dateRegistration.split('T')[0]}
                </td>
                <td>
                    {this.state.data.dateLastActivity.split('T')[0]}
                </td>
                <td>
                    <button onClick={this.onClick}>Удалить</button>
                </td>
            </tr>
        );
    }
}

class UserActivityForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {userId: '', dateRegistration: '', dateLastActivity: '' };

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

class UsersActivityList extends React.Component {
    constructor(props) {
        super(props);
        this.state = { usersActivity: [] };

        this.onAddUserActivity = this.onAddUserActivity.bind(this);
        this.onRemoveUserActivity = this.onRemoveUserActivity.bind(this);
    }
    loadData() {
        var xhr = new XMLHttpRequest();
        xhr.open("get", this.props.apiUrl, true);
        xhr.onload = function () {
            var data = JSON.parse(xhr.responseText);
            this.setState({ usersActivity: data });
        }.bind(this);
        xhr.send();
    }
    componentDidMount() {
        this.loadData();
    }
    onAddUserActivity(userActivity) {
        if (userActivity) {

            const data = new FormData();
            data.append("userId", userActivity.userId);
            data.append("dateRegistration", userActivity.dateRegistration);
            data.append("dateLastActivity", userActivity.dateLastActivity);
            var xhr = new XMLHttpRequest();

            xhr.open("post", this.props.apiUrl, true);
            xhr.onload = function () {
                if (xhr.status === 200) {
                    this.loadData();
                }
            }.bind(this);
            xhr.send(data);
        }
    }
    onRemoveUserActivity(userActivity) {

        if (userActivity) {
            var url = this.props.apiUrl + "/" + userActivity.id;

            var xhr = new XMLHttpRequest();
            xhr.open("delete", url, true);
            xhr.setRequestHeader("Content-Type", "application/json");
            xhr.onload = function () {
                if (xhr.status === 200) {
                    this.loadData();
                }
            }.bind(this);
            xhr.send();
        }
    }
    render() {

        var remove = this.onRemoveUserActivity;
        return (
            <div>
                <UserActivityForm onUserActivitySubmit={this.onAddUserActivity} />
                <h2>Users activity</h2>
                <div>
                    <table border="1">
                        <thead>
                            <tr>
                                <th>User ID</th>
                                <th>User registration</th>
                                <th>User last activity</th>
                                <th>Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                this.state.usersActivity.map(function (userActivity) {
                                    return <UserActivity key={userActivity.id} userActivity={userActivity} onRemove={remove} />
                                })
                            }
                        </tbody>
                    </table>
                </div>
            </div>
        );
    }
}

ReactDOM.render(
    <UsersActivityList apiUrl="/api/user" />,
    document.getElementById("content")
);