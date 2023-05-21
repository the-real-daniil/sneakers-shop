import css from './loader.module.css';

const Loader = () =>
    <div className={css.loaderContainer}>
        <span className={css.loader}></span>
    </div>

export default Loader;