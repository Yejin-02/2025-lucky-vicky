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
      <ModalContent onClick={(e) => e.stopPropagation()}>
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
  padding: 1rem;
  border-radius: 1rem;
  box-shadow: 0 0.1rem 0.7rem rgba(0, 0, 0, 0.1);
  width: 16rem;

  display: flex;
  flex-direction: column;
  gap: 1.5rem;

  > h3 {
    margin: 0;
    margin-top: 0.5rem;
  }
`;

const ModalInput = styled.input`
  border-radius: 1.4rem;
  height: 2.8rem;
  width: 100%;
  padding-left: 1rem;
  box-sizing: border-box;

  border: 0.06rem solid #ccc;
  background-color: white;

  font-size: 1rem;

  &:focus {
    outline: none;
  }

  &:hover {
    outline: none;
  }
`;

const ModalButtonContainer = styled.div`
  display: flex;
  justify-content: flex-end;
  gap: 0.6rem;
`;

const ModalButton = styled.button`
  padding: 0.5rem 1rem;
  border-radius: 0.3rem;
  border: none;
  cursor: pointer;
  font-weight: 500;

  &:first-child {
    background-color: #ff7b23;
    color: white;
  }
  &:last-child {
    background-color: #e9e9e9;
  }
`;
