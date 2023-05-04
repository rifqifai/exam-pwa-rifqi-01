/* eslint-disable consistent-return */
import React, { memo } from 'react';
import parse, { domToReact } from 'html-react-parser';
import dynamic from 'next/dynamic';

import { strToCSSObject } from '@helpers/text';
import { generateThumborUrl } from '@helpers/image';
import WidgetSlider from '@core_modules/cms/components/cms-renderer/widget-slider';
import WidgetView from '@core_modules/cms/components/cms-renderer/view';
import Image from '@common_image';

const Newsletter = dynamic(() => import('@plugin_newsletter'));
const WidgetListProduct = dynamic(() => import('@core_modules/cms/components/cms-renderer/widget-list-product'));
const WidgetListBrand = dynamic(() => import('@core_modules/cms/components/cms-renderer/widget-list-brand'));
const WidgetPwaLink = dynamic(() => import('@core_modules/cms/components/cms-renderer/widget-link-pwa'));

const TYPE_PWA_SLIDER = 'pwa-slider';
const TYPE_PWA_FEATURED = 'pwa-featured-brands';
const TYPE_PWA_PAGELINK = 'pwa-cms-page-link';
const TYPE_PWA_PRODUCT = 'pwa-catalog-products-list';
const TYPE_PWA_NEWSLETTER = 'pwa-newsletter-subscribe';

const DOM_NAME = 'pwa';

const WidgetRenderer = (props) => {
    const { content, storeConfig } = props;
    const updatedContent = content.includes('widget') ? content.replace('{{widget', '<pwa').slice(0, -2).concat(' />') : content;

    React.useEffect(() => {
        const coll = document.getElementsByClassName('collapsible');
        let i;
        setTimeout(() => {
            if (coll[0]) {
                coll[0].classList.toggle('active');
                const contentCMS = coll[0].nextElementSibling;
                if (contentCMS.style.maxHeight) {
                    contentCMS.style.maxHeight = null;
                } else {
                    contentCMS.style.maxHeight = `${contentCMS.scrollHeight}px`;
                }
            }
        }, 1000);
        /* eslint-disable */
        for (i = 0; i < coll.length; i += 1) {
            coll[i].addEventListener('click', function () {
                this.classList.toggle('active');
                var contentCMS = this.nextElementSibling;
                if (contentCMS.style.maxHeight) {
                    contentCMS.style.maxHeight = null;
                } else {
                    contentCMS.style.maxHeight = contentCMS.scrollHeight + 'px';
                }
            });
        }
        /* eslint-enable */
    });

    /**
     * component conversion
     * NOTES*: validateDOMNesting(...): <div> cannot appear as a descendant of <p>
     * parent cms page || block must start with <div>
     * @returns {COMPONENT}
     */
    /* eslint-disable */
    const WidgetComponent = () => {
        return parse(updatedContent, {
            replace: (domNode) => {
                if (domNode.name === 'img') {
                    if(!domNode.attribs.src.includes("thumbor")) {
                        console.log(domNode);
                        console.log(storeConfig);
                        const { src = '', alt = '', style = '', ...attribs } = domNode.attribs;
                        const optImg = generateThumborUrl(src, 0, 0, true, false, storeConfig.pwa.thumbor_url);
    
                        return (
                            <Image
                                className={attribs.class}
                                src={optImg}
                                alt={alt ?? 'image'}
                                width={attribs.width ? attribs.width.replace("px","") : 0}
                                height={attribs.height ? attribs.height.replace("px","") : 0}
                                storeConfig={storeConfig}
                            />
                        )
                    }else{
                        return <img src={optImg} alt={alt ?? 'image'} style={strToCSSObject(style)} {...attribs} />;
                    }
                }

                if (domNode.name === DOM_NAME && domNode.attribs) {
                    const propsWidget = domNode.attribs;
                    switch (domNode.attribs.type) {
                        case TYPE_PWA_SLIDER:
                            return <WidgetSlider {...propsWidget} storeConfig={storeConfig} />;
                        case TYPE_PWA_FEATURED:
                            return <WidgetListBrand {...propsWidget} />;
                        case TYPE_PWA_PAGELINK:
                            return <WidgetPwaLink {...propsWidget} />;
                        case TYPE_PWA_PRODUCT:
                            return <WidgetListProduct {...propsWidget} />;
                        case TYPE_PWA_NEWSLETTER:
                            return <Newsletter {...propsWidget} storeConfig={storeConfig} />;
                        default:
                            return <div>Unable to render the content!</div>;
                    }
                }

                if (domNode.attribs) {
                    if (domNode.attribs.class === 'acctitle') {
                        return (
                            <button type="button" className="collapsible">
                                {domToReact(domNode.children, domNode)}
                            </button>
                        );
                    } else if (domNode.attribs.class === 'acc_content clearfix') {
                        return <div className="content-collapsible">{domToReact(domNode.children, domNode)}</div>;
                    }
                }
            },
        });
    };
    /* eslint-enable */

    /**
     * other props
     */
    const propsOther = { WidgetComponent };

    return <WidgetView {...props} {...propsOther} />;
};

const notRenderIf = (prevProps, nextProps) => prevProps.content === nextProps.content;

export default memo(WidgetRenderer, notRenderIf);
