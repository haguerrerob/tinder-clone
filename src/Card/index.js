import { Text, Image, StyleSheet, Animated } from "react-native";
import React, { useCallback } from "react";
import tw from "twrnc";
import { CARD, ACTION_OFFSET } from "../Utils/constants";
import { LinearGradient } from "expo-linear-gradient";
import Choice from "../Choice";

const Card = ({ name, source, isFirst, swipe, tiltSign, ...rest }) => {
  const rotate = Animated.multiply(swipe.x, tiltSign).interpolate({
    inputRange: [-ACTION_OFFSET, 0, ACTION_OFFSET],
    outputRange: ["8deg", "0deg", "-8deg"],
  });

  const likeOpacity = swipe.x.interpolate({
    inputRange: [25, ACTION_OFFSET],
    outputRange: [0, 1],
    extrapolate: "clamp",
  });

  const nopeOpacity = swipe.x.interpolate({
    inputRange: [-ACTION_OFFSET, -25],
    outputRange: [1, 0],
    extrapolate: "clamp",
  });

  const animatedCardStyle = {
    transform: [...swipe.getTranslateTransform(), { rotate }],
  };

  const renderChoice = useCallback(() => {
    return (
      <>
        <Animated.View
          style={[
            tw`absolute top-10 left-10`,
            { transform: [{ rotate: "-30deg" }] },
            { opacity: likeOpacity },
          ]}>
          <Choice type='Like' />
        </Animated.View>
        <Animated.View
          style={[
            tw`absolute top-10 right-10`,
            { transform: [{ rotate: "30deg" }] },
            { opacity: nopeOpacity },
          ]}>
          <Choice type='nope' />
        </Animated.View>
      </>
    );
  }, [likeOpacity, nopeOpacity]);

  return (
    <Animated.View
      style={[tw`absolute top-12 z-50`, isFirst && animatedCardStyle]}
      {...rest}>
      <Image
        source={source}
        style={tw` w-${CARD.WIDTH} h-${CARD.HEIGHT} rounded-${CARD.BORDER_RADIUS}`}
      />
      <LinearGradient
        colors={["transparent", "rgba(0,0,0,0.9)"]}
        style={tw`absolute top-0 left-0 right-0 bottom-0 h-${CARD.HEIGHT} rounded-${CARD.BORDER_RADIUS}`}
      />
      <Text
        style={tw`absolute bottom-5 left-5 text-[32px] font-semibold text-white`}>
        {name}
      </Text>
      {isFirst && renderChoice()}
    </Animated.View>
  );
};

export default Card;
