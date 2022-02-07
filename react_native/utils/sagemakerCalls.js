import * as React from 'react';
var AWS = require('aws-sdk/dist/aws-sdk-react-native');
var credentials = require("./awsConfig.json");
 
var sagemakerruntime = new AWS.SageMakerRuntime({accessKeyId: credentials.accessKeyId, 
    secretAccessKey: credentials.secretAccessKey, region: "us-east-2",});
 
const endpoint_name = "endpoint-5-6-2020"; 
const conditions = ["Acne", "Eczema", "Melanoma", "Nail Fungus",
                    "Psoriasis", "Scabies", "Seborrheic Keratoses", "Ringworm", "Warts"];

FileReader.prototype.readAsArrayBuffer = function (blob) {
	if (this.readyState === this.LOADING) throw new Error("InvalidStateError");
	this._setReadyState(this.LOADING);
	this._result = null;
	this._error = null;
	const fr = new FileReader();
	fr.onloadend = () => {
        if(!fr.result) {
            throw new Error("Image too big!")
        }
		const content = atob(fr.result.substr("data:application/octet-stream;base64,".length));
		const buffer = new ArrayBuffer(content.length);
		const view = new Uint8Array(buffer);
		view.set(Array.from(content).map(c => c.charCodeAt(0)));
		this._result = buffer;
		this._setReadyState(this.DONE);
	};
	fr.readAsDataURL(blob);
}

export function useEndpoint(image) {
    const [queryState, setQueryState] = React.useState({ isLoading: true, data: null, err: null });

    const sendAndRetrieve = async () => {
        try {
            const response = await fetch(image.uri);
            const blob = await response.blob();
            sagemakerruntime.invokeEndpoint({ 
                Body: blob,
                EndpointName: endpoint_name,
                ContentType: "application/x-image",
            }, function(err, data) {
                if(err) {
                    setQueryState({ 
                        isLoading: false, 
                        data: null, 
                        err: err.message
                    })
                }
                else {
                    let prediction = prepareResponse(data.Body);
                    setQueryState({ 
                        isLoading: false, 
                        data: prediction, 
                        err: null
                    })
                }
            });
        } 
        catch (error) {
            console.log(error)
        }
    }
    // // convert the base64 encoding string to uint8 typearray
    // var result = convertToArray(image.base64);      
    React.useEffect(() => {
        sendAndRetrieve();
    }, []);
    return queryState;
}

function prepareResponse(responseBuffer) {
    var i, j;
    const predictionValues = JSON.parse(responseBuffer.toString());   
    console.log(predictionValues)
    // manually sort two arrays. conditions based on predictions
    for(i = 0; i < predictionValues.length; i++) {
        for(j = i; j < predictionValues.length; j++) {
            if(predictionValues[i] < predictionValues[j]) {
                // swap first array
                let tmp = predictionValues[i];
                predictionValues[i] = predictionValues[j];
                predictionValues[j] = tmp;
                // swap second array
                tmp = conditions[i];
                conditions[i] = conditions[j];
                conditions[j] = tmp;
            }
        }
    }
    console.log(predictionValues);
    const prediction = {
        labels: conditions,
        dataset: predictionValues,
    }
    return prediction;
}