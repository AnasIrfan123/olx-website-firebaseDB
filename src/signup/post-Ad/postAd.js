import { postAdToDb, auth } from "../config/firebase.js";

window.onSubmit = function() {
    const uid = auth.currentUser.uid    //Authentication sy bheja or end me uid obj me ki

    const allInputs = document.getElementsByTagName('input');
    const title = allInputs[0].value
    const description = allInputs[1].value
    const amount = allInputs[2].value
    const image = allInputs[3].files[0]

    const CreatedAt = new Date()        //    new date sy search krwya ha db m 

    if (title === '' || description === '' || amount === '') {
        alert('Fill out the proper input field');
        return;
    }
    console.log(title);
    console.log(amount);  //hm post an add me firebase .js me jb post add krte hnto usme kuch adding bh kar sakte nhn 
    console.log(amount); //jb user post an add par submit kare to krte hi dashbord par chla jaye

    const ad = {
        title,
        description,
        amount,
        image,

        uid,
        CreatedAt
    }
    postAdToDb(ad)

    for (var i = 0; i < allInputs.length; i++) {
        allInputs[i].value = ''
    }
}

// -------------------------BACK TO HOME Btn--------------------------------

window. onBack = function() {
   location.href = '../dashboard/dashboard.html'
}



