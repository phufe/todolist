/*
 * FeaturePage Messages
 *
 * This contains all the text for the TodoPage component.
 */
import { defineMessages } from 'react-intl';

export const scope = 'boilerplate.containers.TodoPage';

export default defineMessages({
  header: {
    id: `${scope}.header`,
    defaultMessage: 'Todo List',
  },
});
