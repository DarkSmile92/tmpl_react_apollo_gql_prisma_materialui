import { CURRENT_USER_QUERY } from '../lib/gqlQueries';
import Signin from './Signin';
import SignupPage from '../pages/signup';
import { useQuery } from '@apollo/react-hooks';

const PleaseSignIn = ({ children }) => {
  const { loading, error, data, refetch } = useQuery(CURRENT_USER_QUERY);

  return (
    <div>
      {loading && <p>Loading...</p>}
      {!loading && (error || !data || !data.me) && <SignupPage />}
      {!loading && !error && data && data.me && <div>{children}</div>}
    </div>
  );
};

export default PleaseSignIn;
/*
<div>
<p>Bitte einloggen, um fortzufahren!</p>
<Signin />
</div>
*/
