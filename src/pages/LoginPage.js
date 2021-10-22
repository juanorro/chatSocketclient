import React, { useEffect, useState, useContext } from 'react'
import { Link } from 'react-router-dom'
import { AuthContext } from '../contexts/AuthContext';
import Swal from 'sweetalert2';

export const LoginPage = () => {

  const { login } = useContext(AuthContext)

  const [form, setForm] = useState({
    email: '', 
    password: '', 
    rememberMe: true
  });

  //coger el email de localStorage en cada recarga del navegador
  useEffect(() => {
    const rememberMeEmail = localStorage.getItem('email');
    if(rememberMeEmail) {
      setForm((form) => ({
        ...form, 
        rememberMe: true, 
        email: rememberMeEmail
      }))
    }
  }, [])

  const { email, password, rememberMe } = form;

  const handleChange = ({ target }) => {
    const { name, value } = target;

    setForm({
      ...form, 
      [name]: value
    });
  };

  const toogleCheck = () => {
    setForm({
      ...form,
      rememberMe: !rememberMe
    })
  }

  const handleSubmit = async(e) => {
    e.preventDefault();
    
    //guardar o borrar el email si está o no activado el rememberMe
    if(rememberMe) {
      localStorage.setItem('email', email);
    } else {
      localStorage.removeItem('email');
    }

    const ok = await login(email, password);
    
    if(!ok) {
      Swal.fire('Error', 'Verifique el email y contraseña', 'error');
    } 
  }

  const todoOk = () => {
    return (email.length > 0 && password.length) ? true : false
  }

  return (
    <form 
      className="login100-form validate-form flex-sb flex-w" 
      onSubmit={ handleSubmit }
    >
      <span className="login100-form-title mb-3">
        Chat - Ingreso
      </span>
      
      <div className="wrap-input100 validate-input mb-3">
        <input 
          className="input100" 
          type="email" 
          name="email" 
          placeholder="Email" 
          value={ email }
          onChange={ handleChange }
        />
        <span className="focus-input100"></span>
      </div>
      
      
      <div className="wrap-input100 validate-input mb-3">
        <input 
          className="input100" 
          type="password" 
          name="password" 
          placeholder="Password"
          value={ password }
          onChange={ handleChange }
        />
        <span className="focus-input100"></span>
      </div>
      
      <div className="row mb-3">
        <div className="col" onClick={ () => toogleCheck() } >
          <input 
            className="input-checkbox100" 
            id="ckb1" 
            type="checkbox" 
            name="rememberMe"
            checked={ rememberMe }
            readOnly
          />
          <label className="label-checkbox100">
            Recordarme
          </label>
        </div>

        <div className="col text-right">
          <Link to="/auth/register" className="txt1">
            Nueva cuenta?
          </Link>
        </div>
      </div>

      <div className="container-login100-form-btn m-t-17">
        <button 
          type="submit"
          className="login100-form-btn"
          disabled={ !todoOk() }
        >
          Ingresar
        </button>
      </div>
    </form>
  )
}
