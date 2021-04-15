import React from 'react';
import Typography from '@common_typography';
import TextField from '@common_textfield';

const ViewCustomizableFieldOption = ({
    title = 'test', data = {}, value = '',
    onChange = () => {}, error = '', required = false,
}) => (
    <div className="column customizable-container">
        {
            data && data.uid && (
                <TextField
                    options={data}
                    name={title}
                    label={(
                        <>
                            <Typography variant="title" type="bold" letter="uppercase">
                                {data.label}
                                {' '}
                                {required && <Typography color="red" type="bold" variant="label">*</Typography>}
                            </Typography>
                        </>
                    )}
                    onChange={onChange}
                    value={value}
                    error={error}
                    errorMessage={error}
                />
            )
        }
    </div>
);

export default ViewCustomizableFieldOption;
