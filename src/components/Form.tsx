import { FC, ReactNode, createContext, useState } from 'react';
import { UserInfo } from '../interfaces';

type Props = {
    initialValues: UserInfo;
    onSubmit: (userInfo: UserInfo) => void;
    children: ReactNode
}

const emptyUserInfo = {
    email: '',
    age: 0,
    name: '',
    phone: {
        ext: '',
        number: ''
    }
}


export const getDescendantProp = (obj: any, desc: string) => {
    let arr: string[] = desc.split(".");
    while(arr.length){
        let key = arr.shift();
        obj = obj[key as keyof typeof obj];        
    } 
    return obj;
}

export const insertNewValue = (obj: any, key: string, newValue: any) => {
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

export const AppContext = createContext<[UserInfo, (event: React.ChangeEvent<HTMLInputElement>, key:string) => void]>(
        [emptyUserInfo, () => undefined ]
);

const Form: FC<Props> = ({initialValues, onSubmit, children}) => {
    

    const [userInfo, setUserInfo] = useState<UserInfo>(emptyUserInfo);
    const [userInfoSubmit, setUserInfoSubmit] = useState<UserInfo>(initialValues);

    const submitHandler = (event: React.FormEvent) => {
        event.preventDefault();
        onSubmit(userInfoSubmit);
        setUserInfo(userInfoSubmit);
        console.log(userInfoSubmit);
    }

    const setUserInfoHandler = (event: React.ChangeEvent<HTMLInputElement>, key: string) => {
        const _userInfoSubmit = {...userInfoSubmit};
        const _userInfo = {...userInfo};
        const _userInfoValue = getDescendantProp(_userInfo, key);
        let _value: typeof _userInfoValue;
        
        if(typeof _userInfoValue === 'number') {
            _value = +event.target.value;
        } else {
            _value = event.target.value;
        }


        insertNewValue(_userInfo, key, _value);
        insertNewValue(_userInfoSubmit, key, _value);
        setUserInfo(_userInfo);
        setUserInfoSubmit(_userInfoSubmit);
    }

    return (
        <AppContext.Provider value={[userInfo, setUserInfoHandler]}>
            <form onSubmit={(event) => submitHandler(event)}>
                {children}
            </form>
        </AppContext.Provider>
    );
};

export default Form;