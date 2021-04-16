/* eslint-disable react/prop-types */
/*
 * Todo Page
 *
 * List all the features
 */
import React, { memo, useEffect } from 'react';
import { Helmet } from 'react-helmet';
import { FormattedMessage } from 'react-intl';
import messages from './messages';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { createStructuredSelector } from 'reselect';

import { useInjectReducer } from 'utils/injectReducer';
import { useInjectSaga } from 'utils/injectSaga';

import {
  makeSelectData,
  makeSelectLoading,
  makeSelectError,
  makeSelectTaskErrorInput,
} from './selectors';
import { changeInputTodo, createTask, loadingTask } from './actions';
import ReposListTodo from 'components/RepoListTodo';
import reducer from './reducer';
import saga from './saga';

// MATERIAL UI
import Container from '@material-ui/core/Container';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import H1 from 'components/H1';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1,
    padding: theme.spacing(2),
    backgroundColor: '#f5f5f5',
  },
  title: {
    marginBottom: '1rem',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  subtitle: {
    justifyContent: 'center',
  },
  container: {
    marginTop: '5px',
  },
}));

export function TodoPage({
  inputTodo,
  onChangeInputTodo,
  loading,
  error,
  onSubmitForm,
  loadDataDefault,
  data,
  errorInput
}) {
  const key = 'todoListReducer';
  useInjectReducer({ key, reducer });
  useInjectSaga({ key, saga });

  const reposListProps = {
    loading,
    error,
    data,
  };

  useEffect(() => {
    loadDataDefault();
  }, []);

  const classes = useStyles();

  const onSubmitFormData = evt => {
    evt.preventDefault();
    evt.target.reset();
    onSubmitForm();
  };

  return (
    <div>
      <Helmet>
        <title>Todo List</title>
        <meta
          name="description"
          content="Add page of React.js Boilerplate application"
        />
      </Helmet>

      <H1 className={classes.title}>
        <FormattedMessage {...messages.header} />
      </H1>

      <Container maxWidth="md">
        <AppBar position="static">
          <Toolbar variant="dense" className={classes.subtitle}>
            <Typography variant="h6" color="inherit">
              React Todo List ({data.length})
            </Typography>
          </Toolbar>
        </AppBar>
        <div className={classes.root}>
          <Grid container spacing={2} className={classes.container}>
            <Grid item xs={12}>
              <form onSubmit={onSubmitFormData}>
                <Grid container justify="center" alignItems="center">
                  <TextField
                    error={errorInput}
                    id="standard-basic"
                    value={inputTodo}
                    label="Add Task"
                    onChange={onChangeInputTodo}
                    variant="outlined"
                    size="small"
                  />
                </Grid>
              </form>
            </Grid>
            <Grid item xs={12}>
              <ReposListTodo {...reposListProps} />
            </Grid>
          </Grid>
        </div>
      </Container>
    </div>
  );
}

TodoPage.propTypes = {
  loading: PropTypes.bool,
  inputTodo: PropTypes.string,
  onChangeInputTodo: PropTypes.func,
  onSubmitForm: PropTypes.func,
  error: PropTypes.oneOfType([PropTypes.object, PropTypes.bool]),
  data: PropTypes.oneOfType([PropTypes.array, PropTypes.bool]),
};

const mapStateToProps = createStructuredSelector({
  data: makeSelectData(),
  loading: makeSelectLoading(),
  error: makeSelectError(),
  errorInput: makeSelectTaskErrorInput(),
});

export function mapDispatchToProps(dispatch) {
  return {
    onChangeInputTodo: evt => dispatch(changeInputTodo(evt.target.value)),
    // onSubmitForm: evt => {
    //   if (evt !== undefined && evt.preventDefault) evt.preventDefault();
    //   dispatch(loadRepos());
    //   evt.target.reset();
    // },
    onSubmitForm: () => dispatch(createTask()),
    loadDataDefault: () => dispatch(loadingTask()),
  };
}

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

export default compose(
  withConnect,
  memo,
)(TodoPage);
