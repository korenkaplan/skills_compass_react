import React from 'react';
import Ticker from 'react-ticker';
import { hostages_names } from '../../utils/variables';

const MyTicker: React.FC = () => {
  console.log(hostages_names); // Log outside JSX for debugging purposes

  return (
    <div className="ticker-container" style={{ backgroundColor: 'red', width: '100%', color: 'white' }}>
      <Ticker speed={5}>
        {() => (
          <div>
            {hostages_names.map((name, idx) => (
              <div key={idx}>{name}</div>
            ))}
          </div>
        )}
      </Ticker>
    </div>
  );
};

export default MyTicker;
