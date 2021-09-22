let DEBUG: boolean = true
let LOGIN_URL: string = "https:ed.asteriskint.group/api/login/";
let REGISTER_URL: string = "https:ed.asteriskint.group/api/register/";
let HOST_URL: string = "https:ed.asteriskint.group/api/";
let PAYMENT_URL="https:ed.asteriskint.group/api/payment/";
if (DEBUG) {
  LOGIN_URL = "http://localhost:8000/api/login/";
  REGISTER_URL = "http://127.0.0.1:8000/api/register";
  HOST_URL = "http://localhost:8000/api/";
  PAYMENT_URL = "http://localhost:8000/api/payment";
}

export { HOST_URL, LOGIN_URL, REGISTER_URL,PAYMENT_URL };
