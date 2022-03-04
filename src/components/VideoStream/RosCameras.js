import { PLUGIN_KEYS } from '../../constants/plugins';
import RosImage from './RosImage';

export const ZedImage = () => (
  <RosImage
    pluginKey={PLUGIN_KEYS.ZED_IMAGE}
    throttleRate={100}
    topic={'/zed2/zed_node/left_raw/image_raw_color/compressed'}
  />
);

export const Navcam1 = () => (
  <RosImage
    pluginKey={PLUGIN_KEYS.NAVCAM_1}
    throttleRate={100}
    topic={'/usb_cam//compressed'}
  />
);

export const Navcam2 = () => (
  <RosImage
    pluginKey={PLUGIN_KEYS.NAVCAM_2}
    throttleRate={100}
    topic={'/zed2/zed_node/left_raw/image_raw_color/compressed'}
  />
);
