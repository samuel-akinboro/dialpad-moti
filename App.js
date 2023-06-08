import { View, Text, SafeAreaView, TouchableOpacity, FlatList, Dimensions } from 'react-native'
import React from 'react'

const {width} = Dimensions.get('window');

const dialpad = [1, 2, 3, 4, 5, 6, 7, 8, 9, '', 0, 'del'];
const keySize = width * .2;
const keyTextSize = keySize / 3
const keyGap = keySize * .2

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
            borderWidth: 1,
            justifyContent: 'center',
            alignItems: 'center'
          }}
        >
          <Text style={{
            fontSize: keyTextSize
          }}>{item}</Text>
        </TouchableOpacity>
      )}
    />
  )
}

const App = () => {
  return (
    <SafeAreaView
      style={{
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
      }}
    >
      <DialPad />
    </SafeAreaView>
  )
}

export default App