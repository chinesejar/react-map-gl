import { PureComponent } from "react";
import type MapboxMap from 'mapbox-gl/src/ui/map';
import type { ExpressionSpecification } from "mapbox-gl/src/style-spec/types";

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

export default class Fog extends PureComponent<Props> {
  constructor(props: Props);

  setFog(): MapboxMap;
}
