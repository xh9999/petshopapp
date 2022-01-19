import { Effect, Reducer, Subscription } from 'umi';
// 声明用户的泛型
interface UserItem {
  phone: number;
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
  };
  effects: {
    getRemote: Effect;
  };
  reducers: {
    getUserInfo: Reducer;
  };
  subscriptions: {
    setup: Subscription;
  };
};
