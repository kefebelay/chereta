import PropTypes from "prop-types";
import verified from "/assets/icons/verified_img.svg";

const VerifiedBadge = ({ isVerified }) => (
  <div className="mt-2">
    {isVerified ? (
      <img src={verified} alt="Verified" className="h-8 w-8" />
    ) : null}
  </div>
);

VerifiedBadge.propTypes = {
  isVerified: PropTypes.bool.isRequired,
};

export default VerifiedBadge;
