import React from "react";
import styled, { keyframes } from "styled-components";

const shimmer = keyframes`
  0% { background-position: -468px 0; }
  100% { background-position: 468px 0; }
`;

const SkeletonPulse = styled.div`
  width: ${props => props.width || "100%"};
  height: ${props => props.height || "200px"};
  border-radius: ${props => props.radius || "12px"};
  background: #1e293b;
  background-image: linear-gradient(
    to right, 
    #1e293b 0%, 
    #334155 20%, 
    #1e293b 40%, 
    #1e293b 100%
  );
  background-repeat: no-repeat;
  background-size: 800px 100%;
  display: inline-block;
  position: relative;
  animation: ${shimmer} 1.5s infinite linear;
`;

const Skeleton = ({ width, height, radius, count = 1 }) => {
  return (
    <>
      {Array(count).fill(0).map((_, i) => (
        <SkeletonPulse key={i} width={width} height={height} radius={radius} />
      ))}
    </>
  );
};

export default Skeleton;
