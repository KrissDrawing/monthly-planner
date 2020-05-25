import { useState, useEffect } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { categories } from '../globals';

const useForm = (callback, validate) => {
  const [values, setValues] = useState({
    name: '',
    date: new Date(),
    price: '',
    type: 'automatic',
    isPaid: false,
    id: 1,
    category: categories[0],
  });
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setValues({
      ...values,
      [name]: value,
    });
  };

  const handleCategory = (e) => {
    setValues({ ...values, category: e.value });
  };

  const handleDateChange = (date) => {
    setValues({
      ...values,
      date: date,
    });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    setErrors(validate(values));
    setValues({
      ...values,
      id: uuidv4(),
    });
    setIsSubmitting(true);
  };

  useEffect(() => {
    if (Object.keys(errors).length === 0 && isSubmitting) {
      callback();
      setValues({
        name: '',
        date: new Date(),
        price: '',
        type: 'automatic',
        isPaid: false,
        id: 1,
        category: categories[0],
      });
    }
  }, [errors]);

  return {
    handleChange,
    handleSubmit,
    handleDateChange,
    handleCategory,
    values,
    errors,
  };
};

export default useForm;
