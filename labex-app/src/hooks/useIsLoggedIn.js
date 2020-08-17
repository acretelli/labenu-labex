import { useEffect, useState } from "react";
import { useHistory } from 'react-router-dom';

const useIsLoggedIn = () => {
    const history = useHistory();
    const token = window.localStorage.getItem("token");
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    useEffect(() => {
        if(token === null) {
            setIsLoggedIn(false);
        } else {
            setIsLoggedIn(true);
        }
    }, [history]);
      
return isLoggedIn;
};

export default useIsLoggedIn;
