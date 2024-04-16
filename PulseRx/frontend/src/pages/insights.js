import React, { useState, useEffect } from "react";
import { Accordion, AccordionHeader, Card } from "@material-tailwind/react";
import axios from "axios";
import MarkdownIt from "markdown-it";


function Insights() {

  const [tests, setTests] = useState([]);
  const [responses, setResponses] = useState([]);
  const [openAccordion, setOpenAccordion] = useState(null);

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
        console.log(response.data)
        const formattedData = response.data.map(({ tests_pk, response}) => ({
            pk: tests_pk,
            response: markdown.render(response),
        }));
        console.log(formattedData)
        setResponses(formattedData)
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


  return (
    <div>
      <Card className="h-full w-full overflow-scroll">
        {tests.map(({ pk, type, source, date }, index) => {
            const isLast = index === tests.length - 1;
            const classes = isLast
                ? "p-4"
                : "p-4 border-b border-blue-gray-50";
            var response = responses.map((test) => {
                if(test.pk === pk){
                    return test.response
                }
              });

            return (
            <Accordion open={openAccordion === index} icon={<Icon id={index} open={openAccordion} />}>
                <AccordionHeader onClick={() => toggleAccordion(index)}>
                    Response for {type} test at {source} on {date}
                </AccordionHeader>
                <Accordion.Body>
                    <div dangerouslySetInnerHTML={{__html: response}}></div>
                </Accordion.Body>
            </Accordion>
            );
        })}
      </Card>
    </div>
  );
}

export default Insights;
