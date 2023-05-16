import { simulation } from '../../utils/constants';
import { ModelVisualizer } from '../roboticArm/ModelVisualizer';

const UrdfVisualizer = (props) => {
  return (
    <ModelVisualizer
      {...props}
      urdfPath={'http://0.0.0.0:8000'}
      targetFrame={simulation.constants.ROBOT_BASE_LINK}
      tfRate={simulation.config.tfRate}
      // width={simulation.config.width}
      // height={simulation.config.height}
      cameraPosition={simulation.config.cameraPosition}
    />
  );
};

export default UrdfVisualizer;
