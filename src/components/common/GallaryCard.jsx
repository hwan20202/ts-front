const testImg =
  "https://images.unsplash.com/photo-1555066931-4365d14bab8c?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D";

//화면 사이즈에 맞추어 카드 사이즈 설정
const cardSize = "w-32 h-32 md:w-48 md:h-48";

const styles = {
  card: {
    base: `relative ${cardSize} overflow-hidden rounded-lg shadow-lg`,
    img: "w-full h-full object-cover",
    info: "absolute bottom-0 left-0 w-full bg-black/70 text-white p-4 overflow-y-auto",
    title: "text-lg font-bold",
    description: "text-sm",
  },
};

const GallaryCard = ({ title, description }) => {
  return (
    <div className={styles.card.base}>
      <img src={testImg} alt={title} className={styles.card.img} />
      <div className={styles.card.info}>
        <h2 className={styles.card.title}>{title}</h2>
        <p className={styles.card.description}>{description}</p>
      </div>
    </div>
  );
};

export default GallaryCard;
