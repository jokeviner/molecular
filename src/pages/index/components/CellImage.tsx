import { Image } from 'antd';

export default (props: { url: string }) => (
  <div
    style={{
      width: 120,
      height: 120,
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'end',
    }}
  >
    <Image
      style={{ objectFit: 'contain', width: '100px', height: '100px' }}
      src={props.url}
      fallback="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mNkYAAAAAYAAjCB0C8AAAAASUVORK5CYII="

      preview={false}
    />
  </div>
);
