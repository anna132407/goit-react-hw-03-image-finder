import { ThreeCircles } from 'react-loader-spinner';
import css from './Loader.module.css';

export const Loader = () => {
  return (
    <div className={css.Backdrop}>
      <ThreeCircles
        className={css.Loader}
        height="100"
        width="100"
        color="#3f51b5"
        visible={true}
        ariaLabel="three-circles-rotating"
        outerCircleColor="#8693da "
        innerCircleColor="#3f51b5"
        middleCircleColor="#3a0e74"
      />
    </div>
  );
};