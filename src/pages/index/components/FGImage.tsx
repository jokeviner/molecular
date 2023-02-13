import { Image } from 'antd';

export default (props: { url: string; size?: 'default' | 'small' }) => {
  let wrapSize = 120,
    size = 100;
  if (props.size && props.size == 'small') {
    wrapSize = 96;
    size = 96;
  }
  return (
    <div
      style={{
        width: wrapSize,
        height: wrapSize,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'end',
        userSelect: 'none',
      }}
    >
      <Image
        style={{ objectFit: 'contain', width: `${size}px`, height: `${size}px` }}
        src={props.url}
        preview={false}
      />
    </div>
  );
};
