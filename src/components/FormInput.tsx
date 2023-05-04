import { FC, useContext } from 'react';
import { UserInfo } from '../interfaces';
import { AppContext } from './Form';


type Props = {
    type: string;
    required?: boolean;
    name?: string;
    placeholder?: string;
    value?: string;
}

const FormInput: FC<Props> = (props) => {

    const [userInfo, setUserInfo] = useContext<[UserInfo, (userInfo: UserInfo) => void]>(AppContext);
        
    const changeHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
        
        // copy of userInfo
        const _userInfo = {...userInfo};

        // value of userInfo by string property
        const _userInfoValue = getDescendantProp(_userInfo, key);
        let _value: typeof _userInfoValue;
        
        // check value type and cast to appropriate type
        if(typeof _userInfoValue === 'number') {
            _value = +event.target.value;
        } else if(typeof _userInfoValue === 'boolean'){
            _value = !!event.target.value;
        } else {
            _value = event.target.value;
        }

        insertNewValue(_userInfo, key, _value);
        setUserInfo(_userInfo);
    }

    // get value for string property
    const getDescendantProp = (obj: any, desc: string) => {
        let arr: string[] = desc.split(".");
        while(arr.length){
            let key = arr.shift();
            obj = obj[key as keyof typeof obj];        
        } 
        return obj;
    }
    
    // insert value for string property
    const insertNewValue = (obj: any, key: string, newValue: any) => {
        const keys = key.split('.');
        for (var i = 0; i < keys.length; ++i) {
            let _key = keys[i];
            if (_key in obj) {
                if(i === keys.length - 1) {
                    obj[_key] = newValue;
                    return;
                }
                obj = obj[_key];
            } else {
                return;
            }
        }
    }


    const key = String(props.name);
    
    // value for show
    const value = getDescendantProp(userInfo, key);
        
    return(
        <div style={{margin: '16px'}}>
            <label htmlFor={props.name}>{props.name}</label>
            <input style={{margin: '8px'}} id={props.name} onChange={(event) => changeHandler(event)} value={String(value)} {...props}/>
        </div>
    ) 
};

export default FormInput;