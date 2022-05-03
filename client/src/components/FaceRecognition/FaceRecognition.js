import React from "react";
import './FaceRecognition.css';

const FaceRecognition = ({ boxes,  imageUrl}) => {
    return (
        <div className="center ma">
            <div className="absolute mt2 pb10">
                <img id="inputimage" alt='' src={imageUrl} width='500px' height='auto' />
                {
                    boxes.map(box => {
                        return <div key={box.id} className='bounding-box' style={{top: box.topRow, right: box.rightCol, bottom: box.bottomRow, left: box.leftCol}}></div>
                    })
                }                
            </div>
        </div>
    );
}

export default FaceRecognition;