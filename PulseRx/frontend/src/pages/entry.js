import React from "react";
import axios from 'axios';
import { useState, useEffect } from 'react';
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';
import Button from 'react-bootstrap/Button';


axios.defaults.xsrfCookieName = 'csrftoken';
axios.defaults.xsrfHeaderName = 'X-CSRFToken';
axios.defaults.withCredentials = true;

const client = axios.create({
    baseURL: "http://127.0.0.1:8000"
  });
 
const Entry = () => {

    // CMP
    const [sodium, setSodium] = useState(-1);
    const [potassium, setPotassium] = useState(-1);
    const [chloride, setChloride] = useState(-1);
    const [C02, setC02] = useState(-1);
    const [ureaNitrogren, setUreaNitrogren] = useState(-1);
    const [creatinine, setCreatinine] = useState(-1);
    const [glucose, setGlucose] = useState(-1);
    const [calcium, setCalcium] = useState(-1);
    const [protein, setProtein] = useState(-1);
    const [albumin, setAlbumin] = useState(-1);
    const [bilirubin, setBilirubin] = useState(-1);

    // Lipid Panel
    const [cholesterol, setCholesterol] = useState(-1);
    const [triglycerides, setTriglycerides] = useState(-1);
    const [HDL, setHDL] = useState(-1);

    // CBC 
    const [WBC, setWBC] = useState(-1);
    const [RBC, setRBC] = useState(-1);
    const [hemoglobin, setHemoglobin] = useState(-1);

    const [testNum, setTestNum] = useState();

    const markers = [sodium, potassium, chloride, C02, ureaNitrogren, creatinine, glucose, calcium, 
                    protein, albumin, bilirubin, cholesterol, triglycerides, HDL, WBC, RBC, hemoglobin]; 

    const markers_names = ["sodium", "potassium", "chloride", "C02", "ureaNitrogren", "creatinine", "glucose",
     "calcium", "protein", "albumin", "bilirubin", "cholesterol", "triglycerides", "HDL", "WBC", "RBC", "hemoglobin"]; 

    function submitTest(e) {
        e.preventDefault();

        let test_num = 20;
        client.get("/api/test_num").
        then(function(response) {
            console.log(response.data.test_num)
            test_num = response.data.test_num;
        });

        let test;
        client.post("/api/tests", {num: test_num} )
        .then(function(response) {
            console.log(response.data);
            test = response.data;
        });

        for(let i = 0; i < markers.length; i++) {
            if(markers[i] !== -1){
                client.post(
                    "/api/markers",
                    {
                        test: test,
                        name: markers_names[i],
                        value: markers[i],
                    }
                  );
            }
        }
      }

    return (
        <div class="input-group" width="100%">
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
};
 
export default Entry;