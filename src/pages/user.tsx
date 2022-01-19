import { request } from 'umi';
export async function getRemoteList(url: string) {
  const data = await request(url);
  if (data.test) {
    return data.test[0];
  } else {
    return data;
  }
}
