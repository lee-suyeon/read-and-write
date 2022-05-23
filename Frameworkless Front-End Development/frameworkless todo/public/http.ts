import { Todo } from './todos';

interface Return {
  status: number;
  data: Todo;
}

const parseResponse = async (response) => {
  const { status } = response;
  let data: Todo;
  if(status !== 204) {
    data = await response.json();
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

const request = async (params: Params): Promise<Return> => {
  const { method = 'GET', url, headers = {}, body } = params;
  const config = {
    method,
    headers: new window.Headers(headers),
    body,
  }
  if(body) {
    config.body = JSON.stringify(body)
  }
  const response = await window.fetch(url, config)
  return parseResponse(response);
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