import React, {useState} from 'react';
import {Dimensions, Image, SafeAreaView, StyleSheet, Text, View} from 'react-native';
import {SimpleLineIcons} from '@expo/vector-icons';
import Data, {detailList, iconsByTypes} from "./src/data/Data";

const {width, height} = Dimensions.get("window");
const DURATION = 700;
const TITLE_SIZE = 36;
const SPACING = 20;
const IMAGE_SIZE = width * .8;

const colors = {
  lightBG: "#F2F2F2",
  darkBG: "#2C2D51",
  lightText: "#E5E5DD",
  darkText: "#A5A6AA",
};


const Item = ({children, style}) => {
  return (
    <View style={[{justifyContent: "center", overflow: "hidden", backgroundColor: "transparent"}, style]}
    >
      {children}
    </View>
  )
}

const Icon = ({type}) => {
  return (
    <View>
      <SimpleLineIcons
        name={type}
        size={26}
        color="#A5A6AA"
        style={{marginRight: 15, height: 26}}
      />
    </View>
  )
}

const Description = ({index, text, color}) => {
  return (
    <Item>
      <Text key={index} style={{fontSize: 6, color}}>
        {text}
      </Text>
    </Item>
  )
}

const Title = ({index, text, color}) => {
  return (
    <Item style={{height: TITLE_SIZE * 3, justifyContent: "flex-end"}}>
      <Text key={index} style={{fontSize: TITLE_SIZE, fontWeight: "800", color}}>
        {text}
      </Text>
    </Item>
  )
}

const Detail = ({color, index}) => {
  return (
    <View style={{marginVertical: SPACING}}
    >
      {detailList.map((key) => {
        return (
          <View
            key={key}
            style={{
              flexDirection: "row",
              alignItems: "center",
              marginBottom: 25,
            }}
          >
            <Icon type={iconsByTypes[key]}/>
            <Item style={{flex: 1, height: 26, justifyContent: "center"}}>
              <Text
                key={key}
                style={{fontSize: 16, color, fontWeight: "700"}}
              >
                {Data[index][key]}
              </Text>
            </Item>
          </View>
        )
      })}
    </View>
  )
}


export default function App() {

  const [index, setIndex] = useState(0);
  const color = index % 2 === 1 ? colors.lightText : colors.darkText;
  const headingColor = index % 2 === 1 ? colors.lightText : colors.darkBG;
  return (
    <SafeAreaView style={styles.container}>
      <View style={[styles.imageContainer, {borderColor: index % 2 === 0 ? colors.darkBG : colors.lightBG}]}>
        <Image source={{uri: Data[index].image}} style={styles.image}/>
      </View>
      <View
        style={{
          padding: 20,
          flex: 1,
          justifyContent: "space-evenly"
        }}
      >
        <Title color={headingColor} index={index} text={Data[index].title}/>
        <Detail color={color} index={index}/>
        <Description
        index={index}
        text={Data[index].description}
        color={headingColor}
        />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
