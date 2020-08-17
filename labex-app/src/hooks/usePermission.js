import { useEffect, useState } from "react";
import { useHistory } from 'react-router-dom';

const usePermission = () => {
    const history = useHistory();
    const [permission, setPermission] = useState("");
    
    useEffect(() => {
        const getPermission = window.localStorage.getItem("permission");
        
        if(getPermission === "adm" || getPermission === "rev") {
            setPermission(getPermission);
        } else {
            setPermission("user");
        }
    }, [history]);
      
    return permission;
};

export default usePermission;
