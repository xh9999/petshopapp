import { Effect, Reducer, Subscription, connect } from 'umi';
import { GetUserInfo } from '../../services/index';
// 声明用户的泛型
interface UserItem {
  phone: number | string;
  nickname: string;
  no?: string;
  photo: string;
  address: string | object;
}
// 声明用户模块的state的数据类型
type UserModelState = {
  userNo?: string;
};
//声明用户model的数据类型
type UserModelType = {
  namespace: string;
  state: {
    userInfo: UserItem;
    address: [];
  };
  effects: {
    getRemote: Effect;
  };
  reducers: {
    getInfo: Reducer;
  };
  subscriptions: {
    setup: Subscription;
  };
};
const UserModel: UserModelType = {
  namespace: 'users',
  state: {
    userInfo: {
      phone: '',
      nickname: '',
      photo: '',
      address: '',
    },
    address: [],
  },
  reducers: {
    getInfo(state, { type, payload }) {
      return payload;
    },
  },
  effects: {
    *getRemote(actions, { put, call }) {
      const data = yield call(GetUserInfo);
      // 将用户数据put给reducers这个函数
      // let address = '';
      // if (data.address) {
      //   address = data.address.address;
      // }
      // console.log(data, 'model')
      yield put({
        type: 'getInfo',
        payload: {
          userInfo: data,
        },
      });
    },
  },
  subscriptions: {
    setup({ history, dispatch }) {
      dispatch({ type: 'getRemote' });
      history.listen((location, action) => {
        if (location.pathname === '/cart' || location.pathname === '/myOrder') {
          dispatch({ type: 'getRemote' });
        }
      });
    },
  },
};
export default UserModel;
