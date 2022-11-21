import { message } from 'antd';
import request from './utils/request';

export class FileFunc {
  URL: string; // 用户传入的路由
  Token: string; // 用户传入的token
  Role: any; // 用户的一下基本信息
  isChangeList?: boolean;
  constructor(URL: string, Token: string, Role: any) {
    this.URL = URL;
    this.Token = Token;
    this.Role = Role;
  }
  // 删除指定报告Method
  removeFile = async (Params: any,File?: any) => {
    const REMOVE_FILE: any = await request.get(this.URL, {
      params: { ...Params },
    });
    if (REMOVE_FILE.code === 2000) {
      this.isChangeList = true;
      message.success(REMOVE_FILE.message);
    } else {
      message.error('删除失败');
    }
  };
  // 获取当前用户下的所有上传文档
  getFileInfo = async (Params: any) => {
    try {
      const RED_ALL_FILE = await request.get(this.URL, {
        params: { ...Params },
      });
      if (RED_ALL_FILE.code === 2000) {
        RED_ALL_FILE.data.forEach((item: any, index: number) => {
          RED_ALL_FILE.data[index]['status'] = 'done';
          RED_ALL_FILE.data[index]['name'] = item.file_name;
        });
        return RED_ALL_FILE.data;
      }
    } catch (error) {
      console.log(error);
    }
  };
  downloadInstitutionSingleFile = async (Params: any,File: any) => {
    const DOWNLOAD_ALL_FILE: any = await request.get(this.URL, {
      params: {...Params},
      responseType: 'blob',
      getResponse: true,
    });
    const hide = message.loading('下载中...', 0);
    try {
      if (DOWNLOAD_ALL_FILE) {
        setTimeout(hide, 500);
        const CD = DOWNLOAD_ALL_FILE.response.headers.get('content-disposition').split(';');
        let CD_TEMP: string = '';
        for (let i = 0; i < CD.length; i += 1) {
          if (!CD[i].indexOf('filename=')) CD_TEMP = CD[i];
        }
        const FILE_EXTENSION = CD_TEMP.split('.')[CD_TEMP.split('.').length - 1];
        
        let fileName = '未识别的文件名';
        if (File.name) {
          fileName = `${File.name}`;
        } else {
          fileName = `未识别的文件.${FILE_EXTENSION}`;
        }
        this.convertRes2Blob(DOWNLOAD_ALL_FILE.data, fileName);
        message.success('下载成功');
      } else {
        message.error('下载失败');
      }
    } catch (error) {
      console.log(error);
    }
  };
  convertRes2Blob(data: any, filename = '下载内容') {
    const blob = new Blob([data], { type: 'application/octet-stream' });
    if (typeof window.navigator.msSaveBlob !== 'undefined') {
      window.navigator.msSaveBlob(blob, decodeURI(filename));
    } else {
      const blobURL = window.URL.createObjectURL(blob);
      const tempLink = document.createElement('a');
      tempLink.style.display = 'none';
      tempLink.href = blobURL;
      tempLink.setAttribute('download', decodeURI(filename));
      if (typeof tempLink.download === 'undefined') {
        tempLink.setAttribute('target', '_blank');
      }
      document.body.appendChild(tempLink);
      tempLink.click();
      document.body.removeChild(tempLink);
      window.URL.revokeObjectURL(blobURL);
    }
  }
  getMessageSuccess = (notice: string) => {
    message.success(notice);
  };
  getMessageError = (notice: string) => {
    message.error(notice);
  };
}
