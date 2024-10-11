import { PLUGIN_KEYS } from '../../constants';
import RosImage from './RosImage';

export const ZedImage = () => (
  <RosImage
    pluginKey={PLUGIN_KEYS.ZED_IMAGE}
    throttleRate={100}
    topic={'/zed2/zed_node/rgb_raw/image_raw_color/compressed'}
  />
);

export const Navcam1 = () => (
  <RosImage
    pluginKey={PLUGIN_KEYS.NAVCAM_1}
    throttleRate={100}
    topic={'/camera1/usb_cam/image_raw/compressed'}
  />
);

export const Navcam2 = () => (
  <RosImage
    pluginKey={PLUGIN_KEYS.NAVCAM_2}
    throttleRate={100}
    topic={'/camera2/usb_cam/image_raw/compressed'}
  />
);

export const Navcam3 = () => (
  <RosImage
    pluginKey={PLUGIN_KEYS.NAVCAM_2}
    throttleRate={100}
    topic={'/camera3/image_raw/compressed'}
  />
);
