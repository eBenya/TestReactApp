import React, { Component } from 'react';
import { Route } from 'react-router';
import { Layout } from './components/Layout';
import { Home } from './components/Home';
import { FetchData } from './components/FetchData';
import { Counter } from './components/Counter';
import { Bar } from 'react-chartjs-2';

import UsersActivityList from './CustomComponents/UserActivityList';

import './custom.css'

export default class App extends Component {
    static displayName = App.name;

    render() {
        return (
            <Layout>             
                <UsersActivityList apiUrl="/api/user" />
                {/*//  <Route exact path='/' component={Home} />*/}
                {/*//  <Route path='/counter' component={Counter} />*/}
                {/*//  <Route path='/fetch-data' component={FetchData} />*/}
            </Layout>
        );
    }
}
