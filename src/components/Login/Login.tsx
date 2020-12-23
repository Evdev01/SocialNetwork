import React from 'react'
import {InjectedFormProps, reduxForm} from 'redux-form'
import {createField, Input} from '../../common/FormsControls'
import {useDispatch, useSelector} from 'react-redux'
import {login} from '../../redux/auth-reducer'
import {Redirect} from 'react-router-dom'
import {maxLengthCreator, required} from '../../utils/validators'
import styles from '../../common/FormControls.module.css'
import {AppStateTypes} from '../../redux/redux-reducers'

type LoginFormOwnProps = {
    captchaUrl: string | null
}

function Login() {

    const dispatch = useDispatch()

    const isAuth = useSelector((state: AppStateTypes) => state.auth.isAuth)

    const captchaUrl = useSelector((state: AppStateTypes) => state.auth.captchaUrl)

    const onSubmit = (formData: any) => {
        dispatch(login(formData.email, formData.password, formData.rememberMe, formData.captcha))
    }

    if (isAuth) {
        return <Redirect to={'/profile'}/>
    }

    return <div>
        <LoginReduxForm onSubmit={onSubmit} captchaUrl={captchaUrl}/>
    </div>
}

export type LoginFormValuesType = {
    captcha: string
    rememberMe: boolean
    password: string
    email: string
}

const maxLength40 = maxLengthCreator(40)

const LoginForm: React.FC<InjectedFormProps<LoginFormValuesType, LoginFormOwnProps> & LoginFormOwnProps> =
        ({handleSubmit, error, captchaUrl}) => {
    return (
        <form onSubmit={handleSubmit} className={styles.loginInputForm}>
            {createField('Email', 'email', [required, maxLength40], Input)}
            {createField('Password', 'password', [required, maxLength40], Input, {type: 'password'})}
            {createField(undefined, 'rememberMe', [], Input, {type: 'checkbox'}, 'remember me')}

            {captchaUrl && <img src={captchaUrl} alt={'loading'}/>}
            {captchaUrl && createField('Enter captcha', 'captcha', [required], Input, {})}

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

const LoginReduxForm = reduxForm<LoginFormValuesType, LoginFormOwnProps>({form: 'login'})(LoginForm)

export default Login












