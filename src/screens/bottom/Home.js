import React, { useContext, useEffect, useState } from 'react'
import { View, Text, TouchableOpacity } from 'react-native'
import { navigate } from '../../../Navigations'
import { fonts } from '../../common/fonts'
import CustomTextInput from '../../components/CustomTextInput'
import { NotifIcon } from '../../components/Svgs'
import useColors from '../../hooks/useColors'
import useLanguage from '../../hooks/useLanguage'
import { getTailorCustomersApi } from '../../Api/methods'
import Loader from '../../components/Loader'
import { Context } from '../../Context/DataContext'
import { useIsFocused } from '@react-navigation/native'

const Home = () => {


    const [loading, setLoading] = useState(false);
    const [customers, setCustomers] = useState([]);
    const { state, setCustomersGlobal } = useContext(Context);
    const focused = useIsFocused();

    async function getCustomers() {
        setLoading(true);
        const response = await getTailorCustomersApi({});
        setLoading(false)
        console.log('response ===', response);
        if (response.action == 'success') {
            setCustomers(response.data);
            setCustomersGlobal(response.data);
        }
    }

    useEffect(() => {
        getCustomers()
    }, [focused])

    return (
        <View style={{ flex: 1, backgroundColor: useColors('background') }}>
            {loading && <Loader />}
            <View style={{ width: "95%", alignSelf: 'center', flex: 1 }}>
                <View style={{ width: "100%", flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginTop: 10 }}>
                    <Text style={{ fontFamily: fonts.PSBo, fontSize: 22, color: useColors('white') }}>Hello <Text style={{ color: useColors('switchThumbOn') }}>Mughees,</Text></Text>
                    <TouchableOpacity style={{ padding: 10 }} >
                        <NotifIcon color={useColors('white')} />
                    </TouchableOpacity>
                </View>
                <CustomTextInput
                    placeholder={useLanguage('searchCustomer')}
                />
                <Text style={{ marginTop: 20, fontFamily: fonts.PMe, fontSize: 20, color: useColors('heading') }}>Explore</Text>
                <View style={{ width: "100%", alignItems: 'center', justifyContent: 'space-between', flexDirection: 'row', marginTop: 15 }}>
                    <TouchableOpacity
                        onPress={() => navigate('CustomersList')}
                        style={{ width: "30%", height: 80, borderRadius: 10, alignItems: 'center', justifyContent: 'center', backgroundColor: useColors('primary') }}>
                        <Text style={{ fontFamily: fonts.PMe, fontSize: 16, color: useColors('black'), textAlign: 'center' }}>View customers</Text>
                        {
                            customers &&
                            <View style={{ position: 'absolute', top: -5, right: -5, width: 25, height: 25, borderRadius: 25 / 2, backgroundColor: useColors('secondary'), alignItems: 'center', justifyContent: 'center', }}>
                                <Text style={{ fontFamily: fonts.PSBo, fontSize: 12, color: useColors('black'), textAlign: 'center' }}>{customers.length}</Text>
                            </View>
                        }


                    </TouchableOpacity>
                    <TouchableOpacity
                        onPress={() => navigate('AddCustomer')}
                        style={{ width: "30%", height: 80, borderRadius: 10, alignItems: 'center', justifyContent: 'center', backgroundColor: useColors('primary') }}>
                        <Text style={{ fontFamily: fonts.PMe, fontSize: 16, color: useColors('black'), textAlign: 'center' }}>Add customer</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={{ width: "30%", height: 80, borderRadius: 10, alignItems: 'center', justifyContent: 'center', backgroundColor: useColors('primary') }}>
                        <Text style={{ fontFamily: fonts.PMe, fontSize: 16, color: useColors('black'), textAlign: 'center' }}>View{"\n"}orders</Text>
                    </TouchableOpacity>
                </View>
                <Text style={{ marginTop: 20, fontFamily: fonts.PMe, fontSize: 20, color: useColors('heading') }}>Ongoing orders</Text>
                <Text style={{ marginTop: 20, fontFamily: fonts.PMe, fontSize: 20, color: useColors('heading') }}>Today deliveries</Text>

            </View>
        </View >
    )
}

export default Home
