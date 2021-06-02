import React from "react";
import { Bar } from 'react-chartjs-2';

import UserActivityForm from './UserActivityForm';
import UserActivity from "./UserActivity";

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
            var url = this.props.apiUrl + "/" + userActivity.userId;

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
                <div>
                    <h3>RenderGistogram:</h3>
                    <div>
                        <Bar
                            data={{
                                labels: ['Red', 'Blue', 'Yellow', 'Green', 'Purple', 'Orange'],
                                datasets: [
                                    {
                                        label: '# of votes',
                                        data: [12, 19, 3, 5, 2, 3],
                                        backgroundColor: [
                                            'rgba(255, 99, 132, 0.2)',
                                            'rgba(54, 162, 235, 0.2)',
                                            'rgba(255, 206, 86, 0.2)',
                                            'rgba(75, 192, 192, 0.2)',
                                            'rgba(153, 102, 255, 0.2)',
                                            'rgba(255, 159, 64, 0.2)',
                                        ],
                                        borderColor: [
                                            'rgba(255, 99, 132, 1)',
                                            'rgba(54, 162, 235, 1)',
                                            'rgba(255, 206, 86, 1)',
                                            'rgba(75, 192, 192, 1)',
                                            'rgba(153, 102, 255, 1)',
                                            'rgba(255, 159, 64, 1)',
                                        ],
                                        borderWidth: 1,
                                    },
                                    // {
                                    //   label: 'Quantity',
                                    //   data: [47, 52, 67, 58, 9, 50],
                                    //   backgroundColor: 'orange',
                                    //   borderColor: 'red',
                                    // },
                                ],
                            }}
                            width={100}
                            height={50}
                            options={{
                                maintainAspectRatio: false,
                                scales: {
                                    y: {
                                        beginAtZero: true
                                    }
                                }
                            }}
                        />
                    </div>
                </div>
            </div>
        );
    }
}

export default UsersActivityList;