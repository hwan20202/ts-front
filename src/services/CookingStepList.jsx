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

const info = [
    { content: "물을 붓습니다물을 붓습니다물을 붓습니다물을 붓습니다물을 붓습니다물을 붓습니다물을 붓습니다물을 붓습니다물을 붓습니다물을 붓습니다물을 붓습니다물을 붓습니다",},
    { content: "물을 붓습니다물을 붓습니다물을 붓습니다물을 붓습니다물을 붓습니다물을 붓습니다물을 붓습니다물을 붓습니다물을 붓습니다물을 붓습니다물을 붓습니다물을 붓습니다",},
    { content: "물을 붓습니다물을 붓습니다물을 붓습니다물을 붓습니다물을 붓습니다물을 붓습니다물을 붓습니다물을 붓습니다물을 붓습니다물을 붓습니다물을 붓습니다물을 붓습니다",},
    { content: "물을 붓습니다물을 붓습니다물을 붓습니다물을 붓습니다물을 붓습니다물을 붓습니다물을 붓습니다물을 붓습니다물을 붓습니다물을 붓습니다물을 붓습니다물을 붓습니다",},

];

const CookingStepList = () => {
    const steps = info.map((step, index) => (
        <CookingStep
            key={index}
            stepNumber={index + 1}
            content={step.content}
        />
    ));

    return (
        <TitleWithItems title='조리 순서' items={steps}/>
    );
}

export default CookingStepList;