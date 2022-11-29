import styled from "styled-components";

export const MovingBox = styled.div<{ $run: boolean }>`
  position: absolute;
  top: 50%;
  width: 2px;
  height: 100%;
  background: red;
  transform: translateY(-50%);
  animation-play-state: ${({ $run }) => ($run ? "running" : "paused")};
  animation-name: Move;
  animation-duration: 10s;
  animation-iteration-count: infinite;
  animation-direction: alternate;
  animation-fill-mode: forwards;
  z-index: 10;
  @keyframes Move {
    from {
      left: 100%;
    }

    to {
      left: 0%;
    }
  }
`;
