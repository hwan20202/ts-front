const createElementCopy = (originalElement) => {
  const copy = originalElement.cloneNode(true);
  const originalStyle = window.getComputedStyle(originalElement);

  // 복사본에 원본 스타일 적용
  Object.assign(copy.style, {
    position: "fixed",
    width: originalStyle.width,
    height: originalStyle.height,
    margin: 0, // 마진 초기화
    pointerEvents: "none", // 복사본에서 이벤트 비활성화
    zIndex: 1000, // 복사본이 위에 표시되도록 설정
  });

  document.body.appendChild(copy);
  return copy;
};

export default createElementCopy;
