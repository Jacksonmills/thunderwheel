import MaxWidthWrapper from "@/components/MaxWidthWrapper";
import SiteLayoutWrapper from "@/components/SiteLayoutWrapper";
import VisuallyHidden from "@/components/VisuallyHidden";
import { COLORS } from "@/constants";
import { useEffect, useRef, useState } from "react";
import styled, { keyframes } from "styled-components";

const initialMovies: string[] = ['Twisted Pair', 'The Godfather', 'The Godfather: Part II',];


export default function Home() {
  const [movies, setMovies] = useState(initialMovies);
  const [h];
  const wheelRef = useRef() as any;

  function spinWheel() {
    wheelRef.current.classList.toggle('spinning');
  }

  useEffect(() => {
    spinWheel();
  }, []);

  return (
    <SiteLayoutWrapper>
      <VisuallyHidden as="h1">THUNDERWHEEL</VisuallyHidden>
      <MaxWidthWrapper>
        <Container>
          <Board>
            <SpinnerTable>
              <Dial ref={wheelRef}>
                <Slice><SliceLabel>1</SliceLabel></Slice>
                <Slice><SliceLabel>2</SliceLabel></Slice>
                <Slice><SliceLabel>3</SliceLabel></Slice>
                <Slice><SliceLabel>4</SliceLabel></Slice>
                <Slice><SliceLabel>5</SliceLabel></Slice>
                <Slice><SliceLabel>6</SliceLabel></Slice>
                <Slice><SliceLabel>7</SliceLabel></Slice>
                <Slice><SliceLabel>8</SliceLabel></Slice>
                <Slice><SliceLabel>9</SliceLabel></Slice>
                <Slice><SliceLabel>10</SliceLabel></Slice>
                <Slice><SliceLabel>11</SliceLabel></Slice>
                <Slice><SliceLabel>12</SliceLabel></Slice>
              </Dial>
            </SpinnerTable>
            <Arrow>
              <Pointer />
            </Arrow>
          </Board>

          <div className="content-container">
            <div className="pre">
              <button id="spin" onClick={spinWheel}>Spin</button>
            </div>
          </div>


        </Container>
      </MaxWidthWrapper>
    </SiteLayoutWrapper>
  );
}

const rotate = keyframes`
  from {
    transform: rotate(0deg);
  }

  to {
    transform: rotate(360deg);
  }
`;

const Container = styled.div`
  --diameter: 350px;
  --numberOfSlices: 12;
  --radius: calc(var(--diameter) / 2);
  --circumference: calc(6.283185307 * var(--radius));
  --sliceHeight: calc(var(--circumference) / var(--numberOfSlices));
  --sliceOffset: calc(var(--sliceHeight) / 2);
  --sliceColor: ${COLORS.primary};
  --rotation: calc(360deg / var(--numberOfSlices));

  position: relative;
  max-width: 800px;
  margin: 2rem auto;
`;

const SpinnerTable = styled.div`
  height: calc(var(--diameter) - 2px);
  width: calc(var(--diameter) - 2px);
  position: relative;
  border-radius: 100%;
  overflow: hidden;
`;

const Board = styled.div`
  position: relative;
  background: ${COLORS.white};
  padding: 50px;
`;

const Dial = styled.div`
  height: 100%;
  transition: all 5s ease-out;
  animation-fill-mode: forwards;
  animation-timing-function: linear;

  &.spinning {
    animation-duration: 5s;
    animation-timing-function: cubic-bezier(0.440, -0.205, 0.000, 1.130);
    animation-name: ${rotate};
  }

  &:before {
    content: '';
    text-align: center;
    display: block;
    line-height: 60px;
    position: absolute;
    height: 40px;
    width: 40px;
    background: ${COLORS.white};
    box-shadow: 0 0 5px 5px rgba(${COLORS.black}, .1);
    top: 50%;
    left: 50%;
    margin-top: -20px;
    margin-left: -20px;
    border-radius: 100%;
    z-index: 200;
  }
`;

const Slice = styled.div`
  z-index: 150;
  position: absolute;
  top: calc(50% - var(--sliceOffset));
  height: var(--sliceHeight);
  left: 50%;
  width: 50%;
  color: ${COLORS.white};
  text-align: right;
  padding-right: 10px;
  display: block;
  transform-origin: left center;

  &:before,
  &:after {
    content: "";
    display: block;
    width: 0;
    height: 0;
    border-style: solid;
  }

  &:before {
    margin-bottom: -1px;
    margin-top: -2px;
    border-width: 0 0 calc(calc(var(--sliceHeight) / 2) + 4px) var(--radius);
    border-color: transparent transparent var(--sliceColor) transparent;
  }

  &:after {
    margin-top: -1px;
    margin-bottom: -2px;
    border-width: 0 var(--radius) calc(calc(var(--sliceHeight) / 2) + 4px) 0;
    border-color: transparent var(--sliceColor) transparent transparent;
  }

  &:nth-child(even) {
    &:after { border-color: transparent ${COLORS.secondary} transparent transparent; }
    &:before { border-color: transparent transparent ${COLORS.secondary} transparent; }
  }

  &:nth-child(1) {
    transform: rotate(0deg);
  }
  &:nth-child(2) {
    transform: rotate(30deg);
  }
  &:nth-child(3) {
    transform: rotate(60deg);
  }
  &:nth-child(4) {
    transform: rotate(90deg);
  }
  &:nth-child(5) {
    transform: rotate(120deg);
  }
  &:nth-child(6) {
    transform: rotate(150deg);
  }
  &:nth-child(7) {
    transform: rotate(180deg);
  }
  &:nth-child(8) {
    transform: rotate(210deg);
  }
  &:nth-child(9) {
    transform: rotate(240deg);
  }
  &:nth-child(10) {
    transform: rotate(270deg);
  }
  &:nth-child(11) {
    transform: rotate(300deg);
  }
  &:nth-child(12) {
    transform: rotate(330deg);
  }
`;
const SliceLabel = styled.div`
  position: absolute;
  top: 0;
  bottom: 0;
  width: 70%;
  line-height: var(--sliceHeight);
  padding-top: 1px;
  padding-bottom: 1px;
  font-size: 16px;
  text-align: right;
  padding-left: 20px;
`;

const Arrow = styled.div`
  position: absolute;
  height: 30px;
  width: 50px;
  left: calc(var(--diameter) + 30px);
  z-index: 500;
  display: block;
  top: 50%;
  margin-top: -15px;
  transform-origin: center right;
`;

const Pointer = styled.span`
  z-index: 500;
  display: block;
  height: 30px;
  width: 50px;

  &:before {
    content: '';
    display: block;
    position: absolute;
    right: 0;
    top: 0;
    width: 0;
    height: 0;
    border-style: solid;
    border-width: 0 0 15px 50px;
    border-color: transparent transparent ${COLORS.secondary} transparent;
  }
  &:after {
    content: '';
    display: block;
    position: absolute;
    right: 0;
    bottom: 0;
    width: 0;
    height: 0;
    border-style: solid;
    border-width: 0 50px 15px 0;
    border-color: transparent ${COLORS.secondary} transparent transparent;
  }
`;
