import { launchCamera, launchImageLibrary } from 'react-native-image-picker';
import DropdownAlert from 'react-native-dropdownalert'
import React, { useCallback, useEffect, useState } from 'react'
import { View, Text, TouchableOpacity, ScrollView, Keyboard, TextInput, FlatList, Image, Platform, PermissionsAndroid, Alert } from 'react-native'
import ReactNativeModal from 'react-native-modal'
import { navigate } from '../../../Navigations'
import { fonts } from '../../common/fonts'
import Header from '../../common/Header'
import { MainButton } from '../../components/Buttons'
import CustomTextInput from '../../components/CustomTextInput'
import { ArrowRight, PlusIcon, TickIcon } from '../../components/Svgs'
import useColors from '../../hooks/useColors'
import useLanguage from '../../hooks/useLanguage'
import { useForceUpdate } from '../../hooks/useForceUpdate'
import CheckBox from '../../components/CheckBox'
import Loader from '../../components/Loader'
import { addOrderApi, loginApi } from '../../Api/methods';
import { getDayName, months, retrieveItem, uploadSingleFile } from '../../utils/functions';
import DatePicker from 'react-native-date-picker';


var newFieldTextInputRef;

var alertRef;
const MakeOrder = (props) => {

    const forceUpdate = useForceUpdate();
    const params = props.route.params.data ?? {};
    const measurementParams = props.route.params.measurements ?? {}


    const [isKeyboardVisible, setKeyboardVisible] = useState(false);
    const [loading, setLoading] = useState(false);
    const headingColor = useColors('heading')

    const [totalPayment, setTotalPayment] = useState('');
    const [paidPayment, setPaidPayment] = useState('');
    const [note, setNote] = useState('');
    const [suitPic, setSuitPic] = useState();
    const date = new Date();
    date.setDate(date.getDate() + 4);
    console.log('date', date)
    const [deliveryDate, setDeliveryDate] = useState(date);
    const [isSelectingDate, setIsSelectingDate] = useState(false);
    const [inputFields, setInputFields] = useState(measurementParams.inputFields ?? [
        { name: useLanguage('kameezLambai'), value: '' },
        { name: useLanguage('bazo'), value: '' },
        { name: useLanguage('tera'), value: '' },
        { name: useLanguage('gala'), value: '' },
        { name: useLanguage('chati'), value: '' },
        { name: useLanguage('shalwarLambai'), value: '' },
        { name: useLanguage('pancha'), value: '' },
    ]);

    const [orderCheckBoxFields, setOrderCheckBoxFields] = useState([
        { name: useLanguage('twoPeiceKolar'), value: false },
        { name: useLanguage('shirwaniGala'), value: false },
        { name: useLanguage('singleSalai'), value: false },
        { name: useLanguage('doubleSalai'), value: false },
        { name: useLanguage('fitKaff'), value: false },
        { name: useLanguage('plateKaff'), value: false },
        { name: useLanguage('chorasGhera'), value: false },
        { name: useLanguage('golGhera'), value: false },
        { name: useLanguage('golBazo'), value: false },
        { name: useLanguage('kafGol'), value: false },
        { name: useLanguage('kaj'), value: false },
        { name: useLanguage('tankaPati'), value: false },
        { name: useLanguage('frontPocket'), value: false },
        { name: useLanguage('sidePocket'), value: false },
    ])

    const [newFieldName, setNewFieldName] = useState('');
    const [newFieldType, setNewFieldType] = useState('');

    const [chooseCustomFieldTypeModal, setChooseCustomFieldTypeModal] = useState(false)

    function addNewField() {
        if (newFieldName == '') {
            alertRef.alertWithType('error', 'Error', 'Please enter field name');
            return
        }
        console.log('newFieldType', newFieldType)
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
                value: ''
            });
            setOrderCheckBoxFields(arr);
        }
        setNewFieldName('');
        newFieldTextInputRef.clear();
        setChooseCustomFieldTypeModal(false)
    }

    const handleCheckBoxPress = (name, value) => {
        const updatedFields = orderCheckBoxFields.map((field) =>
            field.name === name ? { ...field, value } : field
        );
        setOrderCheckBoxFields(updatedFields);
    };

    const validateFields = () => {
        var measurements = false
        for (let key of inputFields) {
            if (key.value !== '') {
                measurements = true
                break;
            }
        }
        if (!measurements) {
            alertRef.alertWithType('error', 'Error', 'Please enter atleast one measurement');
            return;
        }
        doMakeOrder();
    }

    const doMakeOrder = async () => {
        try {
            setLoading(true)
            const measurement = {
                inputFields, orderCheckBoxFields
            }
            const user = await retrieveItem('loginInfo')
            const formData = new FormData();
            formData.append('token', user?.api_logged_sess);
            formData.append('file', suitPic);
            formData.append('cust_id', params?._id);
            formData.append('order_measurements', JSON.stringify(measurement));
            formData.append('note', note);
            formData.append('total_payment', totalPayment);
            formData.append('paid_payment', paidPayment);
            formData.append('delivery_date', JSON.stringify(deliveryDate));
            console.log('formDate ===', formData);
            // setLoading(false)
            // return
            const response = await addOrderApi(formData, 'multipart/form-data');
            console.log('response ===', response)
            setLoading(false)
            if (response.action == 'success') {
                alertRef.alertWithType('success', 'Success', 'Order created successfully');
                navigate('Home')
            }
            else if (response.action == 'failed') {
                alertRef.alertWithType('error', 'Error', response.error);
            }


        }
        catch (err) {
            setLoading(false)
            console.log('add order api error', err)
        }
    }

    async function uploadPic(type) {
        if (type == 'camera') {
            if (Platform.OS == 'android') {
                const cameraPermission = await PermissionsAndroid.request(
                    PermissionsAndroid.PERMISSIONS.CAMERA
                );
                if (cameraPermission == 'granted' || cameraPermission == 'never_ask_again') {
                    const result = await launchCamera();
                    setSuitPic(result.assets);
                }
                else {
                    alertRef.alertWithType('error', 'Error', 'Camera permission denied');
                };
            }
        }
        else {
            const res = await uploadSingleFile();
            setSuitPic(res);
        }

    }



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
                                    value={item.value}
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
    }, [inputFields])

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
                                    onPress={() => handleCheckBoxPress(item.name, item.value)}
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
            {loading && <Loader />}


            <View style={{ backgroundColor: useColors('primary') }}>
                <DatePicker
                    modal
                    open={isSelectingDate}
                    date={deliveryDate}
                    mode='date'
                    title="Select delivery date"
                    androidVariant="nativeAndroid"
                    onConfirm={(date) => {
                        console.log('date == ', date)
                        setIsSelectingDate(false)
                        setDeliveryDate(date)
                    }}
                    onCancel={() => {
                        setIsSelectingDate(false)
                    }}

                    style={{ backgroundColor: useColors('primary'), borderRadius: 28, padding: 16, }}

                />
            </View>

            <DropdownAlert ref={(ref) => alertRef = ref} />
            <View style={{ width: "95%", alignSelf: 'center', flex: 1 }}>

                <Header title={'addOrder'} />
                {!isKeyboardVisible &&
                    <>
                        <Text style={{ color: useColors('primary'), fontFamily: fonts.PMe, fontSize: 18 }}>{useLanguage('customer')}</Text>
                        <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', width: "100%", borderBottomWidth: 0.5, borderColor: useColors('white') }}>
                            <Text style={{ color: useColors('white'), fontFamily: fonts.PRe, fontSize: 14, }}>{useLanguage('name')}</Text>
                            <Text style={{ color: useColors('white'), fontFamily: fonts.PMe, fontSize: 14, }}>{params?.name}</Text>
                        </View>
                        <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', width: "100%", borderBottomWidth: 0.5, borderColor: useColors('white'), marginTop: 10 }}>
                            <Text style={{ color: useColors('white'), fontFamily: fonts.PRe, fontSize: 14, }}>{useLanguage('phoneNumber')}</Text>
                            <Text style={{ color: useColors('white'), fontFamily: fonts.PMe, fontSize: 14, }}>{params?.phone}</Text>
                        </View>

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
                    contentContainerStyle={{ paddingBottom: 200 }} >
                    {/* <View style={{ flexDirection: 'row', flexWrap: 'wrap', width: "100%", marginLeft: "-3%" }}> */}
                    <InputFields />
                    {/* </View> */}

                    <CheckBoxFields />
                    {/* <View style={{ flexDirection: 'row', flexWrap: 'wrap', width: "100%", marginLeft: "-2%", marginTop: 20 }}> */}
                    {/* {
                            orderCheckBoxFields.map((v, index) => {
                                return (
                                    <CheckBox name={v.name} value={v.value} onPress={() => handleCheckBoxPress(v.name, v.value)} />
                                    // <TouchableOpacity
                                    //     onPress={() => {
                                    //         setOrderCheckBoxFields(prev => {
                                    //             prev[index].value = !prev[index].value
                                    //             return prev
                                    //         })
                                    //         forceUpdate();
                                    //     }}
                                    //     key={index}
                                    //     style={{ width: "45%", marginLeft: "5%", marginTop: 15, flexDirection: 'row', alignItems: 'center' }}>
                                    //     <Text style={{ fontFamily: fonts.PRe, color: useColors('heading'), fontSize: 14, width: "70%" }}>{v.name}</Text>
                                    //     <View style={{ width: 20, height: 20, borderRadius: 4, alignItems: 'center', justifyContent: 'center', borderWidth: 1, borderColor: useColors('button'), marginLeft: 10 }}>
                                    //         {v.value && <TickIcon width={12} height={10} color={useColors('white')} />}
                                    //     </View>

                                    // </TouchableOpacity>
                                )
                            })
                        } */}
                    {/* </View> */}
                    <View>
                        <Text style={{ fontSize: 12, color: useColors('white'), marginTop: 10 }}>{useLanguage('deliveryDate')}</Text>
                        <TouchableOpacity
                            onPress={() => setIsSelectingDate(true)}
                            style={{
                                width: "100%", height: 42, borderRadius: 8, borderWidth: 1,
                                borderColor: useColors('textInputBorder'), paddingHorizontal: 10, marginTop: 10,
                                justifyContent: 'center'
                            }}
                        >
                            <Text style={{
                                color: useColors('white'), fontFamily: fonts.PRe, fontSize: 14,
                            }}>{deliveryDate.getDate() + "-" + months[deliveryDate.getMonth()] + "-" + deliveryDate.getFullYear() + "  (" + getDayName(deliveryDate) + ")"}</Text>

                        </TouchableOpacity>
                    </View>
                    {/* <CustomTextInput
                        onChangeText={setTotalPayment}
                        placeholder={useLanguage("deliveryDate")}
                    /> */}
                    <CustomTextInput
                        placeholder={useLanguage("note")}
                        onChangeText={setNote}
                        multiline={true}
                        style={{ height: 80, }}
                        textAlignVertical="top"
                    />
                    <View style={{ width: "100%", height: 1, backgroundColor: useColors('white'), marginVertical: 20 }} />
                    <Text style={{ color: useColors('primary'), fontFamily: fonts.PMe, fontSize: 18, }}>{useLanguage('payment')}</Text>
                    <CustomTextInput
                        onChangeText={setTotalPayment}
                        placeholder={useLanguage("totalPayment")}
                    />
                    <CustomTextInput
                        onChangeText={setPaidPayment}
                        placeholder={useLanguage('paidPayment') + " (" + useLanguage('optional') + ")"}
                    />

                    <View style={{ width: "100%", height: 1, backgroundColor: useColors('white'), marginVertical: 20 }} />
                    <Text style={{ color: useColors('primary'), fontFamily: fonts.PMe, fontSize: 18, }}>{useLanguage('suitPic')} ({useLanguage('optional')}) </Text>
                    <TouchableOpacity
                        onPress={async () => {
                            Alert.alert("Select type", "How do you want to upload picture?", [
                                {
                                    text: "Gallery",
                                    onPress: () => {
                                        uploadPic('gallery')
                                    },
                                },
                                {
                                    text: "Camera", onPress: () => {
                                        uploadPic('camera')
                                    }
                                },
                            ]);
                        }}
                        style={{ width: "80%", alignSelf: 'center', borderWidth: 1, borderStyle: 'dashed', borderColor: useColors('white'), borderRadius: 10, height: 150, marginTop: 10, alignItems: 'center', justifyContent: 'center' }}>
                        {
                            suitPic ?
                                <Image
                                    style={{ width: "100%", height: 149, borderRadius: 10 }}
                                    source={{ uri: suitPic?.uri }}
                                /> :
                                < PlusIcon color={useColors('white')} />
                        }
                    </TouchableOpacity>
                    <View style={{ marginTop: 40, width: "100%", }}>
                        <MainButton
                            text={useLanguage('submit')}
                            onPress={() => {
                                validateFields();
                                // navigate('Home')
                            }}
                        />
                    </View>
                </ScrollView>
                {/* {
                    !isKeyboardVisible &&
                    <View style={{ position: 'absolute', bottom: 20, width: "100%", }}>
                        <MainButton
                            text={useLanguage('submit')}
                            onPress={() => {
                                console.log(inputFields);
                            }}
                        />
                    </View>
                } */}
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


        </View>
    )
}

export default MakeOrder
