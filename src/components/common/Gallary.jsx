//화면 사이즈에 맞추어 카드 사이즈 설정
const cardSize = "w-32 h-32 md:w-48 md:h-48";

const styles = {
  gallary: {
    base: "flex gap-3 overflow-x-scroll overflow-y-hidden  scrollbar-hide bg-white pr-2 my-6",
    loadMore: `${cardSize} bg-gray-500 text-white whitespace-nowrap p-2 rounded-md flex-shrink-0`,
  },
};

const Gallary = ({ children, loadMore }) => {
  return (
    <div className={styles.gallary.base}>
      {children}
      {/* load more cards    */}
      <button className={styles.gallary.loadMore} onClick={loadMore}>
        Load More
      </button>
    </div>
  );
};

export default Gallary;
