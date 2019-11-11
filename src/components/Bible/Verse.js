import React from 'react';

const Verse = ({text, number}) => (
  <p className={"verse verse-" + number}>
    <span className="verse-number">{number}</span> {" "}
    {text}
  </p>
);

export default Verse;
