import { Switch, Route } from 'react-router-dom';

import { FoodProvider } from '../hooks/useFood';

import { Dashboard } from '../pages/Dashboard';

export function Routes() {
  return (
    <Switch>
      <FoodProvider>
        <Route path="/" exact component={Dashboard} />
      </FoodProvider>
    </Switch>
  );
}
