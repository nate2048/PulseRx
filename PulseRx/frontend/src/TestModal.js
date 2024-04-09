import React, { useState } from "react";

export default function Modal() {
  const [showModal, setShowModal] = useState(false);
  const [step, setStep] = useState(1);

  const handleNext = () => {
    setStep(step + 1);
  };

  const handlePrevious = () => {
    setStep(step - 1);
  };

  const handleClose = () => {
    setShowModal(false);
    setStep(1); // Reset step when closing the modal
  };

  return (
    <>
      <button
        className="bg-indigo-400 text-white active:bg-pink-600 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
        type="button"
        onClick={() => setShowModal(true)}
      >
        Add New Test
      </button>
      {showModal && (
        <div className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
          <div className="relative w-auto my-6 mx-auto max-w-3xl">
            <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
              <div className="flex items-start justify-between p-5 border-b border-solid border-blueGray-200 rounded-t">
                <h3 className="text-3xl font-semibold">Add a New Test</h3>
                <button
                  className="p-1 ml-auto bg-transparent border-0 text-black opacity-5 float-right text-3xl leading-none font-semibold outline-none focus:outline-none"
                  onClick={handleClose}
                >
                  <span className="bg-transparent text-black opacity-5 h-6 w-6 text-2xl block outline-none focus:outline-none">×</span>
                </button>
              </div>
              <div className="relative p-6 flex-auto">
                {step === 1 && (
                  <>
                    <h3 className="text-3xl font-semibold">Step 1</h3>
                    <p className="my-4 text-blueGray-500 text-lg leading-relaxed">
                      This is for test info. This is for test info. This is for test info. This is for test info.
                      This is for test info. This is for test info. This is for test info.
                      This is for test info. This is for test info. This is for test info. This is for test info.
                      This is for test info. This is for test info. This is for test info. This is for test info. This is for test info.
                      This is for test info. This is for test info. This is for test info. This is for test info. This is for test info.
                    </p>
                    <div className="flex items-center justify-end p-6 border-t border-solid border-blueGray-200 rounded-b">
                      <button className="bg-indigo-500 text-white active:bg-emerald-600 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150" type="button" onClick={handleNext}>
                        Next
                      </button>
                    </div>
                  </>
                )}
                {step === 2 && (
                  <>
                    <h3 className="text-3xl font-semibold">Step 2</h3>
                    <p className="my-4 text-blueGray-500 text-lg leading-relaxed">
                      This is for marker info. This is for marker info. This is for marker info.
                      This is for marker info. This is for marker info.
                      This is for marker info. This is for marker info.
                      This is for marker info. This is for marker info. This is for marker info.
                      This is for marker info. This is for marker info.
                      This is for marker info. This is for marker info.
                      This is for marker info. This is for marker info. This is for marker info.
                      This is for marker info. This is for marker info. This is for marker info. This is for marker info.
                    </p>
                    <div className="flex items-center justify-between p-6 border-t border-solid border-blueGray-200 rounded-b">
                      <button className="background-transparent font-bold uppercase px-6 py-2 text-sm outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150" type="button" onClick={handlePrevious}>
                        Previous
                      </button>
                      <button className="bg-emerald-500 text-white active:bg-emerald-600 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150" type="button" onClick={handleClose}>
                        Close
                      </button>
                    </div>
                  </>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
      <div className={showModal ? "opacity-25 fixed inset-0 z-40 bg-black" : "hidden"}></div>
    </>
  );
}

