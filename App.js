import { View, Text, SafeAreaView, TouchableOpacity, FlatList, Dimensions, StatusBar } from 'react-native'
import React, { useState } from 'react'
import { MotiView } from 'moti';

const {width} = Dimensions.get('window');

const dialpad = [1, 2, 3, 4, 5, 6, 7, 8, 9, '', 0, 'del'];
const keySize = width * .2;
const keyTextSize = keySize / 3;
const keyGap = keySize * .2;
const keyColor = '#FDFCFD';
const numberOfDigits = 4;
const pinIndicatorSize = (width / numberOfDigits) * 0.3; // reduce size so it doesn't overflow

function DialPad({handlePress}) {
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
          onPress={() => handlePress(item)}
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

function PinField({code}) {
  return (
    <View
      style={{
        flexDirection: 'row', 
        gap: pinIndicatorSize / 2,
        paddingTop: 40,
        marginBottom: 60,
        alignItems: 'flex-end'
      }}
    >
      {Array(numberOfDigits).fill('').map((_, i) => {
        const isSelected = !!code[i]
        return (
          <MotiView
            key={`pin-${i}`} 
            style={{
              backgroundColor: keyColor, 
              height: isSelected ? pinIndicatorSize : 2, 
              width: pinIndicatorSize, 
              borderRadius: pinIndicatorSize
            }}
          />
        )
      })}
    </View>
  )
}

const App = () => {
  const [code, setCode] = useState([]);

  const handlePress = (key) => {
    if(typeof key === 'number' && code.length <= numberOfDigits ) {
      setCode([...code, key])
    }else{
      setCode(prev => prev.slice(0, code.length - 1))
    }
  }

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
      <PinField code={code} />
      <DialPad handlePress={handlePress} />
    </SafeAreaView>
  )
}

export default App