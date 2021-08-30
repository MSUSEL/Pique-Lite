import React from 'react';
import { Field, FieldArray, reduxForm } from 'redux-form';
import EditorButton from '../editorButtion/EditorButton.component';
import {Content, Input, InputName, ButtonGroupContainer, List, ListItem, BranchContainer, CommitContainer, WithButtonContainer} from './BranchingForm.styles';

const renderField = ({input, label, type, meta: {touched, error}}) => (
    <div>
        <InputName>{label}</InputName>
        <Input {...input} type={type} placeholder={label}/>
        {touched && error&& <span>{error}</span>}
    </div>
)

const renderCommits = ({ fields, meta: { error } }) => (

        <List>
            <ListItem>
                <EditorButton type="button" onClick={() => fields.push()}>Add commits file</EditorButton>
            </ListItem>
                {fields.map((commit, index) => (
                <ListItem key={index}>
                    <WithButtonContainer>
                        <Field
                            name={commit}
                            type="text"
                            component={renderField}
                            label={`Commit #${index + 1}`}
                        />
                        <EditorButton
                            type="button"
                            title="Remove Hobby"
                            onClick={() => fields.remove(index)}
                        >
                            Remove Commit #{index + 1}
                        </EditorButton>
                    </WithButtonContainer>            
            </ListItem>
        ))}
        {error && <ListItem className="error">{error}</ListItem>}
    </List>
   
  );

const renderBranches = ({fields, meta: {touched, error, submitFailed}}) => (
    <List>
        <ListItem>
            <EditorButton type="button" onClick={() => fields.push({})}>Add Branch</EditorButton>
            {(touched || submitFailed) && <span>{error}</span>}
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
              
        
            <FieldArray name={`${branch}.commitName`} component={renderCommits}/>
            </ListItem>
        ))}
    </List>
)

const BranchingForm = props => {
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
    form: BranchingForm
})(BranchingForm)
