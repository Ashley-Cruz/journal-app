import React from 'react'

export const NothingSelected = () => {
    return (
        <div className="nothing__main-content">
            <div className="nothing__text-container">
                <p>
                    Select something
                    <br />
                    Create an entry!
                </p>
                <i className="far fa-star fa-4x mt-5"></i>
            </div>
        </div>
    )
}