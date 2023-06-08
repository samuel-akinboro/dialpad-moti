import { View, Text, SafeAreaView, TouchableOpacity, FlatList, Dimensions, StatusBar } from 'react-native'
import React, { useState } from 'react'

const {width} = Dimensions.get('window');

const dialpad = [1, 2, 3, 4, 5, 6, 7, 8, 9, '', 0, 'del'];
const keySize = width * .2;
const keyTextSize = keySize / 3;
const keyGap = keySize * .2;
const keyColor = '#FDFCFD';
const numberOfDigits = 4;
const pinIndicatorSize = (width / numberOfDigits) * 0.3; // reduce size so it doesn't overflow

function DialPad() {
  return (
    <FlatList
      style={{flexGrow: 0}}
      data={dialpad}
      numColumns={3}
      columnWrapperStyle={{gap: keyGap}}
      contentContainerStyle={{gap: keyGap}}
      keyExtractor={(item) => item}
      scrollEnabled={false}
      renderItem={({item}) => (
        <TouchableOpacity
          style={{
            width: keySize,
            height: keySize,
            borderRadius: keySize,
            borderWidth: typeof item === 'number' ? 1 : 0,
            justifyContent: 'center',
            alignItems: 'center',
            borderColor: keyColor
          }}
        >
          <Text style={{
            fontSize: keyTextSize,
            color: keyColor
          }}>{item}</Text>
        </TouchableOpacity>
      )}
    />
  )
}

function PinField() {
  return (
    <View
      style={{
        flexDirection: 'row', 
        gap: pinIndicatorSize / 2,
        paddingTop: 40,
        marginBottom: 60
      }}
    >
      {Array(numberOfDigits).fill('').map((_, i) => (
        <View
          key={`pin-${i}`} 
          style={{backgroundColor: keyColor, height: pinIndicatorSize, width: pinIndicatorSize, borderRadius: pinIndicatorSize}}
        />
      ))}
    </View>
  )
}

const App = () => {
  const [code, setCode] = useState([]);

  return (
    <SafeAreaView
      style={{
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#292928'
      }}
    >
      <StatusBar barStyle={'light-content'} />
      <PinField />
      <DialPad />
    </SafeAreaView>
  )
}

export default App