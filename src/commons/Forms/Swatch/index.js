/* eslint-disable no-nested-ternary */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/interactive-supports-focus */
import React from 'react';
import cx from 'classnames';
import CloseIcon from '@heroicons/react/24/outline/XCircleIcon';

const Swatch = ({
    variant = 'text',
    disabled,
    label = '',
    value = '',
    dataValues = [],
    onChange = () => {},
    checked: selected = false,
    className = '',
    style: customStyle = {},
    ...others
}) => {
    const isColor = variant === 'color';
    const isImage = variant === 'image';
    const checked = dataValues && dataValues.length > 0 ? dataValues.indexOf(value) !== -1 : selected;

    const handleChange = () => {
        onChange(value);
    };

    let style = { background: '#FFFFFF' };
    if (isColor && label) {
        style = { background: label };
    }

    if (isImage && label) {
        style = {
            backgroundImage: `url(${label})`,
            backgroundRepeat: 'no-repeat',
            backgroundSize: 'cover',
            backgroundPosition: 'center',
        };
    }

    if (isColor || isImage) {
        return (
            <div
                className={cx(
                    'p-[1px]',
                    'rounded-full border-[1px] border-neutral-white',
                    checked ? 'border-[1px] border-neutral-800' : '',
                    disabled ? 'border-yellow-400 opacity-40' : 'hover:border-[1px] hover:border-neutral-800',
                )}
            >
                <div
                    key="swatches-color-selector"
                    role="button"
                    style={{
                        ...style,
                        ...customStyle,
                    }}
                    onClick={handleChange}
                    className={cx(
                        'swift-swatcher-color',
                        'flex',
                        'justify-center',
                        'items-center',
                        'rounded-[999px] border-[1px] border-neutral-300',
                        'h-[26px]',
                        'w-[26px]',
                        className,
                    )}
                    {...others}
                >
                    {disabled && <CloseIcon className="text-neutral-white" />}
                </div>
            </div>
        );
    }

    return (
        <div
            key="swatches-text-selector"
            role="button"
            className={cx(
                'swift-swatcher-text',
                !disabled ? (checked ? 'border-neutral-800 text-neutral-800 bg-neutral-50' : 'border-neutral-50 text-neutral-700') : '',
                !disabled ? 'hover:border-neutral-800 hover:text-neutral-800 hover:bg-neutral-50' : '',
                disabled && 'bg-neutral-50 border-neutral-50 text-neutral-200',
                'text-base',
                'swatches-text',
                'border-[1px]',
                'font-normal',
                'rounded-[6px]',
                'py-[3px] px-[12px]',
                'relative',
                'uppercase',
                'text-center',
                'max-w-[200px]',
                'truncate',
                className,
            )}
            onClick={handleChange}
            {...others}
        >
            {label}
        </div>
    );
};

export default Swatch;
