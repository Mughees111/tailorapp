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
import { addCustomerApi, getCustomerDetailsApi } from '../../Api/methods'
import Loader from '../../components/Loader'
import DropdownAlert from 'react-native-dropdownalert'
import { Context } from '../../Context/DataContext'
import CheckBox from '../../components/CheckBox'
import { jsDateObjToStandard } from '../../utils/functions'



var newFieldTextInputRef;
var alertRef;
const CustomerDetails = (props) => {

    const { state, setCustomersGlobal } = useContext(Context);
    const params = props.route.params ?? {};
    const headingColor = useColors('heading')
    const [loading, setLoading] = useState(false);
    const [isKeyboardVisible, setKeyboardVisible] = useState(false);
    const [inputFields, setInputFields] = useState([]);
    const [orderCheckBoxFields, setOrderCheckBoxFields] = useState([]);
    const [custName, setCustName] = useState(params.name);
    const [custPhone, setCustPhone] = useState(params.phone);


    const [newFieldName, setNewFieldName] = useState('');
    const [newFieldType, setNewFieldType] = useState('');

    const [chooseCustomFieldTypeModal, setChooseCustomFieldTypeModal] = useState(false)




    const handleCheckBoxPress = (name, value) => {
        const updatedFields = orderCheckBoxFields.map((field) =>
            field.name === name ? { ...field, value } : field
        );
        setOrderCheckBoxFields(updatedFields);
    };

    async function getCustomerDetails() {
        const body = {
            cust_id: params?._id,
        }
        setLoading(true)
        const response = await getCustomerDetailsApi(body);
        setLoading(false)
        if (response.action == 'failed') {
            alertRef.alertWithType('error', 'Error', response.error)
            return;
        }
        if (response.action == 'success') {
            console.log('action=', response.data.measurements)
            setInputFields(response.data.measurements?.measurement[0]?.inputFields)
            setOrderCheckBoxFields(response.data.measurements?.measurement[0]?.orderCheckBoxFields)
            return;
        }
    }



    useEffect(() => {
        getCustomerDetails();
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
                                    disabled={true}
                                    editable={false}
                                    value={item.value}
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
                                    disabled={true}
                                    key={index}
                                    name={item.name}
                                    value={item.value}
                                    // containerStyle={{ width: "50%" }}
                                    onPress={(name, value) => handleCheckBoxPress(name, value)}
                                />
                            </View>
                        )
                    }}
                />
            </>
        )
    }, [orderCheckBoxFields])



    return (
        <View style={{ flex: 1, backgroundColor: useColors('background') }}>

            <View style={{ width: "95%", alignSelf: 'center', flex: 1 }}>

                <Header title={'customerDetails'} />
                {/* {!isKeyboardVisible && */}
                <ScrollView
                    showsVerticalScrollIndicator={false}
                    contentContainerStyle={{ paddingBottom: 300 }} >
                    <View style={{ flexDirection: 'row', justifyContent: 'space-between', width: "100%", width: "95%", alignSelf: 'center' }}>
                        <Text style={{ color: useColors('white'), fontFamily: fonts.PMe, fontSize: 14 }}>{useLanguage('name')}</Text>
                        <Text style={{ color: useColors('primary'), fontFamily: fonts.PMe, fontSize: 14 }}>{custName}</Text>
                    </View>
                    <View style={{ flexDirection: 'row', justifyContent: 'space-between', width: "100%", width: "95%", alignSelf: 'center' }}>
                        <Text style={{ color: useColors('white'), fontFamily: fonts.PMe, fontSize: 14 }}>{useLanguage('phoneNumber')}</Text>
                        <Text style={{ color: useColors('primary'), fontFamily: fonts.PMe, fontSize: 14 }}>{custPhone}</Text>
                    </View>
                    <View style={{ flexDirection: 'row', justifyContent: 'space-between', width: "100%", width: "95%", alignSelf: 'center' }}>
                        <Text style={{ color: useColors('white'), fontFamily: fonts.PMe, fontSize: 14 }}>{useLanguage('createdAt')}</Text>
                        <Text style={{ color: useColors('primary'), fontFamily: fonts.PMe, fontSize: 14 }}>{jsDateObjToStandard(params.created_at)}</Text>
                    </View>
                    <Text style={{ color: useColors('primary'), fontFamily: fonts.PMe, fontSize: 18, marginTop: 10 }}>{useLanguage('measurements')}</Text>

                    <InputFields />
                    <CheckBoxFields />
                </ScrollView>
                <MainButton
                    btnStyle={{ position: 'absolute', bottom: 50, }}
                    onPress={() => navigate('MakeOrder', {
                        data: params,
                        measurements: {
                            inputFields,
                            orderCheckBoxFields
                        }
                    })}
                    text={"Add Order"}
                />

            </View>


            {loading && <Loader />}
            <DropdownAlert ref={(ref) => alertRef = ref} />
        </View>
    )
}

export default CustomerDetails
