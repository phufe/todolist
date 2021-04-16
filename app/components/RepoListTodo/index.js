import React from 'react';
import PropTypes from 'prop-types';

import List from 'components/ListTodo';
import ListItem from 'components/ListItem';
import { makeStyles } from '@material-ui/core/styles';
import RepoListItem from 'containers/RepoListItem';

const useStyles = makeStyles((theme) => ({
  container: {
    display: 'flex',
  },
  root: {
    margin: '0 auto',
    backgroundColor: theme.palette.background.transparent,
  }
}));

function ReposListTodo({ loading, error, data }) {
  const classes = useStyles();
  if (loading) {
    return (
      <div className={classes.container}>
        <img src="https://s4.gifyu.com/images/dinod9b5f2db539f2a9c.gif" className={classes.root}/>
      </div>
    );
  }
  if (error !== false) {
    const ErrorComponent = () => (
      <ListItem item="Something went wrong, please try again!" />
    );
    return <List component={ErrorComponent} />;
  }

  if (data !== false) {
    return <List items={data} component={RepoListItem} />;
  }
  return null;
}

ReposListTodo.propTypes = {
  loading: PropTypes.bool,
  error: PropTypes.any,
  data: PropTypes.any,
};

export default ReposListTodo;
