import axios from 'axios'
import { serverUrl } from '../config'

export function postServer(url, data){
    const fullUrl = serverUrl + url
    return axios.post(fullUrl, {data: data})
}

export function postServerWithHeader(url, data, header){
  return axios.post(url, data, {headers: header})
  //return axios.post(savePath, fdata, {headers: { 'Content-Type': 'multipart/form-data' }});
}

export function postServerCustomUrl(url, data){  
  return axios.post(url, {data: data})
}

