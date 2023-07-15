import React, { useCallback, useContext, useEffect, useState } from 'react'
import { View, Text, TouchableOpacity, ScrollView, Keyboard, TextInput, FlatList } from 'react-native'
import ReactNativeModal from 'react-native-modal'
import { goBack, navigate } from '../../../Navigations'
import { fonts } from '../../common/fonts'
import Header from '../../common/Header'
import { MainButton } from '../../components/Buttons'
import CustomTextInput from '../../components/CustomTextInput'
import { ArrowRight, PlusIcon, TickIcon } from '../../components/Svgs'
import useColors from '../../hooks/useColors'
import useLanguage from '../../hooks/useLanguage'
import { addCustomerApi } from '../../Api/methods'
import Loader from '../../components/Loader'
import DropdownAlert from 'react-native-dropdownalert'
import { Context } from '../../Context/DataContext'
import CheckBox from '../../components/CheckBox'



var newFieldTextInputRef;
var alertRef;
const AddCustomer = () => {

    const { state, setCustomersGlobal } = useContext(Context);
    const headingColor = useColors('heading')
    const [loading, setLoading] = useState(false);
    const [isKeyboardVisible, setKeyboardVisible] = useState(false);
    const [inputFields, setInputFields] = useState([
        { type: 'textFeild', name: useLanguage('kameezLambai'), value: '' },
        { type: 'textFeild', name: useLanguage('bazo'), value: '' },
        { type: 'textFeild', name: useLanguage('tera'), value: '' },
        { type: 'textFeild', name: useLanguage('gala'), value: '' },
        { type: 'textFeild', name: useLanguage('chati'), value: '' },
        { type: 'textFeild', name: useLanguage('shalwarLambai'), value: '' },
        { type: 'textFeild', name: useLanguage('pancha'), value: '' },
        // { type: 'textFeild', name: useLanguage('customerNote'), value: '' }
    ]);
    const [orderCheckBoxFields, setOrderCheckBoxFields] = useState([]);
    const [custName, setCustName] = useState('');
    const [custPhone, setCustPhone] = useState('');


    const [newFieldName, setNewFieldName] = useState('');
    const [newFieldType, setNewFieldType] = useState('');

    const [chooseCustomFieldTypeModal, setChooseCustomFieldTypeModal] = useState(false)

    function addNewField() {
        if (newFieldName == '') {
            alertRef.alertWithType('error', 'Error', 'Please enter field name');
            return
        }
        if (newFieldType == 'textField') {
            let arr = inputFields;
            arr.push({
                name: newFieldName,
                value: ''
            });
            setInputFields(arr);
        }
        if (newFieldType == 'checkBox') {
            let arr = orderCheckBoxFields;
            arr.push({
                name: newFieldName,
                value: true
            });
            setOrderCheckBoxFields(arr);
        }
        setNewFieldName('');
        newFieldTextInputRef.clear();
        setChooseCustomFieldTypeModal(false)
    }

    function validateFeilds() {
        try {

            if (custName == '') {
                alertRef.alertWithType('error', 'Error', 'Please enter customer name');
                return;
            }
            if (custPhone == '') {
                console.log('yes')
                alertRef.alertWithType('error', 'Error', 'Please enter customer name');
                return;
            }
            var measurements = false
            for (let key of inputFields) {
                if (key.value !== '') {
                    measurements = true
                    break;
                }
            }
            if (!measurements) {
                console.log('not')
                alertRef.alertWithType('error', 'Error', 'Please enter atleast one measurement');
                return;
            }
            doAddCustomer()
        }
        catch (err) {
            console.log('error', err)
        }
    }

    async function doAddCustomer() {
        try {
            const body = {
                name: custName,
                phone: custPhone,
                measurements: {
                    inputFields,
                    orderCheckBoxFields
                }
            }
            setLoading(true)
            const response = await addCustomerApi(body);
            setLoading(false)
            if (response.action == 'failed') {
                alertRef.alertWithType('error', 'Error', response.error);
                return;
            }
            if (response.action == 'success') {
                let arr = state.customers;
                arr.push(response.data);
                setCustomersGlobal(arr);

                alertRef.alertWithType('success', 'Success', 'Customer added successfully');
                goBack();
                return;
            }
        }
        catch (err) {
            setLoading(false)
            console.log('Add Customer API error', err)
        }
    }

    const handleCheckBoxPress = (name, value) => {
        console.log('value===', value)
        const updatedFields = orderCheckBoxFields.map((field) =>
            field.name === name ? { ...field, value } : field
        );
        setOrderCheckBoxFields(updatedFields);
    };


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


    const InputFields = useCallback(() => {
        return (
            <>
                <FlatList
                    data={inputFields}
                    extraData={inputFields}
                    numColumns={3}
                    renderItem={({ item, index }) => {
                        return (
                            <View
                                key={index}
                                style={{ width: "30%", marginLeft: "3%", marginTop: 10 }}>
                                <Text style={{ fontFamily: fonts.PMe, color: headingColor, fontSize: 12 }}>{item.name}</Text>
                                <CustomTextInput
                                    keyboardType="name-phone-pad"
                                    key={index}
                                    containerStyle={{ marginTop: 0 }}
                                    style={{ marginTop: -10 }}
                                    placeholderTextColor="rgba(255,255,255,0.5)"
                                    onChangeText={str => setInputFields(prev => {
                                        prev[index].value = str
                                        return prev
                                    })}
                                />
                            </View>
                        )
                    }}
                />
            </>
        )
    }, [])


    const CheckBoxFields = useCallback(() => {
        return (
            <>
                <FlatList
                    data={orderCheckBoxFields}
                    extraData={orderCheckBoxFields}
                    numColumns={2}
                    renderItem={({ item, index }) => {
                        return (
                            <View style={{ marginTop: 10, width: "50%" }}>
                                <CheckBox
                                    key={index}
                                    name={item.name}
                                    value={item.value}
                                    // containerStyle={{ width: "50%" }}
                                    onPress={() => handleCheckBoxPress(item.name, item.value ? false : true)}
                                />
                            </View>
                        )
                    }}
                />
            </>
        )
    }, [])



    return (
        <View style={{ flex: 1, backgroundColor: useColors('background') }}>

            <View style={{ width: "95%", alignSelf: 'center', flex: 1 }}>

                <Header title={'addCustomer'} />
                {/* {!isKeyboardVisible && */}
                <ScrollView
                    showsVerticalScrollIndicator={false}
                    contentContainerStyle={{ paddingBottom: 300 }} >
                    <>
                        <Text style={{ color: useColors('primary'), fontFamily: fonts.PMe, fontSize: 18 }}>{useLanguage('customer')}</Text>
                        <CustomTextInput
                            onChangeText={setCustName}
                            placeholder={useLanguage("name")}
                        />
                        <CustomTextInput
                            onChangeText={setCustPhone}
                            placeholder={useLanguage('phoneNumber')}
                            keyboardType={"number-pad"}
                        />
                    </>
                    {/* } */}
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

                    <InputFields />
                    <CheckBoxFields />
                    {/* <View style={{ flexDirection: 'row', flexWrap: 'wrap', width: "100%", marginLeft: "-3%" }}>
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
                                            containerStyle={{ marginTop: 0 }}
                                            style={{ marginTop: -10 }}
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
                    </View> */}
                </ScrollView>
                {
                    !isKeyboardVisible &&
                    <View style={{ position: 'absolute', bottom: 20, width: "100%", }}>
                        <MainButton
                            text={useLanguage('submit')}
                            onPress={() => validateFeilds()}
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
                        <TouchableOpacity
                            onPress={() => setNewFieldType('textField')}
                            style={{ width: "47%", flexDirection: 'row', alignItems: 'center', paddingRight: 10 }}>
                            <Text style={{ fontFamily: fonts.PRe, fontSize: 12, color: '#111', marginRight: 10 }}>{useLanguage('textField')}</Text>
                            <View style={{ width: 12, height: 12, borderRadius: 3, alignItems: 'center', justifyContent: 'center', borderWidth: 1 }}>
                                {newFieldType == 'textField' && <TickIcon />}
                            </View>
                        </TouchableOpacity>
                        <TouchableOpacity
                            onPress={() => setNewFieldType('checkBox')}
                            style={{ width: "47%", flexDirection: 'row', alignItems: 'center', paddingRight: 10 }}>
                            <Text style={{ fontFamily: fonts.PRe, fontSize: 12, color: '#111', marginRight: 10 }}>{useLanguage('checkBox')}</Text>
                            <View style={{ width: 12, height: 12, borderRadius: 3, alignItems: 'center', justifyContent: 'center', borderWidth: 1 }}>
                                {newFieldType == 'checkBox' && <TickIcon />}
                            </View>
                        </TouchableOpacity>
                    </View>
                    <TouchableOpacity
                        onPress={() => {
                            addNewField()
                        }}
                        style={{ alignSelf: 'flex-end', marginTop: 50, width: 86, height: 32, alignItems: 'center', justifyContent: 'center', backgroundColor: '#222222', borderRadius: 10 }}>
                        <Text style={{ color: 'white', fontSize: 14, fontFamily: fonts.PMe }}>{useLanguage('add')}</Text>
                    </TouchableOpacity>
                </View>

            </ReactNativeModal>
            {loading && <Loader />}
            <DropdownAlert ref={(ref) => alertRef = ref} />
        </View>
    )
}

export default AddCustomer
