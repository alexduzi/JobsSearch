import React, { Component } from 'react';
import { View, Text, Platform, ScrollView, Linking } from 'react-native';
import { Button, Card, Icon } from 'react-native-elements';
import { connect } from 'react-redux';
import { MapView } from 'expo';

class ReviewScreen extends Component {
    static navigationOptions = ({ navigation }) => ({
        title: 'Review Jobs',
        headerRight: (<Button 
                        title="Settings" 
                        onPress={() => navigation.navigate('settings')} 
                        backgroundColor="rgba(0,0,0,0)"
                        color="rgba(0,122,255,1)"
                     />),
        headerStyle: {
            //If the app is running on Android assign 24 to marginTop, if not, assign 0 to marginTop
            marginTop: Platform.OS === 'android' ? 24 : 0
        },
        tabBarIcon: ({ tintColor }) => {
            return <Icon name="favorite" size={30} color={tintColor} />;
        }
    });

    renderLikedJobs() {
        return this.props.likedJobs.map(job => {
            const { jobkey, jobtitle, company, formattedRelativeTime, 
                url, longitude, latitude } = job;

            const initialRegion = {
                longitude,
                latitude,
                longitudeDelta: 0.045,
                latitudeDelta: 0.02,
            };

            return (
                <Card key={jobkey} title={jobtitle}>
                    <View style={{ height: 300 }}>
                        <MapView
                            scrollEnabled={false}
                            style={{ flex: 1 }}
                            cacheEnabled={Platform.OS === 'android' ? true : false}
                            initialRegion={initialRegion}
                        />
                    </View>
                    <View style={{ height: 200 }}>
                        <View style={styles.detailWrapper}>
                            <Text style={styles.italics}>{company}</Text>
                            <Text style={styles.italics}>{formattedRelativeTime}</Text>
                        </View>
                        <Button 
                            title="Apply Now!"
                            backgroundColor="#03A9F4"
                            onPress={() => Linking.openURL(url)}
                        />
                    </View>
                </Card>
            );
        });
    }

    render() {
        return (
            <ScrollView>
                {this.renderLikedJobs()}
            </ScrollView>
        );
    }
}

const styles = {
    detailWrapper: {
        marginBottom: 10,
        flexDirection: 'row',
        justifyContent: 'space-around',
        marginTop: 10
    },
    italics: {
        fontStyle: 'italic'
    }
};

const mapStateToProps = ({ likedJobs }) => {
    return { likedJobs: likedJobs };
};

export default connect(mapStateToProps)(ReviewScreen);