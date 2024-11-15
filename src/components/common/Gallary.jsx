//화면 사이즈에 맞추어 카드 사이즈 설정
const cardSize = "w-32 h-32 md:w-48 md:h-48";

const styles = {
  gallary: {
    base: "flex flex-wrap gap-4 scroll-m-20 overflow-hidden",
    loadMore: `${cardSize} bg-gray-500 text-white p-2 rounded-md`,
  },
};

const Gallary = ({ children, loadMore }) => {
  return (
    <div className={styles.gallary.base}>
      {children}
      {/* load more cards    */}
      <button className={styles.gallary.loadMore}>Load More</button>
    </div>
  );
};

export default Gallary;
