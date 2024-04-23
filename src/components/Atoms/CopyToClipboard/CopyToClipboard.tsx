interface Properties {
  lastCardId: string;
}

const CopyToClipboard = ({ lastCardId }: Properties) => {
  return <div>{lastCardId}</div>;
};

export default CopyToClipboard;
