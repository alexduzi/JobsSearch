import React, { Component } from 'react';
import { View, Text, Platform } from 'react-native';
import { connect } from 'react-redux';
import { Button } from 'react-native-elements';

import { clearLikedJobs } from '../actions';

class SettingsScreen extends Component {
    static navigationOptions = {
        headerStyle: { marginTop: Platform.OS === 'android' ? 24 : 0 }
    }

    render() {
        return (
            <View>
                <Button 
                    title="Reset Liked Jobs" 
                    large
                    icon={{ name: 'delete-forever' }}
                    onPress={() => this.props.clearLikedJobs()}
                    backgroundColor="#F44336"
                />
            </View>
        );
    }
}

export default connect(null, { clearLikedJobs })(SettingsScreen);