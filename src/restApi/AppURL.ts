class AppURL {
  static baseURL: string = 'http://192.168.15.13:51/api/';

  // Authentication APIs
  static userLogin: string = `${this.baseURL}AndroidApps/PostLogin`;
}

export default AppURL;
