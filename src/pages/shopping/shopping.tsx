import styles from './shopping.less';
import { Button, Stepper, Toast } from 'antd-mobile';
import React, { FC, useState, useEffect } from 'react';
import { history, connect, ConnectProps } from 'umi';
import request from 'umi-request';
import { RouteComponentProps } from 'react-router-dom';
import { httpsGet, httpsPost } from '@/services';
import { getRemoteList } from '../user';
import TuiJian from './tuijian/index';
import XuanZe from './xuanze/index';
import FenLei from './fenlei/index';
interface IPropsType extends ConnectProps {
  users: {
    userInfo: UserItem;
  };
}
interface UserItem {
  phone: number | string;
  nickname: string;
  no?: string;
  photo: string;
  address: string | object;
}
type ParamsType = {
  id: string;
};
type dataurl = {
  id: string;
  title: string;
  brand: string;
  price: string;
  number: string;
  src1: string;
  src2: string;
  taste: [string, string];
  classify: [string, string, string];
  tuijian: [object, object, object, object, object, object, object];
};
type queryType = {
  id: string;
};

interface RouterInfo {
  query: queryType;
}
const ShopPing: FC<RouteComponentProps<ParamsType> & IPropsType> = (props) => {
  let [visible, setVisible] = useState(false);
  const urlid = (props.location as any as RouterInfo).query.id;
  const [id, setid] = useState(urlid);
  const [xuanze, setxuanze] = useState([]);
  const [num, setnum] = useState(1);
  const [a, seta] = useState('');
  const [yinchang, setyinchang] = useState({ display: 'none' });
  const [ycxs, setycxs] = useState({ opacity: 0 });
  const [tp, settp] = useState('');
  const [ys, setys] = useState('');
  // const [userNo, setuserNo] = useState('');
  function getys(item: string) {
    setys(item);
  }
  function getid(id: string) {
    setid(id);
  }
  var [data, setdata] = useState({
    id: '1',
    title: '顺口味 无尘豆腐猫砂6L 快速出臭结团',
    brand: 'hipidog/嘻皮狗',
    price: '￥29.00',
    number: '00010011',
    src1: 'https://ccdn.goodq.top/caches/b743838f302c63c3a9df703d21b43e81/aHR0cDovLzVjOTk4MTZiNGQ0NjkudDczLnFpZmVpeWUuY29tL3FmeS1jb250ZW50L3VwbG9hZHMvMjAxOS8wMy83MWJjNzNmYWZmODU0NGQ1MWE5NTRiNTViOWE3OGY1ZC05MC53ZWJw.webp',
    src2: 'https://ccdn.goodq.top/caches/b743838f302c63c3a9df703d21b43e81/aHR0cDovLzVjOTk4MTZiNGQ0NjkudDczLnFpZmVpeWUuY29tL3FmeS1jb250ZW50L3VwbG9hZHMvMjAxOS8wMy8zNGVjNGY5ZWM2YjZjNzRiMDg1Njg4NmZiMDBhYWU3MS05MC53ZWJw.webp',
    taste: ['绿茶味', '蜜桃味'],
    classify: ['狗狗主粮', '猫咪主粮', '猫咪主食'],
    tuijian: [
      {
        id: 7,
        title: '猫用羊奶粉新生体弱生病猫咪宠物适用',
        price: '￥68.00',
        src1: 'https://ccdn.goodq.top/caches/b743838f302c63c3a9df703d21b43e81/aHR0cDovLzVjOTk4MTZiNGQ0NjkudDczLnFpZmVpeWUuY29tL3FmeS1jb250ZW50L3VwbG9hZHMvMjAxOS8wMy8wNTRiZDJmMTJlZTc0MTBmZDQwMjVjZjA2YzBhMzVjMy05MC53ZWJw.webp',
      },
      {
        id: 10,
        title: '维克 营养膏克补软膏发育宠狗用猫用',
        price: '￥95.00',
        src1: 'https://ccdn.goodq.top/caches/b743838f302c63c3a9df703d21b43e81/aHR0cDovLzVjOTk4MTZiNGQ0NjkudDczLnFpZmVpeWUuY29tL3FmeS1jb250ZW50L3VwbG9hZHMvMjAxOS8wMy84YzQ2MDkwNGUwYWM1OWViYjczYjJjZWZhYzMwMzRiZi05MC53ZWJw.webp',
      },
      {
        id: 12,
        title: '麦富迪 宠物猫粮藻趣儿 金枪鱼猫粮',
        price: '￥255.00',
        src1: 'https://ccdn.goodq.top/caches/b743838f302c63c3a9df703d21b43e81/aHR0cDovLzVjOTk4MTZiNGQ0NjkudDczLnFpZmVpeWUuY29tL3FmeS1jb250ZW50L3VwbG9hZHMvMjAxOS8wMy8xNzkxM2NlOTUyMjAyNTY1ZTczZTUxODcwOGY0OWM5ZC05MC53ZWJw.webp',
      },
      {
        id: 8,
        title: '怡亲猫砂 除臭膨润土猫沙 宠物猫砂',
        price: '￥29.00',
        src1: 'https://ccdn.goodq.top/caches/b743838f302c63c3a9df703d21b43e81/aHR0cDovLzVjOTk4MTZiNGQ0NjkudDczLnFpZmVpeWUuY29tL3FmeS1jb250ZW50L3VwbG9hZHMvMjAxOS8wMy9lNTI5ZWQwZjhlOTMyZDI0ZGFkMjY5NDFlY2MyYzI4ZC05MC53ZWJw.webp',
      },
      {
        id: 13,
        title: '麦富迪 宠物狗粮 牛肉双拼通用成犬粮',
        price: '￥68.00',
        src1: 'https://ccdn.goodq.top/caches/b743838f302c63c3a9df703d21b43e81/aHR0cDovLzVjOTk4MTZiNGQ0NjkudDczLnFpZmVpeWUuY29tL3FmeS1jb250ZW50L3VwbG9hZHMvMjAxOS8wMy9mNDcxNGZjODdjNmM2NDZhZTA0NGMyZDk0NGQwMTI3Mi05MC53ZWJw.webp',
      },
      {
        id: 18,
        title: '亚禾 幼犬小型大型犬狗咬洁齿骨棒l零食',
        price: '￥19.80',
        src1: 'https://ccdn.goodq.top/caches/b743838f302c63c3a9df703d21b43e81/aHR0cDovLzVjOTk4MTZiNGQ0NjkudDczLnFpZmVpeWUuY29tL3FmeS1jb250ZW50L3VwbG9hZHMvMjAxOS8wMy8zYWI2ZmIyMzc1NDdkZjNlODQyNWYxZGY1NTYwZmVjYS05MC53ZWJw.webp',
      },
      {
        id: 14,
        title: '维斯康 VITSCAN宠物保健品海棠颗粒',
        price: '￥98.00',
        src1: 'https://ccdn.goodq.top/caches/b743838f302c63c3a9df703d21b43e81/aHR0cDovLzVjOTk4MTZiNGQ0NjkudDczLnFpZmVpeWUuY29tL3FmeS1jb250ZW50L3VwbG9hZHMvMjAxOS8wMy8yZjg3NDUxYTY2ZWVkMmFmODVhNGZjYmZhZjhlYWNlZi05MC53ZWJw.webp',
      },
    ],
  });
  useEffect(() => {
    // getUser()
    // getRemoteList('/api/user/getUser').then((data) => {
    //   if (data.no) {
    //     setVisible(true);
    //     setuserNo(data.no);
    //   }
    // });
    getRemoteList(`/api/test/goods?id=${id}`).then((datas) => {
      let b = '';
      if (datas.taste[0]) {
        b = '口味';
        seta(b);
        setxuanze(datas.taste);
      } else {
        b = '颜色';
        seta(b);
        setxuanze(datas.color);
      }
      settp(datas.src1);
      setycxs({ opacity: 100 });
      setdata(datas);
    });
  }, [id]);

  return (
    <div style={ycxs}>
      {/* 图片 */}
      <div>
        <div>
          <img className={styles.dt} src={tp} />
        </div>
        <div className={styles.xt}>
          <div
            onClick={() => {
              settp(data.src1);
            }}
          >
            <img src={data.src1} />
          </div>
          <div
            onClick={() => {
              settp(data.src2);
            }}
          >
            <img src={data.src2} />
          </div>
        </div>
      </div>
      {/* 商品信息 */}
      <div className={styles.spxx}>
        <div>
          <h1>{data.title}</h1>
        </div>
        <br />
        <div className={styles.zitidx}>{data.brand}</div>
        <div className={styles.zitidx}>物理形态：其他</div>
        <div className={styles.zitidx}>适应对象：通用</div>
        <div className={styles.jiaqian}>{data.price}</div>
        <div className={styles.zitidx && styles.kouwei}>
          {a}
          <XuanZe
            aihao={JSON.stringify(xuanze)}
            getdata={getys.bind(this)}
            {...props}
          ></XuanZe>
        </div>

        <div className={styles.jiaqian}>{data.price}</div>
        <div>
          <Button
            className={styles.goumai}
            onClick={() => {
              if (props.users.userInfo.no) {
                let obj = {
                  goodsNo: data.id,
                  img: data.src1,
                  title: data.title,
                  taste: ys,
                  price: parseFloat(data.price.slice(1)),
                  count: num,
                  userNo: props.users.userInfo.no,
                };
                request.post('/api/addcart', { data: obj }).then((data) => {
                  let a = { display: 'block' };
                  setyinchang(a);
                });
              } else {
                Toast.show({
                  content: '你还没有登录',
                  afterClose: () => {
                    history.push('/login');
                  },
                });
              }
            }}
          >
            立即购买
          </Button>
          <div className={styles.gouwuche} style={yinchang}>
            <p className={styles.chenggong}>添加购物车成功</p>

            <Button
              className={styles.annui}
              size="large"
              onClick={() => {
                history.push('/cart');
              }}
            >
              前往购物车
            </Button>
            <Button
              className={styles.annui}
              size="large"
              onClick={() => {
                history.push('/');
              }}
            >
              返回主页
            </Button>
          </div>
          <div className={styles.shuliang}>
            <Stepper
              min={1}
              max={10}
              style={{
                width: '200px',
                '--button-font-size': '30px',
                '--input-background-color': '#ccc',
              }}
              defaultValue={1}
              onChange={(value) => {
                setnum(value);
              }}
            />
          </div>
        </div>
        <div className={styles.zitidx}>商品编号：{data.number}</div>
        <div className={styles.zitidx}>
          分类：
          <FenLei fenlei={JSON.stringify(data.classify)} {...props}></FenLei>
        </div>
      </div>
      {/* 相关推荐 */}
      <TuiJian
        tuijian={JSON.stringify(data.tuijian)}
        getdata={getid.bind(this)}
        {...props}
      ></TuiJian>
    </div>
  );
};
const mapStateToProps = ({ users }: { users: any }) => {
  return {
    users,
  };
};
export default connect(mapStateToProps)(ShopPing);
