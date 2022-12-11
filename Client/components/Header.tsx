import { useQuery, gql } from '@apollo/client'
import { useRouter } from 'next/router';

const USER_GET = gql`
  query userGet{
    userGet {
      id
      name
      surnames
    }
  }
`;

export default function Header(): any {

  const router = useRouter();
  const { data, loading } = useQuery(USER_GET);

  if (loading) return null;
  if (!data) return router.push('/log-in');

  const { name, surnames } = data.userGet;

  const signOff = () => {
    localStorage.removeItem('token');
    router.push('/log-in');
  }

  return (
    <div className="sm:flex sm:justify-between mb-6">
      <p className="text-black mr-2 mb-5 lg:mb-0">Hi: {name} {surnames}</p>
      <button
        onClick={() => signOff()}
        type="button"
        className="bg-blue-800 w-full sm:w-auto font-bold uppercase text-xs rounded py-1 px-2 text-white shadow-md">
        Sign off
      </button>
    </div>
  );

}