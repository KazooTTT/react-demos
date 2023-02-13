interface Item {
  id: number;
  title: string;
  content: string;
  post_time: string;
}

interface Response {
  code: number;
  result: Item[];
  total: number;
}
