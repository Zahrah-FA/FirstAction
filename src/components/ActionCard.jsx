import React, { useEffect, useRef } from 'react';

import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  Animated,
} from 'react-native';

export default function ActionCard({ item, onPress }) {

  const fadeAnim = useRef(new Animated.Value(0)).current;

  const slideAnim = useRef(new Animated.Value(30)).current;

  useEffect(() => {

    Animated.parallel([

      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 800,
        useNativeDriver: true,
      }),

      Animated.timing(slideAnim, {
        toValue: 0,
        duration: 800,
        useNativeDriver: true,
      }),

    ]).start();

  }, []);

  return (

    <Animated.View
      style={[
        styles.card,
        {
          opacity: fadeAnim,
          transform: [{ translateY: slideAnim }],
        },
      ]}
    >

      <TouchableOpacity onPress={onPress}>

        <Image
          source={{ uri: item.image }}
          style={styles.image}
        />

        <View style={styles.content}>

          <Text style={styles.title}>
            {item.title}
          </Text>

          <Text style={styles.category}>
            {item.category}
          </Text>

        </View>

      </TouchableOpacity>

    </Animated.View>
  );
}

const styles = StyleSheet.create({

  card: {
    backgroundColor: '#fff',
    borderRadius: 15,
    marginBottom: 20,
    overflow: 'hidden',
    elevation: 5,
  },

  image: {
    width: '100%',
    height: 180,
  },

  content: {
    padding: 15,
  },

  title: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#1D3557',
    marginBottom: 5,
  },

  category: {
    color: '#E63946',
    fontWeight: '600',
  },

});