/* global ResizeObserver */
import React, { useEffect, useRef, useState } from 'react';
import { View } from 'react-native';
import { domToPng } from 'modern-screenshot';
const MaskedView = ({ children, maskElement, style, ...rest }) => {
  const maskRef = useRef(null);
  const [mask, setMask] = useState('');
  const snapShot = () => {
    if (!maskRef.current) return;
    domToPng(maskRef.current).then(dataUrl => {
      setMask(dataUrl);
    });
  };
  useEffect(() => {
    const observer = new ResizeObserver(snapShot);
    observer.observe(maskRef.current);
    return () => {
      observer.disconnect();
    };
  }, [maskElement]);

  return (
    <>
      <View
        style={{
          position: 'absolute',
          transform: [{ translateX: '-100%' }, { translateY: '-100%' }],
        }}
      >
        <div ref={maskRef}>{maskElement}</div>
      </View>

      <View
        style={[
          style,
          {
            //@ts-ignore
            mask: `url(${mask}) center no-repeat`,
          },
        ]}
        {...rest}
      >
        {children}
      </View>
    </>
  );
};

export default MaskedView;
