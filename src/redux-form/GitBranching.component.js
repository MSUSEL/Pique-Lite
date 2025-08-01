import React from 'react';
import { Field, FieldArray, reduxForm} from 'redux-form';
import EditorButton from '../components/editorButtion/EditorButton.component';
import {Content, List, ListItem, WithButtonContainer, ButtonGroupContainer} from './GitBranching.styles'
import FormInput from '../components/formInput/FormInput.component';

const renderField = ({ input, label, type}) => (
    <div>
      <label>{label}</label>
      <div>
        <FormInput {...input} type={type} placeholder={label} />
      </div>
    </div>
  );

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

const renderPiqueFile = ({fields}) => (
    <List>
        <ListItem>
            <EditorButton type="button" onClick={() => fields.push({})}>Add Pique File</EditorButton>
        </ListItem>
        {fields.map((piqueFile, index) => (
            <ListItem key={index}>
                <WithButtonContainer>
                        <Field
                        name={`${piqueFile}.fileName`}
                        type="file"
                        component={FileInput}
                        label={piqueFile}
                    />
                    <EditorButton
                        type="button"
                        title="Remove Pique File"
                        onClick={() => fields.remove(index)}
                    >
                        Remove Pique File #{index +1}
                    </EditorButton>
                </WithButtonContainer>
            </ListItem>
        ))}
    </List>
)

const renderCommits = ({ fields, meta: { error } }) => (
    <List>
        <ListItem>
            <EditorButton type="button" onClick={() => fields.push()}>Add commits</EditorButton>
        </ListItem>
            {fields.map((commit, index) => (
            <ListItem key={index}>
                <WithButtonContainer>
                    <Field
                        name={`${commit}.commitName`}
                        type="text"
                        component={renderField}
                        label={`Commit #${index + 1}`}
                    />
                    <EditorButton
                        type="button"
                        title="Remove Commit"
                        onClick={() => fields.remove(index)}
                    >
                        Remove Commit #{index + 1}
                    </EditorButton>
                </WithButtonContainer>
            <FieldArray name={`${commit}.piqueFile`} component={renderPiqueFile}/>         
        </ListItem>
    ))}
    {error && <ListItem className="error">{error}</ListItem>}
</List>

);

const renderBranches = ({fields}) => (
    <List>
        <ListItem>
            <EditorButton type="button" onClick={() => fields.push({})}>Add Branch</EditorButton>
        </ListItem>
        {fields.map((branch, index) => (
            <ListItem key={index}>
                <WithButtonContainer>
                        <Field
                        name={`${branch}.branchName`}
                        type="text"
                        component={renderField}
                        label="Branch Name"
                    />
                    <EditorButton
                        type="button"
                        title="Remove Branch"
                        onClick={() => fields.remove(index)}
                    >
                        Remove Branch #{index +1}
                    </EditorButton>
                </WithButtonContainer>
              
        
            <FieldArray name={`${branch}.commits`} component={renderCommits}/>
            </ListItem>
        ))}
    </List>
)

const GitBranchingForm = (props) => {
    const {handleSubmit, pristine, reset, submitting} = props;
    return (
        <Content>
            <h3>Upload files to your projects!</h3>
            <div>
                <form onSubmit={handleSubmit}>
                    <Field name="projectName" type="text" label="Project Name" component={renderField} />
                    <FieldArray name="branches" component={renderBranches}/>
                    <ButtonGroupContainer>
                        <EditorButton type="submit" disabled={submitting}>Sumbit</EditorButton>
                        <EditorButton type="button" disabled={pristine || submitting} onClick={reset}>Reset</EditorButton>
                    </ButtonGroupContainer>
                </form>
            </div>
        </Content>
    )
}

export default reduxForm({
    form: 'GitBranchingForm', // a unique identifier for this form
  })(GitBranchingForm);