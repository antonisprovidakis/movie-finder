import useRouter from './useRouter';

export default function useLocation() {
  const { location, history } = useRouter();

  function navigate(to, { replace = false } = {}) {
    if (replace) {
      history.replace(to);
    } else {
      history.push(to);
    }
  }

  return {
    location,
    navigate
  };
}
