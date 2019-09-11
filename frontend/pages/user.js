import PleaseSignIn from '../components/PleaseSignIn';
import SingleUser from '../components/SingleUser';

const User = ({ query }) => (
  <div>
    <PleaseSignIn>
      <SingleUser id={query.id} />
    </PleaseSignIn>
  </div>
);

export default User;
