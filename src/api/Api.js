import axios from 'axios';
import {FileSystem} from 'react-native-unimodules';

export default class Api {
  constructor(baseURL) {
    this.axios = axios.create({
      baseURL
    });
  }

  _prepareRequest(rawBody) {
    const additionalHeaders = {};
    const body = new FormData();

    Object.keys(rawBody).forEach(field => {
      let fieldValue = rawBody[field];

      if (fieldValue instanceof File) {
        additionalHeaders['Content-Type'] = 'multipart/form-data';
        fieldValue = fieldValue.toFormData();
      }

      body.append(field, fieldValue);
    });

    return {
      headers: additionalHeaders,
      body
    };
  }

  get(path) {
    return this.axios.get(path).then(result => {
      return result.data;
    });
  }

  post(path, rawBody, options = {}) {
    const {body, headers} = this._prepareRequest(rawBody);

    return this.axios
      .post(path, body, {
        ...options,
        headers: {
          ...options.headers,
          ...headers
        }
      })
      .then(result => {
        return result.data;
      });
  }

  put(path, rawBody, options = {}) {
    const {body, headers} = this._prepareRequest(rawBody);

    return this.axios
      .put(path, body, {
        ...options,
        headers: {
          ...options.headers,
          ...headers
        }
      })
      .then(result => {
        return result.data;
      });
  }
}

export class File {
  constructor(uri, name, mimetype) {
    if (uri.startsWith('file://')) {
      this.uri = uri;
    } else {
      this.uri = 'file://' + uri;
    }

    this.name = name;
    this.mimetype = mimetype;

    this.getFsInfo();
  }

  async getFsInfo() {
    return FileSystem.getInfoAsync(this.uri);
  }

  toFormData() {
    return {
      uri: this.uri,
      name: this.name,
      mimetype: this.mimetype
    };
  }
}
