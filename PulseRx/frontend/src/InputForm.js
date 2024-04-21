// InputForm.js
import React, { useState, useEffect } from "react";

import {Accordion, Card, Typography} from "@material-tailwind/react";
import axios from "axios";
import { TrashIcon } from "@heroicons/react/24/outline";
import jQuery from "jquery";
import Modal from "./TestModal";

const TABLE_HEAD = ["Type", "Source", "Test Date", "View Markers", "Delete Test"];
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
            <Modal onSubmit={handleDataUpdate} />
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
                                        className="font-normal leading-none opacity-70"
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
                                                <Typography variant="small" color="blue-gray" className="font-normal">
                                                    {type}
                                                </Typography>
                                            </td>
                                            <td className={classes}>
                                                <Typography variant="small" color="blue-gray" className="font-normal">
                                                    {source}
                                                </Typography>
                                            </td>
                                            <td className={classes}>
                                                <Typography variant="small" color="blue-gray" className="font-normal">
                                                    {date}
                                                </Typography>
                                            </td>
                                            <td className={classes}>
                                                <button
                                                    onClick={() => toggleAccordion(index)}
                                                    className="text-blue-gray-500"
                                                >
                                                    Expand
                                                </button>
                                            </td>
                                            <td className={classes}>
                                                <button
                                                    onClick={() => deleteTest(pk)}
                                                    className="text-red-500 hover:text-red-700 p-2 rounded-full focus:outline-none"
                                                >
                                                    <TrashIcon className="w-6 h-6" />
                                                </button>
                                            </td>
                                        </tr>
                                        <tr>
                                            <td colSpan="4">
                                                <Accordion open={openAccordion === index}>
                                                    <Accordion.Body>
                                                        <div className="p-4">
                                                            <Typography variant="h2" color="blue-gray">
                                                                Blood Markers
                                                            </Typography>

                                                            {markers[pk]?.map((marker) => (
                                                                <li key={marker.id}>
                                                                    Name: {marker.name}, Value: {marker.value}
                                                                </li>
                                                            ))}
                                                        </div>
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
    );
}

export default InputForm;
