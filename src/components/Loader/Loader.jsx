import { ThreeDots } from 'react-loader-spinner';
import css from './Loader.module.css';

const Loader = () => {
  return (
    <div className={css.container}>
      <ThreeDots
        height={80}
        width={80}
        radius={10}
        color="green"
        ariaLabel="three-dots-loading"
        wrapperClass="test-class"
        wrapperStyle={{ opacity: '1' }}
        visible={true}
      />
    </div>
  );
};

export default Loader;
