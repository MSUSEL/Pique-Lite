import React from 'react';
import { Form, Field, reduxForm } from 'redux-form';

const ArrayForm = (props) => {
    const {handleSubmit, pristine, reset, submitting} = props;
    const renderField = ({input, label, type, meta: {touched, error}}) => {
        return (
            <div>
                <label>{label}</label>
                <div>
                    <input {...input} type={type} placeholder={label}/>
                    {touched && error && <span>{error}</span>}
                </div>
            </div>
        )
    }
    return (
        <div>I a form
            <Form>
            <Field
            name="clubName"
            type="text"
            label="Club Name"
            component={renderField}
          />
            <button> submit </button>
            </Form>
        </div>
    )
}

export default reduxForm({form: "ArrayForm"})(ArrayForm)