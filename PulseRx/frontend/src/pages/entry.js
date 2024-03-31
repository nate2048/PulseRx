import React, { useState } from 'react';
import axios from 'axios';
axios.defaults.xsrfCookieName = 'csrftoken';
axios.defaults.xsrfHeaderName = 'X-CSRFTOKEN';
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
    const [WBC, setWBC] = useState(-1);
    const [RBC, setRBC] = useState(-1);
    const [hemoglobin, setHemoglobin] = useState(-1);

    const markers = [sodium, potassium, chloride, C02, ureaNitrogren, creatinine, glucose, calcium, 
                    protein, albumin, bilirubin, cholesterol, triglycerides, HDL, WBC, RBC, hemoglobin]; 

    const markers_names = ["sodium", "potassium", "chloride", "C02", "ureaNitrogren", "creatinine", "glucose",
     "calcium", "protein", "albumin", "bilirubin", "cholesterol", "triglycerides", "HDL", "WBC", "RBC", "hemoglobin"]; 

    function submitTest(e) {
        e.preventDefault();

        var testNum;
        let test;
        client.get("/api/test_num").
        then(function(response, testNum) {
            console.log(response.data.test_num)
            testNum = response.data.test_num

            client.post("/api/tests", {num: testNum})
            .then(function(response) {
                console.log(response.data);
                test = response.data;
            });
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
      ))}
      <button type="button" onClick={addBloodMarker}>Add Blood Marker</button>
      <button type="submit">Submit</button>
    </form>
  );
}

export default BloodMarkerForm;
