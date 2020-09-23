import { GoogleLogin } from 'react-google-login';
import React, { useState, useEffect } from 'react';
import authActions from '../redux/actions/authActions'
import { connect } from 'react-redux'
import { NavLink } from 'react-router-dom'



const LogIn = props => {

    const [ingresoUsuario, setIngresoUsuario] = useState({
        mail: '',
        pass: ''
    })

    const leerImput = e => {
        const campo = e.target.name
        const valor = e.target.value
        setIngresoUsuario({
            ...ingresoUsuario,
            [campo]: valor
        })
    }

    const enviarInfo = async e => {
        console.log(ingresoUsuario)
        e.preventDefault()
        await props.logUser(ingresoUsuario)
    }

    useEffect(() => {
        if (props.success) {
            alert("Welcome")
        }
    }, [props.success])


    const responseGoogle = response => {
        props.logUser({
            mail: response.profileObj.email,
            pass: response.profileObj.googleId
        })
    }



    return (
        <div id="todoelhome">

            <div id="divFormulario">
                <form>
                    <h3>Log In form</h3>

                    <GoogleLogin id="GoogleLogin"
                        clientId="83311303903-d8eviki4j9rvmabuc0ceg0c5im70b2ab.apps.googleusercontent.com"
                        buttonText="Log in with google"
                        onSuccess={responseGoogle}
                        onFailure={responseGoogle}
                        cookiePolicy={'single_host_origin'}
                    />

                    <div id="divUsuario">
                        <input onChange={leerImput} type="text" id="mail" name="mail" placeholder="Write your mail here"></input>
                    </div>
                    <div id="divContraseña">
                        <input onChange={leerImput} type="password" id="pass" name="pass" placeholder="Write your password here"></input>
                    </div>
                    <div id="HaveAccount">
                        <p>Don't have an account?</p>
                        <NavLink to="/register"> Sign up</NavLink>
                    </div>
                    <button id="createAccount" onClick={enviarInfo}>Log in</button>
                </form>
            </div>

        </div>
    )

}

const mapStateToProps = (state) => {
    return {
        success: state.authReducer.success
    }
}

const mapDispatchToProps = {
    logUser: authActions.logUser,
}

export default connect(mapStateToProps, mapDispatchToProps)(LogIn)
