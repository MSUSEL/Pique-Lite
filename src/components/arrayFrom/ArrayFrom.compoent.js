import React from 'react';
import { Field, FieldArray, reduxForm } from 'redux-form';
import EditorButton from '../editorButtion/EditorButton.component';
import {Content, ButtonGroupContainer, InputContainer, Title, Input, BranchContainer, CommitContainer, List, ListItem, WithButtonContainer} from './BranchingForm.styles'
import MultipleFileUploadComponent from '../pop-up/MultipleFileUpload.component';
import FormInput from '../formInput/FormInput.component'

const renderField = ({input, label, type, meta: {touched, error}}) => (
    <InputContainer>
        <Title>{label}</Title>
        <Input {...input} type={type} placeholder={label}/>
        {touched && error&& <span>{error}</span>}
    </InputContainer>
)

const renderCommits = ({ fields, meta: { error } }) => (
    <CommitContainer>
        <List>
            <ListItem>
                <EditorButton type="button" onClick={() => fields.push()}>Add commits file</EditorButton>
            </ListItem>
                {fields.map((commit, index) => (
                <ListItem key={index} alignItems="flex-start">
                    <EditorButton
                    type="button"
                    title="Remove Hobby"
                    onClick={() => fields.remove(index)}
                    >
                    Remove Commit
                </EditorButton>
                    <Field
                    name={commit}
                    type="text"
                    component={renderField}
                    label={`Commit #${index + 1}`}
                    />
                    <MultipleFileUploadComponent/>
            </ListItem>
        ))}
        {error && <ListItem className="error">{error}</ListItem>}
    </List>
    </CommitContainer>
   
  );

const renderBranches = ({fields, meta: {touched, error, submitFailed}}) => (
    <BranchContainer>
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
    </BranchContainer>
   
)
const BranchingForm = props => {
    const {handleSubmit, pristine, reset, submitting} = props
    return (
        <Content>
            <form onSubmit={handleSubmit}>
                <Field name="projectName" type="text" label="Project Name" component={renderField}/>
                <FieldArray name="branches" component={renderBranches}/>
                <ButtonGroupContainer>
                    <EditorButton type="submit" disabled={submitting}>Submit</EditorButton>
                    <EditorButton type="button" disabled={pristine || submitting} onClick={reset}>Reset</EditorButton>
                </ButtonGroupContainer>
            </form>
        </Content>
       
    )
}

export default reduxForm({
    form: BranchingForm
})(BranchingForm)