import React from 'react';
import ReactDOM from 'react-dom';
import Webcam from 'react-webcam';
import axios, { post } from 'axios';
import './index.css';

class WebcamCapture extends React.Component {

      constructor(props) {
           super(props);
           this.state = { pictures: [] };
           this.capture = this.capture.bind(this);
      }
    
      setRef = webcam => {
        this.webcam = webcam;
      };

      capture = () => {
          const imageSrc = this.webcam.getScreenshot();
          this.imageData = imageSrc;
          const url = "http://localhost:3000/upload";
          const formData = new FormData();
          formData.append('file', imageSrc);
          axios.post(url, formData)
          .then(res => {
              console.log("SEX")
          })
          .catch(err => {
              console.log("NO SEX")
          })
          /*const config = {
              headers: {
                  'content-type': 'multipart/form-data'
              }
          }
          console.log(post(url, formData, config))*/
      };

  render() {
    const videoConstraints = {
      width: 1280,
      height: 720,
      facingMode: "user"
    };

    return (
      <div>
        <Webcam
          audio={false}
          height={350}
          ref={this.setRef}
          screenshotFormat="image/jpeg"
          width={350}
          videoConstraints={videoConstraints}
        />

        <button onClick={this.capture}>Capture photo</button>

      </div>
    );
  }
}

ReactDOM.render(
    <WebcamCapture />,
  document.getElementById('root')
);
