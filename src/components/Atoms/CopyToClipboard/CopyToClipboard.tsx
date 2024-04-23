interface Properties {
  value: string;
}

const CopyToClipboard = ({ value }: Properties) => {
  return <div>{value}</div>;
};

export default CopyToClipboard;
