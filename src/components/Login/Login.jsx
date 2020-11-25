import React from 'react'
import {reduxForm} from 'redux-form'
import {createField, Input} from '../../common/FormsControls'
import {useDispatch, useSelector} from 'react-redux'
import {login} from '../../redux/auth-reducer'
import {Redirect} from 'react-router-dom'
import {maxLengthCreator, required} from '../../utils/validators'
import styles from '../../common/FormControls.module.css'


function Login() {

    const dispatch = useDispatch()

    const isAuth = useSelector(state => state.auth.isAuth)

    const onSubmit = (formData) => {
        dispatch(login(formData.email, formData.password,formData.rememberMe))
    }

    if (isAuth) {
        return <Redirect to={'/profile'}/>
    }

    return <div>
        <h1>Login</h1>
        <LoginReduxForm onSubmit={onSubmit}/>
    </div>
}

const maxLength40 = maxLengthCreator(40)

const LoginForm = ({handleSubmit, error}) => {
    return (
        <form onSubmit={handleSubmit}>
            {createField('Email', 'email', [required, maxLength40], Input)}
            {createField('Password', 'password', [required, maxLength40], Input, {type: 'password'})}
            {createField(null, 'rememberMe', [], Input, {type: 'checkbox'}, 'remember me')}

            {error && <div className={styles.formSummaryError}>
                {error}
            </div>
            }

            <div>
                <button>Login</button>
            </div>
        </form>
    )
}

const LoginReduxForm = reduxForm({form: 'login'})(LoginForm)

export default Login












