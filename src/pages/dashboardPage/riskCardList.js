import {IoSkullOutline} from 'react-icons/io5'
import {ImWarning} from 'react-icons/im';
import {RiAlarmWarningLine} from 'react-icons/ri'
import {RiSecurePaymentLine} from 'react-icons/ri'
import { DarkRed, Red, Yellow, Green } from '../../utils/color';

export const riskCardList = [
    {
        title: 'Tqi',
        bcolor: DarkRed.value,
        score: 0.3,
        icon: <IoSkullOutline/>
        
    },
    {
        title: 'Security',
        bcolor: Red.value,
        score: 0.4,
        icon: <RiAlarmWarningLine/>
    },
    {
        title: 'Compatibility',
        bcolor: Yellow.value,
        score: 0.6,
        icon:  <ImWarning/>
    },
    {
        title: 'Performace',
        bcolor: Green.value,
        score: 0.8,
        icon: <RiSecurePaymentLine/>
    }
]