import InsertEmoticonIcon from '@mui/icons-material/InsertEmoticon';

const style = {
  position: 'absolute' as 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  zIndex: 1,
};

export default function Smile() {
  return <InsertEmoticonIcon sx={style} color={'success'} fontSize={'large'} />;
}
