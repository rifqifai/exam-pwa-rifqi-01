import dynamic from 'next/dynamic';
import Error from '@pages/error';
import { cmsPages } from '@root/swift.config.js';
import { getResolver } from '../services/graphql';

const Category = dynamic(() => import('../pages/category'));
const Product = dynamic(() => import('../pages/product'));
const Cms = dynamic(() => import('../pages/cms'));
const Loading = dynamic(() => import('@components/Loaders/Backdrop'));

const generateContent = (props, resolver) => {
    if (resolver.type === 'CATEGORY') {
        return <Category {...props} categoryId={resolver.id} />;
    }
    if (resolver.type === 'PRODUCT') {
        return <Product {...props} />;
    }
    if (resolver.type === 'CMS_PAGE') {
        return <Cms {...props} />;
    }
    return <Error statusCode={404} />;
};

const GetResolver = (props) => {
    const { url_key } = props;
    const { error, loading, data } = getResolver(url_key);
    if (error) return <Error statusCode={500} />;
    if (loading) {
        return (
            <main>
                <Loading open />
            </main>
        );
    }
    return generateContent(props, data.urlResolver ? data.urlResolver : {});
};

const Content = (props) => {
    const { slug, storeConfig } = props;
    let url = slug.join('/');
    // suffix based on storeConfig
    const suffix = (storeConfig || {}).category_url_suffix || '.html';

    // for cms pages, no need to add suffix
    url += cmsPages.find((cmsPage) => cmsPage === url) ? '' : suffix;
    return <GetResolver {...props} url_key={url} />;
};

export default Content;