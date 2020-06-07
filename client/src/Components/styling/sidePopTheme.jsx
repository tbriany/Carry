import { makeStyles } from '@material-ui/core/styles';
export const sidePopUp = makeStyles((theme) => ({
  list: {
    width: '100%',
  },
  fullList: {
    width: "50%",
  },
  paperAnchorRight: {
    width: "50%",
    display: 'flex',
    alignItems: 'center',
    bottom: 'inherit',
    top: '56px',
    [theme.breakpoints.up('sm')]: {
      top: '64px',
    },
  },
}));

