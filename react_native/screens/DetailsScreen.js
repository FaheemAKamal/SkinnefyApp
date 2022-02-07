import * as React from 'react';
import { View, Text, StyleSheet, ActivityIndicator, ScrollView, ImageBackground, Dimensions } from 'react-native';
import firebase from '../utils/firebaseConfig';
var db = firebase.firestore();

export default class DetailsScreen extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            isLoading: true,
            data: null,
        }
    }
    componentDidMount() {
        db.collection('conditions').doc(this.props.route.params.query).get().then(doc => {
            this.setState({
                isLoading: false, 
                data: doc.data(),
            });
        })
    }

    render() {
        const { image, displayTop, description } = this.props.route.params;
        return (
            <React.Fragment>
            { this.state.isLoading && <Loading/>}
            { !this.state.isLoading && 
            <ScrollView style={{ flex: 1 }} contentContainerStyle={styles.container}>
                <View style={{
                    padding: 5,
                    backgroundColor: "#fff",
                    elevation: 5,
                }}>
                    <ImageBackground 
                        source={{ uri: image }}
                        style={{
                            height: 200,
                            justifyContent: "flex-end",
                        }}
                    >   
                        <View style={{
                                flexDirection: "row",
                                flexWrap: "nowrap",
                                justifyContent: "center"
                            }}
                        >
                            <Text style={styles.title}>
                                {displayTop}
                            </Text>
                        </View>
                    </ImageBackground>
                </View>
                <View style={{
                        paddingVertical: 10,
                    }}
                >
                    <View style={{
                            flexDirection: "row",
                            justifyContent: "space-between",
                            marginHorizontal: 10, marginBottom: 10,
                        }}
                    >
                        <View style={{
                                flex: 0.5,
                                padding: 20,
                                backgroundColor: "white",
                                borderRadius: 10, borderColor: "#ccc",
                                borderWidth: 1, marginRight: 5,
                            }}
                        >
                            <Text style={styles.sectionTitles}>
                                Prevalence
                            </Text>
                            <Text>
                                {this.state.data.prevalence ? this.state.data.prevalence : "No information was available."}
                            </Text>
                        </View>
                        <View style={{
                                flex: 0.5,
                                padding: 20,
                                backgroundColor: "white",
                                borderRadius: 10, borderColor: "#ccc",
                                borderWidth: 1, marginLeft: 5,
                            }}
                        >
                            <Text style={styles.sectionTitles}>
                                Nearest Doctor
                            </Text>
                            <Text>
                                {this.state.data.doctor ? this.state.data.doctor : "No information was available."}
                            </Text> 
                        </View>
            
                    </View>
                    <View style={{
                        padding: 20, marginHorizontal: 10,
                        backgroundColor: "white",
                        borderRadius: 10, borderColor: "#ccc",
                        borderWidth: 1, marginBottom: 10,
                    }}>
                        <Text style={styles.sectionTitles}>
                            Symptoms
                        </Text>
                        <View style={{
                                marginTop: 10,
                            }}
                        >
                        {this.state.data.symptoms ? this.state.data.symptoms.map((x, i) => {
                                return (
                                    <Text style={{
                                            marginBottom: StyleSheet.hairlineWidth,
                                        }}
                                        key={i}
                                    >
                                        {i + 1}: {x}
                                    </Text>
                                )
                            }) 
                            : 
                            <Text style={styles.plainText}>
                                No information was available.
                            </Text>
                        }
                        </View>
                    </View>
                
                    <View style={{
                        padding: 20, marginHorizontal: 10,
                        backgroundColor: "white",
                        borderRadius: 10, borderColor: "#ccc",
                        borderWidth: 1, marginBottom: 10,
                    }}>
                        <Text style={styles.sectionTitles}>
                            Home Remedies
                        </Text>
                        <View style={{
                                marginTop: 10,
                            }}
                        >
                            {this.state.data.Home_Remedies ? this.state.data.Home_Remedies.map((x, i) => {
                                return (
                                    <Text key={i} style={{
                                            marginBottom: StyleSheet.hairlineWidth,
                                        }}
                                        key={i}
                                    >
                                        {i + 1}: {x}
                                    </Text>
                                )
                            }) 
                            : 
                            <Text style={styles.plainText}>
                                No information was available.
                            </Text>}  
                        </View>  
                    </View>

                    <View style={{
                        padding: 20, marginHorizontal: 10,
                        backgroundColor: "white",
                        borderRadius: 10, borderColor: "#ccc",
                        borderWidth: 1, marginBottom: 10,
                    }}>
                        <Text style={styles.sectionTitles}>
                            Tips
                        </Text>
                        <View style={{
                                marginTop: 10,
                            }}
                        >
                            <Text style={styles.plainText}>
                                {this.state.data.tips ? this.state.data.tips : "No information was available."}
                            </Text>
                        </View>
                    </View>
                </View>
            </ScrollView>
            }
        </React.Fragment>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        justifyContent: "center",
        backgroundColor: "#ededed",
    },
    sectionTitles: {
        fontWeight: "bold",
        fontSize: 16,
    },
    title: {
        fontSize: 30, 
        margin: 10, textAlign: "center",
        paddingVertical: 5, borderRadius: 5,
        paddingHorizontal: 15, backgroundColor: "#fefefe",
        borderColor: "#ccc", borderWidth: 1, elevation: 1,
    },
    plainText: {
        textAlign: "justify"
    }
})

function Loading() {
    return (
      <View style={{ 
        flex: 1, 
        alignItems: "center", 
        justifyContent: "center", 
      }}>
        <ActivityIndicator style={styles.activityIndicator} size={50} color="#000000" />
        <Text style={{
          marginTop: 15,
          fontSize: 13, 
          color: "grey" 
        }}>
            Please wait while we gather your information.
        </Text>
      </View>
    )
  }