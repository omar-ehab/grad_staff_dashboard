import React, { lazy, Suspense } from 'react';
import { Route, useRouteMatch, Switch } from 'react-router-dom';
import Loader from '@iso/components/utility/loader';

const routes = [
  {
    path: 'markets',
    component: lazy(() => import('@iso/containers/Markets/AntTables/AntTables')),
  },
  {
    path: 'students',
    exact: true,
    component: lazy(() => import('@iso/containers/Students/AntTables/AntTables')),
  },
  {
    path: 'students/:student_id',
    component: lazy(() => import('@iso/containers/Student/Student')),
  },
];

export default function AppRouter() {
  const { url } = useRouteMatch();
  return (
    <Suspense fallback={<Loader />}>
      <Switch>
        {routes.map((route, idx) => (
          <Route exact={route.exact} key={idx} path={`${url}/${route.path}`}>
            <route.component />
          </Route>
        ))}
      </Switch>
    </Suspense>
  );
}
