import React, { useState, useContext } from 'react';
import { Link } from 'react-router-dom';
import Swal from 'sweetalert2';
import { AuthContext } from '../contexts/AuthContext';

export const RegisterPage = () => {

  const { register } = useContext(AuthContext);

  const [form, setForm] = useState({
    nombre: '', 
    email: '',
    password: '',
  });

  const { email, nombre, password } = form;

  const handleChange = ({ target }) => {
    const { name, value } = target;

    setForm({
      ...form,
      [name]: value,
    });
  };

  const handleSubmit = async(e) => {
    e.preventDefault();

    const ok = await register(nombre, email, password);

    if(!ok) {
      Swal.fire('Error', 'Verifique el nombre, email y contraseña indicados', 'error');
    };
  }

  const todoOk = () => {
    return (email.length > 0 && password.length > 0 && nombre.length > 0) ? true : false;
  }

  return (
    <form 
      className="login100-form validate-form flex-sb flex-w"
      onSubmit={ handleSubmit }
    >
      <span className="login100-form-title mb-3">
        Chat - Registro
      </span>

      <div className="wrap-input100 validate-input mb-3">
        <input 
          className="input100"
          type="text"
          name="nombre"
          placeholder="Nombre"
          value={ nombre }
          onChange={ handleChange }
        />
        <span className="focus-input100"></span>
      </div>

      
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
        <div className="col text-right">
          <Link to="/auth/login" className="txt1">
            Ya tienes cuenta?
          </Link>
        </div>
      </div>

      <div className="container-login100-form-btn m-t-17">
        <button 
          className="login100-form-btn"
          type="submit"
          disabled={ !todoOk() }
        >
          Crear cuenta
        </button>
      </div>

    </form>
  )
}
