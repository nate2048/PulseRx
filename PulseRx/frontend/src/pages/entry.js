import React, { useState } from 'react';
import axios from 'axios';
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';
import Button from 'react-bootstrap/Button';
import jQuery from 'jquery';
axios.defaults.withCredentials = true;


function BloodMarkerForm() {
  const [bloodMarkers, setBloodMarkers] = useState([{ name: '', value: '' }]);

  const handleInputChange = (index, event) => {
    const { name, value } = event.target;
    const newBloodMarkers = [...bloodMarkers];
    newBloodMarkers[index][name] = value;
    setBloodMarkers(newBloodMarkers);
  };

  const addBloodMarker = () => {
    setBloodMarkers([...bloodMarkers, { name: '', value: '' }]);
  };

    // CBC 
    const [sodium, setSodium] = useState(-1);
    const [potassium, setPotassium] = useState(-1);

    // const markers = [sodium, potassium, chloride, C02, ureaNitrogren, creatinine, glucose, calcium, 
    //                 protein, albumin, bilirubin, cholesterol, triglycerides, HDL, WBC, RBC, hemoglobin]; 

    const markers = [sodium, potassium];

    // const markers_names = ["sodium", "potassium", "chloride", "C02", "ureaNitrogren", "creatinine", "glucose",
    //  "calcium", "protein", "albumin", "bilirubin", "cholesterol", "triglycerides", "HDL", "WBC", "RBC", "hemoglobin"]; 

    const markers_names = ["sodium", "potassium"];

    const client = axios.create({
        baseURL: "http://127.0.0.1:8000"
    });

    function getCookie(name) {
        var cookieValue = null;
        if (document.cookie && document.cookie !== '') {
            var cookies = document.cookie.split(';');
            for (var i = 0; i < cookies.length; i++) {
                var cookie = jQuery.trim(cookies[i]);
                if (cookie.substring(0, name.length + 1) === (name + '=')) {
                    cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
                    break;
                }
            }
        }
        return cookieValue;
    }

    var CSRF_TOKEN = getCookie('csrftoken');

    function submitTest(e) {
        e.preventDefault();

        var testNum;
        var test;
        client.defaults.headers.common['x-csrftoken'] = CSRF_TOKEN;

        client.get("/api/test_num").
        then(function(response, testNum) {
            
            testNum = response.data.test_num

            client.post("/api/tests", {num: testNum})
            .then(function(response) {
                
                test = response.data;

                for(let i = 0; i < markers.length; i++) {
                    if(markers[i] !== -1){
                        client.post(
                            "/api/markers",
                            {
                                blood_test: test,
                                name: markers_names[i],
                                value: markers[i],
                            }
                          );
                    }
                }
            });
        });

      }

    return (
        <div >
            <Form onSubmit={e => submitTest(e)}>

                <Form.Label>Comprehensive Metabolic Panel</Form.Label>
                <InputGroup className="mb-3">
                    <InputGroup.Text>Sodium</InputGroup.Text>
                    <Form.Control type="number" value={sodium} onChange={e => setSodium(e.target.value)} />
                    <InputGroup.Text>mmol/L</InputGroup.Text>
                </InputGroup>
                <InputGroup className="mb-3">
                    <InputGroup.Text>Potassium</InputGroup.Text>
                    <Form.Control type="number" value={potassium} onChange={e => setPotassium(e.target.value)} />
                    <InputGroup.Text>mmol/L</InputGroup.Text>
                </InputGroup>
                <InputGroup className="mb-3">
                    <InputGroup.Text>Chloride</InputGroup.Text>
                    <Form.Control type="number" value={potassium} onChange={e => setPotassium(e.target.value)} />
                    <InputGroup.Text>mmol/L</InputGroup.Text>
                </InputGroup>
                <InputGroup className="mb-3">
                    <InputGroup.Text>C02</InputGroup.Text>
                    <Form.Control type="number" value={potassium} onChange={e => setPotassium(e.target.value)} />
                    <InputGroup.Text>mmol/L</InputGroup.Text>
                </InputGroup>
                <InputGroup className="mb-3">
                    <InputGroup.Text>Creatinine</InputGroup.Text>
                    <Form.Control type="number" value={potassium} onChange={e => setPotassium(e.target.value)} />
                    <InputGroup.Text>mmol/L</InputGroup.Text>
                </InputGroup>
                <InputGroup className="mb-3">
                    <InputGroup.Text>Glucose</InputGroup.Text>
                    <Form.Control type="number" value={potassium} onChange={e => setPotassium(e.target.value)} />
                    <InputGroup.Text>mmol/L</InputGroup.Text>
                </InputGroup>

                {/* <Form.Group className="mb-3">
                    <Form.Label>Age</Form.Label>
                    <Form.Control type="number" placeholder="Enter age" value={age} onChange={e => setAge(e.target.value)} />
                </Form.Group>
                <Form.Group className="mb-3">
                    <Form.Label>Age</Form.Label>
                    <Form.Control type="number" placeholder="Enter age" value={age} onChange={e => setAge(e.target.value)} />
                </Form.Group>
                <Form.Group className="mb-3">
                    <Form.Label>Age</Form.Label>
                    <Form.Control type="number" placeholder="Enter age" value={age} onChange={e => setAge(e.target.value)} />
                </Form.Group>
                <Form.Group className="mb-3">
                    <Form.Label>Age</Form.Label>
                    <Form.Control type="number" placeholder="Enter age" value={age} onChange={e => setAge(e.target.value)} />
                </Form.Group>
                <Form.Group className="mb-3">
                    <Form.Label>Age</Form.Label>
                    <Form.Control type="number" placeholder="Enter age" value={age} onChange={e => setAge(e.target.value)} />
                </Form.Group>
                <Form.Group className="mb-3">
                    <Form.Label>Age</Form.Label>
                    <Form.Control type="number" placeholder="Enter age" value={age} onChange={e => setAge(e.target.value)} />
                </Form.Group>
                <Form.Group className="mb-3">
                    <Form.Label>Age</Form.Label>
                    <Form.Control type="number" placeholder="Enter age" value={age} onChange={e => setAge(e.target.value)} />
                </Form.Group> */}
                <Button variant="primary" type="submit">
                    Submit
                </Button>
            </Form>
        </div>
  );
}

export default BloodMarkerForm;
