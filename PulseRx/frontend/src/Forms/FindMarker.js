import React, { useState, useRef, useEffect } from 'react';
import {Typography } from "@material-tailwind/react";
import Table from 'react-bootstrap/Table';
import './FindMarker.css';

function SearchableInputForm() {
    const [bloodMarker, setBloodMarker] = useState('');
    const [value, setValue] = useState('');
    const [filteredBloodMarkers, setFilteredBloodMarkers] = useState([]);
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [markersList, setMarkersList] = useState([]);
    const [error, setError] = useState('');

    // List of available blood markers
    const availableBloodMarkers = [
        'glucose',
        'cholesterol_total',
        'cholesterol_hdl', 
        'cholesterol_ldl',
        'triglycerides',
        'hemoglobin',  
        'hematocrit',  
        'mcv',  
        'mch',  
        'mchc', 
        'rdw',  
        'platelets',  
        'wbc',  
        'neutrophils',  
        'lymphocytes',  
        'monocytes',  
        'eosinophils',  
        'basophils', 
    ];

    // Handle marker selection
    const handleBloodMarkerChange = (marker) => {
        setBloodMarker(marker);
        setIsMenuOpen(false);
    };

    // Handle value input
    const handleValueChange = (e) => {
        setValue(e.target.value);
    };

    // Filter blood markers based on user input
    const filterBloodMarkers = (input) => {
        const filtered = availableBloodMarkers.filter(marker =>
            marker.toLowerCase().includes(input.toLowerCase())
        );
        setFilteredBloodMarkers(filtered);
        setIsMenuOpen(true);
    };

    // Handle adding a marker and its value
    const handleAddMarker = () => {
        if (!bloodMarker) {
            setError('Please select a blood marker.');
            return;
        }

        if (!value) {

            return;
        }

        const newMarker = { marker: bloodMarker, value };
        setMarkersList((prevList) => [...prevList, newMarker]);
        setBloodMarker('');
        setValue('');
        setError(''); // Clear error if addition is successful
    };

    // Handle deleting a marker and its value
    const handleDeleteMarker = (index) => {
        setMarkersList((prevList) => prevList.filter((_, idx) => idx !== index));
    };

    // Ref to store reference to the main dropdown container
    const dropdownRef = useRef(null);

    // Event handler for document clicks
    const handleDocumentClick = (e) => {
        if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
            setIsMenuOpen(false);
        }
    };

    // Set up the event listener when the component mounts
    useEffect(() => {
        document.addEventListener('click', handleDocumentClick);
        return () => {
            // Clean up the event listener when the component is unmounted
            document.removeEventListener('click', handleDocumentClick);
        };
    }, []);

    return (
        <div className="grid grid-cols-2 gap-8 " ref={dropdownRef}>
            {/* Input form container */}
            <div className="flex flex-col">

                {/* Blood marker input and dropdown */}
                <div className="relative w-full min-w-[230px] h-11">
                    <input
                        className="w-full h-full px-3 py-3 font-sans text-sm font-normal transition-all bg-transparent border rounded-md peer text-blue-gray-700 outline outline-0 focus:outline-0 disabled:bg-blue-gray-50 disabled:border-0 placeholder-shown:border placeholder-shown:border-blue-gray-200 placeholder-shown:border-t-blue-gray-200 focus:border-2 border-t-transparent focus:border-t-transparent border-blue-gray-200 focus:border-gray-900"
                        placeholder=""
                        value={bloodMarker}
                        onChange={(e) => {
                            setBloodMarker(e.target.value);
                            filterBloodMarkers(e.target.value);
                        }}
                        onClick={() => setIsMenuOpen(true)}
                    />
                    {/* Dropdown for available blood markers */}
                    {bloodMarker !== '' && filteredBloodMarkers.length > 0 && isMenuOpen && (
                        <ul
                            role="menu"
                            className="absolute z-10 w-full mt-1 rounded-md border border-blue-gray-50 bg-white p-3 font-sans text-sm font-normal text-blue-gray-500 shadow-lg shadow-blue-gray-500/10 focus:outline-none"
                        >
                            {filteredBloodMarkers.map((marker, index) => (
                                <li
                                    key={index}
                                    role="menuitem"
                                    className="block w-full cursor-pointer select-none rounded-md px-3 pt-[9px] pb-2 text-start leading-tight transition-all hover:bg-blue-gray-50 hover:bg-opacity-80 hover:text-blue-gray-900 focus:bg-blue-gray-50 focus:bg-opacity-80 focus:text-blue-gray-900 active:bg-blue-gray-50 active:bg-opacity-80 active:text-blue-gray-900"
                                    onClick={() => handleBloodMarkerChange(marker)}
                                >
                                    {marker}
                                </li>
                            ))}
                        </ul>
                    )}
                    <label
                        className="flex w-full h-full select-none pointer-events-none absolute left-0 font-normal !overflow-visible truncate peer-placeholder-shown:text-blue-gray-500 leading-tight peer-focus:leading-tight peer-disabled:text-transparent peer-disabled:peer-placeholder-shown:text-blue-gray-500 transition-all -top-1.5 peer-placeholder-shown:text-sm text-[11px] peer-focus:text-[11px] before:content[' '] before:block before:box-border before:w-2.5 before:h-1.5 before:mt-[6.5px] before:mr-1 peer-placeholder-shown:before:border-transparent before:rounded-tl-md before:border-t peer-focus:before:border-t-2 before:border-l peer-focus:before:border-l-2 before:pointer-events-none before:transition-all peer-disabled:before:border-transparent after:content[' '] after:block after:flex-grow after:box-border after:w-2.5 after:h-1.5 after:mt-[6.5px] after:ml-1 peer-placeholder-shown:after:border-transparent after:rounded-tr-md after:border-t peer-focus:after:border-t-2 after:border-r peer-focus:after:border-r-2 after:pointer-events-none after:transition-all peer-disabled:after:border-transparent peer-placeholder-shown:leading-[4.1] text-gray-500 peer-focus:text-gray-900 before:border-blue-gray-200 peer-focus:before:!border-gray-900 after:border-blue-gray-200 peer-focus:after:!border-gray-900">
                        Search Blood Markers
                    </label>
                </div>

                {/* Value input */}
                <div className="relative w-full min-w-[230px] h-11 mt-2">
                    <input
                        className="w-full h-full px-3 py-3 font-sans text-sm font-normal transition-all bg-transparent border rounded-md peer text-blue-gray-700 outline outline-0 focus:outline-0 disabled:bg-blue-gray-50 disabled:border-0 placeholder-shown:border placeholder-shown:border-blue-gray-200 placeholder-shown:border-t-blue-gray-200 focus:border-2 border-t-transparent focus:border-t-transparent border-blue-gray-200 focus:border-gray-900"
                        placeholder=""
                        value={value}
                        onChange={handleValueChange}
                    />
                    <label
                        className="flex w-full h-full select-none pointer-events-none absolute left-0 font-normal !overflow-visible truncate peer-placeholder-shown:text-blue-gray-500 leading-tight peer-focus:leading-tight peer-disabled:text-transparent peer-disabled:peer-placeholder-shown:text-blue-gray-500 transition-all -top-1.5 peer-placeholder-shown:text-sm text-[11px] peer-focus:text-[11px] before:content[' '] before:block before:box-border before:w-2.5 before:h-1.5 before:mt-[6.5px] before:mr-1 peer-placeholder-shown:before:border-transparent before:rounded-tl-md before:border-t peer-focus:before:border-t-2 before:border-l peer-focus:before:border-l-2 before:pointer-events-none before:transition-all peer-disabled:before:border-transparent after:content[' '] after:block after:flex-grow after:box-border after:w-2.5 after:h-1.5 after:mt-[6.5px] after:ml-1 peer-placeholder-shown:after:border-transparent after:rounded-tr-md after:border-t peer-focus:after:border-t-2 after:border-r peer-focus:after:border-r-2 after:pointer-events-none after:transition-all peer-disabled:after:border-transparent peer-placeholder-shown:leading-[4.1] text-gray-500 peer-focus:text-gray-900 before:border-blue-gray-200 peer-focus:before:!border-gray-900 after:border-blue-gray-200 peer-focus:after:!border-gray-900">
                        Enter Value
                    </label>
                </div>

                {/* Error message */}
                {error && (
                    <p className="text-red-500 text-sm mt-2">
                        {error}
                    </p>
                )}

                {/* Add Marker button */}
                <button
                    onClick={handleAddMarker}
                    className="mt-2 select-none rounded-lg bg-gray-900 py-2 px-4 text-center align-middle font-sans text-xs font-bold uppercase text-white shadow-md shadow-gray-900/10 transition-all hover:shadow-lg hover:shadow-gray-900/20 focus:opacity-[0.85] focus:shadow-none active:opacity-[0.85] active:shadow-none disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"
                >
                    Add Marker
                </button>
            </div>

            {/* Display added markers and values */}
{/* 
            <div className="flex flex-col w-400 mt-7 ml-8">  
                {markersList.map((markerEntry, index) => (
                    <div key={index} className="flex justify-between items-center border-b pb-2 mb-2">
                        <span className="text-sm text-blue-gray-900">
                            {markerEntry.marker}: {markerEntry.value}
                        </span>
                        <button
                            onClick={() => handleDeleteMarker(index)}
                            className="text-red-500 text-sm"
                        >
                            Delete
                        </button>
                    </div>
                ))}
            </div>
             */}
            <div className="markerContainer rounded-md overflow-x-hidden">
                <Table className="text-left" size="sm">
                <thead>
                    <tr>
                        <th
                        className="border-b border-blue-gray-100 bg-blue-gray-50 p-0"
                        >
                        <Typography
                            variant="small"
                            color="blue-gray"
                            className="font-normal"
                        >
                            Name
                        </Typography>
                        </th>
                        <th
                        className="border-b border-blue-gray-100 bg-blue-gray-50 p-0"
                        >
                        <Typography
                        variant="small"
                        color="blue-gray"
                        className="font-normal"
                        >
                            Value
                        </Typography></th>
                        <th></th>
                    </tr>
                </thead>
                <tbody>
                {markersList.map((markerEntry, index) => {
                    const isLast = index === markersList.length - 1;
                    const classes = isLast ? "p-4 text-left" : "p-4 border-b border-blue-gray-100 text-left";

                    return(
                    <tr>
                        <td className={classes} colSpan="1">
                        <Typography
                            variant="small"
                            color="blue-gray"
                            className="font-normal"
                        >
                            {markerEntry.marker}
                        </Typography>
                        </td>
                        <td className={classes} colSpan="1">
                        <Typography
                            variant="small"
                            color="blue-gray"
                            className="font-normal"
                        >
                            {markerEntry.value}
                        </Typography>
                        </td>
                        <td className={classes} colSpan="1">
                            <button
                                onClick={() => handleDeleteMarker(index)}
                                className="text-red-500 text-sm"
                            >
                                Delete
                            </button>
                        </td>
                    </tr>
                    );
                })}
                </tbody>
                </Table>
            </div>

        </div>
    );
}

export default SearchableInputForm;
