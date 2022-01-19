import styles from './index.less';
import { Button, Space } from 'antd-mobile';
import { Link, history } from 'umi';
import { getRemoteList } from './user';
export default function IndexPage() {
  return (
    <div>
      <h1 className={styles.title}>Page index</h1>
      <Button color="primary">Primary</Button>
      <Link to="/shopping"> shopping</Link>
    </div>
  );
}
