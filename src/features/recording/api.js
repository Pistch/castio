export default class RecordingApi {
  constructor(api) {
    this.api = api;
  }

  getRecordings() {
    return this.api.get('/recording');
  }
}
