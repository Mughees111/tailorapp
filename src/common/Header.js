import React, { useContext } from 'react'
import { TouchableOpacity, View, Text, StatusBar } from 'react-native'
import { goBack } from '../../Navigations'
import { ArrowLeft } from '../components/Svgs'
import { Context } from '../Context/DataContext'
import useColors from '../hooks/useColors'
import useLanguage from '../hooks/useLanguage'
import { fonts } from './fonts'

const Header = ({ title, showTitle = true, headerStyle }) => {

    const { state } = useContext(Context);

    const StatusBarComponent = React.useCallback(() => {
        return (
            <StatusBar
                backgroundColor={useColors('statusBar')}
                barStyle={state.theme == 'dark' ? 'light-content' : 'dark-content'}
            />
        )
    },
        [state.theme],
    )


    return (
        <View style={[{ width: "100%", paddingVertical: 10, flexDirection: 'row', justifyContent: 'space-between', backgroundColor: useColors('background'), alignItems: 'center', }, headerStyle]}>

            <StatusBarComponent />

            <TouchableOpacity
                style={{ paddingHorizontal: 10, paddingVertical: 10 }}
                onPress={() => goBack()}
            >
                <ArrowLeft color={useColors('heading')} />
            </TouchableOpacity>
            {showTitle && <Text style={{ color: useColors('heading'), fontFamily: fonts.PMe, fontSize: 18, }}>{useLanguage(title)}</Text>}
            <Text></Text>
        </View>
    )
}

export default Header
