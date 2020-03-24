import React, { Component } from 'react';
import { Lottie } from '@crello/react-lottie';
import animationData from '../Lottie/fireworks.json';

export const BasicLottieComponent = () => <Lottie width="100px" height="100px" config={{ animationData: animationData, loop: true, autoplay: true }}></Lottie>

