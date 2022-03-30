import axios, {AxiosRequestConfig} from 'axios';
import { Request, Response } from 'express';

async function indexGet(req: Request, res: Response) {
  const requestOptions: AxiosRequestConfig = {
    method: 'get',
    url: 'https://jsonplaceholder.typicode.com/todos/1',
  };
  const serviceResponse = await axios(requestOptions);
  req.log.info(serviceResponse.data);

  return res.status(200).json({
    message: 'user indexGet',
  });
}

export { indexGet };
