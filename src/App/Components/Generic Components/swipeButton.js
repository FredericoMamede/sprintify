import React from 'react';
import { useEffect, useState } from "react"
import Link from 'next/link'
import { useRouter } from 'next/router'
import { useEffect } from 'react'
//IMPORT DO SWIPE BUTTON
import {SwipeButton } from "react-slide-button";


//SWIPE BUTTON
export function SwipeBtn() {
    const [reset, setReset] = useState(0);
    return (
      <SwipeButton
        mainText="Swipefsgffasgsdfgsfdhag me"
        overlayText="S I K E"
        classList="my-class"
        caretClassList="my-caret-class"
        overlayClassList="my-overlay-class"
        onSwipeDone={() => {
          console.log("Done!");
        }}
        reset={reset}
      />
    );
  }
  
  //SWIPE COMPONTENT

export function SwipeComponent(props) {

    function SwipeableRectangle() {
      const [displayedContent, setDisplayedContent] = useState('Arraste para a esquerda ou direita');
    
      let touchStartX = 0;
      let touchEndX = 0;
    
      const handleTouchStart = (e) => {
        touchStartX = e.touches[0].clientX;
      };
    
      const handleTouchMove = (e) => {
        touchEndX = e.touches[0].clientX;
      };
    
      const handleTouchEnd = () => {
        const difference = touchStartX - touchEndX;
        if (difference > 50) {
          // Swipe para a esquerda
          setDisplayedContent('Você moveu para a esquerda');
        } else if (difference < -50) {
          // Swipe para a direita
          setDisplayedContent('Você moveu para a direita');
        }
      };
    
      return (
        <div
          className="rectangle"
          onTouchStart={handleTouchStart}
          onTouchMove={handleTouchMove}
          onTouchEnd={handleTouchEnd}
        >
          {displayedContent}
        </div>
      );
    }
}
    export default SwipeComponent()

