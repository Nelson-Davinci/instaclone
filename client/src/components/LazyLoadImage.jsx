import { LazyLoadImage } from 'react-lazy-load-image-component';
import 'react-lazy-load-image-component/src/effects/blur.css';

export default function LazyloadComponent ({image, classname}) {
    return (
        <img
            effect="blur"
            alt="images"
            width="100%"
            height="100%"
            src={image}
            className={classname}
        />
    );
};
