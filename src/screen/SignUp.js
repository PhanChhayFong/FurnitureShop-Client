import React, { useState } from 'react';
import { MDBBtn, MDBContainer, MDBCard, MDBCardBody, MDBCol, MDBRow, MDBInput, MDBCheckbox, MDBIcon } from 'mdb-react-ui-kit';
import { Link, Navigate } from 'react-router-dom';
import axios from 'axios';
import Alart from '../services/Alart';

function App() {
  
  const [confirmPassword, setConfirmPassword] = useState("");
  const [user, setUser] = useState({
    name: "",
    email: "",
    password: ""
  });
  const [navigate, setNavigate] = useState(false);
  if(navigate){
    return <Navigate to="/"/>;
  }
  const submit = () => {
    if(user.name != "" && user.email !="" && user.password !=""){
      if(user.password == confirmPassword){
        axios.post("http://localhost:5000/api/v1/users/register", user, {
          headers: {"Content-Type":"application/json"}
        });
        setNavigate(true);
      }
      else{
        Alart.alartPasswordError(true);
      }
    }
    else{
      Alart.alartPasswordError(false);
    }
  };


  return (
    <MDBContainer fluid>

      <div className="p-5 bg-image" style={{backgroundImage: 'url(https://demos.creative-tim.com/soft-ui-dashboard/assets/img/curved-images/curved14.jpg)', height: '300px', backgroundPosition: 'top left ', backgroundSize: "cover"}}></div>

      <MDBCard className='mx-5 mb-5 p-5 shadow-5' style={{marginTop: '-100px', background: 'hsla(0, 0%, 100%, 0.8)', backdropFilter: 'blur(30px)'}}>
        <MDBCardBody className='p-5 text-center'>

          <h2 className="fw-bold mb-5">Sign up now</h2>
        {/* <form onSubmit={submit}> */}

          

          <MDBRow>
            <MDBCol col='6'>
              <MDBInput wrapperClass='mb-4' label='Username' id='form1' type='text' value={user.name}
                onChange = {(e) => {
                  setUser({
                    ...user, 
                    name: e.target.value
                  })
                }}
              />
            </MDBCol>

            <MDBCol col='6'>
            <MDBInput wrapperClass='mb-4' label='Email' id='form1' type='email' value={user.email} onChange= {(e) => {
              setUser({
                ...user,
                email: e.target.value
              });
            }}/>
            </MDBCol>

          </MDBRow>

          <MDBRow>

            <MDBCol col='6'>
            <MDBInput wrapperClass='mb-4' label='Password' id='form1' type='password' value={user.password} onChange={(e) => {
              setUser({
                ...user,
                password: e.target.value
              });
            }}/>
            </MDBCol>

            <MDBCol col='6'>
            <MDBInput wrapperClass='mb-4' label='Confirm Password' id='form1' type='password' value={confirmPassword} onChange={(e) => {
              setConfirmPassword(e.target.value)
            }}/>
            </MDBCol>

          </MDBRow>

          




          <button  class="btn btn-primary btn-block mb-4" onClick={() => submit()}>
            Sign up
          </button>
          <p className="text-center m-0">
                Already have an Account? <Link to="/login">Sign In</Link>
          </p>

        {/* </form> */}

          

        </MDBCardBody>
      </MDBCard>

    </MDBContainer>
  );
}

export default App;