import React, { useState, useEffect } from "react";
import { Accordion, Card, Typography } from "@material-tailwind/react";
import FindMarker from "./FindMarker";
import axios from "axios";
import Modal from "./TestModal";
import jQuery from 'jquery';

const TABLE_HEAD = ["Type", "Source", "Test Date", "View Markers", "Delete Test"];

const defaultTableData = [];

export function InputForm() {
  const [tableData, setTableData] = useState(defaultTableData);
  const [markers, setMarkers] = useState([]);
  const [openAccordion, setOpenAccordion] = useState(null);
  const [deleteItem, setDeleteItem] = useState(false);

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await axios.get("http://127.0.0.1:8000/api/tests");
        const formattedData = response.data.map(({ pk, type, source, test_date }) => ({
          pk: pk,
          type: type,
          source: source,
          date: test_date,
        }));
        setTableData(formattedData);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    }

    fetchData();
  }, [deleteItem]);

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await axios.get("http://127.0.0.1:8000/api/markers/all");
        console.log(response.data)
        setMarkers(response.data)
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    }

    fetchData();
  }, [deleteItem]);

  const toggleAccordion = (index) => {
    setOpenAccordion(openAccordion === index ? null : index);
  };

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

  const CSRF_TOKEN = getCookie('csrftoken');

  function deleteTest(num) {

      client.defaults.headers.common['x-csrftoken'] = CSRF_TOKEN;

      client.delete("/api/tests/update/" + num);

      setDeleteItem(!deleteItem);
  }

  return (
    <div>
      <Modal />
      <Card className="h-full w-full overflow-scroll">
        <table className="w-full min-w-max table-auto text-left">
          <thead>
            <tr>
              {TABLE_HEAD.map((head, index) => (
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
            {tableData.map(({ pk, type, source, date }, index) => {
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
                        Expand
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
                    <td colSpan="4">
                      <Accordion open={openAccordion === index}>
                        <Accordion.Body>
                          <div className="p-4">
                            <Typography variant="h2" color="blue-gray">
                              Blood Markers
                            </Typography>

                            {markers[pk]?.map(marker => (
                                    <li>
                                        Name: {marker.name}, Value: {marker.value}
                                    </li>))}
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
