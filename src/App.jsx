import React,{useState} from 'react'
import html2canvas from 'html2canvas'
import {QRCodeSVG} from 'qrcode.react';
import './App.css';
import download from './images/download.png';
import share from './images/share.png';
const App = () => {
    
   const [inputValue, setInputValue] = useState('');
    const [qr_code_link,set_qrcode_link]=useState('');
    const [homepage,sethomepage]=useState(true);
    

    const QR_generator=()=>{
         set_qrcode_link({inputValue});
         sethomepage(false);
    }

    const handleDownload = () => {
      const svgElement = document.getElementById('QR');
  
      // Convert the SVG to a canvas using html2canvas
      html2canvas(svgElement)
        .then((canvas) => {
          // Convert the canvas to a PNG data URL
          const pngDataUrl = canvas.toDataURL('image/png');
  
          // Create a temporary anchor element to trigger the download
          const a = document.createElement('a');
          a.href = pngDataUrl;
          a.download = 'image.png';
  
          // Trigger a click event on the anchor element to initiate the download
          a.click();
        })
        .catch((error) => {
          console.error('Error converting SVG to PNG:', error);
        });
    };

    return ( 
          <div className="App">

            {homepage && <div className="container">
            <div className="bg1"></div>
            <div className="bg2"></div>
            <div className="heading">QRCODE</div>
            <div className="input_bar">
                <input type="text" name="url" placeholder='Enter an url'
                onChange={(e) => setInputValue(e.target.value)}/>
                <button onClick={QR_generator}>QR code</button>
            </div>
          </div>}

          {!homepage && <div className="container">
            <div className="bg1"></div>
            <div className="bg2"></div>
            <div className="navbar" onClick={()=>{
              sethomepage(true);
            }}>QRCODE</div>
            <div className="QR_box">
                <div className="circle">
                  
                  <div className="QR" id='QR'><QRCodeSVG height={"92%"} width={"92%"} value={qr_code_link.inputValue} /></div>
                  </div>
                <div className="buttons">
                    <button className='spacing' onClick={handleDownload}>Download <img src={download} alt="d" /></button>
                    <button className='spacing'>Share <img src={share} alt="s" /></button>
                </div>
            </div>
          </div>}

          </div>
    )
}

export default App