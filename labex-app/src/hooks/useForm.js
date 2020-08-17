import { useState } from "react";

const useForm = initialState => {
    const [form, setForm] = useState(initialState);
    
    const onChange = (name, value) => {
        const newForm = {...form, [name]: value}

        setForm(newForm);
    };

    const resetForm = () => {
        setForm(initialState)
    }

    return {form, onChange, resetForm};
};

export default useForm;
