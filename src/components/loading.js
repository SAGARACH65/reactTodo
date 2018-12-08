import React from 'react';
import { ClipLoader } from 'react-spinners';

export default function loading() {
    return (
        <div className="loader">
            <ClipLoader
                color={'#49c'}
                loading={true}
            />
        </div>
    );
}
