// Import the functions you need from the SDKs you need
  import { initializeApp } from "https://www.gstatic.com/firebasejs/10.6.0/firebase-app.js";
  import { getAuth, signOut, createUserWithEmailAndPassword, signInWithEmailAndPassword, onAuthStateChanged  } 
  from "https://www.gstatic.com/firebasejs/10.6.0/firebase-auth.js";

  //db link
  import { getFirestore, collection,  addDoc,setDoc, getDocs, doc, 
    getDoc, query, where} from "https://www.gstatic.com/firebasejs/10.6.0/firebase-firestore.js";

  //storage link image etc
  import { getStorage, ref, uploadBytes, getDownloadURL } from "https://www.gstatic.com/firebasejs/10.6.0/firebase-storage.js";

  // Your web app's Firebase configuration
  // For Firebase JS SDK v7.20.0 and later, measurementId is optional
  const firebaseConfig = {
    apiKey: "AIzaSyDnJZxeh6Er1T7jmzMwexLwyBgH8NZrYPs",
    authDomain: "onlinewebmobile-1ca79.firebaseapp.com",
    databaseURL: "https://onlinewebmobile-1ca79-default-rtdb.firebaseio.com",
    projectId: "onlinewebmobile-1ca79",
    storageBucket: "onlinewebmobile-1ca79.appspot.com",
    messagingSenderId: "705372926573",
    appId: "1:705372926573:web:1b5a3fac84ea733e474564",
    measurementId: "G-PEDY5ZXSYT"
  };

  // Initialize Firebase
  const app = initializeApp(firebaseConfig);
  const auth = getAuth(app);

  // Initialize Cloud Firestore and get a reference to the service
  const db = getFirestore(app);

  // Initialize Cloud Storage and get a reference to the service
  const storage = getStorage(app);

  //hmny udr 1 obj regis me band kia tha wo reg ka idhr fun bnaya or parameter me user dia
  function register(user) {  //parameters me users dengy kyun k 2 km ho rahy hn 1 sath
    const {FullName, Email, Password, PhoneNumber} = user //destructure obj short method 

    createUserWithEmailAndPassword(auth, Email, Password)
  .then (async(userCredential) => {
    // Signed up 
    //db start
    try {
      console.log(userCredential.user.uid,'vdc');
      const docRef = await setDoc(
        doc(db, "users", userCredential.user.uid), // Use `doc` function to create a document reference
        {
          FullName,
          uid: userCredential.user.uid,  //ye uid bh bhejni thi user ki detail me 
          Email,
          PhoneNumber
        }
      );
        alert('Registered Successfully!')

        window.location.href = '../../src/signup/dashboard/dashboard.html' //When user registers, it goes straight to the dashboard

      } catch (e) {
       console.log(e);
      }

  })
  .catch((error) => {
    const errorCode = error.code;
    const errorMessage = error.message.split(': ')[1];
    
    alert(errorMessage)
  });
  }


  function login(user) {
    const {Email, Password} = user //destructure

    signInWithEmailAndPassword(auth, Email, Password)
  .then((userCredential) => {
    // Signed in 
    const user = userCredential.user;
    alert('Logged In Successfully!')

    window.location.href = './src/signup/dashboard/dashboard.html'
  })
  .catch((error) => {
    const errorCode = error.code;
    const errorMessage = error.message.split(': ')[1];

    alert(errorMessage)
  });
  }

  export {
    register,
    login
  }

   // uid sy nh kia ha lakin code uid wla ha docs sy related

onAuthStateChanged(auth, (user) => {
  if (user) {
    const uid = user.uid;
   console.log(uid ,'user in logged in');
   
  } else {
    // User is signed out
    // ...
  }
});

export{  //onAuthStateChanged ko export kia or jhn email lani ha whn import ki
    auth,
    onAuthStateChanged
}

async function postAdToDb(ad) { //parameter me ad dia
    /* //image ko dtabase ki storage me bhejhne ka alag tareeqe kar ha wo ye ha
     1. Upload image to Storage
     2. Get the URL of the image
     3. Add all data with URL in database
     */ 

     try{

       // Create a storage reference from our storage service
      const storageRef = ref(storage, `ads/${ad.image.name}`);
  
      await uploadBytes(storageRef, ad.image)
  
      const url = await getDownloadURL(storageRef)

      ad.image = url

      await addDoc(collection(db, "ads"),ad) //ye line bd se copy ki upr s or kxh edit kia
      alert('Data added successfully!') 

      window.location.href = '../dashboard/dashboard.html' //When the user add post it will go to direct dashboard from this link
         
     } catch (e) {
      alert(e.message)
     }
}

export {
  postAdToDb
}

//-------------------------get data in dashboard----------------------------

 //(cloud firesto/read data/get data/Get all documents in a subcollection etc) (idhr sy nikala ha)

 async function getAds() {  //sb sy phly confi/firebse me func sy get hngy ads phr dashboard me rendr krwaen jayengy
  
  const querySnapshot = await getDocs(collection(db, "ads")); //or getDocs upr import db link me define krdya
  const ads = []       //1 empty arry
  querySnapshot.forEach((doc) => {

    // doc.data() is never undefined for query doc snapshots
    //console.log(doc.id, " => ", doc.data());

    const ad = doc.data()
    ad.id = doc.id

    ads.push(ad)
  }); 
  return ads
}

export {
  getAds 
}

//------------------------- get Ads detail ----------------------------

// cludstore /readdata/getdata/get a document

async function getSingleAd(adId) {      //phly func bnaya

  const docRef = doc(db, "ads", adId);  //or doc upr import db link me define krdya
  const docSnap = await getDoc(docRef);

  if (docSnap.exists()) {
    const ad = docSnap.data()

   //  console.log(ad);
     // console.log("Document data:", docSnap.data());
     return ad
    } else {
      // docSnap.data() will be undefined in this case
      console.log("No such document!");
    }
}

export {
  getSingleAd
}

//------------------------- get user Ads info----------------------------

// cludstore /readdata/getdata/get a document

async function getUser(uid) { //or upr reg me setDoc ka use kia or uid bheji or yhn se uid info getUser func export kia
// debugger       //or detail me user info getUser funct se recive krlo
console.log('uid', uid); 

const docRef = doc(db, 'users', uid);
const docSnap = await getDoc(docRef);

if (docSnap.exists()) {
    // console.log("Document data:", docSnap.data());
    const user = docSnap.data()
   
    return user
   
  } else {
    // docSnap.data() will be undefined in this case
    console.log("No such document!");

  }
}

export {
  getUser
}

//---------------------Signout / Logout Func----------------------------

function logout() {  //1st prior to make a logout func
  return signOut(auth)
}

export {
  logout
}
  
// --------------------------------------MY ADS

async function getMyAds(uid) {            //query & where upr defne krdia
  //cloud firest /readdata/getdata/Get mltple docmts frm a colction
console.log('anas', uid) //8888
 //debugger
  const adsRef = collection(db, 'ads')           
// const q = query(collection(db, "cities"), where("capital", "==", true));
 
 const querySnapshot = await getDocs(query(adsRef), where("uid", "==", uid));
console.log(querySnapshot);
 const ads = [] // 1 empty arry

querySnapshot.forEach((doc) => {
  // doc.data() is never undefined for query doc snapshots
  const ad = doc.data()
  console.log(ad);
  ad.id = doc.id
//console.log(ad);         //8888888
  ads.push(ad)
  //console.log('vhsv', ads);        //88888
 });

   return ads
}

export { 
  getMyAds
}

//1. getFirestore  // to initialize firestore, 
//2. getDocs,  // to get all the documents in the particular collection 
//3. doc,   // to create the reference of the single document
//4. collection // to create the reference of the single collection, 
//5. addDoc, // to add the document in the collection , it takes two arguments 1.collection reference 2.Document
//6. deleteDoc // to delete the single document , it takes doc reference as an argument


//-------------------------------------------



