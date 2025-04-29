import styled from 'styled-components';

export const Container = styled.div`
  display: flex;
  gap: 2rem;
`;

export const Column = styled.div`
  flex: 1;
  border: 1px solid #ccc;
  padding: 1rem;
  overflow: auto;
`;

export const Title = styled.h2`
  font-size: 1.25rem;
  font-weight: bold;
  margin-bottom: 1rem;
`;

export const TextBlock = styled.div`
  white-space: pre-wrap;
`;

export const AddedText = styled.span`
  background-color: #c6f6d5;
`;

export const RemovedText = styled.span`
  background-color: #feb2b2;
`;
