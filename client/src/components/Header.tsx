import { FormEvent, useState } from 'react';
import styled from 'styled-components';
import Link from 'next/link';
import Image from 'next/image';

import { COLORS } from 'src/constants';

import Button from 'src/components/Button';
import { PlusCircle } from 'react-feather';
import Logo from './Logo';

const Header = () => {
  const isDev = process.env.NODE_ENV !== 'production';

  return (
    <Wrapper>
      <Logo>THUNDERWHEEL</Logo>
    </Wrapper>
  );
};

const Wrapper = styled.header`
  /* position: fixed; */
  width: 100%;
  background: ${COLORS.black};
  color: ${COLORS.white};
  display: flex;
  align-items: center;
  padding: 6px 24px;
  z-index: 99;
`;

export default Header;
