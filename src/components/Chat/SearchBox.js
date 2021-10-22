import React, { useContext } from 'react';
import { AuthContext } from '../../contexts/AuthContext';

export const SearchBox = () => {

    const { auth, logout } = useContext(AuthContext);
    const { name } = auth;

    return (
        <div className="headind_srch">
            <div className="recent_heading mt-2">
                <h4>{ name }</h4>
            </div>
            <div className="srch_bar">
                <div className="stylish-input-group">
                    <button 
                        className="btn text-danger"
                        onClick={ logout }
                    >
                        Salir
                    </button>
                </div>
            </div>
        </div>
    )
}
