import { Severe, High, Elevated, Guarded, Low , Grey} from "./color"
import {IoSkullOutline} from 'react-icons/io5'
import {ImWarning} from 'react-icons/im';
import {RiAlarmWarningLine} from 'react-icons/ri'
import {RiSecurePaymentLine} from 'react-icons/ri'
import {CgDanger} from 'react-icons/cg';
import {BiError} from 'react-icons/bi'


export const getRiskColor = (score) => {
    const num = Number(score)
     if (num <= 0.2 ){
       return  Severe.color
     } else if ( num > 0.2 && num <= 0.4 ){
       return  High.color
     }else if ( num > 0.4 && num <= 0.6) {
      return Elevated.color
    }else if ( num > 0.6 && num <= 0.8 ) {
      return Guarded.color
    }else if ( num > 0.8 && num <= 1.0 ) {
        return  Low.color
    }else{
      return Grey
    }
  }

  export const getRiskIcon = (score) => {
    const num = Number(score)
     if (num <= 0.2 ){
       return <IoSkullOutline/>
     } else if ( num > 0.2 && num <= 0.4 ){
       return <RiAlarmWarningLine/>
     }else if ( num > 0.4 && num <= 0.6) {
      return <CgDanger/>
    }else if ( num > 0.6 && num <= 0.8 ) {
      return <ImWarning/>
    }else if ( num > 0.8 && num <= 1.0 ) {
        return <RiSecurePaymentLine/>
    }else{
      return <BiError/>
    }
  }