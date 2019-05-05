import React from 'react';
import {StyleSheet, Text, View, TouchableOpacity} from 'react-native';
import {Permissions} from 'react-native-unimodules';
import Sound from 'react-native-sound';
import {AudioRecorder, AudioUtils} from 'react-native-audio';

import Api, {File} from './api/Api';

const api = new Api('https://castio.space');
const RECORDING_PATH = AudioUtils.DocumentDirectoryPath + '/ttt.aac';

export default class App extends React.PureComponent {
  state = {
    haveRecordingPermissions: false,
    currentTime: 0,
    files: [],
    isRecording: false,
    isUploading: false
  };

  sounds = {};

  componentDidMount() {
    this._fetchRecordings();
    this._askForPermissions();
    Sound.setCategory('Playback');
  }

  _askForPermissions = async () => {
    AudioRecorder.requestAuthorization();
    const response = await Permissions.askAsync(Permissions.AUDIO_RECORDING);
    this.setState({haveRecordingPermissions: response.status === 'granted'});
  };

  _handleButtonClick = () => {
    if (this.state.isRecording) {
      return this._handleRecordingStop();
    } else {
      return this._handleRecordingStart();
    }
  };

  _handleRecordingStart = async () => {
    await AudioRecorder.prepareRecordingAtPath(RECORDING_PATH, {
      SampleRate: 22050,
      Channels: 1,
      AudioQuality: 'High',
      AudioEncoding: 'aac'
    });

    AudioRecorder.onProgress = this._handleRecordingStateUpdate;

    await AudioRecorder.startRecording();

    this.setState({isRecording: true});
  };

  _handleRecordingStop = async () => {
    await AudioRecorder.stopRecording();

    this.setState({isRecording: false});

    this._uploadRecording();
  };

  _handleRecordingStateUpdate = data => this.setState({currentTime: Math.floor(data.currentTime)});

  _handleFileClick = fileInfo => {
    if (this.sounds[fileInfo.id]) {
      this.sounds[fileInfo.id].stop();
      this.sounds[fileInfo.id].play();
    } else {
      const sound = new Sound(fileInfo.url, null, error => {
        if (error) {
          alert(error);
          return;
        }

        sound.play();
      });

      this.sounds[fileInfo.id] = sound;
    }
  };

  _uploadRecording = async () => {
    const file = new File('file://' + RECORDING_PATH, 'recording.aac', 'audio/x-aac');

    await api.put('/recording', {file});

    this._fetchRecordings();
  };

  _fetchRecordings = async () => {
    const files = await api.get('/recording');

    this.setState({files});
  };

  _renderRecordings() {
    return this.state.files.map(fileInfo => {
      return (
        <TouchableOpacity
          style={styles.recording}
          onPress={() => this._handleFileClick(fileInfo)}
          key={fileInfo.id}
        >
          <Text>Запись {fileInfo.id}</Text>
        </TouchableOpacity>
      );
    });
  }

  render() {
    return (
      <View style={styles.container}>
        <TouchableOpacity onPress={this._handleButtonClick} style={styles.button}>
          <Text>
            {!this.state.isRecording ? 'Запись' : `Остановить (${this.state.currentTime})`}
          </Text>
        </TouchableOpacity>
        {this._renderRecordings()}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF'
  },
  button: {
    fontSize: 20,
    textAlign: 'center',
    padding: 10
  },
  recording: {
    fontSize: 20,
    padding: 10
  }
});
