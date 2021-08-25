import React from 'react';
import { Field, FieldArray, reduxForm } from 'redux-form';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import EditorButton from '../editorButtion/EditorButton.component';
import {Content, ButtonGroupContainer, InputContainer, Title, Input, BranchContainer} from './BranchingForm.styles'
const renderField = ({input, label, type, meta: {touched, error}}) => (
    <InputContainer>
        <Title>{label}</Title>
        <Input {...input} type={type} placeholder={label}/>
        {touched && error&& <span>{error}</span>}
    </InputContainer>
)

const renderCommits = ({ fields, meta: { error } }) => (
    <List>
      <ListItem>
        <button type="button" onClick={() => fields.push()}>Add commits file</button>
      </ListItem>
      {fields.map((commit, index) => (
        <ListItem key={index}>
          <button
            type="button"
            title="Remove Hobby"
            onClick={() => fields.remove(index)}
          />
          <Field
            name={commit}
            type="text"
            component={renderField}
            label={`Commit #${index + 1}`}
          />
        </ListItem>
      ))}
      {error && <ListItem className="error">{error}</ListItem>}
    </List>
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
            <EditorButton
                type="button"
                title="Remove Branch"
                onClick={() => fields.remove(index)}
            >
                Branch #{index +1}
            </EditorButton>
            <Field
                name={`${branch}.branchName`}
                type="text"
                component={renderField}
                label="Branch Name"
          />
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