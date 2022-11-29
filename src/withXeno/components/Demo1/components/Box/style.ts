import styled from "styled-components";

export const Box = styled.div<{ $size: number }>`
  display: flex;
  position: absolute;
  flex-direction: column;

  width: ${({ $size }) => $size}px;
  height: ${({ $size }) => $size}px;
`;
