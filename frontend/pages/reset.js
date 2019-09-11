import Reset from '../components/Reset';

const ResetPage = ({ query }) => (
  <div>
    <p>Passwort zurücksetzen {query.resetToken}</p>
    <Reset resetToken={query.resetToken} />
  </div>
);

export default ResetPage;
