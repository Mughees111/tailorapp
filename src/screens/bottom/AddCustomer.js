import React, { useEffect, useState } from 'react'
import { View, Text, TouchableOpacity, ScrollView, Keyboard, TextInput } from 'react-native'
import ReactNativeModal from 'react-native-modal'
import { navigate } from '../../../Navigations'
import { fonts } from '../../common/fonts'
import Header from '../../common/Header'
import { MainButton } from '../../components/Buttons'
import CustomTextInput from '../../components/CustomTextInput'
import { ArrowRight, PlusIcon, TickIcon } from '../../components/Svgs'
import useColors from '../../hooks/useColors'
import useLanguage from '../../hooks/useLanguage'


var newFieldTextInputRef;
const AddCustomer = () => {

    const [isKeyboardVisible, setKeyboardVisible] = useState(false);
    const [inputFields, setInputFields] = useState([
        { name: useLanguage('kameezLambai'), value: '' },
        { name: useLanguage('bazo'), value: '' },
        { name: useLanguage('tera'), value: '' },
        { name: useLanguage('gala'), value: '' },
        { name: useLanguage('chati'), value: '' },
        { name: useLanguage('shalwarLambai'), value: '' },
        { name: useLanguage('pancha'), value: '' },
        { name: useLanguage('customerNote'), value: '' }
    ]);
    const [newFieldName, setNewFieldName] = useState('');
    const [newFieldType, setNewFieldType] = useState('');

    const [chooseCustomFieldTypeModal, setChooseCustomFieldTypeModal] = useState(false)


    useEffect(() => {
        const keyboardDidShowListener = Keyboard.addListener(
            'keyboardDidShow',
            () => {
                setKeyboardVisible(true);
            }
        );
        const keyboardDidHideListener = Keyboard.addListener(
            'keyboardDidHide',
            () => {
                setKeyboardVisible(false);
            }
        );

        return () => {
            keyboardDidHideListener.remove();
            keyboardDidShowListener.remove();
        };
    }, []);





    return (
        <View style={{ flex: 1, backgroundColor: useColors('background') }}>
            <View style={{ width: "95%", alignSelf: 'center', flex: 1 }}>

                <Header title={'addCustomer'} />
                {!isKeyboardVisible &&
                    <>
                        <Text style={{ color: useColors('primary'), fontFamily: fonts.PMe, fontSize: 18 }}>{useLanguage('customer')}</Text>
                        <CustomTextInput
                            placeholder={useLanguage("name")}
                        />
                        <CustomTextInput
                            placeholder={useLanguage('phoneNumber')}
                        />
                    </>
                }
                <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginTop: 10 }}>
                    <Text style={{ color: useColors('primary'), fontFamily: fonts.PMe, fontSize: 18, marginTop: 10 }}>{useLanguage('measurements')}</Text>
                    <View style={{ alignItems: 'center' }}>
                        <TouchableOpacity
                            onPress={() => {
                                setChooseCustomFieldTypeModal(true)
                            }}
                            style={{ width: 30, height: 30, alignItems: 'center', justifyContent: 'center', backgroundColor: useColors('button'), borderRadius: 7 }} >
                            <PlusIcon width={18} height={18} color={useColors('black')} />
                        </TouchableOpacity>
                        <Text style={{ color: useColors('heading'), fontSize: 9, fontFamily: fonts.PMe, marginTop: 4 }}>{useLanguage('addNewFields')}</Text>
                    </View>
                </View>
                <ScrollView
                    showsVerticalScrollIndicator={false}
                    contentContainerStyle={{ paddingBottom: 300 }} >
                    <View style={{ flexDirection: 'row', flexWrap: 'wrap', width: "100%", marginLeft: "-3%" }}>
                        {
                            inputFields.map((v, index) => {
                                return (
                                    <View
                                        key={index}
                                        style={{ width: "30%", marginLeft: "3%", marginTop: 10 }}>
                                        <Text style={{ fontFamily: fonts.PMe, color: useColors('heading'), fontSize: 12 }}>{v.name}</Text>
                                        <CustomTextInput
                                            keyboardType="name-phone-pad"
                                            key={index}
                                            style={{ marginTop: 5 }}
                                            placeholderTextColor="rgba(255,255,255,0.5)"
                                            onChangeText={str => setInputFields(prev => {
                                                prev[index].value = str
                                                return prev
                                            })}
                                        />
                                    </View>
                                )
                            })
                        }
                    </View>
                </ScrollView>
                {
                    !isKeyboardVisible &&
                    <View style={{ position: 'absolute', bottom: 20, width: "100%", }}>
                        <MainButton
                            text={useLanguage('submit')}
                            onPress={() => {
                                console.log(inputFields);
                            }}
                        />
                        <MainButton
                            onPress={() => navigate('MakeOrder', {
                                fields: inputFields,
                                customer: {
                                    id: "1",
                                    name: "Mughees",
                                    phoneNumber: "03221401833"
                                }
                            })}
                            btnStyle={{ marginTop: 10, flexDirection: 'row', justifyContent: 'center', }}
                            text={useLanguage("addAndMakeOrder")}
                        >
                            <ArrowRight color={useColors('black')} style={{ position: 'absolute', right: 20, }} />
                        </MainButton>
                    </View>
                }
            </View>

            <ReactNativeModal
                isVisible={chooseCustomFieldTypeModal}
                onBackdropPress={() => setChooseCustomFieldTypeModal(false)}
            >
                <View style={{ backgroundColor: 'white', paddingHorizontal: 15, paddingVertical: 20, borderRadius: 10 }}>
                    <Text style={{ color: '#111', fontFamily: fonts.PSBo, fontSize: 17, }}>{useLanguage('addCustomField')}</Text>
                    <TextInput
                        onChangeText={setNewFieldName}
                        ref={ref => newFieldTextInputRef = ref}
                        style={{ width: "100%", borderBottomWidth: 1, paddingBottom: 0, borderColor: '#707070', fontSize: 14, color: '#111', fontFamily: fonts.PRe }}
                        placeholderTextColor="#707070"
                        placeholder={"Enter field name"}
                    />
                    <Text style={{ color: '#222', fontFamily: fonts.PMe, fontSize: 14, marginTop: 20 }}>{useLanguage('selectTypeOfField')}</Text>
                    <View style={{ flexDirection: 'row', justifyContent: 'space-between', width: "100%", alignItems: 'center', marginTop: 5, marginLeft: 10 }}>
                        <View style={{ width: "47%", flexDirection: 'row', alignItems: 'center', paddingRight: 10 }}>
                            <Text style={{ fontFamily: fonts.PRe, fontSize: 12, color: '#111', marginRight: 10 }}>{useLanguage('textField')}</Text>
                            <View style={{ width: 12, height: 12, borderRadius: 3, alignItems: 'center', justifyContent: 'center', borderWidth: 1 }}>
                                <TickIcon />
                            </View>
                        </View>
                        <View style={{ width: "47%", flexDirection: 'row', alignItems: 'center', paddingRight: 10 }}>
                            <Text style={{ fontFamily: fonts.PRe, fontSize: 12, color: '#111', marginRight: 10 }}>{useLanguage('checkBox')}</Text>
                            <View style={{ width: 12, height: 12, borderRadius: 3, alignItems: 'center', justifyContent: 'center', borderWidth: 1 }}>
                                <TickIcon />
                            </View>
                        </View>
                    </View>
                    <TouchableOpacity
                        onPress={() => {
                            let arr = inputFields;
                            arr.push({
                                name: newFieldName,
                                value: ''
                            });
                            setInputFields(arr);
                            newFieldTextInputRef.clear();
                        }}
                        style={{ alignSelf: 'flex-end', marginTop: 50, width: 86, height: 32, alignItems: 'center', justifyContent: 'center', backgroundColor: '#222222', borderRadius: 10 }}>
                        <Text style={{ color: 'white', fontSize: 14, fontFamily: fonts.PMe }}>{useLanguage('add')}</Text>
                    </TouchableOpacity>
                </View>
            </ReactNativeModal>
        </View>
    )
}

export default AddCustomer
