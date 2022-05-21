import { Todo } from './todos';

const setHeaders = (xhr: XMLHttpRequest, headers: Headers) => {
  Object.entries(headers).forEach(entry => {
    const [ name, value ] = entry;
    xhr.setRequestHeader(name, value);
  })
}

interface XHR {
  status: number;
  responseText: string;
}

interface Return {
  status: number;
  data: Todo;
}

const parseResponse = (xhr: XHR): Return => {
  const { status, responseText } = xhr;
  let data: Todo;
  if(status !== 204) {
    data = JSON.parse(responseText);
  }
  return { status, data }
}

interface Headers {
  [key: string]: string;
}

interface Params {
  url: string,
  body?: Todo | any,
  headers: Headers,
  method?: 'GET' | 'POST' | 'PUT' | 'PATCH' | 'DELETE',
}

const request = (params: Params): Promise<Return> => {
  return new Promise((resolve, reject) => {
    const xhr = new XMLHttpRequest()

    const { method = 'GET', url, headers = {}, body } = params;
    xhr.open(method, url);
    setHeaders(xhr, headers);

    xhr.send(JSON.stringify(body));
    xhr.onerror = () => {
      reject(new Error('HTTP Error'));
    }
    xhr.ontimeout = () => {
      reject(new Error('Timeout Error'));
    }
    xhr.onload = () => resolve(parseResponse(xhr));
  });
}

const get = async (url: string, headers?: Headers): Promise<Todo> => {
  const response = await request({ 
    url, 
    headers, 
    method: 'GET'
  })
  return response.data;
}

const post = async (params: Params) => {
  const { url, body, headers } = params;
  const response = await request({
    url,
    headers,
    method: 'POST',
    body
  })
  return response.data;
}

const put = async (params: Params) => {
  const { url, body, headers } = params;
  const response = await request({
    url,
    headers,
    method: 'PUT',
    body
  })
  return response.data
}

const patch = async (params: Params) => {
  const { url, body, headers } = params;
  const response = await request({
    url,
    headers,
    method: 'PATCH',
    body
  })
  return response.data;
}

const deleteRequest = async (params: Params) => {
  const { url, headers } = params;
  const response = await request({
    url,
    headers,
    method: 'DELETE',
  })
  return response.data;
}

export default { get, post, put, patch, delete: deleteRequest }