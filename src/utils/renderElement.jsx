const renderElement = (Element) => {
    if (typeof Element === 'function') {
        return (<Element />);  // 컴포넌트인 경우 호출
    }
    return Element;  // JSX 요소 그대로 렌더링
};

export default renderElement;