const NoneFound = ({
  message = "Sadly, We Found No Matches with These Filters Applied.",
}) => {
  return (
    <div className="none-found">
      <h3>{message}</h3>
    </div>
  );
};
export default NoneFound;
