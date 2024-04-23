import React from 'react';
import { Typography, Card, CardHeader } from "@material-tailwind/react";

function About() {
  return (
    <div className='flex flex-col' style={{ gap: "20px" }}>
        <div className='center'>
            <Typography variant="h1" color="blue-gray">About Us</Typography>
        </div>
        <div className='center20 flex-col'>
            <p>
                <Card className="h-full w-full p-3" style={{ gap: "10px" }}>
                    <Typography variant="h3" color="blue-gray" className='border-b'>What is PulseRx?</Typography>
                    <Typography color="blue-gray">
                        PulseRx is a web application designed to improve the health of its users by
                        offering a way to keep track of blood markers and recieve personalized
                        health recommendations based on these blood markers. To get started, log
                        your recent blood tests results by navigating to the Manual reporting page.
                        After you submit your test results, custom health recommendations can be found
                        on the insights page. Additionally, you can see how your blood markers change
                        over time by navigating to the charts page. 
                    </Typography>
                </Card>
            </p>
            <p>
                <Card className="h-full w-full p-3">
                    <Typography variant="h3" color="blue-gray" className='border-b'>Our Mission</Typography>
                    <Typography color="blue-gray">
                        Our team is dedicated to making health care services accessible and affordable.
                        This is why we offer our service completely free of charge and avoid using complex
                        medical jargon. Interpreting blood test results is confusing and seeing a doctor is
                        costly, however PulseRx solves both of those issues. We hope that our user friendly
                        interface inspires you frequent our application to get the most out of your blood test 
                        results and improve your health.
                    </Typography>
                </Card>
            </p>
            <p>
                <Card className="h-full w-full p-3">
                    <Typography variant="h3" color="blue-gray" className='border-b'>Upcoming Features</Typography>
                    <Typography color="blue-gray">
                        We are excited to be launching an automatic document upload feature in the coming month
                        where all you have to do is upload a pdf of your blood test results and all of your health
                        data is automatically uploaded to our database. Additionally, we plan to develop a calendar
                        feature that automatically populates health and wellness reminders and can be added to your
                        google calendar.
                    </Typography>
                </Card>
            </p>
            <p>
                <Card className="h-full w-full p-3">
                    <Typography variant="h3" color="blue-gray" className='border-b'>Disclaimer</Typography>
                    <Typography color="blue-gray">
                        PulseRx uses ChatGpt to generate health insights based on your blood test results. 
                        Because of the occasional inaccuracy of ChatGPT, we recommend that you talk with 
                        your doctor about before starting any new medications or making significant dietary
                        or lifestyle changes. PulseRx should supplement regular consultations with a licensed
                        healthcare provider.

                    </Typography>
                </Card>
            </p>
        </div>
    </div>
  );
}

export default About;
