import React, { useState } from 'react';
import { saveText } from './Api/Api';
import axios from 'axios';
import { v4 as uuidv4 } from 'uuid';

export default function Tick({ mode, title, ShowAlert }) {
  const [text, setText] = useState('');
  const [translatedText, setTranslatedText] = useState('');
  const [selectedLanguages, setSelectedLanguages] = useState(['hi', 'mr']); // Default languages: Hindi and Marathi

  const onSaveText = async () => {
    await saveText(text);
    setText('');
    ShowAlert('Text saved', 'success');
  };

  const toupper = () => {
    let newState = text.toUpperCase();
    setText(newState);
    ShowAlert('Converted to upper case', 'success');
  };

  const tolower = () => {
    let newState = text.toLowerCase();
    setText(newState);
    ShowAlert('Converted to lower case', 'success');
  };

  const toremove = () => {
    setText('');
    ShowAlert('Text removed', 'success');
  };

  const toreverse = () => {
    let strArr = text.split('');
    strArr = strArr.reverse();
    let newState = strArr.join('');
    setText(newState);
    ShowAlert('Text reversed', 'success');
  };

  const onchange = (event) => {
    setText(event.target.value);
  };

  const translateText = async () => {
    const key = 'd0e38e7a1e464ff99ca55029aeaf1e61';
    const endpoint = 'https://api.cognitive.microsofttranslator.com/';
    const location = 'eastus';

    try {
      const response = await axios({
        baseURL: endpoint,
        url: '/translate',
        method: 'post',
        headers: {
          'Ocp-Apim-Subscription-Key': key,
          'Ocp-Apim-Subscription-Region': location,
          'Content-type': 'application/json',
          'X-ClientTraceId': uuidv4().toString()
        },
        params: {
          'api-version': '3.0',
          'from': 'en',
          'to': selectedLanguages.join(',')
        },
        data: [{
          'text': text
        }],
        responseType: 'json'
      });

      const translatedResults = response.data[0].translations.map((translation) => translation.text);
      setTranslatedText(translatedResults.join('\n\n'));
    } catch (error) {
      console.error('Translation error:', error);
      // Handle error or show an error message
    }
  };

  const handleLanguageChange = (event) => {
    setSelectedLanguages(Array.from(event.target.selectedOptions, (option) => option.value));
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(translatedText);
    ShowAlert('Text copied to clipboard', 'success');
  };

  return (
    <div className="container">
      <h1 className="text-center mb-4">{title}</h1>
      <div className="row">
        <div className="col-md-6">
          <textarea
            className="form-control mb-3"
            style={{ backgroundColor: mode === 'dark' ? 'black' : 'white', color: mode === 'dark' ? 'white' : 'black' }}
            rows="8"
            value={text}
            onChange={onchange}
            placeholder="Enter text here..."
          ></textarea>
          <div className="d-grid gap-2">
            <button className='btn btn-primary' onClick={toupper}>UPPER CASE</button>
            <button className='btn btn-primary' onClick={tolower}>lower case</button>
            <button className='btn btn-primary' onClick={toreverse}>Reverse Text</button>
            <button className='btn btn-info' onClick={onSaveText}>Save Text</button>
            <button className='btn btn-danger' onClick={toremove}>Clear Text</button>
          </div>
        </div>
        <div className="col-md-6">
         <span style={{ fontWeight: "bold", padding: "5px"}}>Translate Into</span>
          <div className="d-flex justify-content-between align-items-center mb-3" >
            <select className='form-select w-75 me-2' onChange={handleLanguageChange} multiple  style={{ backgroundColor: mode === 'dark' ? 'black' : 'white', color: mode === 'dark' ? 'white' : 'black' }}>
            <option value="hi">Hindi</option>
            <option value="mr">Marathi</option>
            <option value="ta">Tamil</option>
            <option value="te">Telugu</option>
            <option value="kn">Kannada</option>
            <option value="bn">Bengali</option>
            <option value="pa">Punjabi</option>
            <option value="ur">Urdu</option>
            <option value="fr">French</option>
            <option value="es">Spanish</option>
            <option value="it">Italian</option>
            <option value="de">German</option>
            <option value="ar">Arabic</option>
            <option value="ja">Japanese</option>
            <option value="ko">Korean</option>
            <option value="zh-Hans">Chinese</option>
            </select>
            <button className='btn btn-warning' onClick={translateText}>Translate</button>
          </div>
          {translatedText && (
            <div className="card mb-4"  style={{ backgroundColor: mode === 'dark' ? 'black' : 'white', color: mode === 'dark' ? 'white' : 'black' }}>
                <div className="card-body">
                <h5 className="card-title">Translated Text</h5>
                <p className="card-text">{translatedText}</p>
                <button className="btn btn-primary" onClick={copyToClipboard}>Copy Translated Text</button>
              </div>
            </div>
          )}
          <div className="card"  style={{ backgroundColor: mode === 'dark' ? 'black' : 'white', color: mode === 'dark' ? 'white' : 'black' }}>
            <div className="card-body">
              <h5 className="card-title">Preview</h5>
              <p className="card-text">{text}</p>
            </div>
          </div>
        </div>
      </div>
      <div className="row mt-4">
        <div className="col">
          <h2>Your Text Summary</h2>
           <p>{text.split(/\s+/).filter((element) => element.length !== 0).length} words and {text.length} characters</p>
          <p>{0.008 * text.split(' ').filter((element) => element.length !== 0).length} Average minutes to read</p>
        </div>
        </div>
      </div>
   
  );
}
