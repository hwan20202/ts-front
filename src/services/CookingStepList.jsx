import React from "react";
import PropTypes from "prop-types";
import TitleWithItems from "../components/TitleWithItems.jsx";

const CookingStep = (
    {
        stepNumber,
        content,
    }) => {

    return (
        <div className='flex'>
            <div className='text-4xl p-1 font-sans font-semibold'>{stepNumber}</div>
            <div className='p-2 font-sans'>{content}</div>
        </div>
    );
};

CookingStep.propTypes = {
    stepNumber: PropTypes.number,
    content: PropTypes.string.isRequired,
}

const CookingStepList = ( { data, className }) => {

    const classList =  `
    ${className}
    `

    const steps = data.map((step, index) => (
        <CookingStep
            key={index}
            stepNumber={index + 1}
            content={step.content}
        />
    ));

    return (
        <TitleWithItems title='조리 순서' items={steps} className={classList}/>
    );
}

CookingStepList.propTypes = {
    data: PropTypes.array.isRequired,
    className: PropTypes.string,
}

export default CookingStepList;