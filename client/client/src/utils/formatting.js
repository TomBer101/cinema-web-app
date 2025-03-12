import {PERMISSIONS_OPTIONS} from './constants'


export const formatDate = (dateString) => {
    const date = new Date(dateString);
    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0'); // Months are zero-based
    const year = date.getFullYear();
    return `${day}/${month}/${year}`;
}

export const transformUserData = (formData, id) => {
    const userData = {
      firstName: formData.firstName,
      lastName: formData.lastName,
      userName: formData.userName,
      sessionTimeout: formData.sessionTimeout,   
  
    };
  
    const userPermissions = Object.keys(formData)
      .filter(key => key !== 'firstName' && key !== 'lastName' && key !== 'userName' && key !== 'sessionTimeout')
      .filter(key => formData[key]) // Filter out unchecked permissions
      .map(key => PERMISSIONS_OPTIONS[key]);
  
    return { userData, userPermissions, id };
}

