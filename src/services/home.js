import fetch from '@/utils/fetch'
/* eslint-disable no-unused-vars */
import { API_PATH } from '../config/env'
/* eslint-able */

// 获取快捷方式文件下载地址
export const getShortcut = (jsonObj) => fetch(API_PATH + '/api/user/client/shortcut', jsonObj, 'GET')

// 获取游戏详情
export const getAppDetail = (jsonObj) => fetch(API_PATH + '/api/guest/app/detail', jsonObj, 'GET')
