import React from 'react'
import { Field, reduxForm } from 'redux-form';

const adaptFileEventToValue = delegate => e => delegate(e.target.files[0]);

const FileInput = ({ 
  input: { value: omitValue, onChange, onBlur, ...inputProps }, 
  meta: omitMeta, 
  ...props 
}) => {
  return (
    <input
      onChange={adaptFileEventToValue(onChange)}
      onBlur={adaptFileEventToValue(onBlur)}
      type="file"
      accept=".json"
      {...props.input}
      {...props}
    />
  );
};

export const Projects= (props) => {
    const { handleSubmit } = props;
    const onFormSubmit = (data) => {
        console.log("I need my data", data);
    }
    return (
          <form onSubmit={handleSubmit(onFormSubmit)}>
            <div>
              <label>Attachment</label>
              <Field name="attachment" component={FileInput} type="file"/>
            </div>
            <button type="submit">Submit</button>
          </form>
    )
}

export default reduxForm({
    form: 'fileupload'
})(Projects)