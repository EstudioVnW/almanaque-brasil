import React from 'react';
import styled from 'styled-components';

//Component
import Select from './select';
import CheckBox from './checkBox';

//styled
const Error = styled.p`
  padding: .25rem 0 1rem 1rem;
  font-size: .75rem;
  color: #FF3333;
  align-self: self-end;
`;

const ContentSelect = ({
  name,
  value,
  isError,
  handleChange,
}) => {
  return (
    <>
      <Select value={value} name={name} handleChange={(value) => handleChange(value)} />
      <Error>{isError}</Error>
      {/* <CheckBox
        isSelected={isTermsAccepted}
        onClick={handleAceptTerms}
        attention={attention}
      /> */}
    </>
  );
}

export default ContentSelect;