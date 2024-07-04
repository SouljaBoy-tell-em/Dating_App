import { ChangeEvent, useState } from "react";
import styled from "styled-components";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
`;

const StyledLabel = styled.label`
  font-size: 16px;
  font-weight: bold;
  color: #333;
`;

const StyledSelect = styled.select`
  padding: 8px;
  font-size: 16px;
  border-radius: 4px;
  border: 1px solid #ccc;
  &:focus {
    border-color: #007BFF;
  }
`;

interface DropdownProps {
    options:string[];
    label:string;
    onChange: (s:string) => void; 
}

const Dropdown: React.FC<DropdownProps> = ({ options, label, onChange }) => {
  const [selectedOption, setSelectedOption] = useState<string>("");

  const handleChange = (event: ChangeEvent<HTMLSelectElement>) => {
    setSelectedOption(event.target.value);
    console.log(event.target.value);
    onChange(event.target.value);
  };

  return (
    <Container>
      <StyledLabel>{label}</StyledLabel>
      <StyledSelect value={selectedOption} onChange={handleChange}>
        <option value="" disabled>
          Select an option
        </option>
        {options.map((option, index) => (
          <option key={index} value={option}>
            {option}
          </option>
        ))}
      </StyledSelect>
    </Container>
  );
};

export default Dropdown;