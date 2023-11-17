import './imgaskeleton.css';

const SkeletonGlobal = ({ width, height, borderRadius, cards }) => {
  const containerStyle = {
    width: width,
    height: height,
    borderRadius: borderRadius,
  };

  return Array(cards)
  .fill(0)
  .map((_, i) => (
    <div key={i}>
      <div className="react-loading-skeleton" style={containerStyle}/>
    </div>
      )
  )
};

export default SkeletonGlobal;
