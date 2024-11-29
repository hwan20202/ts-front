import React from "react";

//화면 사이즈에 맞추어 카드 사이즈 설정
const cardSize = "w-32 h-32 md:w-48 md:h-48";

const styles = {
  gallary: {
    base: "flex gap-3 overflow-x-scroll overflow-y-hidden  scrollbar-hide bg-white pr-2 my-6",
    loadMore: `${cardSize} bg-gray-500 text-white whitespace-nowrap p-2 rounded-md flex-shrink-0`,
  },
};

const Loading = () => {
  return (
    <div className={`${cardSize} flex-shrink-0 text-black`}>Loading...</div>
  );
};

const Gallary = ({ children, loadMore, loading, error }) => {
  let child;

  if (error) {
    child = <div>Error</div>;
  } else if (loading) {
    child = <Loading />;
  } else {
    child = [
      ...React.Children.toArray(children), // children을 배열로 변환하여 추가
      <button
        key="load-more"
        className={styles.gallary.loadMore}
        onClick={loadMore}
      >
        Load More
      </button>,
    ];
  }

  return <div className={styles.gallary.base}>{child}</div>;
};

export default Gallary;
