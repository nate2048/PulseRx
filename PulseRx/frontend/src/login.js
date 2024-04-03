import './App.css';
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Navbar from 'react-bootstrap/Navbar';
import Button from 'react-bootstrap/Button';
import Nav from 'react-bootstrap/Nav';
import Container from 'react-bootstrap/Container';
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import Home from "./pages/home";
import BloodMarkerForm from "./pages/entry";
import Dashboard from "./pages/Dashboard";
import Layout from "./Layout";

axios.defaults.xsrfCookieName = 'csrftoken';
axios.defaults.xsrfHeaderName = 'X-CSRFToken';
axios.defaults.withCredentials = true;

const client = axios.create({
  baseURL: "http://127.0.0.1:8000"
});

function Login() {
  const [currentUser, setCurrentUser] = useState();
  const [registrationToggle, setRegistrationToggle] = useState(false);
  const [email, setEmail] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [age, setAge] = useState('');
  const [sex, setSex] = useState('');
  const [ethnicity, setEthnicity] = useState('');

  useEffect(() => {
    client.get("/api/user")
      .then(function (res) {
        setCurrentUser(true);
        console.log("res");
      })
      .catch(function (error) {
        setCurrentUser(false);
      });
  }, []);

  function updateFormBtn() {
    setRegistrationToggle(!registrationToggle);
  }

  function submitRegistration(e) {
    e.preventDefault();
    client.post("/api/register", {
      email: email,
      username: username,
      age: age,
      sex: sex,
      ethnicity: ethnicity,
      password: password
    }).then(function (res) {
      client.post("/api/login", {
        email: email,
        password: password
      }).then(function (res) {
        setCurrentUser(true);
      });
    });
  }

  function submitLogin(e) {
    e.preventDefault();
    client.post("/api/login", {
      email: email,
      password: password
    }).then(function (res) {
      setCurrentUser(true);
    });
  }

  function submitLogout(e) {

    if(e) {
      e.preventDefault();
    }
    client.post("/api/logout", { withCredentials: true }).then(function (res) {
      setCurrentUser(false);
    });
  }

  if (currentUser) {
    //so here I am passing the logout function as a prop to the dashboard layout
   return <Layout logout={submitLogout} />;
  }

  return (
    <div className="flex min-h-full flex-col justify-center px-6 py-12 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-sm">

        <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">{registrationToggle ? 'Register an' : 'Sign in to your'} account </h2>
      </div>

      <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
        <form className="space-y-6" onSubmit={registrationToggle ? submitRegistration : submitLogin}>
          <div>
            <label htmlFor="email" className="block text-sm font-medium leading-6 text-gray-900">Email address</label>
            <div className="mt-2">
              <input id="email" name="email" type="email" autoComplete="email" required className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" value={email} onChange={e => setEmail(e.target.value)} />
            </div>
          </div>

          <div>
            <div className="flex items-center justify-between">
              <label htmlFor="password" className="block text-sm font-medium leading-6 text-gray-900">Password</label>
            {!registrationToggle && (
      <div className="text-sm">
        <a href="#" className="font-semibold text-indigo-600 hover:text-indigo-500">Forgot password?</a>
      </div>
    )}
            </div>
            <div className="mt-2">
              <input id="password" name="password" type="password" autoComplete="current-password" required className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" value={password} onChange={e => setPassword(e.target.value)} />
            </div>
          </div>

          {registrationToggle && (
            <>
              <div>
                <label htmlFor="username" className="block text-sm font-medium leading-6 text-gray-900">Username</label>
                <div className="mt-2">
                  <input id="username" name="username" type="text" autoComplete="username" required className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" value={username} onChange={e => setUsername(e.target.value)} />
                </div>
              </div>

              <div>
                <div className="flex items-center justify-between">
                  <label htmlFor="age" className="block text-sm font-medium leading-6 text-gray-900">Age</label>
                  {/* Add more fields as needed for registration */}
                </div>
                <div className="mt-2">
                  <input id="age" name="age" type="number" autoComplete="age" required className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring
- inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" value={age} onChange={e => setAge(e.target.value)} />
                </div>
              </div>

              <div>
                <div className="flex items-center justify-between">
                  <label htmlFor="sex" className="block text-sm font-medium leading-6 text-gray-900">Sex</label>

                </div>
                <div className="mt-2">
                  <input id="sex" name="sex" type="text" autoComplete="sex" required className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" value={sex} onChange={e => setSex(e.target.value)} />
                </div>
              </div>

              <div>
                <div className="flex items-center justify-between">
                  <label htmlFor="ethnicity" className="block text-sm font-medium leading-6 text-gray-900">Ethnicity</label>

                </div>
                <div className="mt-2">
                  <select id="ethnicity" name="ethnicity" required className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" value={ethnicity} onChange={e => setEthnicity(e.target.value)}>
                    <option>Select Ethnicity</option>
                    <option value="Black">Black</option>
                    <option value="White">White</option>
                    <option value="Other">Other</option>
                  </select>
                </div>
              </div>
            </>
          )}

          <div>
            <button type="submit" className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">
              {registrationToggle ? 'Register' : 'Sign in'}
            </button>
          </div>
        </form>

        {!registrationToggle && (
          <p className="mt-10 text-center text-sm text-gray-500">
            Not a member?
            <button className="font-semibold leading-6 text-indigo-600 hover:text-indigo-500" onClick={updateFormBtn}> Register now</button>
          </p>
        )}
      </div>
    </div>
  );
}

export default Login;