import styles from './index.less';
import { Button, Space } from 'antd-mobile'
export default function IndexPage() {
  return (
    <div>
      <h1 className={styles.title}>Page index</h1>
      <Button color='primary'>Primary</Button>
      <Button color='success'>Success</Button>
      <p>xxx</p>
    </div>
  );
}
