import React, { useState, useEffect } from "react";
import { Accordion, AccordionHeader, Card, Typography } from "@material-tailwind/react";
import axios from "axios";
import MarkdownIt from "markdown-it";


function Insights() {

  const [tests, setTests] = useState([]);
  const [responses, setResponses] = useState([]);
  const [openAccordion, setOpenAccordion] = useState(0);

  const markdown = new MarkdownIt();

  useEffect(() => {
    loadTests();
    loadResponses();
  }, []);

  async function loadTests() {
    try {
        const response = await axios.get("http://127.0.0.1:8000/api/tests");
        const formattedData = response.data.map(({ pk, type, source, test_date }) => ({
          pk: pk,
          type: type,
          source: source,
          date: test_date,
        }));
        setTests(formattedData);
      } catch (error) {
        console.error("Error fetching test data:", error);
      }
  }

  async function loadResponses() {
    try {
        const response = await axios.get("http://127.0.0.1:8000/api/gpt");
        setResponses(response.data)
        console.log(response.data)

      } catch (error) {
        console.error("Error fetching response data:", error);
      }
  }

  const toggleAccordion = (index) => {
    setOpenAccordion(openAccordion === index ? null : index);
  };

  function Icon({ id, open }) {
    return (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        strokeWidth={2}
        stroke="currentColor"
        className={`${id === open ? "rotate-180" : ""} h-5 w-5 transition-transform`}
      >
        <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
      </svg>
    );
  }

  if(responses === []) {return}
  return (
    <div>
      <div className='center'>
        <Typography variant="h1" color="blue-gray">Health Recommendations</Typography>
      </div>
      <Card className="h-full w-full">
        {tests.toReversed().map(({ pk, type, source, date }, index) => {
            if(!(pk.toString() in responses)) {return}
            var cur_test = responses[pk.toString()]
            return (
            <Accordion open={openAccordion === index} icon={<Icon id={index} open={openAccordion} />}>
                <AccordionHeader onClick={() => toggleAccordion(index)}>
                  <div className="shiftRight2">
                    Response for {type} test at {source} on {date}
                  </div>
                </AccordionHeader>
                <Accordion.Body>
                    {cur_test.map((test) => (
                        <div className="shiftRight3">
                            <h2 className="border-b">Suggestions regarding {test.high_low} {test.marker}</h2>
                            <div dangerouslySetInnerHTML={{__html: markdown.render(test.response)}}></div>
                        </div>
                    ))}
                </Accordion.Body>
            </Accordion>
            );
        })}
      </Card>
    </div>
  );
}

export default Insights;
