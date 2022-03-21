const {ClarifaiStub, grpc} = require("clarifai-nodejs-grpc");
const stub = ClarifaiStub.grpc();
const metadata = new grpc.Metadata();
metadata.set("authorization", "Key 01a3395be0d94471a174411513d505ed");

// const Clarifai = require('clarifai');
// console.log(Clarifai);

// const app = new Clarifai.App({
//     apiKey: '01a3395be0d94471a174411513d505ed'
// });

const handleApiCall = (req, res) => {

    stub.PostModelOutputs(
        {
            // This is the model ID of a publicly available General model. You may use any other public or custom model ID.
            model_id: "a403429f2ddf4b49b307e318f00e528b",
            inputs: [{data: {image: {url: req.body.input}}}]
        },
        metadata,
        (err, response) => {
            
            if (err) {
                console.log("Error: " + err);
                return;
            }
    
            if (response.status.code !== 10000) {
                console.log("Received failed status: " + response.status.description + "\n" + response.status.details);
                return;
            }
    
            console.log("Predicted concepts, with confidence values:")
            for (const c of response.outputs[0].data.concepts) {
                console.log(c.name + ": " + c.value);
            }
            res.json(response)
            console.log(response);
        }
    );

    /*
    app.models
        .predict(Clarifai.FACE_DETECT_MODEL, req.body.input)
        .then(data => {
            res.json(data)
        })
        .catch(err => res.status(404).json('unable to work with API'))
    */

}

const handleImage = (req, res, db) => {
    const { id } = req.body;
    db('users').where('id', '=', id )
        .increment('entries', 1)
        .returning('*')
        .then(user => {
            res.json(user[0]);
        })
        .catch(err => res.status(404).json('unable to get entries'))
}

module.exports = {
    handleImage: handleImage,
    handleApiCall: handleApiCall
}