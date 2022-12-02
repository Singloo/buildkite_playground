import styled from "styled-components";
import { motion } from "framer-motion";

export const Box = styled(motion.div)<{ $size: number }>`
  display: flex;
  position: absolute;
  flex-direction: column;

  width: ${({ $size }) => $size}px;
  height: ${({ $size }) => $size}px;
`;
