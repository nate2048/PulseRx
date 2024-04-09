import React, { useState, useEffect } from "react";
import { Accordion, Card, Typography } from "@material-tailwind/react";
import FindMarker from "./FindMarker";
import axios from "axios";
import Modal from "./TestModal";

const TABLE_HEAD = ["Type", "Source", "Test Date"];

const defaultTableData = [];

export function InputForm() {
  const [tableData, setTableData] = useState(defaultTableData);
  const [openAccordion, setOpenAccordion] = useState(null);

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await axios.get("http://127.0.0.1:8000/api/tests");
        const formattedData = response.data.map(({ type, source, test_date }) => ({
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
  }, []);

  const toggleAccordion = (index) => {
    setOpenAccordion(openAccordion === index ? null : index);
  };

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
            {tableData.map(({ type, source, date }, index) => {
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
                        Edit
                      </button>
                    </td>
                  </tr>
                  <tr>
                    <td colSpan="4">
                      <Accordion open={openAccordion === index}>
                        <Accordion.Body>
                          <div className="p-4">
                            <Typography variant="small" color="blue-gray">

                            </Typography>
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
