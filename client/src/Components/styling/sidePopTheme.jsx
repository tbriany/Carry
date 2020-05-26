import { makeStyles } from '@material-ui/core/styles';
export const sidePopUp = makeStyles((theme) => ({

  list: {
    width: '100%',
  },
  fullList: {
    width: "50%",
  },
  paperAnchorRight: {
    width: "55%",
    display: 'flex',
    alignItems: 'center',
    bottom: 'inherit',
    height: '92vh',
    top: '56px',
    [theme.breakpoints.up('sm')]: {
      top: '64px',
    },
  },
}));

