import { register } from "./config/firebase.js"

 window. onRegister = function() {
    const allInputs = document.getElementsByTagName('input')
    const FullName = allInputs[0]
    const Email = allInputs[1]
    const Password = allInputs[2]
    const ConfirmPassword = allInputs[3]
    const PhoneNumber = allInputs[4]

    if (!FullName.value || !Email.value || !Password.value || !ConfirmPassword.value) {
        alert('Dear user Please fill out the proper all inputs fields')
        return
    }

    if (FullName.value.length < 3) {
        alert('please insert your FullName with minimum 3 letters!')
        return
    }

    //email condition

    // Validate email format
    if (!isValidEmail(Email.value)) {
        alert('Please insert a proper email');
        return;
    }
    
    function isValidEmail(Email) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(Email);
    }

    if (Password.value !== ConfirmPassword.value) {
        alert('password is not matchable with confirm password!')
        return
    }
    console.log(FullName.value);//input field hna is lye consol me bh .value lagega 
    console.log(Email.value); //warna pora input consol me dega
    console.log(Password.value); 
    
    const user = {
        FullName: FullName.value,
        Email: Email.value,
        Password: Password.value,
        PhoneNumber: PhoneNumber.value// this ph no insert a db new value include
    }
    register(user) //mne yhn 1 user nam sy obj bnya or register me band kr k udhr get kia
    
    for (var i = 0; i < allInputs.length; i++){
        allInputs[i].value = ''
    }
}