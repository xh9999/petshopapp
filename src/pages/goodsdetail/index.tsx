import React, { useEffect } from 'react';
import { RouteComponentProps } from 'react-router-dom';
import { httpsGet, httpsPost } from '@/services';
type queryType = {
  id: string;
};
interface RouterInfo {
  query: queryType;
}
const GoodsDetail: React.FC<RouteComponentProps> = (props) => {
  useEffect(() => {
    httpsGet('/api/test/goods', {
      id: (props.location as any as RouterInfo).query.id,
    }).then((datas) => {});
  }, []);
  return (
    <div>
      商品详情
      <p>商品id：{(props.location as any as RouterInfo).query.id}</p>
    </div>
  );
};
export default GoodsDetail;
