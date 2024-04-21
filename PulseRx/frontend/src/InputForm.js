// InputForm.js
import React, { useState, useEffect } from "react";
import { Accordion, Card, CardHeader, CardBody, Typography, Chip } from "@material-tailwind/react";
import axios from "axios";
import jQuery from "jquery";
import Modal from "./TestModal";

const TABLE_HEAD = ["Type", "Source", "Test Date", " ", " "];
const MARKER_TABLE_HEAD = ["Name", "Value", "Lower Range", "Upper Range", "Status"];

// change 
const OOR_DICT = {
  'glucose': [70, 100],
  'cholesterol_total': [125, 200],
  'cholesterol_hdl': [40, 60],  
  'cholesterol_ldl': [0, 100],  
  'triglycerides': [0, 150], 
  'hemoglobin': [13.5, 17.5],  
  'hematocrit': [38.3, 48.6],  
  'mcv': [80, 100],  
  'mch': [27, 33],  
  'mchc': [32, 36], 
  'rdw': [11, 15],  
  'platelets': [150, 450],  
  'wbc': [3.4, 9.6],  
  'neutrophils': [40, 60],  
  'lymphocytes': [20, 40],  
  'monocytes': [2, 8],  
  'eosinophils': [1, 4],  
  'basophils': [0.5, 1], 
}


const defaultTableData = [];

export function InputForm() {
    const [tableData, setTableData] = useState(defaultTableData);
    const [markers, setMarkers] = useState([]);
    const [openAccordion, setOpenAccordion] = useState(null);
    const [deleteItem, setDeleteItem] = useState(false);

    // Function to fetch data
    const fetchData = async () => {
        try {
            const response = await axios.get("http://127.0.0.1:8000/api/tests");
            const formattedData = response.data.map(({ pk, type, source, test_date }) => ({
                pk,
                type,
                source,
                date: test_date,
            }));
            setTableData(formattedData);

            const markersResponse = await axios.get("http://127.0.0.1:8000/api/markers/all");
            setMarkers(markersResponse.data);
        } catch (error) {
            console.error("Error fetching data:", error);
        }
    };

    // Fetch data when the component mounts or when deleteItem changes
    useEffect(() => {
        fetchData();
    }, [deleteItem]);

    // Function to handle data update
    const handleDataUpdate = () => {
        fetchData();
    };

    // Function to toggle the accordion
    const toggleAccordion = (index) => {
        setOpenAccordion(openAccordion === index ? null : index);
    };

    // Function to delete a test
    const deleteTest = async (num) => {
        const client = axios.create({
            baseURL: "http://127.0.0.1:8000"
        });

        function getCookie(name) {
            var cookieValue = null;
            if (document.cookie && document.cookie !== '') {
                var cookies = document.cookie.split(';');
                for (var i = 0; i < cookies.length; i++) {
                    // eslint-disable-next-line no-undef
                    var cookie = jQuery.trim(cookies[i]);
                    if (cookie.substring(0, name.length + 1) === (name + '=')) {
                        cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
                        break;
                    }
                }
            }
            return cookieValue;
        }

        const CSRF_TOKEN = getCookie('csrftoken');

        client.defaults.headers.common['x-csrftoken'] = CSRF_TOKEN;

        try {
            await client.delete(`/api/tests/update/${num}`);
            setDeleteItem(!deleteItem);
        } catch (error) {
            console.error("Error deleting test:", error);
        }
    };

    return (
        <div>
            {/* Pass the handleDataUpdate function as a prop to Modal */}
            <div class="vspace2em"></div>
            <Modal onSubmit={handleDataUpdate} />
            <div class="vspace1em"></div>
            <div className="rounded-md">
            <Card className="h-full w-full overflow-scroll">
                <table className="w-full min-w-max table-auto text-left">
                    <thead>
                        <tr>
                            {TABLE_HEAD.map((head) => (
                                <th
                                    key={head}
                                    className="border-b border-blue-gray-100 bg-blue-gray-50 p-4"
                                >
                                    <Typography
                                        variant="small"
                                        color="blue-gray"
                                        className="font-bold leading-none opacity-1000"
                                    >
                                        {head}
                                    </Typography>
                                </th>
                            ))}
                        </tr>
                    </thead>
                    <tbody>
                        {tableData
                            .slice()
                            .reverse()
                            .map(({ pk, type, source, date }, index) => {
                                const isLast = index === tableData.length - 1;
                                const classes = isLast
                                    ? "p-4"
                                    : "p-4 border-b border-blue-gray-50";

              return (
                <React.Fragment key={source}>
                  <tr>
                    <td className={classes}>
                      <Typography
                        variant="small"
                        color="blue-gray"
                        className="font-normal"
                      >
                        {type}
                      </Typography>
                    </td>
                    <td className={classes}>
                      <Typography
                        variant="small"
                        color="blue-gray"
                        className="font-normal"
                      >
                        {source}
                      </Typography>
                    </td>
                    <td className={classes}>
                      <Typography
                        variant="small"
                        color="blue-gray"
                        className="font-normal"
                      >
                        {date}
                      </Typography>
                    </td>
                    <td className={classes}>
                      <button
                        onClick={() => toggleAccordion(index)}
                        className="text-blue-gray-500"
                      >
                        <Typography
                          variant="small"
                          color="blue-gray"
                          className="font-bold"
                        >
                          {openAccordion === index
                          ? "Collapse"
                          : "Expand"}
                        </Typography>
                      </button>
                    </td>
                    <td className={classes}>
                      <button
                        onClick={() => deleteTest(pk)}
                        class="select-none rounded-lg bg-red-500 py-2 px-3 text-center align-middle font-sans text-xs font-bold uppercase text-white shadow-md shadow-red-500/20 transition-all hover:shadow-lg hover:shadow-red-500/40 focus:opacity-[0.85] focus:shadow-none active:opacity-[0.85] active:shadow-none disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"
                        type="button"
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                  <tr>
                    <td colSpan="5">
                      <Accordion open={openAccordion === index}>
                        <Accordion.Body>
                          <Card className="top center">
                            <CardHeader floated={true} shadow={false}>
                                <Typography variant="h5" color="blue-gray" className="text-left">
                                  Blood Markers
                                </Typography>
                                <Typography color="gray" className="mt-1 font-normal text-left">
                                  These are details about the blood markers for this test
                                </Typography>
                            </CardHeader>
                            <CardBody className="center top">
                              <div className="tableContainer rounded-md">
                              <table className="text-left" margin="auto">
                                <thead>
                                  <tr>
                                  {MARKER_TABLE_HEAD.map((head) => (
                                    <th
                                      key={head}
                                      className="border-b border-blue-gray-100 bg-blue-gray-50 p-4"
                                    >
                                      <Typography
                                        variant="small"
                                        color="blue-gray"
                                        className="font-bold leading-none opacity-100"
                                      >
                                        {head}
                                      </Typography>
                                    </th>
                                  ))}
                                  </tr>
                                </thead>
                                <tbody>
                                {markers[pk]?.map( marker => {
                                  const isLast = index === markers[pk]?.length - 1;
                                  const classes = isLast ? "p-4" : "p-4 border-b border-blue-gray-100 text-left";
                      
                                  return (
                                    <tr>
                                      <td className={classes} colSpan="1">
                                        <Typography
                                          variant="small"
                                          color="blue-gray"
                                          className="font-normal"
                                        >
                                          {marker.name}
                                        </Typography>
                                      </td>
                                      <td className={classes} colSpan="1">
                                        <Typography
                                          variant="small"
                                          color="blue-gray"
                                          className="font-normal"
                                        >
                                          {marker.value}
                                        </Typography>
                                      </td>
                                      <td className={classes} colSpan="1">
                                        <Typography
                                          variant="small"
                                          color="blue-gray"
                                          className="font-normal"
                                        >
                                          {OOR_DICT[marker.name][0]}
                                        </Typography>
                                      </td>
                                      <td className={classes} colSpan="1">
                                        <Typography
                                          variant="small"
                                          color="blue-gray"
                                          className="font-normal"
                                        >
                                          {OOR_DICT[marker.name][1]}
                                        </Typography>
                                      </td>
                                      <td className={classes} colSpan="1">
                                        <div className="w-max ">
                                          <Chip
                                            size="sm"
                                            variant="ghost"
                                            value={
                                              marker.value < OOR_DICT[marker.name][0]
                                                ? "low"
                                                : marker.value > OOR_DICT[marker.name][1]
                                                ? "high"
                                                : "green"
                                            }
                                            color={
                                              marker.value < OOR_DICT[marker.name][0]
                                                ? "blue"
                                                : marker.value > OOR_DICT[marker.name][1]
                                                ? "red"
                                                : "green"
                                            }
                                          />
                                        </div>
                                      </td>
                                    </tr>
                                    );
                                  })}
                                </tbody>
                              </table>
                              </div>    
                            </CardBody>
                          </Card>
                        </Accordion.Body>
                      </Accordion>
                    </td>
                  </tr>
                </React.Fragment>
              );
            })}
          </tbody>
        </table>
      </Card>
      </div>
    </div>
  );
}

export default InputForm;
