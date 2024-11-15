import Gallary from "../components/common/Gallary.jsx";
import GallaryCard from "../components/common/GallaryCard.jsx";
import DislikedIngredientsView from "../components/ingredient/DislikedIngredientsView.jsx";

const Profile = () => {
  return (
    <div>
      <h1>Profile</h1>
      {/* <DislikedIngredientsRegister /> */}
      <DislikedIngredientsView />
      <Gallary>
        <GallaryCard title="Card 1" description="Description 1" />
        <GallaryCard title="Card 2" description="Description 2" />
        <GallaryCard title="Card 3" description="Description 3" />
        <GallaryCard title="Card 4" description="Description 4" />
      </Gallary>
    </div>
  );
};

export default Profile;
