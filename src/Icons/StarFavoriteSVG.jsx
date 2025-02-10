const StarFavoriteSVG = ({ favorite, handleClick }) => {
  return (
    <div role="button" onClick={handleClick}>
      <svg
        fill={favorite ? "#7a5c3f" : "transparent"}
        stroke="#7a5c3f"
        strokeWidth={50}
        version="1.1"
        id="Capa_1"
        xmlns="http://www.w3.org/2000/svg"
        width="20px"
        height="18px"
        viewBox="0 0 940.688 940.688"
      >
        <g>
          <path
            d="M885.344,319.071l-258-3.8l-102.7-264.399c-19.8-48.801-88.899-48.801-108.6,0l-102.7,264.399l-258,3.8
          c-53.4,3.101-75.1,70.2-33.7,103.9l209.2,181.4l-71.3,247.7c-14,50.899,41.1,92.899,86.5,65.899l224.3-122.7l224.3,122.601
          c45.4,27,100.5-15,86.5-65.9l-71.3-247.7l209.2-181.399C960.443,389.172,938.744,322.071,885.344,319.071z"
          />
        </g>
      </svg>
    </div>
  );
};
export default StarFavoriteSVG;
