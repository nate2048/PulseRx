import React from 'react'; 
import axios from 'axios';
import "bootstrap/dist/css/bootstrap.min.css";
import Navbar from "./Navigation/Navbar.js";
  
class App extends React.Component { 
  
    state = { 
        details : [], 
    } 
  
    componentDidMount() { 
  
        let data ; 
  
        axios.get('http://localhost:8000/blood-tests/') 
        .then(res => { 
            console.log(res);
            data = res.data; 
            this.setState({ details : data }); 
        }) 
        .catch(function (error) {
          console.log(error.toJSON());
        })
    } 
  
  render() { 
    return( 
      <div> 
        <Navbar />
        <h1>{this.state.details.length}</h1>
        {this.state.details.map(detail =>  ( 
            <div > 
                  <ul> 
                        <li>Blood test {detail.id} - {detail.test_date} </li> 
                  </ul> 
            </div> 
            ) 
        )} 
      </div> 
      ); 
  } 
} 
  
export default App;