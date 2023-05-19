export default ({ ...props }) => {
  return (
    <img
      style={{
        width: '100%',
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)'
      }}
      {...props}
    />
  );
};
