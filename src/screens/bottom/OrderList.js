import React, { useContext, useState } from 'react'
import { View, Text, StyleSheet, TouchableOpacity, FlatList, SafeAreaView } from 'react-native'
import { ArrowLeft, NotifIcon as NotificationIcon, ProfileBtmIcon as ProfileIcon, HeartSettingIcon, SettingsIcon, TermsIcon, LogoutIcon, ArrowForward, ThemeIcon } from '../../components/Svgs';
import { Context } from '../../Context/DataContext';
import useColors from '../../hooks/useColors';
import { fonts } from '../../common/fonts';
import Header from '../../common/Header';
import { jsDateObjToStandard } from '../../utils/functions';
import { MainButton } from '../../components/Buttons';
import CustomTextInput from '../../components/CustomTextInput';
import useLanguage from '../../hooks/useLanguage';
import { navigate } from '../../../Navigations';


const OrderList = () => {

    const styles = getStyles(useColors);
    const { state } = useContext(Context);
    const [customers, setCustomers] = useState(state.customers);
    const arrowForwardColor = useColors('profileTabsIcons');

    function searchCustomer(str) {
        str = str.toLowerCase();
        let arr = state.customers;
        const filter = arr.filter((v) => {
            return v?.phone?.toLowerCase()?.includes(str) || v?.name?.toLowerCase()?.includes(str)
        });
        setCustomers(filter);
    }

    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: useColors('background') }}>
            <Header showTitle={true} title={'customerList'} headerStyle={{ paddingLeft: 10 }} />
            <View style={{ width: "90%", alignSelf: 'center' }}>
                <CustomTextInput
                    placeholder={useLanguage('searchCustomer')}
                    onChangeText={searchCustomer}
                />
                <View style={styles.containers}>
                    <FlatList
                        style={{ marginTop: 10 }}
                        data={customers}
                        ItemSeparatorComponent={({ }) => {
                            return (
                                <View style={{ height: 1, width: "100%", marginVertical: 10, backgroundColor: useColors('black'), opacity: 0.5 }} />
                            )
                        }}
                        renderItem={({ item, index }) => {
                            return (
                                <TouchableOpacity
                                    onPress={() => {
                                        navigate('CustomerDetails', item)
                                    }}
                                    style={{ flexDirection: 'row', alignItems: 'center', marginTop: 0 }
                                    }>
                                    <View>
                                        <Text style={[styles.text, { fontSize: 14, }]}>{item.name}</Text>
                                        <Text style={styles.text}>{item.phone}</Text>
                                        <Text style={[styles.text, { opacity: 0.8 }]}>{jsDateObjToStandard(item.created_at)}</Text>
                                    </View>


                                    <View style={{ position: 'absolute', right: 5, }}>
                                        <ArrowForward color={arrowForwardColor} />
                                    </View>
                                </TouchableOpacity >
                            )
                        }}
                    />
                </View>
            </View>
            <MainButton
                text="Add Customer"
                btnStyle={{ position: 'absolute', bottom: 20, width: "90%", alignSelf: 'center' }}
            />

        </SafeAreaView >
    )
}

const getStyles = (useColors) => StyleSheet.create({
    iconCircle: {
        width: 34, height: 34, alignItems: 'center', justifyContent: 'center', borderRadius: 34 / 2,
        backgroundColor: 'rgba(226, 179, 120, 0.09)',

    },
    text: {
        fontFamily: fonts.PMe,
        fontSize: 12,
        color: useColors('profileTabsIcons'),
        marginLeft: 10,
        textTransform: 'capitalize'
    },
    containers: {
        marginTop: 20, width: "100%", alignSelf: 'center', backgroundColor: useColors('profileTabs'),
        paddingBottom: 15, paddingHorizontal: 0, borderRadius: 6
    }
})


export default OrderList