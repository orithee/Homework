import { IconButton } from '@mui/material';
import CopyToClipboard from 'react-copy-to-clipboard';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';

export default function Copy({ text }: { text: string }) {
  return (
    <CopyToClipboard text={text}>
      <IconButton sx={{ cursor: 'pointer' }}>
        <ContentCopyIcon />
      </IconButton>
    </CopyToClipboard>
  );
}
