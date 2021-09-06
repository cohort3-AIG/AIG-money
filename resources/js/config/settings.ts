let DEBUG: boolean = true
let LOGIN_URL: string = "";
let REGISTER_URL: string = "";
let HOST_URL: string = "";
if (DEBUG) {
  LOGIN_URL = "http://localhost:8000/api/login/";
  REGISTER_URL = "http://localhost:8000/api/register/";
  HOST_URL = "http://localhost:8000/api/";
}

export { HOST_URL, LOGIN_URL, REGISTER_URL };
