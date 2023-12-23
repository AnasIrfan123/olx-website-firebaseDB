import { getSingleAd, getUser} from "../config/firebase.js";

 async function getAdDetail() {
   const adId = window.location.search.slice(6) // <!-- query param ko nikalne ka tareqa .srearch ha -->

   console.log(adId);

   const ad = await getSingleAd(adId)

   console.log(ad);
   console.log(ad.uid,'ad');
   const user = await getUser(ad.uid) //or upr getUser func imprt kia jo fb me bnya tha end me append krdi info
  //debugger
   console.log('user', user);  //ye user undefined ho raha tha

   const container = document.getElementById('container')
   
   const card = document.createElement('div')
   card.className = 'card'

   const img = document.createElement('img')
   img.src = ad.image 
   img.style.width = '10em'
   img.style.height = '10em'

   const title = document.createElement('h3')
   title.innerHTML = ad.title

   const amount = document.createElement('p')
   amount.innerHTML = `Rs. ${ad.amount}`

   const description = document.createElement('p')
   description.innerHTML = ad.description  //amount ki tarhn 1 despri aye or fullname aye to us k agay username ho exmpl amount

     // --------------USER INFO---------------------

   const username = document.createElement('h3')
   username.innerHTML = `username ${user.FullName}`  

   const phNumber = document.createElement('p')
   phNumber.innerHTML = `Ph # ${user.PhoneNumber}`

   card.append(img)
   card.append(title)
   card.append(amount)
   card.append(description)

   card.append(username)
   card.append(phNumber)

// ----------images container-----------------
   container.append(card)
   
}
getAdDetail()



