import {login} from "./src/signup/config/firebase.js"

window. onLogin = function() {
   const allInputs = document.getElementsByTagName('input')
   const Email = allInputs[0].value
   const Password = allInputs[1].value //yhn login par dot value kr k mtib input value match kari ha signup k registerd dta sy

   const user = {Email, Password}  //ek ya 2 hon to aesy he agr 3 4 ho to phir obj bna kar 
   login(user)
}