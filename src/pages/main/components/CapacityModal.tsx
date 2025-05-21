import { useState } from "react";
import { styled } from "styled-components";

interface CapacityModalProps {
  isOpen: boolean;
  onClose: () => void;
  onApply: (capacity: number | null) => void;
}

function CapacityModal({ isOpen, onClose, onApply }: CapacityModalProps) {
  const [inputValue, setInputValue] = useState("");

  if (!isOpen) {
    return null;
  }

  const handleApply = () => {
    const capacity = parseInt(inputValue, 10);
    onApply(isNaN(capacity) || capacity <= 0 ? null : capacity); // Apply null if invalid or empty
    setInputValue(""); // Reset input
    onClose();
  };

  const handleClose = () => {
    setInputValue(""); // Reset input
    onClose();
  };

  return (
    <ModalOverlay onClick={handleClose}>
      {" "}
      {/* Clicking overlay closes modal */}
      <ModalContent onClick={(e) => e.stopPropagation()}>
        {" "}
        {/* Prevents closing when clicking inside content */}
        <h3>인원 수 필터</h3>
        <ModalInput
          type="number"
          placeholder="인원 수를 입력하세요 (예: 5)"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          min="1"
        />
        <ModalButtonContainer>
          <ModalButton onClick={handleApply}>적용</ModalButton>
          <ModalButton onClick={handleClose}>닫기</ModalButton>
        </ModalButtonContainer>
      </ModalContent>
    </ModalOverlay>
  );
}

export default CapacityModal;

const ModalOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
`;

const ModalContent = styled.div`
  background-color: white;
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  width: 300px;
  display: flex;
  flex-direction: column;
  gap: 15px;
`;

const ModalInput = styled.input`
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 4px;
  font-size: 1em;
`;

const ModalButtonContainer = styled.div`
  display: flex;
  justify-content: flex-end;
  gap: 10px;
`;

const ModalButton = styled.button`
  padding: 8px 15px;
  border-radius: 4px;
  border: none;
  cursor: pointer;
  font-weight: 500;

  &:first-child {
    // Assuming Apply button is first
    background-color: #007bff; // Example primary color
    color: white;
  }
  &:last-child {
    // Assuming Close/Cancel button is second
    background-color: #f0f0f0;
  }
`;
