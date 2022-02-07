import * as React from 'react';
import { StyleSheet, View, Text, Button, TextInput } from 'react-native';

// import sign in util function
import { loginWithPassword, } from '../utils/auth';

export default function LoginScreen({ navigation, route }) {
    // state hook to track input for email and password
    const [email, setEmail] = React.useState("");
    const [password, setPassword] = React.useState("");
    const [errMsg, setErrMsg] = React.useState(null);
    return (
        <View style={styles.loginContainer}>
            <Text style={{ color: "#555555", fontSize: 25, marginBottom: 10 }}>
                Login to Skinnefy
            </Text>
            <View style={styles.input}>
                <TextInput
                    placeholder="johndoe@gmail.com"
                    onChangeText={(text) => setEmail(text)}
                    value={email}
                />
            </View>
            <View style={styles.input}>
                <TextInput
                    placeholder='Enter your password'
                    onChangeText={(text) => setPassword(text)}
                    value={password}
                    secureTextEntry
                />
            </View>
            <View style={{minWidth: "60%", marginTop: 20}}>
                <Button 
                    disabled={(email == "") || (password == "")}
                    color="#555555" 
                    title="Login" 
                    onPress={() => {
                        loginWithPassword(email, password)
                        .then(response => { 
                            console.log("Logged in!"); 
                        })
                        .catch(error => { setErrMsg(error.message) });
                    }}
                />
            </View>
            <View style={{minWidth: "60%", marginTop: 10}}>
                <Button
                    color="#aaaaaa"
                    title="Create an account"
                    onPress={() => console.log("navigation.navigate('Signup')")}
                />
            </View>
            {
                errMsg &&
                <Text style={{color: "red", marginTop: 15, width: "65%", 
                    textAlign: "center",}}> 
                    {errMsg}
                </Text>
            }
        </View>
    );
    }

const styles = StyleSheet.create({
  loginContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  input: {
    elevation: 1, backgroundColor: "#e0e0e0", 
    borderRadius: 10, width: "65%", marginTop: 10,
    padding: 10,
  }

});

LoginScreen.navigationOptions = {
  header: null,
};


