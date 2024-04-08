import React, { useState } from "react";
import { Accordion, Card, Typography } from "@material-tailwind/react";

const TABLE_HEAD = ["Type", "Source", "Test Date", ""];

const TABLE_ROWS = [
  {
    name: "Lipid",
    job: "Primary Care",
    date: "23/04/18",
  },
  {
    name: "Complete",
    job: "Primary Care",
    date: "23/04/18",
  },
];
//add a function that adds a new row to the table on a button click and calls axios to add the test
export function InputForm() {
  const [openAccordion, setOpenAccordion] = useState(null);

  const toggleAccordion = (index) => {
    setOpenAccordion(openAccordion === index ? null : index);
  };

  return (
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
          {TABLE_ROWS.map(({ name, job, date }, index) => {
            const isLast = index === TABLE_ROWS.length - 1;
            const classes = isLast ? "p-4" : "p-4 border-b border-blue-gray-50";

            return (
              <React.Fragment key={name}>
                <tr>
                  <td className={classes}>
                    <Typography
                      variant="small"
                      color="blue-gray"
                      className="font-normal"
                    >
                      {name}
                    </Typography>
                  </td>
                  <td className={classes}>
                    <Typography
                      variant="small"
                      color="blue-gray"
                      className="font-normal"
                    >
                      {job}
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
                            Put a component here
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
  );
}
export default InputForm;

