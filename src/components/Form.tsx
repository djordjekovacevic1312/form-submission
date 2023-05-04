import { FC, ReactNode, createContext, useState } from 'react';
import { UserInfo } from '../interfaces';

type Props = {
    initialValues: UserInfo;
    onSubmit: (userInfo: UserInfo) => void;
    children: ReactNode
}

export const AppContext = createContext<[UserInfo, (userInfo: UserInfo) => void]>(
        [{} as UserInfo, () => undefined ]
);

const Form: FC<Props> = ({initialValues, onSubmit, children}) => {
    
    const [userInfo, setUserInfo] = useState<UserInfo>(initialValues);

    const submitHandler = (event: React.FormEvent) => {
        event.preventDefault();
        onSubmit(userInfo);        
    }

    return (
        <AppContext.Provider value={[userInfo, setUserInfo]}>
            <form onSubmit={(event) => submitHandler(event)}>
                {children}
            </form>
        </AppContext.Provider>
    );
};

export default Form;