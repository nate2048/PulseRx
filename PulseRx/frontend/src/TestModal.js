// TestModal.js
import React, {useEffect, useState} from "react";
import { XMarkIcon } from "@heroicons/react/24/outline";
// Import other necessary components and libraries...
import ModalTestForm from "./Forms/ModalTestForm";
import MarkerForm from "./Forms/MarkerForm";
import axios from "axios";
import jQuery from "jquery";

function Modal({ onSubmit }) {
    const [showModal, setShowModal] = useState(false);
    const [step, setStep] = useState(1);
    const [testInfo, setTestInfo] = useState({type: '', source: '', date: ''});
    const[markerInfo, setMarkerInfo] = useState([])
    const handleNext = () => setStep(step + 1);
    const handlePrevious = () => setStep(step - 1);
    const handleClose = () => {
        setShowModal(false);
        setStep(1);
    };

    const handleTestInfo = (data) => {
        setTestInfo(data);

    };
     const handleMarkerInfo = (data) => {

        setMarkerInfo(data);

    };

useEffect(() => {
        console.log(markerInfo);
    }, [markerInfo]);


    // Function to handle the form submission
    const handleSubmit = async (e) => {
        e.preventDefault();
        handleClose();

        // Perform the submission logic
        const client = axios.create({
            baseURL: "http://127.0.0.1:8000",
        });
console.log(markerInfo)
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
        client.defaults.headers.common['x-csrftoken'] = CSRF_TOKEN;

        // Submit the test info
        await client.post("/api/tests", {
            type: testInfo.type,
            source: testInfo.source,
            test_date: testInfo.date,
        }).then(function (response) {

            let test;
            test = response.data;

            //iterate through blood markers and upload them
            axios.all(
                markerInfo.map((marker) => {
                // Perform API call with markerEntry
                console.log(marker.marker)
                client.post(
                    "/api/markers",
                    {
                        blood_test: test,
                        name: marker.marker,
                        value: marker.value,
                    }
                )})
            )
            return test;
        }).then(function (test) {
            client.post(
           `/api/gpt/${test}`)
        });


        // Call the function passed from InputForm to trigger a re-render for instant update of table
        onSubmit();
    };

    return (
        <>
            <button
                className="bg-indigo-400 text-white active:bg-indigo-600 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none"
                onClick={() => setShowModal(true)}
            >
                Add New Test
            </button>
            {showModal && (
                <div className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
                    <div className="my-6 mx-auto w-[650px] h-[500px]">
                        <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
                            <div className="flex items-start justify-between p-3 border-b border-solid border-blueGray-200 rounded-t">
                                <h3 className="text-3xl font-semibold">Add a New Test</h3>
                                <button
                                    className="focus:outline-none absolute top-0 right-0 m-4"
                                    onClick={handleClose}
                                >
                                    <XMarkIcon className="h-6 w-6 text-black" />
                                </button>
                            </div>
                            <div className="relative p-6 felx flex-auto">
                                {step === 1 && (
                                    <>
                                        <h3 className="text-3xl font-semibold">Step 1</h3>
                                        <p className="w-full text-blueGray-500 text-lg leading-relaxed">
                                            <ModalTestForm handleTestInfo={handleTestInfo} />
                                        </p>
                                        <div className="flex items-center justify-end p-3 border-t border-solid border-blueGray-200 rounded-b">
                                            <button
                                                className="bg-indigo-500 text-white active:bg-emerald-600 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none"
                                                type="button"
                                                onClick={handleNext}
                                            >
                                                Next
                                            </button>
                                        </div>
                                    </>
                                )}
                                {step === 2 && (
                                    <>
                                        <h3 className="text-3xl font-semibold">Step 2</h3>

                                        <p className="my-4 text-blueGray-500 text-lg leading-relaxed">
                                            <div>
                                                <MarkerForm handleMarkerInfo={handleMarkerInfo}/>
                                            </div>


                                        </p>
                                        <div className="flex items-center justify-between p-3 border-t border-solid border-blueGray-200 rounded-b">
                                            <button
                                                className="background-transparent font-bold uppercase px-6 py-2 text-sm outline-none focus:outline-none ease-linear transition-all duration-150 mr-1 mb-1"
                                                type="button"
                                                onClick={handlePrevious}
                                            >
                                                Previous
                                            </button>
                                            <button
                                                className="bg-indigo-500 text-white active:bg-emerald-600 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none transition-all duration-150 mr-1 mb-1"
                                                type="button"
                                                onClick={handleSubmit}
                                            >
                                                Submit
                                            </button>
                                        </div>
                                    </>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
}

export default Modal;

