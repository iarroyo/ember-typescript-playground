import Service from '@ember/service';

export default class HttpService extends Service {
  async DELETE<R>(url: string, headers?: Headers, signal?: AbortSignal): Promise<R> {
    return this.fetch(url, 'DELETE', headers, undefined, signal);
  }
  async HEAD<R>(url: string, headers?: Headers, signal?: AbortSignal): Promise<R> {
    return this.fetch(url, 'HEAD', headers, undefined, signal);
  }
  async GET<R>(url: string, headers?: Headers, signal?: AbortSignal): Promise<R> {
    return this.fetch(url, 'GET', headers, undefined, signal);
  }
  async POST<B, R>(url: string, headers?: Headers, body?: RequestBody<B>, signal?: AbortSignal): Promise<R> {
    return this.fetch(url, 'POST', headers, body, signal);
  }
  async PUT<B, R>(url: string, headers?: Headers, body?: RequestBody<B>, signal?: AbortSignal): Promise<R> {
    return this.fetch(url, 'PUT', headers, body, signal);
  }

  async fetch<B, R>(
    url: string,
    method = 'GET',
    headers: Headers = new Headers(),
    body?: RequestBody<B>,
    signal?: AbortSignal,
  ): Promise<R> {
    const _headers = Array.from(headers).reduce((acc: { [key: string]: string }, curr) => {
      const [k, v] = curr;
      acc[k] = v;
      return acc;
    }, {});

    const response = await fetch(url, {
      method: method,
      headers: { ..._headers },
      body: body ? JSON.stringify(body) : null,
      signal: signal,
    });

    if (response.ok) {
      return this.getResponseByContentType(response);
    } else {
      //TODO move to the error handler once it is created
      if (401 === response.status) {
        window.location.reload();
      }
      return Promise.reject(response);
    }
  }

  async getResponseByContentType(response: Response): Promise<any> {
    const responseType = response.headers.get('content-type');
    if (responseType) {
      if (responseType.indexOf('application/json') !== -1) {
        try {
          return await response.json();
        } catch (error) {
          return response;
        }
      } else if (new RegExp('application/ms-excel|application/octet-stream').test(responseType)) {
        return await response.blob();
      }
    }
    return response;
  }}

// DO NOT DELETE: this is how TypeScript knows how to look up your services.
declare module '@ember/service' {
  interface Registry {
    'http-service': HttpService;
  }
}
