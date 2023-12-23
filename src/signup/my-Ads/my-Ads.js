//my ads par weather ki tarhn script me me kam kra ha div backitick ki tarhn 

    import {auth, onAuthStateChanged, getMyAds} from "../config/firebase.js"
    // autheticat/web/getstated/set authent state obser & getuser dta

    onAuthStateChanged(auth, (user) => {
    if (user) {

console.log(user.uid);
         getMyAds()

        // User is signed in, see docs for a list of available properties
        // https://firebase.google.com/docs/reference/js/auth.user
        //const uid = user.uid;
    } else {
        // User is signed out
        location.href = '../../../index.html'  //is link pr dout ha 
    }
    });

    // function getMyAds(){
    //     //const uid = auth
    //     // console.log(ads);
    //     console.log(uid, 'uid');
    // }
    
// async function getMyAds() {
//     const uid = auth.currentUser.uid
//     console.log('uid', uid)
//     const container = document.getElementById('container')

//     const ads = await getMyAdsFromDb(uid)

//     for (var i = 0; i < ads.length; i++) {
//         const ad = ads[i]

//         const card = document.createElement('div')
//         card.className = 'card'
//         card.onclick = function () {
//             location.href = '../detail/detail.html?adId=' + ad.id
//         }

//         const img = document.createElement('img')
//         img.src = ad.image
//         img.style.width = '100px'
//         img.style.height = '100px'

//         const title = document.createElement('h3')
//         title.innerHTML = ad.title

//         const amount = document.createElement('h4')
//         amount.innerHTML = `Rs. ${ad.amount}`

//         card.append(img)
//         card.append(title)
//         card.append(amount)

//         container.append(card)
//     }
// }



/* 
docs me facebook login then     Facebook for Developers and login 
my apps
craete app

get started and my apps

use cases is authentitication and acount settings
jo center me firebase url de rha haa uskko valid me dekar login for device yes krdya ha

use cases customized permiissions me action me email ko add krlo

basic k bad 

function bnaya or sare kam kiya js me or firebase me kam kiya or js me 

vedio => firebase facebook login ki dekho

is application me ya food panda me 
login with facebook 
login with google
forgot password   and delete psd ya firebs sy delete 
upate pasdd

loader is proj me 
regis par sweet alert chalana ha

*/

// -------------------------BACK TO HOME Btn--------------------------------

window. onBack = function() {
    location.href = '../dashboard/dashboard.html'
}