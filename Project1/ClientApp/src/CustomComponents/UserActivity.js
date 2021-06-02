import React from 'react';

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

export default UserActivity;