import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';

import actions from '../../actions';
import Component from './Recording';

function mapStateToProps(state) {
  return {
    recordings: Object.values(state.recordings.byId)
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(
    {
      getRecordings: actions.list.get
    },
    dispatch
  );
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Component);
