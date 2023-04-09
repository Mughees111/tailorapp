
import React from "react";
import { View, Text, TouchableOpacity, TextInput, Modal, FlatList } from "react-native";



// import DownA from "./Svgs/DownA";
import { ArrowDown as PickerArrowDown } from "./Svgs";
// import { fonts } from "../constants/fonts";
import useColors from "../hooks/useColors";
import { fonts } from "../common/fonts";


interface dataType {
  title: "",
  value: ""
}

interface Props {
  data: any,
  selected: any,
  onValueChange: (i, v) => void,
  titleStyle: any
}

const PrivacyPicker = (props: Props) => {


  const [data, setData] = React.useState(props.data);
  const [filteredData, setFilteredData] = React.useState(props.data);
  const [modal, setModal] = React.useState(false);
  var temp = props.selected
  if (!temp.title) temp.title = 'Select'
  // console.log(temp)
  const [current, setCurrnet] = React.useState(temp);


  const do_filter = (str: any) => {
    str = str.toLowerCase();
    var all = data;
    var filtered_data = all.filter((v: any) => {
      var value = v?.title?.toLowerCase();
      return value?.includes(str) ? true : false
    })
    setFilteredData(filtered_data);
  }



  const headerPicker = () => {
    return (
      <View style={{ backgroundColor: "#161527", justifyContent: 'space-between', alignItems: 'center', flexDirection: 'row', height: 60, paddingHorizontal: 15 }}>
        <TouchableOpacity
          style={{ marginLeft: 3, }}
          onPress={() => {
            setModal(false)
          }}
        >
          <Text style={{
            color: '#fff',
            // fontFamily: fonts.Pre, 
          }}
          >Close</Text>
        </TouchableOpacity>
        <Text style={{
          color: "white", fontSize: 20, alignSelf: 'center',
          // fontFamily: fonts.Pre, 
          marginRight: 10
        }}>Choose</Text>
        <View />


      </View >
    )
  }
  const fresh_start = () => {

    setFilteredData(props.data);
    setModal(true)

  }
  const search = () => {
    return (
      <View style={{
        backgroundColor: "#ccc",
        paddingVertical: 5,
        paddingHorizontal: 10,
        width: "100%"
      }}>
        <TextInput
          placeholder={"Search"}
          placeholderTextColor={"#7b7b7b"}
          autoCapitalize={"none"}
          onChangeText={(v) => {
            do_filter(v)
          }}
          style={{
            backgroundColor: "#fff",
            borderRadius: 15,
            paddingVertical: 5,
            paddingHorizontal: 10,
            fontSize: 14,
            // fontFamily: fonts.PRe,
            color: "#7b7b7b"
          }}
        />
      </View>
    )
  }
  return (
    <View style={{ width: '100%', paddingRight: 1, }} >
      <TouchableOpacity
        onPress={() => {
          fresh_start()

        }}
        style={[{ width: "100%" }]}>
        <View style={{ flexDirection: "row", justifyContent: "space-between", alignItems: "center", paddingHorizontal: 5 }}>
          <Text style={[{
            color: useColors('white'), fontSize: 14,
            // fontFamily: fonts.PSBo 
          },
          props.titleStyle]}>{current.title}</Text>
          <PickerArrowDown />
        </View>
      </TouchableOpacity>
      <Modal
        animationType="slide"
        transparent={false}
        visible={modal}
        onRequestClose={() => {
          setModal(false)
        }}
      >
        <View>
          {headerPicker()}
          {search()}
          <FlatList
            data={filteredData}
            keyExtractor={(item, index) => String(index)}
            renderItem={({ item, index }) => (
              <TouchableOpacity
                selected={item.title === current.title}
                button

                onPress={() => {
                  setModal(false)
                  props.onValueChange(index, item);
                  setCurrnet(item)

                }}
              >
                <View style={{ paddingLeft: 10, marginTop: 5, borderBottomWidth: 0.5, padding: 10 }}>
                  <Text style={{
                    color: 'black', 
                    fontSize: 20,
                    fontFamily: fonts.PRe
                  }}>
                    {item.title}
                  </Text>
                </View>
                <View>
                  {/* {(item.title === current.title) ? (
                    <Radio selected />
                  ) : (
                    <Radio selected={false} />
                  )} */}
                </View>
              </TouchableOpacity>
            )}
          />
        </View>
      </Modal>
    </View>);

};
export default PrivacyPicker;
