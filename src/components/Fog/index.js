// @flow

import { PureComponent, createElement } from 'react';
import type MapboxMap from 'mapbox-gl/src/ui/map';
import type { ExpressionSpecification } from 'mapbox-gl/src/style-spec/types';

import MapContext from '../MapContext';

type Props = {
  /** The color of the atmosphere region immediately below 
   * the horizon and within the range and above the horizon 
   * and within horizon-blend. */
  color?: String | ExpressionSpecification,

  /** The color of the atmosphere region above the horizon, 
   * high-color extends further above the horizon than the 
   * color property and its spread can be controlled with 
   * horizon-blend. */
  'high-color'?: String | ExpressionSpecification,

  /**
   * Horizon blend applies a smooth fade from the color of
   * the atmosphere to the color of space.
   */
  'horizon-blend'?: Number | ExpressionSpecification,

  /**
   * The start and end distance range in which fog fades from 
   * fully transparent to fully opaque.
   */
  range?: [Number, Number],

  /**
   * The color of the region above the horizon and after the 
   * end of the horizon-blend contribution.
   */
  'space-color'?: String | ExpressionSpecification;

  /**
   * A value controlling the star intensity where 0 will show 
   * no stars and 1 will show stars at their maximum intensity.
   */
  'star-intensity'?: Number | ExpressionSpecification;
};

class Fog extends PureComponent<Props> {
  _map: MapboxMap;

  static displayName = 'Fog';

  static defaultProps = {
    color: '#ffffff',
    'high-color': '#245cdf',
    'horizon-blend': ['interpolate', ['linear'], ['zoom'], 4, 0.2, 7, 0.1],
    range: [0.5, 10],
    'space-color': ['interpolate', ['linear'], ['zoom'], 4, '#010b19', 7, '#367ab9'],
    'star-intensity': ['interpolate', ['linear'], ['zoom'], 5, 0.35, 6, 0]
  };

  componentDidMount() {
    this.setFog();
  }

  componentDidUpdate() {
    this.setFog();
  }

  componentWillUnmount() {
    if (!this._map || !this._map.getStyle() || !this._map?.setFog) {
      return;
    }

    this._map.setFog();
  }

  setFog() {
    /**
     * Fog since version 2.3.0, not support below versions.
     */
    if (!this._map?.setFog) return;
    const {
      color,
      'high-color': highColor,
      'horizon-blend': horizonBlend,
      range,
      'space-color': spaceColor,
      'star-intensity': starIntensity
    } = this.props;
    this._map.setFog({
      color,
      'high-color': highColor,
      'horizon-blend': horizonBlend,
      range,
      'space-color': spaceColor,
      'star-intensity': starIntensity
    });
  }

  render() {
    return createElement(MapContext.Consumer, {}, (map) => {
      if (map) {
        this._map = map;
      }

      return null;
    });
  }
}

export default Fog;
