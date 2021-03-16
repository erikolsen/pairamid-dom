import React from 'react'

const Faded = ({ children, duration, isOut }) => {
    const inEffect = `
      @keyframes react-fade-in {
        0%   { opacity: 0; }
        50%  { opacity: 0; }
        100% { opacity: 1; }
      }
    `;

    const outEffect = `
      @keyframes react-fade-out {
        0%   { opacity: 1; }
        50%  { opacity: 0; }
        100% { opacity: 0; }
      }
    `;

    return (
        <div>
            <style children={isOut ? outEffect : inEffect} />
            <div style={{
                animationDuration: `${duration}s`,
                animationIterationCount: 1,
                animationName: `react-fade-${(isOut ? 'out' : 'in')}`,
                animationTimingFunction: isOut ? 'ease-out' : 'ease-in',
                animationFillMode: 'forwards'
            }}
            >{children}</div>
        </div>
    )
}

export default Faded