import { COLORS } from '@/constants';
import React from 'react';
import styled from 'styled-components';
import TechCard from './TechCard';

function TechList({ tech }: { tech: string[]; }) {
  return (
    <Wrapper>
      {tech.map((tech, index) => (<TechCard key={index}>{tech}</TechCard>))}
    </Wrapper>
  );
}

const Wrapper = styled.div`
  display: flex;
  flex-wrap: nowrap;
  justify-content: center;
  align-items: center;
  background-color: ${COLORS.purpleHover};
  color: ${COLORS.black};
  padding: 1rem;
  gap: 1rem;
`;

export default TechList;