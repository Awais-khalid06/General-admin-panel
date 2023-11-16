export const BASE_URL =
  "https://gzwxdhi422.eu-central-1.awsapprunner.com/api/v1";

export default {
  // -----AUTH------//
  signUp: BASE_URL + "/user/signup",
  signIn: BASE_URL + "/user/testLogin",
  sendOTP: BASE_URL + "/user/sendOTP",
  verifyOTP: BASE_URL + "/user/verify",
  forgotPassword: BASE_URL + "/user/forgotPassword",
  resetPassword: BASE_URL + "/user/resetPassword",
  verifyOTPresetPassword: BASE_URL + "/user/verifyOTPResetPassword",
  logOut: BASE_URL + "/user/logout",
  updateUser: BASE_URL + "/user",
  DeleteUser: BASE_URL + "/user",
  deleteQuote: BASE_URL + "/quotes",
  updateQuote: BASE_URL + "/quotes",
  createQuote: BASE_URL + "/quotes/create",

  // -----------Products--------------//

  getProducts: BASE_URL + "/product/getAll?limit=1000",
  upDateProduct: BASE_URL + "/product/update",
  createProduct: BASE_URL + "/product/create",
  deleteProduct: BASE_URL + "/product/delete",
  allBookedProduct: BASE_URL + "/booking/allbookedproducts",
  // -------------Services-------------//

  getAllQuotes: BASE_URL + "/quotes/",
  createService: BASE_URL + "/service/create",
  deleteService: BASE_URL + "/service/delete",
  updateService: BASE_URL + "/service/update",
  allBookedServices: BASE_URL + "/booking/allbookedservices",

  // -------------Services-------------//
  getAllUser: BASE_URL + "/user",
  getState: BASE_URL + "/user/stats",
  getallReviews: BASE_URL + "/globalReviews/getall?limit=1000&sort=-createdAt",
};
