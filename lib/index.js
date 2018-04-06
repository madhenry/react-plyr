'use strict';

exports.__esModule = true;

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _plyr = require('plyr');

var _plyr2 = _interopRequireDefault(_plyr);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Plyr = function (_Component) {
  _inherits(Plyr, _Component);

  function Plyr() {
    _classCallCheck(this, Plyr);

    var _this = _possibleConstructorReturn(this, _Component.call(this));

    _this.getType = function () {
      return _this.player && _this.player.getType();
    };

    _this.isReady = function () {
      return _this.player && _this.player.isReady();
    };

    _this.play = function () {
      return _this.player && _this.player.play();
    };

    _this.pause = function () {
      return _this.player && _this.player.pause();
    };

    _this.stop = function () {
      return _this.player && _this.player.stop();
    };

    _this.togglePlay = function () {
      return _this.player && _this.player.togglePlay();
    };

    _this.restart = function () {
      return _this.player && _this.player.restart();
    };

    _this.getCurrentTime = function () {
      return _this.player && _this.player.getCurrentTime();
    };

    _this.getDuration = function () {
      return _this.player && _this.player.getDuration();
    };

    _this.getVolume = function () {
      return _this.player && _this.player.getVolume();
    };

    _this.isMuted = function () {
      return _this.player && _this.player.isMuted();
    };

    _this.isPaused = function () {
      return _this.player && _this.player.isPaused();
    };

    _this.toggleMute = function () {
      return _this.player && _this.player.toggleMute();
    };

    _this.player = null;
    return _this;
  }

  // Specifies the default values for props:


  Plyr.prototype.componentDidMount = function componentDidMount() {
    var _this2 = this;

    var options = {
      enabled: this.props.enabled,
      controls: this.props.controls,
      loadSprite: this.props.loadSprite,
      iconUrl: this.props.iconUrl,
      iconPrefix: this.props.iconPrefix,
      debug: this.props.debug,
      autoplay: this.props.autoplay,
      seekTime: this.props.seekTime,
      volume: this.props.volume,
      clickToPlay: this.props.clickToPlay,
      disableContextMenu: this.props.disableContextMenu,
      hideControls: this.props.hideControls,
      showPosterOnEnd: this.props.showPosterOnEnd,
      keyboardShortcuts: this.props.keyboardShortcuts,
      tooltips: this.props.tooltips,
      duration: this.props.duration,
      displayDuration: this.props.displayDuration,
      storage: this.props.storage
    };

    if (!options.iconUrl) {
      delete options.iconUrl;
    }

    var selector = '.' + this.props.className.replace(/ /g, '.');
    this.player = _plyr2.default.setup(selector, options)[0];

    if (this.player) {
      this.player.on('ready', function (event) {
        _this2.props.onReady && _this2.props.onReady(event);
      });

      this.player.on('play', function () {
        _this2.props.onPlay && _this2.props.onPlay();
      });

      this.player.on('pause', function () {
        _this2.props.onPause && _this2.props.onPause();
      });

      this.player.on('ended', function () {
        _this2.props.onEnd && _this2.props.onEnd();
      });

      this.player.on('loadeddata', function () {
        _this2.props.onLoadedData && _this2.props.onLoadedData();
      });

      this.player.on('seeked', function (event) {
        var time = event.detail.plyr.getCurrentTime();
        _this2.props.onSeeked && _this2.props.onSeeked(time);
      });

      this.player.on('enterfullscreen', function () {
        _this2.props.onEnterFullscreen && _this2.props.onEnterFullscreen();
      });

      this.player.on('exitfullscreen', function () {
        _this2.props.onExitFullscreen && _this2.props.onExitFullscreen();
      });

      this.player.on('volumechange', function (event) {
        var isMuted = event.detail.plyr.isMuted();
        var volume = event.detail.plyr.getVolume();

        _this2.props.onVolumeChange && _this2.props.onVolumeChange({ isMuted: isMuted, volume: volume });
      });
    }
  };

  Plyr.prototype.componentWillUnmount = function componentWillUnmount() {
    this.player && this.player.destroy();
  };

  // For video support for plyr supported videos using videoId (Youtube and Vimeo for now).


  Plyr.prototype.renderPlayerWithVideoId = function renderPlayerWithVideoId() {
    return _react2.default.createElement(
      'div',
      { className: this.props.className, style: this.props.style },
      _react2.default.createElement('div', {
        'data-type': this.props.type,
        'data-video-id': this.props.videoId
      })
    );
  };

  Plyr.prototype.renderPlayerWithSRCWithSources = function renderPlayerWithSRCWithSources(sources) {
    return _react2.default.createElement(
      'video',
      {
        className: this.props.className,
        preload: this.props.preload,
        poster: this.props.poster
      },
      sources.map(function (source, index) {
        return _react2.default.createElement('source', { key: index, src: source.src, type: source.type });
      })
    );
  };

  // For video support for source defined as link to those video files.


  Plyr.prototype.renderPlayerWithSRC = function renderPlayerWithSRC() {
    var _props = this.props,
        sources = _props.sources,
        url = _props.url,
        preload = _props.preload,
        poster = _props.poster,
        className = _props.className;


    if (sources && Array.isArray(sources) && sources.length) {
      return this.renderPlayerWithSRCWithSources(sources);
    } else {
      return _react2.default.createElement('video', {
        className: className,
        src: url,
        preload: preload,
        poster: poster
      });
    }
  };

  Plyr.prototype.renderAudioPlayer = function renderAudioPlayer() {
    var _props2 = this.props,
        sources = _props2.sources,
        url = _props2.url,
        preload = _props2.preload,
        className = _props2.className;


    if (sources && Array.isArray(sources) && sources.length) {
      return _react2.default.createElement(
        'audio',
        {
          className: className,
          preload: preload
        },
        sources.map(function (source, index) {
          return _react2.default.createElement('source', { key: index, src: source.src, type: source.type });
        })
      );
    } else {
      return _react2.default.createElement('audio', {
        className: className,
        preload: preload,
        src: url
      });
    }
  };

  Plyr.prototype.render = function render() {
    if (this.props.type === 'audio') return this.renderAudioPlayer();else if (this.props.type === 'video') return this.renderPlayerWithSRC();else return this.renderPlayerWithVideoId();
  };

  return Plyr;
}(_react.Component);

Plyr.defaultProps = {
  type: 'youtube',

  className: 'react-plyr',
  enabled: true,
  controls: ['play-large', 'play', 'progress', 'current-time', 'mute', 'volume', 'captions', 'fullscreen'],
  loadSprite: true,
  iconUrl: null,
  iconPrefix: 'plyr',
  debug: false,
  autoplay: false,
  seekTime: 10,
  volume: 5,
  clickToPlay: true,
  disableContextMenu: true,
  hideControls: true,
  showPosterOnEnd: false,
  keyboardShortcuts: {
    focused: true,
    global: false
  },
  tooltips: {
    controls: false,
    seek: true
  },
  duration: null,
  displayDuration: true,
  storage: {
    enabled: true,
    key: 'plyr_volume'
  }
};
Plyr.propTypes = {
  type: _propTypes2.default.oneOf(['youtube', 'vimeo', 'video', 'audio']),
  className: _propTypes2.default.string,
  videoId: _propTypes2.default.string,
  url: _propTypes2.default.string,
  poster: _propTypes2.default.string,
  sources: _propTypes2.default.arrayOf(_propTypes2.default.shape({
    src: _propTypes2.default.string.isRequired,
    type: _propTypes2.default.string.isRequired
  })),

  onReady: _propTypes2.default.func,
  onPlay: _propTypes2.default.func,
  onPause: _propTypes2.default.func,
  onEnd: _propTypes2.default.func,
  onLoadedData: _propTypes2.default.func,
  onSeeked: _propTypes2.default.func,
  onEnterFullscreen: _propTypes2.default.func,
  onVolumeChange: _propTypes2.default.func,

  // plyr props
  enabled: _propTypes2.default.bool,
  controls: _propTypes2.default.arrayOf(_propTypes2.default.string),
  loadSprite: _propTypes2.default.bool,
  iconUrl: _propTypes2.default.string,
  iconPrefix: _propTypes2.default.string,
  debug: _propTypes2.default.bool,
  autoplay: _propTypes2.default.bool,
  preload: _propTypes2.default.string,
  seekTime: _propTypes2.default.number,
  volume: _propTypes2.default.number,
  clickToPlay: _propTypes2.default.bool,
  disableContextMenu: _propTypes2.default.bool,
  hideControls: _propTypes2.default.bool,
  showPosterOnEnd: _propTypes2.default.bool,
  keyboardShortcuts: _propTypes2.default.shape({
    focused: _propTypes2.default.bool,
    global: _propTypes2.default.bool
  }),
  tooltips: _propTypes2.default.shape({
    controls: _propTypes2.default.bool,
    seek: _propTypes2.default.bool
  }),
  duration: _propTypes2.default.number,
  displayDuration: _propTypes2.default.bool,
  storage: _propTypes2.default.shape({
    enabled: _propTypes2.default.bool,
    key: _propTypes2.default.string
  })
};
exports.default = Plyr;
module.exports = exports['default'];