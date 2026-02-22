import React from 'react';

const Background = () => {
  const particles = [
    { top: '10%', left: '20%', delay: '0s' },
    { top: '20%', left: '80%', delay: '2s' },
    { top: '40%', left: '10%', delay: '4s' },
    { top: '60%', left: '70%', delay: '1s' },
    { top: '80%', left: '40%', delay: '3s' },
    { top: '30%', left: '50%', delay: '5s' },
  ];

  return (
    <>
      <div className="bg-animation"></div>
      <div className="grid-lines"></div>
      <div className="particles">
        {particles.map((particle, index) => (
          <div
            key={index}
            className="particle"
            style={{
              top: particle.top,
              left: particle.left,
              animationDelay: particle.delay,
            }}
          ></div>
        ))}
      </div>
    </>
  );
};

export default Background;