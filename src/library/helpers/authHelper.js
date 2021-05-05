import jwtDecode from 'jwt-decode';
import SuperFetch from './superFetch';


class AuthHelper {

  login = async userInfo => {
    if (!userInfo.email || !userInfo.password) {
      return { error: 'please fill in the input' };
    }
    return await SuperFetch.post('auth/staff/login', userInfo).then(response => {
        return this.checkExpirity(response);
    }).catch(err => console.error(err));
  };

  async checkDemoPage(token) {
    if (this.checkExpirity(token).error) {
      return { error: 'Token expired' };
    }
    return await SuperFetch.get('secret/test', { token })
      .then(response => ({
        status: '200',
        message: 'Success',
      }))
      .catch(error => ({ error: JSON.stringify(error) }));
  }

  checkExpirity = res => {
    if (res.error) {
      return {
        error: res.error,
      };
    } else {
      try {
        const profile = jwtDecode(res.access_token);

        const expiredAt = profile.expiredAt || profile.exp * 1000;
        if (expiredAt > new Date().getTime()) {
          return {
            ...profile.user,
            type: profile.type,
            token: res.access_token,
            expiredAt: new Date(expiredAt),
          };
        } else {
          return { error: 'Token expired' };
        }
      } catch (e) {
        console.error(e);
        return { error: 'Server Error' };
      }
    }
  };
}

export default new AuthHelper();
