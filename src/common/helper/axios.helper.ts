import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import axios, { AxiosError, AxiosResponse } from 'axios';
/**
 * This Helper Class is responsible to wrap axios functionality and expose only needed methods.
 */

@Injectable()
export default class AxiosHelper {
  private endPoint: string = '';

  constructor(private configurationService: ConfigService) {
    axios.defaults.baseURL = this.configurationService.get<string>('API_KEY')
  }

  public async get<T>(
    requestConfig: {
      endpoint: string;
    },
    config?: any,
  ): Promise<T> {
    this.endPoint = requestConfig.endpoint;

    //Setting the base url based on the request
    

    return new Promise((resolve, reject) => {
      axios
        .get<T>(this.endPoint, config)
        .then((value: AxiosResponse<T>) => {
          resolve(value.data);
        })
        .catch((error: AxiosError) => {
          console.log(error);
          // TODO: This has to be done... Ahmed
          reject(error);
        });
    });
  }

  public async post<T>(
    requestConfig: {
      endpoint: string;
    },
    body?: any,
  ): Promise<T> {
    this.endPoint = requestConfig.endpoint;

    //Setting the base url based on the request


    return new Promise((resolve, reject) => {
      axios
        .post<T>(this.endPoint, body, {
          headers: {
            'Content-Type': 'application/json'
          }
        })
        .then((value: AxiosResponse<T>) => {
          resolve(value.data);
        })
        .catch((error: AxiosError) => {
          console.log(error);
          // TODO: This has to be done... Ahmed
          reject(error);
        });
    });
  }


}
