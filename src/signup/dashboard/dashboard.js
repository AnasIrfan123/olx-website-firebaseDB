import { auth, onAuthStateChanged } from "../config/firebase.js";

import { getAds, logout} from "../config/firebase.js";                          //2no link 1 he jga se import hoay 2no ka 1 bh bnsakta h

// -----------------when user login render the user email in dashboard----------------------------

onAuthStateChanged(auth, (user) => {
    if (user) {
    
        console.log(auth);
         //console.log(currentUser); //is consol sy kxh nh arah

    let EmailElement = document.getElementById('email');
    EmailElement.innerHTML = user.email
     
    renderAds() //renderads dashbord func ko idhr cal krdya jb usr login ho kar dasboard pr aye to ads render hon
    } else {
      // User is signed out
      // ...
    location.href = '../../../index.html' // agr user login nh ho tw login par he rahy
    }
  });

  // ---------------------get dashboard produts cards---------------------------- 

async function renderAds() {
   
   const ads = await getAds()
   console.log(ads);

   const container = document.getElementById('container');

   for (var i = 0; i < ads.length; i++) {
    const ad = ads[i]

    const card = document.createElement('div')
    card.className = 'card'
    card.onclick = function (){ //ksi cheez k click par is tarhn path dia jta ha
      window.location.href = '../dashboard-detail/dashboard-detail.html?adId=' + ad.id
    } 

    const image = document.createElement('img')
    image.src = ad.image
    image.style.width = '140px'
    image.style.height = '120px'

    const title = document.createElement('p')
    title.innerHTML = ad.title

    const amount = document.createElement('h4')
   // amount.innerHTML = ad.amount
   amount.innerHTML = `Rs. ${ad.amount}`

    const description = document.createElement('p')
    description.innerHTML = ad.description //jis tarhnn apne rs pint kwaya ha har post me is he tarhn descrip bh add anme sy sb chez krwao
    
    card.append(image)
    card.append(title)
    card.append(amount)
    card.append(description)
    
    container.append(card)
   }
 }
 
//  -- ------------My-Ads btn------------------ -

window. myAds = function() {              // btn dashboard pr ha is lye dashboard sy clik kia phir firbas me funct bnaegy
  location.href = '../my-Ads/my-Ads.html'        //when user click the myads btn go to my ads page
}

//---------------------Logout Func----------------------------

window. sigout = function() {                 //btn func bnakr import kiye func ko cal kia
   logout()
}
