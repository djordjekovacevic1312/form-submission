import { FC, useContext } from 'react';
import { UserInfo } from '../interfaces';
import { AppContext, getDescendantProp } from './Form';

const styleFormInput = {
    margin: '16px'
}

type Props = {
    type: string;
    required?: boolean;
    name?: string;
    placeholder?: string;
    value?: string;
}

const FormInput: FC<Props> = (props) => {

    const [userInfo, setUserInfo] = useContext<[UserInfo, (event: React.ChangeEvent<HTMLInputElement>, key: string) => void]>(AppContext);
        
    const key = String(props.name);
    
    const value = getDescendantProp(userInfo, key);
        
    return(
        <div style={styleFormInput}>
            <label htmlFor={props.name}>{props.name}</label>
            <input id={props.name} onChange={(event) => setUserInfo(event, key)} value={String(value)} {...props}/>
        </div>
    ) 
};

export default FormInput;