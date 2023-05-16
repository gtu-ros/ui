const isColor = (strColor) => {
  const s = new Option().style;
  s.color = strColor;
  return s.color !== '';
};

const ColorList = ({ array }) => {
  return array.map((color) => {
    color = color.replace('.', '');
    if (color == '-' || color == '') return color;
    if (!isColor(color)) console.log('cannot render: ' + color);
    return (
      <div
        style={{
          backgroundColor: color,
          display: 'inline-block',
          width: 10,
          height: 10,
          border: '1px solid black',
          margin: 1
        }}
      />
    );
  });
};

export default ColorList;
