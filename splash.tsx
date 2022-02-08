import React, {useEffect, useState, useRef, useCallback, Fragment} from 'react';
import {View, StyleSheet} from 'react-native';
import LottieView from 'lottie-react-native';

import animation from './animation.json';

const Splash = () => {
  const [visible, setVisible] = useState<boolean>(true);
  const animationRef = useRef<LottieView>(null);

  useEffect(() => {
    const current = animationRef.current;
    current?.play();
    return () => current?.reset();
  }, []);

  const handleOnAnimationFinish = useCallback(() => {
    setVisible(visibility => !visibility);
  }, []);

  if (visible) {
    return (
      <View
        style={[
          styles.container,
          visible ? styles.foreground : styles.background,
        ]}>
        <LottieView
          ref={animationRef}
          source={animation}
          autoPlay={false}
          loop={false}
          onAnimationFinish={handleOnAnimationFinish}
        />
      </View>
    );
  } else {
    return <Fragment />;
  }
};

export default Splash;

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#2C3333',
    position: 'absolute',
    width: '100%',
    height: '100%',
  },
  background: {
    zIndex: -1,
  },
  foreground: {
    zIndex: 5,
  },
});
